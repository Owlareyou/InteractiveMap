import type { Edge, EntityType, EvidenceTier, Valence } from '../schema/index'
import { GRAPH_SETTINGS } from '../settings/graph'

type Range = { min: number; max: number }
type Point = { x: number; y: number }

const visual = GRAPH_SETTINGS.visual

// Colours resolve to tokens in src/styles/tokens.css, never hex.
export const VALENCE_COLOR: Record<Valence, string> = {
  positive: 'var(--valence-positive)',
  neutral: 'var(--valence-neutral)',
  negative: 'var(--valence-negative)',
}

// Temporary until the grouping registry (Task 7) takes over node colour.
export const ENTITY_COLOR: Record<EntityType, string> = {
  person: 'var(--node-person)',
  party: 'var(--node-party)',
  institution: 'var(--node-institution)',
  government_body: 'var(--node-other)',
  company: 'var(--node-other)',
  media_org: 'var(--node-other)',
  association: 'var(--node-other)',
}

export function scaleLinear(value: number, domain: Range, range: Range): number {
  const span = domain.max - domain.min
  if (span <= 0) return (range.min + range.max) / 2
  const t = Math.min(1, Math.max(0, (value - domain.min) / span))
  return range.min + t * (range.max - range.min)
}

export function rangeOf(values: Iterable<number>): Range {
  let min = Infinity
  let max = -Infinity
  for (const v of values) {
    min = Math.min(min, v)
    max = Math.max(max, v)
  }
  return min <= max ? { min, max } : { min: 0, max: 0 }
}

export function edgeWidth(weight: number, domain: Range): number {
  return scaleLinear(weight, domain, visual.edgeWidthPx)
}

// Area rather than radius tracks weighted degree, so a node with twice the
// ties doesn't look four times as big.
export function nodeRadius(weightedDegree: number, maxDegree: number): number {
  const { min, max } = visual.nodeRadiusPx
  if (maxDegree <= 0) return min
  return min + (max - min) * Math.sqrt(weightedDegree / maxDegree)
}

export function weightedDegrees(
  edges: Edge[],
  weights: ReadonlyMap<string, number>,
): Map<string, number> {
  const degree = new Map<string, number>()
  for (const e of edges) {
    const w = weights.get(e.id) ?? 0
    degree.set(e.source_id, (degree.get(e.source_id) ?? 0) + w)
    degree.set(e.target_id, (degree.get(e.target_id) ?? 0) + w)
  }
  return degree
}

export function tierDash(tier: EvidenceTier): string | undefined {
  return visual.tierDash[tier] ?? undefined
}

export function tierOpacity(tier: EvidenceTier): number {
  return tier === 'T4' ? visual.t4Opacity : 1
}

/**
 * Sideways offset for each edge so that several edges between the same pair
 * fan out instead of drawing on top of each other. A lone edge gets 0.
 */
export function parallelOffsets(edges: Edge[]): Map<string, number> {
  const groups = new Map<string, Edge[]>()
  for (const e of edges) {
    const key = [e.source_id, e.target_id].sort().join('|')
    groups.set(key, [...(groups.get(key) ?? []), e])
  }
  const offsets = new Map<string, number>()
  for (const group of groups.values()) {
    group.forEach((e, i) => {
      const offset = (i - (group.length - 1) / 2) * visual.parallelSpacingPx
      // The perpendicular flips with direction; flipping the sign too keeps
      // A→B and B→A edges on the sides they were assigned.
      offsets.set(e.id, e.source_id < e.target_id ? offset : -offset)
    })
  }
  return offsets
}

/**
 * Path from rim to rim (straight, or a gentle curve when offset ≠ 0), and an
 * arrowhead polygon whose tip touches the target's rim. Arrowheads scale with
 * the line so thick lines don't poke out past them.
 */
export function edgeGeometry(
  s: Point & { r: number },
  t: Point & { r: number },
  offset: number,
  width: number,
  directed: boolean,
): { d: string; arrow: string | null } {
  const dx = t.x - s.x
  const dy = t.y - s.y
  const len = Math.hypot(dx, dy) || 1
  // Control point at twice the offset puts the curve's apex at the offset.
  const c = { x: (s.x + t.x) / 2 - (dy / len) * offset * 2, y: (s.y + t.y) / 2 + (dx / len) * offset * 2 }

  const su = unit(c.x - s.x, c.y - s.y)
  const tu = unit(t.x - c.x, t.y - c.y)
  const start = { x: s.x + su.x * s.r, y: s.y + su.y * s.r }
  const tip = { x: t.x - tu.x * t.r, y: t.y - tu.y * t.r }

  const arrowLen = 5 + width * 1.6
  const halfWidth = 2.5 + width * 0.9
  const end = directed ? { x: tip.x - tu.x * arrowLen, y: tip.y - tu.y * arrowLen } : tip

  const d = offset === 0 ? `M${start.x},${start.y}L${end.x},${end.y}` : `M${start.x},${start.y}Q${c.x},${c.y} ${end.x},${end.y}`

  if (!directed) return { d, arrow: null }
  const px = -tu.y * halfWidth
  const py = tu.x * halfWidth
  const arrow = `${tip.x},${tip.y} ${end.x + px},${end.y + py} ${end.x - px},${end.y - py}`
  return { d, arrow }
}

function unit(x: number, y: number): Point {
  const l = Math.hypot(x, y) || 1
  return { x: x / l, y: y / l }
}
