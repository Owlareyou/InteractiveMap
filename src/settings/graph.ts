import type { EvidenceTier } from '../schema/index'

/**
 * Tunable numbers for the graph's layout and look. All [J] (judgement): picked
 * to make ~20 nodes settle comfortably at 1280×800. Tune by eye.
 */
export const GRAPH_SETTINGS = {
  forces: {
    linkDistance: 140, // px between linked nodes at rest
    chargeStrength: -800, // negative = nodes push apart
    collidePadding: 22, // px kept clear around each node; leaves room for its label
    // Weak pull toward the middle so unconnected nodes don't drift off-canvas.
    centerPull: 0.04,
  },
  zoom: { min: 0.3, max: 4 },
  visual: {
    // Stretched across the weights actually on screen, so small differences
    // in weight stay visible (see docs/decisions/edge-weight.md).
    edgeWidthPx: { min: 1.5, max: 6 },
    // Area scales with weighted degree.
    nodeRadiusPx: { min: 6, max: 20 },
    // §7: T1 solid, T2 solid (thinner via weight, not style), T3 dashed,
    // T4 dotted + faded.
    tierDash: { T1: null, T2: null, T3: '6 4', T4: '1.5 4' } satisfies Record<EvidenceTier, string | null>,
    t4Opacity: 0.45,
    // Hovering a node fades everything outside its 1-hop neighbourhood to this.
    dimOpacity: 0.12,
    // Gap between parallel edges joining the same two nodes.
    parallelSpacingPx: 22,
  },
}
