/**
 * npm run validate [-- --data <dir>]
 *
 * Checks data/nodes.json and data/edges.json against the zod schemas and the
 * §4.3 invariants. Prints every problem, not just the first, and exits 1 if
 * there are any.
 */
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  EdgeSchema,
  NodeSchema,
  RELATION_ENDPOINT_RULES,
  SYMMETRIC_RELATION_TYPES,
} from '../src/schema/index'
import type { Edge, Node } from '../src/schema/index'

const dataFlag = process.argv.indexOf('--data')
const dataDir = resolve(dataFlag >= 0 ? (process.argv[dataFlag + 1] ?? 'data') : 'data')

const problems: string[] = []
const report = (where: string, msg: string) => problems.push(`${where}: ${msg}`)

function loadArray(file: string): unknown[] {
  const path = resolve(dataDir, file)
  try {
    const parsed: unknown = JSON.parse(readFileSync(path, 'utf8'))
    if (Array.isArray(parsed)) return parsed
    report(file, 'top level must be a JSON array')
  } catch (err) {
    report(file, err instanceof Error ? err.message : String(err))
  }
  return []
}

// Shape: parse each record on its own so one bad record doesn't hide others.
const nodes: Node[] = []
loadArray('nodes.json').forEach((raw, i) => {
  const r = NodeSchema.safeParse(raw)
  if (r.success) nodes.push(r.data)
  else for (const issue of r.error.issues) report(`node[${i}] ${label(raw)}`, fmt(issue))
})

const edges: Edge[] = []
loadArray('edges.json').forEach((raw, i) => {
  const r = EdgeSchema.safeParse(raw)
  if (r.success) edges.push(r.data)
  else for (const issue of r.error.issues) report(`edge[${i}] ${label(raw)}`, fmt(issue))
})

// Cross-record rules.
const byId = new Map<string, Node>()
for (const n of nodes) {
  if (byId.has(n.id)) report(`node ${n.id}`, 'duplicate node id') // invariant 7
  byId.set(n.id, n)
}
for (const n of nodes) {
  for (const p of n.party_affiliations)
    if (byId.get(p.party_id)?.entity_type !== 'party')
      report(`node ${n.id}`, `party_affiliations: "${p.party_id}" is not a party node`)
  checkDateOrder(`node ${n.id}`, n.party_affiliations)
  checkDateOrder(`node ${n.id}`, n.roles)
}

const edgeIds = new Set<string>()
for (const e of edges) {
  const at = `edge ${e.id}`
  if (edgeIds.has(e.id)) report(at, 'duplicate edge id') // invariant 7
  edgeIds.add(e.id)

  if (e.source_id === e.target_id) report(at, 'source and target are the same node') // 2

  const source = byId.get(e.source_id)
  const target = byId.get(e.target_id)
  if (!source) report(at, `source "${e.source_id}" is not in nodes.json`) // 3
  if (!target) report(at, `target "${e.target_id}" is not in nodes.json`)

  if (e.evidence_tier === 'T1' && !e.evidence.some((ev) => ev.source_type === 'official_record'))
    report(at, 'T1 needs at least one official_record source') // 4
  if (e.evidence_tier === 'T2' && e.evidence.length < 2)
    report(at, 'T2 needs at least two independent sources') // 5

  const symmetric = SYMMETRIC_RELATION_TYPES.has(e.relation_type)
  if (!e.directed && !symmetric) report(at, `${e.relation_type} must be directed`) // 6
  if (e.directed && symmetric) report(at, `${e.relation_type} is symmetric; set directed: false`)

  const rule = RELATION_ENDPOINT_RULES[e.relation_type]
  if (rule?.source && source && source.entity_type !== rule.source)
    report(at, `${e.relation_type} source must be a ${rule.source}, got ${source.entity_type}`)
  if (rule?.target && target && target.entity_type !== rule.target)
    report(at, `${e.relation_type} target must be a ${rule.target}, got ${target.entity_type}`)

  const isEducation = e.relation_type === 'educated_at'
  if (isEducation && !e.education) report(at, 'educated_at needs an education block')
  if (!isEducation && e.education) report(at, 'education block is only allowed on educated_at')

  checkDateOrder(at, [e])
}

if (problems.length) {
  console.error(`✗ ${problems.length} problem(s) in ${dataDir}\n`)
  for (const p of problems) console.error(`  • ${p}`)
  process.exit(1)
}
console.log(`✓ ${nodes.length} nodes, ${edges.length} edges — all checks pass`)

function checkDateOrder(at: string, items: Array<{ start: string | null; end: string | null }>) {
  for (const { start, end } of items)
    if (start && end && start > end) report(at, `start ${start} is after end ${end}`)
}

function label(raw: unknown): string {
  const id = typeof raw === 'object' && raw !== null && 'id' in raw ? raw.id : undefined
  return typeof id === 'string' ? `(${id})` : ''
}

function fmt(issue: { path: (string | number)[]; message: string }): string {
  return issue.path.length ? `${issue.path.join('.')}: ${issue.message}` : issue.message
}
