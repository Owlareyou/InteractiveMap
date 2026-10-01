# Tasks 7–10 plan — finish Phase 1

Status: **approved 2026-10-01**, with Jing's answers to the three decisions:
1. **Add the FT allegation as T4.** A new relation type,
   `reported_editorial_direction` (cross-strait layer), with one edge each from
   中時 and 中天 to 國台辦, tier T4. It's added as the first step of Task 7 and
   recorded as spec decision 19.
2. **Conventional party colours:** KMT blue, DPP green, CCP red, TPP teal.
3. **Autonomy:** run all four tasks without stopping, one commit each, and
   push at the end.

The original plan follows. Written so the next session can run all four
tasks back to back: one commit per task, checks after each, and no stops
unless something breaks. Decisions are made up front (below) so the run
doesn't need to pause.

## Run order and per-task routine

Tasks run in the brief's order: 7 → 8 → 9 → 10. After each task:
1. Run `npm run typecheck`, `npm test`, `npm run validate` and `npm run build`.
2. Check the rendered page (DOM dump; screenshots have proved unreliable in
   headless Chrome).
3. Update the README Progress row.
4. Commit.

Push once at the end. Stop early only if a check fails in a way that needs a
design decision.

---

## Task 7: grouping dimensions

**You'll see:** a "group by" selector in the left sidebar. Node colours and
the legend's node section change with it, without the layout jumping.

