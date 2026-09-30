import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { EdgeSchema, type Edge, type Evidence } from '../schema/index'
import { DEFAULT_WEIGHT_SETTINGS } from '../settings/weight'
import { computeEdgeWeight, weightBreakdown } from './weight'

const opts = { referenceDate: '2026-09-30' }

const ev = (source_name: string): Evidence => ({
  source_url: null,
  source_name,
  source_type: 'official_record',
  published_date: null,
  quote: null,
  retrieved_date: null,
})

const base: Edge = {
  id: 'test-edge',
  source_id: 'a',
  target_id: 'b',
  relation_type: 'met_officially_with',
  temporal_scope: 'event',
  valence: 'neutral',
  evidence_tier: 'T1',
  directed: true,
  start: '2020-01-01',
  end: null,
  status: 'historical',
  evidence: [ev('X')],
  review_status: 'draft',
  notes: null,
  education: null,
}
const edge = (patch: Partial<Edge>): Edge => ({ ...base, ...patch })

test('identical input gives identical output', () => {
  assert.equal(computeEdgeWeight(base, opts), computeEdgeWeight(structuredClone(base), opts))
})

test('does not modify the edge', () => {
  const frozen = Object.freeze(structuredClone(base))
  assert.doesNotThrow(() => computeEdgeWeight(frozen, opts))
})

test('every seed edge scores within 0..1', () => {
  const raw: unknown[] = JSON.parse(readFileSync('data/edges.json', 'utf8'))
  for (const r of raw) {
    const w = computeEdgeWeight(EdgeSchema.parse(r), opts)
    assert.ok(w >= 0 && w <= 1, `weight ${w} out of range`)
  }
})

test('tier order: T1 > T2 > T3 > T4', () => {
  const two = [ev('X'), ev('Y')]
  const w = (['T1', 'T2', 'T3', 'T4'] as const).map((t) =>
    computeEdgeWeight(edge({ evidence_tier: t, evidence: t === 'T2' ? two : [ev('X')] }), opts),
  )
  for (let i = 1; i < w.length; i++) assert.ok(w[i - 1]! > w[i]!, `tier ${i} not below tier ${i - 1}`)
})

test('extra distinct sources raise confidence; duplicate names count once', () => {
  const one = weightBreakdown(edge({ evidence_tier: 'T3' }), opts).confidence
  const two = weightBreakdown(edge({ evidence_tier: 'T3', evidence: [ev('X'), ev('Y')] }), opts).confidence
  const dup = weightBreakdown(edge({ evidence_tier: 'T3', evidence: [ev('X'), ev('X ')] }), opts).confidence
  assert.ok(two > one)
  assert.equal(dup, one)
})

test('T4 never exceeds its cap, however many outlets repeat it', () => {
  const many = ['A', 'B', 'C', 'D', 'E', 'F'].map(ev)
  const c = weightBreakdown(edge({ evidence_tier: 'T4', evidence: many }), opts).confidence
  assert.ok(c <= DEFAULT_WEIGHT_SETTINGS.confidence.t4Cap)
})

test('temporal scope is the weakest factor (smallest swing)', () => {
  const { scope, recency, confidence } = DEFAULT_WEIGHT_SETTINGS
  const swing = (xs: number[]) => Math.max(...xs) / Math.min(...xs)
  const scopeSwing = swing(Object.values(scope))
  assert.ok(scopeSwing < 1 / recency.floor, 'scope should swing less than recency')
  assert.ok(scopeSwing < swing(Object.values(confidence.tier)))
})

test('property and ongoing state edges do not fade', () => {
  const old = { start: '1970', end: '1972' }
  assert.equal(weightBreakdown(edge({ ...old, temporal_scope: 'property' }), opts).recency, 1)
  assert.equal(
    weightBreakdown(edge({ start: '1990', temporal_scope: 'state', status: 'active' }), opts).recency,
    1,
  )
})

test('older events fade but never below the floor; undated gets the floor', () => {
  const recent = weightBreakdown(edge({ start: '2025-06-01' }), opts).recency
  const old = weightBreakdown(edge({ start: '1950' }), opts).recency
  const undated = weightBreakdown(edge({ start: null }), opts).recency
  const floor = DEFAULT_WEIGHT_SETTINGS.recency.floor
  assert.ok(recent > old)
  assert.ok(old >= floor)
  assert.equal(undated, floor)
})

test('an official meeting outweighs a shared university', () => {
  const meeting = computeEdgeWeight(edge({ start: '2015-11-07' }), opts)
  const school = computeEdgeWeight(
    edge({
      relation_type: 'educated_at',
      temporal_scope: 'property',
      education: { stage: 'bachelor', degree: null, field: null },
    }),
    opts,
  )
  assert.ok(meeting > school)
})
