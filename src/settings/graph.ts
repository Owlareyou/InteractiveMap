/**
 * Tunable numbers for the graph's layout. All [J] (judgement): picked to make
 * ~20 nodes settle comfortably at 1280×800. Tune by eye.
 */
export const GRAPH_SETTINGS = {
  forces: {
    linkDistance: 110, // px between linked nodes at rest
    chargeStrength: -520, // negative = nodes push apart
    collidePadding: 22, // px kept clear around each node; leaves room for its label
    // Weak pull toward the middle so unconnected nodes don't drift off-canvas.
    centerPull: 0.04,
  },
  zoom: { min: 0.3, max: 4 },
  nodeRadiusPx: 8,
}
