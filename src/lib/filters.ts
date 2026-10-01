import {
  EvidenceTier,
  RELATION_LAYER_MAP,
  RelationLayer,
  Valence,
  type Edge,
  type Node,
} from '../schema/index'

export type FilterState = {
  layers: Record<RelationLayer, boolean>
  tiers: Record<EvidenceTier, boolean>
  valences: Record<Valence, boolean>
  minWeight: number // 0..1, compared with computeEdgeWeight()
  query: string
}

const allOn = <K extends string>(keys: readonly K[]) => Object.fromEntries(keys.map((k) => [k, true])) as Record<K, boolean>

// §7: everything on, except T4, which records an allegation and must be
// switched on deliberately.
export const DEFAULT_FILTERS: FilterState = {
  layers: allOn(RelationLayer.options),
  tiers: { ...allOn(EvidenceTier.options), T4: false },
  valences: allOn(Valence.options),
  minWeight: 0,
  query: '',
}

/**
 * Which edges pass the filters. Filters only ever hide edges: the
 * simulation keeps running on the full graph so nodes stay where they are.
 */
export function visibleEdgeIds(
  edges: readonly Edge[],
  weights: ReadonlyMap<string, number>,
  f: FilterState,
): Set<string> {
  return new Set(
    edges
      .filter(
        (e) =>
          f.layers[RELATION_LAYER_MAP[e.relation_type]] &&
          f.tiers[e.evidence_tier] &&
          f.valences[e.valence] &&
          (weights.get(e.id) ?? 0) >= f.minWeight,
      )
      .map((e) => e.id),
  )
}

// Folds the differences a reader shouldn't have to type exactly: case,
// full-width Latin (NFKC), and 臺 / 台, which Taiwan uses interchangeably.
export function normalise(s: string): string {
  return s.normalize('NFKC').toLowerCase().replaceAll('臺', '台').trim()
}

/** Nodes whose Chinese name, English name or any alias contains the query. */
export function searchNodes(nodes: readonly Node[], query: string): Node[] {
  const q = normalise(query)
  if (!q) return []
  return nodes.filter((n) => [n.name_zh, n.name_en, ...n.aliases].some((name) => normalise(name).includes(q)))
}
