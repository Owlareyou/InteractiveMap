# 臺灣政治關係圖 — Taiwan Political Relationship Map

Phase 1: a local, offline, single-page prototype that validates the data model
described in `CLAUDE_CODE_PROMPT.md`. Throwaway quality by design — the goal is
to prove the schema renders and behaves correctly against hand-curated seed
data, not to ship.

The authoritative spec is `CLAUDE_CODE_PROMPT.md`. Where this README and the
brief disagree, the brief wins.

## Progress

Tasks come from §8 of the brief. Update this table when a task lands.

| # | Task | Status |
|---|---|---|
| 1 | Scaffold (Vite, React, TS, Tailwind, zod, d3 modules; three-region app shell) | ✅ Done — commit `8a1d844` |
| 2 | zod schemas in `src/schema/`, `scripts/validate-data.ts`, `npm run validate` | ✅ Done |
| 3 | Seed data `data/nodes.json`, `data/edges.json` (§6), validator passes | ✅ Done — see `docs/seed-verification.md` |
| 4 | `src/lib/weight.ts` + a few `node:test` assertions | ⏭ Next |
| 5 | `src/lib/dataSource.ts` + static force graph (drag, zoom) | Not started |
| 6 | Visual encoding: valence colour, tier stroke, weight width, arrows, radii | Not started |
| 7 | Grouping-dimension registry + selector | Not started |
| 8 | Filters: layer, tier (T4 off), valence, min weight, search | Not started |
| 9 | Detail drawer: node profile, edge evidence list | Not started |
| 10 | Polish: tokens, responsive, empty states, README schema guide | Not started |

The Task 2 plan and the reasoning behind decisions 5–11 are in
`docs/plans/task-2.md`.

## Requirements

- Node 20 or newer (developed on 23.1.0)
- npm 10+

`pnpm` is not installed on this machine, so npm is used throughout per §5's
"pnpm if available else npm". Substitute `pnpm` freely if you install it.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
```

| Script | Does |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Type-check, then production build to `dist/` |
| `npm run preview` | Serve the built output |
| `npm run typecheck` | `tsc --noEmit`, strict |
| `npm run validate` | Check `data/*.json` against the schema and invariants; exits 1 and lists every problem. `-- --data <dir>` checks another folder |

## Layout

```
data/       Hand-edited JSON — the source of truth. No database, by design (§3).
scripts/    Build-time tooling. Not shipped to the browser.
src/schema/ zod schemas; TS types are inferred from them, never hand-written.
src/lib/    Pure logic: edge weight, data loading, grouping accessors.
src/components/  React components. Presentation only.
src/styles/ Design tokens as CSS custom properties, then Tailwind.
```

All graph data loads through a single module, `src/lib/dataSource.ts`
(arriving in Task 5). Nothing else imports from `data/` directly, so Phase 2
can swap JSON for an API by editing one file.

## Editorial stance

This map is **structurally neutral**. Ties for every party are recorded under
identical rules. There is no field, default, or code path that privileges one
party's relationships over another's. If you find one, it's a bug — file it.

Two rules follow from that and are enforced rather than trusted:

- **Every edge carries at least one piece of evidence.** An edge with no source
  is invalid data and the validator rejects it (Task 2).
- **Derived values are computed, never hand-assigned.** Edge weight comes from
  a pure function of evidence tier, evidence count, temporal scope, and
  recency. Cross-strait engagement level is derived at render time from
  incident edges and is deliberately *not* stored on the node — storing it
  would let editorial judgement leak into the source of truth.

`T4` evidence records an *allegation that a tie exists*, not the tie itself.
T4 edges are hidden on first load and must be switched on deliberately.

## Language

Traditional Chinese (正體中文) only — in the UI, the data, and the source.
Simplified characters must not appear anywhere in this repository. UI chrome is
bilingual with zh-Hant primary and English secondary.

Fonts are system-only (PingFang TC, Noto Sans TC, Microsoft JhengHei). No
webfont is loaded, because a font request would be a runtime network call and
§3 forbids those.

## Spec decisions

Rulings that amend or clarify `CLAUDE_CODE_PROMPT.md`, recorded here so they
survive between tasks.

| # | Decision |
|---|---|
| 1 | Vite's entry `index.html` lives at the project root, per Vite's default. This replaced an unrelated demo page; recover it from commit `352e52d` if needed. |
| 2 | `wikidata_qid` is stored but never fetched (§3). QIDs that cannot be verified offline are written as `null` with a `// TODO: verify QID` comment. As of Task 1, none of the six seed QIDs have been verified, so all six will be `null`. |
| 3 | `appointed_by` reads **"source was appointed by target."** The §6 seed row is flipped to `lai-ching-te → tsai-ing-wen` accordingly. Full direction semantics for every directed relation type are documented in `RELATION_DIRECTION_SEMANTICS` in `src/schema/enums.ts`. |
| 4 | Party nodes `kmt`, `dpp`, and `ccp` exist as minimal records so `member_of` edges have valid targets: `entity_type: 'party'`, empty `roles[]`, empty `party_affiliations[]`, empty `tags[]`. |

| 5 | `member_of` is **directed** (person → party). It is removed from §4.3 invariant 6's symmetric list, which becomes `spouse`, `relative_of`, `coalition_with`, `business_partner`. |
| 6 | `EntityType` gains **`institution`** (schools and universities). `educated_at` runs person → institution, one edge per stage of study. Each stage records the school's name and country, the stage and degree, dates, and free-text remarks. School name and `country` live on the institution node; `stage` / `degree` / `field` in the edge's `education` block; dates and remarks in the edge's `start` / `end` / `notes`. New education details are added as optional fields defaulting to `null`. |
| 7 | Every node has `country` (ISO two-letter code, or `null` for not applicable). |
| 8 | Endpoint rules: `member_of` → party; `educated_at` person → institution; `spouse` / `relative_of` / `mentor_of` link two people. Symmetric types must be `directed: false`. |
| 9 | **China influence is derived, never stored or hand-tagged.** One rule for every party: `cross_strait`-layer edges (weighted by tier) plus `educated_at` edges to institutions in a PRC region. PRC regions are `CN`, `HK`, `MO`, each with a tunable weight (default 1.0). Nodes whose own country is `CN` get a separate `prc` bucket. Shown as the `cross_strait_engagement` colour scale ending in red (Task 7) and a side tab explaining which edges produced it (Task 9). |
| 10 | Direction readings: `employer` = source is employed by target; `ruled_on` = target (a court) ruled on source. Full list in `RELATION_DIRECTION_SEMANTICS`. |
| 11 | Seed sources (Task 3): real issuing bodies and outlets only, `source_url` and `quote` null, every edge `review_status: 'draft'`. Education records for the six seed figures are added beyond §6 at Jing's request, under the same rule. |

No open items.

## Phase 1 non-goals

No extraction pipeline, no database, no auth, no deployment, no network calls at
runtime, no CRUD UI, no time slider, no i18n framework. See §3 of the brief.
