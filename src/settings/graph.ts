import type { EvidenceTier } from '../schema/index'

/**
 * Tunable numbers for the graph's layout and look. All [J] (judgement), tuned
 * by eye so the 54 seed nodes fit a 1280×800 window with readable labels.
 */
export const GRAPH_SETTINGS = {
  forces: {
    // Tightened from 140 / -650 / 22 (tuned for 20 nodes) when the data
    // reached 54 nodes and the fitted view shrank labels below legibility.
    linkDistance: 100, // px between linked nodes at rest
    chargeStrength: -420, // negative = nodes push apart
    collidePadding: 16, // px kept clear around each node; leaves room for its label
    // Pull toward the middle so loosely connected nodes don't drift off-canvas.
    // Raised from 0.04 when the data grew from 20 to 54 nodes.
    centerPull: 0.08,
  },
  zoom: { min: 0.3, max: 4 },
  fit: {
    // Fit the view once the layout's energy (alpha) drops below this; at the
    // default decay that's about two seconds in, when nodes have mostly
    // stopped moving.
    atAlpha: 0.05,
    padding: 24, // screen px kept clear around the fitted graph
    labelRoom: 30, // screen px allowed for a name label beside or below its node
  },
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
    // A node whose edges are all filtered out fades to this instead of vanishing.
    strandedOpacity: 0.3,
    // Gap between parallel edges joining the same two nodes.
    parallelSpacingPx: 22,
    // Width of the invisible stroke that catches clicks on an edge.
    edgeHitPx: 12,
    // Name labels: size at 100% zoom, and the smallest they may appear on
    // screen when zoomed out (they grow in graph units to stay readable).
    label: {
      person: { fontPx: 11.5, minScreenPx: 10.5 },
      institution: { fontPx: 10, minScreenPx: 9 },
    },
  },
}
