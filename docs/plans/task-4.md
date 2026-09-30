# Task 4 plan — edge weight (revised)

Status: **built** (v2). Changes after review, requested by Jing on 2026-09-30:

- Added a per-relation-type **intensity** factor with mock numbers, so
  official meetings outrank shared education.
- **Temporal scope is the weakest factor**, per the brief: property 1.0,
  state 0.95, event 0.9.
- The reasoning is in `docs/decisions/edge-weight.md`, and the research
  receipts in `docs/research/2026-09-30-edge-weight.md`.

The text below is the pre-review plan, kept for the record.

## What it does

Every edge gets a strength score from 0 to 1, which later sets its line
thickness (Task 6). The score is calculated from the evidence and never typed in
by hand.

## The formula

```
weight = confidence × scope × recency
```

- **Confidence** (is the tie real?): a base score from the tier, anchored to
  US intelligence probability bands (ICD 203): T1 0.95, T2 0.85, T3 0.65,
  T4 0.30.
  - Each distinct extra source removes 40% of the remaining doubt.
  - T4 never goes above 0.50.
- **Scope:** property 1.0, state 0.9, event 0.8. Kept deliberately weak,
  because permanence isn't strength.
- **Recency:** exponential fade with an 8-year half-life (two presidential
  terms) and a floor of 0.75, so old ties stay visible.
  - Ongoing and permanent ties don't fade.
  - Undated ties get the floor.

Seed weights range from 0.57 to 0.95, and T4 examples score about 0.2–0.36.

## Files

| File | Contents |
|---|---|
| `src/settings/weight.ts` | **Your settings place.** Every number, each with a one-line reason and a pointer to the decision note. Nothing else lives here |
| `src/lib/weight.ts` | `computeEdgeWeight(edge, { referenceDate, settings? })` and `weightBreakdown()` (returns confidence, scope and recency separately, for the Task 9 drawer). Pure: never reads the clock |
| `src/lib/weight.test.ts` | About 9 `node:test` checks: same input gives the same output; 0–1 range on all seed edges; T1 > T2 > T3 > T4; duplicate source names count once; T4 never exceeds its cap; property/ongoing edges don't fade; older events fade but never go below the floor; undated edges get the floor; the input isn't modified |
| `docs/decisions/edge-weight.md` | The why, with sources (already written) |
| `package.json` | `"test": "tsx --test src/lib/*.test.ts"` |
| `README.md` | Progress row, `npm test`, and a pointer to the decision note |

## Deviations from the brief (flagged, per §0)

- §4.4 says recency contributes least. Here recency swings slightly more than
  scope, and the reason is in the decision note, §3. Swapping two numbers in
  settings restores the brief's order if you prefer it.

## Verify

- `npm test` and `npm run typecheck` pass.
