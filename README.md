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
| 4 | `src/lib/weight.ts` + a few `node:test` assertions | ✅ Done — see `docs/decisions/edge-weight.md` |
| 5 | `src/lib/dataSource.ts` + static force graph (drag, zoom) | ✅ Done |
| 6 | Visual encoding: valence colour, tier stroke, weight width, arrows, radii | ✅ Done |
| 7 | Grouping-dimension registry + selector | ✅ Done — see `docs/decisions/grouping.md` |
| 8 | Filters: layer, tier (T4 off), valence, min weight, search | ✅ Done |
| 9 | Detail drawer: node profile, edge evidence list | ✅ Done |
| 10 | Polish: tokens, responsive, empty states, README schema guide | 🚧 Partial — see below |

### Where we left off (2026-10-02)

- Tasks 7–9 landed and were checked in the browser: grouping selector,
  filters (T4 off on load), and the detail drawer (one click from any line to
  its evidence). Data: 54 nodes, 77 edges, including the two T4 FT edges
  (spec decision 19).
- Task 10 is **partly done**. Built: fit-to-view once the layout settles, a
  「重設視圖 / Reset view」 button, panning to a node chosen from search,
  labels that stay readable when zoomed out, a tighter force layout for 54
  nodes, a two-column layout from 768 px, an empty state when no ties match
  the filters, and muted text raised to ≥ 4.5:1 contrast.
- Those edits were later checked: type-check, tests (19) and build pass
  (commit `baa8a78`).
- 2026-10-02, at Jing's request: a **前總統 / Former president** role group
  (ended 「中華民國總統」 roles, used when no current role matches); undated PRC
  study keeps counting toward engagement; **colour-blind palette checks are
  no longer required** for new colours.

Next session, the rest of Task 10 per `docs/plans/task-7-10.md`:
- `scripts/check-zh.ts` + `npm run check:zh` (store the simplified-character
  list as `\u` escapes, or the script flags itself)
- README schema guide and "how to add a record by hand"
- Acceptance run against brief §10, with the checklist ticked here

Still open, not blocking:
- Verify draft sources (`docs/seed-verification.md`).
- Look up 旺旺 donations manually on the Control Yuan platform.
- Research DPP / TPP cross-strait contacts so coverage isn't KMT-only.
- Fix the npm cache once: `sudo chown -R 501:20 ~/.npm`.

Background lives in `docs/`, not here:

| Folder | Holds |
|---|---|
| `docs/plans/` | The approved plan for each task |
| `docs/decisions/` | Why a design works the way it does (`edge-weight.md`, `grouping.md`) |
| `docs/research/` | Dated research logs: what was searched, found, and taken |
| `docs/seed-verification.md` | Checklist for turning draft seed edges into reviewed ones |

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
| `npm test` | Edge-weight, grouping and filter checks (`node:test` via `tsx`) |

Every tunable number lives in `src/settings/`: edge weight (`weight.ts`),
grouping rules and engagement thresholds (`grouping.ts`), PRC regions
(`china.ts`), and layout (`graph.ts`).

## Layout

```
data/       Hand-edited JSON — the source of truth. No database, by design (§3).
scripts/    Build-time tooling. Not shipped to the browser.
src/schema/ zod schemas; TS types are inferred from them, never hand-written.
src/lib/    Pure logic: edge weight, data loading, grouping accessors.
src/settings/  Tunable numbers and rules only, each tagged [R]/[J]/[M].
src/components/  React components. Presentation only.
src/styles/ Design tokens as CSS custom properties, then Tailwind.
```

All graph data loads through a single module, `src/lib/dataSource.ts`. Nothing else imports from `data/` directly, so Phase 2
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
| 11 | Seed sources (Task 3): real issuing bodies and outlets only, `source_url` and `quote` null, every edge `review_status: 'draft'`. Education records for the six seed figures are added beyond §6 at Jing's request, under the same rule. On 2026-10-01, `member_of` edges were added for the other five figures (Hung's already existed) under the same rule, so every party node has an edge. |
| 12 | `ruled_on` targets may be a **court or a regulator** (e.g. the NCC). The reading in `RELATION_DIRECTION_SEMANTICS` was widened accordingly. |
| 13 | **§6 correction:** `hsia-prc-visits-2023` now targets the Taiwan Affairs Office, not `xi-jinping`. The 2023 reporting shows Hsia met 宋濤 and 王滬寧, not Xi. Those meetings are separate edges. |
| 14 | The China-education signal (decision 9) counts only study at PRC-region institutions **after 1949-10-01**. Earlier mainland study (for example 黃埔) was under the ROC. Implemented in Task 7. |
| 15 | `member_of` edges exist only for the original six figures. People added later carry party membership in `party_affiliations` only, which Task 7's party grouping will show. This keeps the graph about ties rather than membership. |
| 16 | Evidence added from research carries the real URL and `retrieved_date`. It stays `draft` until someone reads the source and adds a verbatim `quote`. |
| 17 | **Coverage is not yet balanced.** The 2026-10-01 round researched KMT–CCP ties only, at Jing's request. The recording rules are identical for every party, but DPP / TPP / independent cross-strait contacts haven't been researched yet. See the research log's coverage note. |
| 18 | **Red outline** on any non-person node whose `country` is a PRC region (`CN`, `HK`, `MO`): the CCP, PRC state bodies, PRC schools, the Straits Forum. Derived from `country`, never hand-tagged. People are excluded. Regions are set in `src/settings/china.ts`. |
| 19 | `RelationType` gains **`reported_editorial_direction`** (cross-strait layer): "SOURCE (a media outlet) was reported to take editorial direction from TARGET." It exists to record the 2019 FT report about 中時 / 中天 and the TAO, as two **T4** edges with status `disputed`. Approved by Jing on 2026-10-01. |
| 20 | Grouping (Task 7): role type uses **current** roles only; "none recorded" and "not applicable" are separate groups; **undated** PRC-region study counts toward engagement and is flagged as undated. Reasoning: `docs/decisions/grouping.md`. |

## Phase 1 non-goals

No extraction pipeline, no database, no auth, no deployment, no network calls at
runtime, no CRUD UI, no time slider, no i18n framework. See §3 of the brief.
