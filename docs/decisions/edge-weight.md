# Why edge weight works the way it does

- **Settings (the numbers):** `src/settings/weight.ts`
- **Research receipts:** `docs/research/2026-09-30-edge-weight.md`
- **Code:** `src/lib/weight.ts`

This note records where each number came from, so later changes are made on
purpose and nobody treats a judgement call as a law. Each setting is tagged in
the settings file:

| Tag | Meaning |
|---|---|
| **[R] Researched** | Anchored in an established professional practice |
| **[J] Judgement** | Chosen by us, with the reason below. Tune when needed |
| **[M] Mock** | A placeholder, expected to change once seen on screen |

## History

| Date | Change |
|---|---|
| 2026-09-30 | v1 draft: additive 40/25/20/15 split, 10-year half-life, undated = 0.5. **All guesses, never built.** |
| 2026-09-30 | v2 (built): multiplicative, research-anchored. Adds a per-type intensity factor. Temporal scope is the weakest factor, per the brief. |

## The formula

```
weight = confidence × intensity × scope × recency
         └ is it real? ┘ └──── how strong / current is it? ────┘
```

The factors are multiplied, not added. Intelligence grading (NATO / Admiralty
Code) keeps "is the source reliable?" apart from "is the information true?" so
neither props up the other. Multiplying gives the same guarantee: a weakly
evidenced tie can't come out thick just because it's recent or permanent. v1
added the factors, which let a T4 allegation score above 0.6.

How far each factor can move the weight, from its lowest to its highest
setting:

| Factor | Range | Swing |
|---|---|---|
| Confidence (tier) | 0.30 – 0.95 | ×3.2 |
| Intensity (type) | 0.60 – 1.00 | ×1.7 |
| Recency | 0.75 – 1.00 | ×1.33 |
| Scope | 0.90 – 1.00 | ×1.11 (weakest) |

## Confidence: is the tie real?

- **Tier score** [R band, J point]: T1 0.95, T2 0.85, T3 0.65, T4 0.30.
  - Each is a point inside the matching ICD 203 probability band: almost
    certain, very likely, likely, unlikely.
  - T1 sits at the bottom of its band, because official records still contain
    errors.
- **Extra sources** [R method, J amount]: each *distinct* source beyond the
  tier's minimum removes 40% of the remaining doubt.
  - T2's minimum is two sources, because the validator already requires two.
  - Identical `source_name`s count once, to guard against circular reporting.
- **T4 cap 0.50** [J]: the top of ICD 203's "roughly even chance". Repeating
  an allegation doesn't make it true. It needs re-tiering with real evidence.

## Intensity: how strong is this kind of tie?

**[M] Mock numbers, 0.6–1.0.** Added in v2 to fix a real problem: with scope
alone, "went to the same university" (a permanent fact) out-weighed a
head-of-state meeting (a one-off event).

Tie-strength research (Granovetter; Marsden & Campbell 1984) names intensity
as a dimension of strength. Permanence is not.

Principles behind the mock values:
- **Same scale for every party.** Cross-strait types are pegged to their
  domestic counterparts. `met_officially_with` is 1.0 whoever meets whom.
  `made_prc_visit` (0.7) is on a par with `endorsed` (0.7).
- **Direct, personal and formal ties score highest:** spouse, official
  meeting, holding a PRC position (1.0), appointments and indictments (0.9).
- **Diffuse ties score lowest:** forums, exchanges, education, criticism
  (0.6).

These are the numbers most likely to change. Judge them on screen, not on
paper.

## Scope: permanent vs. ongoing vs. one-off

**[J] property 1.0, state 0.95, event 0.9.** This keeps the brief's order
(§4.4: property > state > event) and makes scope the weakest factor, as the
brief asks and as Jing confirmed on 2026-09-30.

## Recency: how long ago?

- **Shape** [R]: exponential fade, as in tie-decay network models (Ahmad,
  Porter et al.). The research settles the shape but not the speed.
- **Half-life 8 years** [J]: two Taiwanese presidential terms.
- **Floor 0.75** [J]: tie-decay models come from communication networks,
  where silence means drift. This map is an archive of documented ties, and a
  2015 meeting still matters politically. Old ties get thinner but never
  vanish.
- **What doesn't fade:** `property` edges, and `state` edges whose status is
  `active`.
- **Which date is used:** `end`, else `start`, else the newest evidence
  `published_date`. `2023` counts as mid-2023.
- **Undated → floor** [J]: if a missing date were scored generously, leaving
  a date out would make an old tie look fresh. v1 used 0.5, which was
  arbitrary.

## Seed weights (reference date 2026-09-30)

| Edge | Conf. | Intensity | Scope | Recency | Weight |
|---|---|---|---|---|---|
| `ma-xi-2024-beijing` | 0.95 | 1.00 | 0.90 | 0.95 | **0.81** |
| `hung-xi-2016` (2 sources) | 0.97 | 1.00 | 0.90 | 0.86 | **0.75** |
| `ma-xi-2015-singapore` | 0.95 | 1.00 | 0.90 | 0.85 | **0.72** |
| `lai-opposes-xi` (active) | 0.95 | 0.80 | 0.95 | 1.00 | **0.72** |
| `lai-appointed-by-tsai-2017` | 0.95 | 0.90 | 0.90 | 0.86 | **0.67** |
| `hung-member-of-kmt` | 0.95 | 0.70 | 1.00 | 1.00 | **0.66** |
| All 15 education edges | 0.95 | 0.60 | 1.00 | 1.00 | **0.57** |
| `hsia-prc-visits-2023` (T2) | 0.85 | 0.70 | 0.90 | 0.94 | **0.50** |
| `ma-opposes-tsai` (T2, undated) | 0.85 | 0.80 | 0.95 | 0.75 | **0.48** |

The official meetings now rank at the top, and education ranks near the
bottom.

**Worth watching:** Hsia's 2023 visits (0.50) score below the education
edges. Two things pull them down: they're T2 rather than T1, and a "visit" is
mock-rated weaker than a "meeting". If that feels wrong, raise
`made_prc_visit`.

## Still unsettled

- **No research basis yet:** the exact point inside each ICD 203 band, the
  40% corroboration step, the half-life and floor, the scope values, and all
  intensity values.
- **Revisit:** once the graph is on screen (Task 6), and again in Phase 2,
  when real data allows calibration.
- **Open research questions** are listed at the end of the research log.
