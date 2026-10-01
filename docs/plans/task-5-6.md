# Tasks 5 + 6 plan — the graph, then what it means

Status: **built** (2026-10-01). Jing chose option (a): five `member_of` edges were added, with receipts in `docs/seed-verification.md`. Labels are approved as proposed. The two tasks get separate commits, so each can
be reviewed on its own.

## Task 5: graph on screen

**You'll see:** the 20 nodes and 23 edges as a force-directed graph in the
middle panel. You can drag nodes (a node stays pinned while held and is
released on drop), zoom with the scroll wheel, and pan by dragging the
background. Everything is one plain colour, and the side panels stay as
placeholders.

| File | Contents |
|---|---|
| `src/lib/dataSource.ts` | `loadGraph(): Promise<{ nodes, edges }>`. The **only** file that touches `data/`. It parses the JSON with the zod schemas, so bad data fails loudly in the browser too. Phase 2 swaps this one file for an API |
| `src/settings/graph.ts` | Force strengths, link distance and collision padding, tagged [J] like the weight settings |
| `src/lib/simulation.ts` | Builds the d3-force simulation: `forceLink`, `forceManyBody`, `forceCenter` and `forceCollide` (all four required by §7), plus a weak pull toward the centre so unconnected nodes don't drift off-canvas |
| `src/components/Graph.tsx` | SVG rendered by React. The simulation lives in a ref and is created once; each tick redraws positions. Uses d3-drag on nodes, d3-zoom on the canvas, and resizes with its panel |
| `src/App.tsx` | Loads the graph, computes each edge's weight against **today's date**, and shows "loading…" and error states. Replaces the middle placeholder |

## Task 6: visual encoding

**You'll see:** the graph start to carry meaning.

| Encoding | Rule | Source |
|---|---|---|
| Edge colour | Valence: blue = positive, grey = neutral, orange = negative. These are the colour-blind-safe tokens already in `tokens.css` | §7 |
| Edge line style | T1 solid · T2 solid · T3 dashed · T4 dotted and faded | §7 |
| Edge width | `computeEdgeWeight()`, stretched across the actual range of visible weights (1.5–6 px), so 0.48 vs 0.81 is clearly visible | §7, Task 4 note |
| Arrowheads | Directed edges only, coloured to match the line, ending at the node's rim | §7 |
| Parallel edges | Two edges between the same pair (Ma → Xi 2015 and 2024) curve apart instead of overlapping | Added: otherwise one hides the other |
| Node size | Weighted degree (sum of incident edge weights), area-scaled so big nodes don't overwhelm | §7 |
| Node colour | Temporary: by entity type (person / party / school). Task 7 replaces this with the grouping selector | Placeholder |
| Hover | Hovering a node highlights it and its direct neighbours and dims the rest | §7 |
| Labels | Chinese name under each node; English name in the hover tooltip | Proposed |
| Legend | A small key in the left sidebar: the three valence colours and four line styles | Added: the graph is unreadable without it |

| File | Contents |
|---|---|
| `src/lib/encoding.ts` | Pure functions: width scale, radius scale, dash pattern per tier, curve offset for parallel edges |
| `src/settings/graph.ts` | Adds the visual numbers (px ranges, dash patterns, T4 opacity, dim level), tagged [J] |
| `src/styles/tokens.css` | Node-type colour tokens for light and dark mode |
| `src/components/Graph.tsx` | Applies the encodings, arrow markers and hover |
| `src/components/Legend.tsx` | The sidebar key |

### One deviation, flagged per §0

§7 asks for T2 lines to be "solid thinner". The weight already makes T2
thinner, because its confidence is 0.85 against T1's 0.95. Shrinking T2 again
by style would count the same thing twice, so T2 differs from T1 by width only.

## Questions before building

1. **DPP and CCP will float alone.** Party membership is stored on each
   person's node, not as edges. The only `member_of` edge is Hung → KMT, so DPP
   and CCP have no lines at all. Options:
   - **(a)** Add `member_of` edges for the other five figures, sourced the same
     way as the education records (draft, null URL and quote). *Recommended:*
     the facts are already in the data, and this just makes them visible.
   - **(b)** Leave them floating. It's honest to the brief's seed list, but
     looks odd.
2. **Labels:** Chinese on the graph and English on hover, OK?

## Verify

- `npm run typecheck`, `npm test` and `npm run build` pass.
- `npm run dev`, then check by eye: the graph settles inside the panel, drag
  and zoom work, and the two Ma–Xi lines are both visible. Also check that
  arrows point the right way (Lai → Tsai for `appointed_by`), that hover dims
  unrelated nodes, and that the graph works in both light and dark mode.