| File | Contents |
|---|---|
| `src/lib/grouping.ts` | The registry (§4.5): `GroupingDimension { id, label_zh, label_en, accessor(node, ctx) → key }`, plus each dimension's keys, labels and colour tokens. The four dimensions are listed below |
| `src/settings/grouping.ts` | Tunable parts: role keyword rules, engagement thresholds, PRC-education cutoff date |
| `src/components/GroupingSelector.tsx` | Bilingual radio list in the sidebar |
| `src/components/Legend.tsx` | The node section is generated from the active dimension |
| `src/components/Graph.tsx` | Node fill = active dimension's colour. Colour is computed at render time, so switching never touches the simulation (acceptance criterion) |
| `src/styles/tokens.css` | Party, role and engagement colour tokens, light and dark |
| `src/lib/grouping.test.ts` | A few checks on the engagement rule (it's the one with real logic) |

**The four dimensions:**
- **`party`**: the current affiliation (`end: null`), otherwise the most
  recent one, otherwise "none".
- **`entity_type`**: person, party, school and so on. This is what's shown
  today.
- **`role_type`**: derived from the current role's title by keyword rules
  kept in settings:
  - 總統 / 副總統 → head of state
  - 院長 / 主委 / 國台辦主任 → official
  - 主席 / 副主席 → party leadership
  - 立法委員 / 立法院長 / 總召 → legislator
  - 市長 / 縣長 → local executive
  - 總書記 / 國家主席 / 政協主席 → PRC leadership
  - 董事長 → business / media

  If nothing matches, the key is "none". No schema change and no data edits.
- **`cross_strait_engagement`**, implementing spec decisions 9, 14 and 18:
  - **Score:** each incident `cross_strait`-layer edge adds its tier's
    confidence score (from `src/settings/weight.ts`). Each `educated_at` edge
    to an institution in a PRC region adds the same, but only if the study
    ended (or started, when there's no end) on or after **1949-10-01**.
  - **Buckets:** none (0), low, medium, high. The thresholds live in
    settings, starting at < 1, < 3 and ≥ 3.
  - **PRC nodes** (`country` in CN / HK / MO) get a separate `prc` bucket.
  - **Colours:** a sequential scale from grey to deep red. `prc` is a
    distinct dark neutral, so it's never read as "very engaged".

## Task 8: filters

**You'll see:** filter controls under the selector. Edges disappear and
reappear, but nodes stay where they are.

| File | Contents |
|---|---|
| `src/lib/filters.ts` | A pure function: `FilterState` + edges + weights → visible edge ids, and the matching node ids for search |
| `src/components/Filters.tsx` | The controls listed below |
| `src/App.tsx` | Holds the filter state (React state, no library, per §5) |
| `src/components/Graph.tsx` | Draws only visible edges. Nodes left with no visible edges fade instead of vanishing, so the layout stays stable |

**Controls:**
- **Layer:** five toggles, all on.
- **Tier:** four toggles, **T4 off by default**, labelled 「T4 為指控，非確立之關係 / an allegation, not an established tie」.
- **Valence:** three toggles (cooperative / neutral / adversarial).
- **Minimum weight:** a slider from 0 to 1.
- **Search:** matches 中文名, English name or alias. Matches are highlighted
  and listed, and clicking a result selects that node (opening its drawer
  after Task 9). Zero results shows 「找不到符合的節點 / No matches」.

**Design choice:** the simulation always runs on the full graph, and filters
only hide edges. Positions stay put, so the map doesn't reshuffle every time a
box is ticked.

## Task 9: detail drawer

**You'll see:** click a node or an edge and the right panel fills. Every edge
reaches its evidence in **one** click, which beats the brief's limit of two.

| File | Contents |
|---|---|
| `src/lib/labels.ts` | 中文 / English labels for every enum: relation types, layers, scope, valence, tiers (with meaning), entity types, stages, review status |
| `src/components/Drawer.tsx` | The node and edge views listed below |
| `src/components/Graph.tsx` | Click handlers. Each edge gets a wider invisible hit-path so thin lines are easy to click. Clicking the background clears the selection, and the selected node or edge is highlighted |
| `src/App.tsx` | Selection state, shared with search results |

**Node view, three tabs:**
1. **概覽 Overview:** names, aliases, type, country, roles (dated), party
   history, tags, last updated. If the node has a red outline, a line says
   why: "PRC-based organisation, derived from `country`".
2. **關係 Ties:** every incident edge grouped by layer. Each row shows the
   other node, the relation in plain words (from
   `RELATION_DIRECTION_SEMANTICS`), the date and the tier. Clicking a row
   opens that edge. Edges hidden by filters are listed greyed, with a note.
3. **中國連結 China ties** (the side tab from spec decision 9): the node's
   engagement bucket and score, and the exact edges that produced it, each
   with its contribution. For PRC nodes it explains the `prc` bucket instead.

**Edge view:**
- A plain-language sentence: 「盧秀芳 → 中視：董事長」.
- Relation type, layer, scope, valence (cooperative / adversarial), and tier
  with its meaning. Dates and status.
- **A 草稿·未審核 / draft badge** while `review_status` is `draft` (§9:
  renderable but marked).
- **Why this thickness:** the `weightBreakdown()` factors (confidence ×
  intensity × scope × recency), with the reference date.
- The education block when there is one, plus notes.
- **The full evidence list:** source name, type, date, link (opens in a new
  tab) and quote. Empty fields show 「未提供 / not provided」. An entry with
  every field empty gets its own message (a §7 empty state).

## Task 10: polish and acceptance

| Item | Detail |
|---|---|
| Fit-to-view | Zoom to fit once the layout settles, plus a 「重設視圖 / Reset view」 button. With 54 nodes, the default zoom matters |
| Light / dark | Check every new token in both schemes; check contrast for labels on the halo |
| Responsive | ≥ 768 px wide: three columns or stacked, nothing overflowing. Below that, stacked, with the drawer under the graph |
| Empty states | Zero search results, a node with no visible edges, all-null evidence, and data that fails to load (already handled) |
| `scripts/check-zh.ts` + `npm run check:zh` | Scans `src/`, `data/` and `docs/` against a list of common simplified-only characters. Heuristic, not exhaustive, and documented as such. It covers the acceptance criterion as far as a script can |
| README | A schema guide (every field, with an example node and edge), and "how to add a record by hand": edit the JSON, run `npm run validate`, check in the browser. Then the acceptance checklist, ticked |
| Acceptance run | Every item in brief §10, checked and reported. For example: `npm ci && npm run dev` from a fresh clone; validate fails loudly on a deliberately broken record (temporary copy, not committed); grep for `any` in `src/`; T4 hidden on load; recolour without remount |

---

## Decisions needed before the run

1. **FT 2019 editorial-direction allegation.** Should a relation type such as
   `reported_editorial_direction` (cross-strait layer) be added so it can be
   recorded as a T4 edge from 中時 / 中天 to the TAO? Or leave it out of
   Phase 1?
2. **Party colours.** Conventional (KMT blue, DPP green, CCP red), or a
   neutral palette? Conventional is instantly readable, but KMT blue sits
   close to the "cooperative" edge blue, and CCP red is close to the red
   outline.
3. **Autonomy.** Do I run all four tasks without stopping for approval in
   between, and push at the end? This overrides §0's "stop after each task",
   for this run only.
