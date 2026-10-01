import { EntityType, RELATION_LAYER_MAP, type Edge, type Node } from '../schema/index'
import { PRC_REGION_WEIGHT, PRC_REGIONS } from '../settings/china'
import { ENGAGEMENT_SETTINGS, FORMER_ROLE_RULES, ROLE_RULES, type RoleKey } from '../settings/grouping'
import { DEFAULT_WEIGHT_SETTINGS } from '../settings/weight'
import { ENTITY_TYPE_LABEL, type Label } from './labels'

/**
 * The grouping registry (§4.5). Each dimension maps a node to a group key,
 * and lists every key it can return so the legend can be generated from it.
 * Colour is looked up at render time and never touches the simulation.
 */

export type GraphContext = {
  nodesById: ReadonlyMap<string, Node>
  incident: ReadonlyMap<string, readonly Edge[]> // every edge touching each node
}

export type Group = Label & { key: string; colour: string }

export type GroupingId = 'party' | 'entity_type' | 'role_type' | 'cross_strait_engagement'

export type GroupingDimension = {
  id: GroupingId
  label_zh: string
  label_en: string
  accessor: (node: Node, ctx: GraphContext) => string
  groups: (ctx: GraphContext) => Group[] // legend order
  note?: Label // how the dimension is derived, shown under the legend
}

export function buildContext(nodes: Node[], edges: Edge[]): GraphContext {
  const incident = new Map<string, Edge[]>()
  for (const e of edges)
    for (const id of [e.source_id, e.target_id]) incident.set(id, [...(incident.get(id) ?? []), e])
  return { nodesById: new Map(nodes.map((n) => [n.id, n])), incident }
}

// Shared by every dimension. "None" means the data records nothing; "n/a"
// means the question doesn't apply to this kind of node (a school's party).
const NONE = 'none'
const NA = 'n_a'
const NONE_GROUP: Group = { key: NONE, zh: '無紀錄', en: 'None recorded', colour: 'var(--group-none)' }
const NA_GROUP: Group = { key: NA, zh: '不適用', en: 'Not applicable', colour: 'var(--group-na)' }

// ── party ────────────────────────────────────────────────────────────────

// Conventional colours, chosen by Jing. Any party not listed gets the
// shared "other party" colour; none is privileged by this table.
const PARTY_COLOUR: Readonly<Record<string, string>> = {
  kmt: 'var(--party-kmt)',
  dpp: 'var(--party-dpp)',
  ccp: 'var(--party-ccp)',
  tpp: 'var(--party-tpp)',
}

export function partyOf(node: Node): string {
  if (node.entity_type === 'party') return node.id
  if (node.entity_type !== 'person') return NA
  const current = node.party_affiliations.find((p) => p.end === null)
  if (current) return current.party_id
  // Partial dates are fixed-width, so they sort as strings.
  const latest = [...node.party_affiliations].sort((a, b) => (b.end ?? '').localeCompare(a.end ?? ''))[0]
  return latest?.party_id ?? NONE
}

const party: GroupingDimension = {
  id: 'party',
  label_zh: '政黨',
  label_en: 'Party',
  accessor: partyOf,
  groups: (ctx) => [
    ...[...ctx.nodesById.values()]
      .filter((n) => n.entity_type === 'party')
      .map((n) => ({ key: n.id, zh: n.name_zh, en: n.name_en, colour: PARTY_COLOUR[n.id] ?? 'var(--party-other)' })),
    NONE_GROUP,
    NA_GROUP,
  ],
  note: { zh: '現任黨籍；無則取最近一次', en: 'Current party, otherwise the most recent' },
}

// ── entity type ──────────────────────────────────────────────────────────

const entityType: GroupingDimension = {
  id: 'entity_type',
  label_zh: '類型',
  label_en: 'Entity type',
  accessor: (node) => node.entity_type,
  groups: () =>
    EntityType.options.map((t) => ({ key: t, ...ENTITY_TYPE_LABEL[t], colour: `var(--entity-${t.replace('_', '-')})` })),
}

// ── role type ────────────────────────────────────────────────────────────

const ROLE_GROUPS: ReadonlyArray<Label & { key: RoleKey }> = [
  { key: 'head_of_state', zh: '元首', en: 'Head of state' },
  { key: 'former_president', zh: '前總統', en: 'Former president' },
  { key: 'official', zh: '政務官', en: 'Official' },
  { key: 'party_leadership', zh: '黨務領導', en: 'Party leadership' },
  { key: 'legislator', zh: '立法委員', en: 'Legislator' },
  { key: 'local_executive', zh: '地方首長', en: 'Local executive' },
  { key: 'prc_leadership', zh: '中共領導人', en: 'PRC leadership' },
  { key: 'business_media', zh: '企業／媒體', en: 'Business / media' },
]

export function roleTypeOf(node: Node): string {
  if (node.entity_type !== 'person') return NA
  const match = (rules: typeof ROLE_RULES, ended: boolean) => {
    const titles = node.roles.filter((r) => (r.end !== null) === ended).map((r) => r.title_zh)
    return rules.find((r) => titles.some((t) => r.keywords.some((k) => t.includes(k))))?.key
  }
  return match(ROLE_RULES, false) ?? match(FORMER_ROLE_RULES, true) ?? NONE
}

