/**
 * npm run coverage
 *
 * Prints where the data is thin, for the research loop in
 * docs/research/QUEUE.md. Run it at the start and end of every iteration and
 * paste the summary line into NOTES.md.
 *
 * Reports what has been *looked for*, not who has more ties. A party with few
 * lines may simply not have been researched yet.
 */
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { RELATION_LAYER_MAP, RelationType } from '../src/schema/index'
import type { Edge, Node } from '../src/schema/index'

const load = <T>(file: string): T[] =>
  JSON.parse(readFileSync(resolve('data', file), 'utf8')) as T[]
const nodes = load<Node>('nodes.json')
const edges = load<Edge>('edges.json')
const byId = new Map(nodes.map((n) => [n.id, n]))

const tally = (keys: string[]) =>
  keys.reduce<Record<string, number>>((m, k) => ((m[k] = (m[k] ?? 0) + 1), m), {})
const parties = (n: Node | undefined) =>
  n?.entity_type === 'person' && n.party_affiliations.length
    ? [...new Set(n.party_affiliations.map((p) => p.party_id))]
    : n?.entity_type === 'person'
      ? ['none']
      : []

const people = nodes.filter((n) => n.entity_type === 'person')
const crossStrait = edges.filter((e) => RELATION_LAYER_MAP[e.relation_type] === 'cross_strait')
const evidence = edges.flatMap((e) => e.evidence)

console.log(`nodes ${nodes.length}, edges ${edges.length}, evidence ${evidence.length}\n`)

console.log('People by party (ever a member):', tally(people.flatMap((n) => parties(n))))
console.log(
  'Cross-strait edges by party of the Taiwan-side person:',
  tally(crossStrait.flatMap((e) => parties(byId.get(e.source_id)))),
)
console.log('Edges by layer:', tally(edges.map((e) => RELATION_LAYER_MAP[e.relation_type])))
console.log('Edges by tier:', tally(edges.map((e) => e.evidence_tier)))
console.log('Edges by review status:', tally(edges.map((e) => e.review_status)))

const used = new Set(edges.map((e) => e.relation_type))
console.log('\nRelation types never used:', RelationType.options.filter((t) => !used.has(t)).join(', '))

console.log('\nEvidence without source_url:', evidence.filter((v) => !v.source_url).length)
console.log('Evidence without quote:', evidence.filter((v) => !v.quote).length)
console.log('Nodes without wikidata_qid:', nodes.filter((n) => !n.wikidata_qid).length)
console.log('People without bio_short_zh:', people.filter((n) => !n.bio_short_zh).length)

const degree = tally(edges.flatMap((e) => [e.source_id, e.target_id]))
const thin = people.filter((n) => (degree[n.id] ?? 0) <= 1).map((n) => n.id)
console.log('People with ≤1 edge:', thin.join(', ') || 'none')
