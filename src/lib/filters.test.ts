import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { EdgeSchema, NodeSchema } from '../schema/index'
import { DEFAULT_FILTERS, searchNodes, visibleEdgeIds } from './filters'

const read = (f: string): unknown[] => JSON.parse(readFileSync(f, 'utf8'))
const nodes = read('data/nodes.json').map((r) => NodeSchema.parse(r))
const edges = read('data/edges.json').map((r) => EdgeSchema.parse(r))
const weights = new Map(edges.map((e) => [e.id, 0.5]))

test('T4 edges are hidden by default, everything else is shown (§10)', () => {
  const visible = visibleEdgeIds(edges, weights, DEFAULT_FILTERS)
  for (const e of edges) assert.equal(visible.has(e.id), e.evidence_tier !== 'T4', e.id)
})

test('search matches Chinese name, English name and alias, ignoring case and 臺/台', () => {
  const ids = (q: string) => searchNodes(nodes, q).map((n) => n.id)
  assert.ok(ids('馬英九').includes('ma-ying-jeou'))
  assert.ok(ids('ying-JEOU').includes('ma-ying-jeou'))
  assert.ok(ids('國台辦').includes('taiwan-affairs-office')) // alias
  assert.ok(ids('台灣大學').includes('national-taiwan-university')) // stored as 臺灣
  assert.deepEqual(ids('   '), [])
  assert.deepEqual(ids('no-such-node'), [])
})
