import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { EdgeSchema, NodeSchema, type Edge, type Node } from '../schema/index'
import { DEFAULT_WEIGHT_SETTINGS } from '../settings/weight'
import { buildContext, engagementOf, GROUPING_DIMENSIONS, roleTypeOf } from './grouping'

const tier = DEFAULT_WEIGHT_SETTINGS.confidence.tier

const node = (id: string, patch: Partial<Node> = {}): Node => ({
  id,
  wikidata_qid: null,
  name_zh: id,
  name_en: id,
  aliases: [],
  entity_type: 'person',
  country: 'TW',
  party_affiliations: [],
  roles: [],
  tags: [],
  bio_short_zh: null,
  bio_short_en: null,
  last_updated: '2026-10-01',
  ...patch,
})

let seq = 0
const edge = (source_id: string, target_id: string, patch: Partial<Edge> = {}): Edge => ({
  id: `e${seq++}`,
  source_id,
  target_id,
  relation_type: 'met_officially_with',
  temporal_scope: 'event',
  valence: 'positive',
  evidence_tier: 'T1',
  directed: true,
  start: '2020',
  end: null,
  status: 'historical',
  evidence: [{ source_url: null, source_name: 'X', source_type: 'official_record', published_date: null, quote: null, retrieved_date: null }],
  review_status: 'draft',
  notes: null,
  education: null,
  ...patch,
})

const study = (person: string, school: string, start: string | null, end: string | null) =>
  edge(person, school, {
    relation_type: 'educated_at',
    temporal_scope: 'property',
    valence: 'neutral',
    start,
    end,
    education: { stage: 'master', degree: null, field: null },
  })

const tw = node('tw-person')
const prcOfficial = node('prc-official', { country: 'CN' })
const prcSchool = node('prc-school', { entity_type: 'institution', country: 'CN' })
const hkSchool = node('hk-school', { entity_type: 'institution', country: 'HK' })
const usSchool = node('us-school', { entity_type: 'institution', country: 'US' })
const nodes = [tw, prcOfficial, prcSchool, hkSchool, usSchool]

test('a cross-strait edge adds its tier confidence to both ends, other layers add nothing', () => {
  const ctx = buildContext(nodes, [
    edge('tw-person', 'prc-official', { evidence_tier: 'T2' }),
    edge('tw-person', 'prc-official', { relation_type: 'opposes', valence: 'negative', temporal_scope: 'state' }),
  ])
  const e = engagementOf(tw, ctx)
  assert.equal(e.score, tier.T2)
  assert.equal(e.contributions.length, 1)
  assert.equal(engagementOf(prcOfficial, ctx).score, tier.T2)
})

test('PRC-region study counts from 1949-10-01; earlier study and non-PRC study do not', () => {
  const ctx = buildContext(nodes, [
    study('tw-person', 'prc-school', '1940', '1944'), // under the ROC
    study('tw-person', 'prc-school', '2005', '2007'),
    study('tw-person', 'hk-school', null, '2010'),
    study('tw-person', 'us-school', '2001', '2003'),
  ])
  const e = engagementOf(tw, ctx)
  assert.equal(e.contributions.length, 2)
  assert.equal(e.excluded.length, 1)
  assert.equal(e.excluded[0]?.start, '1940')
  assert.equal(e.score, 2 * tier.T1)
})

test('undated PRC study counts only while the setting allows it, and is flagged', () => {
  const ctx = buildContext(nodes, [study('tw-person', 'prc-school', null, null)])
  const on = engagementOf(tw, ctx)
  assert.equal(on.contributions[0]?.undated, true)
  assert.equal(on.score, tier.T1)

  const settings = { thresholds: { medium: 1, high: 3 }, prcEducationCutoff: '1949-10-01', countUndatedPrcEducation: false }
  const off = engagementOf(tw, ctx, settings)
  assert.equal(off.score, 0)
  assert.equal(off.excluded.length, 1)
})

test('buckets follow the thresholds; PRC-based nodes get their own bucket whatever their score', () => {
  const meetings = (n: number) => Array.from({ length: n }, () => edge('tw-person', 'prc-official'))
  const bucket = (edges: Edge[], who = tw) => engagementOf(who, buildContext(nodes, edges)).bucket
  assert.equal(bucket([]), 'none')
  assert.equal(bucket(meetings(1)), 'low') // 0.95
  assert.equal(bucket(meetings(2)), 'medium') // 1.9
  assert.equal(bucket(meetings(4)), 'high') // 3.8
  assert.equal(bucket(meetings(4), prcOfficial), 'prc')
})

test('the score ignores party: the same ties give the same score for any affiliation', () => {
  const edges = [edge('tw-person', 'prc-official'), study('tw-person', 'prc-school', '2001', '2003')]
  const scores = ['kmt', 'dpp', 'tpp', null].map((party) => {
    const who = node('tw-person', { party_affiliations: party ? [{ party_id: party, start: null, end: null }] : [] })
    return engagementOf(who, buildContext([who, prcOfficial, prcSchool], edges)).score
  })
  assert.equal(new Set(scores).size, 1)
})

test('role rules: the more specific title wins', () => {
  const role = (title_zh: string, end: string | null = null) => ({ title_zh, title_en: title_zh, org_id: null, start: null, end })
  assert.equal(roleTypeOf(node('a', { roles: [role('立法院長')] })), 'legislator')
  assert.equal(roleTypeOf(node('a', { roles: [role('國家主席')] })), 'prc_leadership')
  assert.equal(roleTypeOf(node('a', { roles: [role('中國國民黨主席')] })), 'party_leadership')
  assert.equal(roleTypeOf(node('a', { roles: [role('中華民國總統', '2016')] })), 'former_president')
  assert.equal(roleTypeOf(node('a', { roles: [role('中華民國副總統', '2000')] })), 'none') // former VP isn't
  assert.equal(roleTypeOf(node('a', { roles: [role('中華民國總統', '2016'), role('立法委員')] })), 'legislator') // current wins
  assert.equal(roleTypeOf(node('a', { entity_type: 'institution' })), 'n_a')
})

test('every seed node lands in a group its dimension lists', () => {
  const read = (f: string): unknown[] => JSON.parse(readFileSync(f, 'utf8'))
  const seedNodes = read('data/nodes.json').map((r) => NodeSchema.parse(r))
  const ctx = buildContext(seedNodes, read('data/edges.json').map((r) => EdgeSchema.parse(r)))
  for (const d of GROUPING_DIMENSIONS) {
    const keys = new Set(d.groups(ctx).map((g) => g.key))
    for (const n of seedNodes) assert.ok(keys.has(d.accessor(n, ctx)), `${d.id}: ${n.id} → "${d.accessor(n, ctx)}" not listed`)
  }
})