const roleType: GroupingDimension = {
  id: 'role_type',
  label_zh: '職務',
  label_en: 'Role',
  accessor: roleTypeOf,
  groups: () => [
    ...ROLE_GROUPS.map((g) => ({ ...g, colour: `var(--role-${g.key.replaceAll('_', '-')})` })),
    { ...NONE_GROUP, zh: '無現任職務', en: 'No current role' },
    NA_GROUP,
  ],
  note: { zh: '依現任職稱關鍵字判定；卸任總統另列', en: 'From keywords in current role titles; former presidents shown apart' },
}

// ── cross-strait engagement (spec decisions 9, 14, 18) ───────────────────

export type EngagementBucket = 'none' | 'low' | 'medium' | 'high' | 'prc'

export type Contribution = {
  edge: Edge
  kind: 'cross_strait' | 'prc_education'
  amount: number
  undated: boolean // PRC study with no dates, counted under countUndatedPrcEducation
}

export type Engagement = {
  bucket: EngagementBucket
  score: number
  contributions: Contribution[]
  // PRC-region study left out because it ended before the cutoff (or is
  // undated while undated study is switched off). Listed so the drawer can
  // say why it didn't count.
  excluded: Edge[]
}

/**
 * Derived at render time from incident edges, never stored (§4.5). One rule
 * for every party: each cross-strait edge adds its tier's confidence, and so
 * does each post-1949 study at an institution in a PRC region (scaled by the
 * region's weight). Nodes based in a PRC region get their own bucket.
 */
export function engagementOf(
  node: Node,
  ctx: GraphContext,
  settings = ENGAGEMENT_SETTINGS,
  tierConfidence = DEFAULT_WEIGHT_SETTINGS.confidence.tier,
): Engagement {
  const contributions: Contribution[] = []
  const excluded: Edge[] = []

  for (const edge of ctx.incident.get(node.id) ?? []) {
    const confidence = tierConfidence[edge.evidence_tier]
    if (RELATION_LAYER_MAP[edge.relation_type] === 'cross_strait') {
      contributions.push({ edge, kind: 'cross_strait', amount: confidence, undated: false })
      continue
    }
    if (edge.relation_type !== 'educated_at' || edge.source_id !== node.id) continue
    const country = ctx.nodesById.get(edge.target_id)?.country ?? null
    const regionWeight = country === null ? undefined : PRC_REGION_WEIGHT[country]
    if (regionWeight === undefined) continue

    const date = edge.end ?? edge.start
    const counts = date === null ? settings.countUndatedPrcEducation : date >= settings.prcEducationCutoff
    if (counts)
      contributions.push({ edge, kind: 'prc_education', amount: confidence * regionWeight, undated: date === null })
    else excluded.push(edge)
  }

  const score = contributions.reduce((sum, c) => sum + c.amount, 0)
  return { bucket: bucketOf(node, score, settings), score, contributions, excluded }
}

function bucketOf(node: Node, score: number, settings: typeof ENGAGEMENT_SETTINGS): EngagementBucket {
  if (node.country !== null && PRC_REGIONS.has(node.country)) return 'prc'
  if (score <= 0) return 'none'
  if (score < settings.thresholds.medium) return 'low'
  if (score < settings.thresholds.high) return 'medium'
  return 'high'
}

const { medium, high } = ENGAGEMENT_SETTINGS.thresholds

const engagement: GroupingDimension = {
  id: 'cross_strait_engagement',
  label_zh: '兩岸往來程度',
  label_en: 'Cross-strait engagement',
  accessor: (node, ctx) => engagementOf(node, ctx).bucket,
  groups: () => [
    { key: 'none', zh: '無', en: 'None', colour: 'var(--engagement-none)' },
    { key: 'low', zh: `低（< ${medium}）`, en: `Low (< ${medium})`, colour: 'var(--engagement-low)' },
    { key: 'medium', zh: `中（< ${high}）`, en: `Medium (< ${high})`, colour: 'var(--engagement-medium)' },
    { key: 'high', zh: `高（≥ ${high}）`, en: `High (≥ ${high})`, colour: 'var(--engagement-high)' },
    { key: 'prc', zh: '中國（含港澳）本身，不計分', en: 'Based in the PRC, not scored', colour: 'var(--engagement-prc)' },
  ],
  note: {
    zh: '分數＝兩岸層關係的證據等級信心值加總，加上1949年10月後在中國（含港澳）就學',
    en: 'Score = evidence-tier confidence summed over cross-strait ties, plus study in the PRC after Oct 1949',
  },
}

export const GROUPING_DIMENSIONS: readonly GroupingDimension[] = [party, entityType, roleType, engagement]

export const DEFAULT_GROUPING: GroupingId = 'party'

export function dimensionById(id: GroupingId): GroupingDimension {
  return GROUPING_DIMENSIONS.find((d) => d.id === id) ?? party
}
