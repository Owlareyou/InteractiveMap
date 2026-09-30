# Project Brief — Taiwan Political Relationship Map (Phase 1: Local Prototype)

> Paste this whole file into Claude Code as the opening message, or drop it in the
> repo root as `PROMPT.md` and say: "Read PROMPT.md and start with Task 1."

---

## 0. Working Agreement (read first)

- **Plan before writing.** Output a short file-by-file plan and wait for my approval
  before creating files. Do not scaffold the whole app in one shot.
- **Small, reviewable steps.** One task at a time, in the order given in §8.
  After each task, stop and summarise what changed in ≤5 bullets.
- **Ask, don't assume.** If a requirement here is ambiguous or you believe a spec
  decision is wrong, say so and propose an alternative *before* implementing.
  Do not silently substitute your own design.
- **No scope creep.** Anything listed in §3 (Non-Goals) must not be built, even if
  it seems easy or helpful. If you think something in Non-Goals is required for
  Task N to work, stop and tell me instead of building it.
- **No placeholder data beyond §6.** Do not invent political figures, relationships,
  dates, or citations. If a field is unknown, use `null` and surface it in the UI as
  "unverified", never as a guess.
- **Comments explain *why*, not *what*.** Skip comments that restate the code.

---

## 1. Context

I am building an interactive network visualisation of the Taiwanese political
landscape: people, parties, organisations, and the relationships between them.

The design is informed by two bodies of prior work, and the constraints in §4 and §5
come directly from them — treat them as requirements, not suggestions:

- **VALPOP** (Solovev & Lasser, 2026, arXiv:2606.27347) — an LLM entity-relation
  extraction pipeline for European political-elite networks. Key findings adopted here:
  a **fixed relationship-type vocabulary** enforced at decode time; separating
  **temporal scope** (`event` / `state` / `property`) from relationship type; and
  **signed edges** (+/0/−), because unsigned community detection provably fails to
  separate rival political camps — modularity treats a "criticizes" edge identically
  to a "supports" edge and collapses bitter rivals into one cluster.
- **LittleSis / Public Accountability Initiative** — power-mapping database practice:
  every relationship traces to a source, government filings outrank news reports, and
  inclusion criteria are written down rather than left implicit.

**Editorial stance requirement:** this map must be *structurally neutral*. The data
model must record ties for all parties under identical rules. The schema must never
contain a field, default, or code path that privileges one party's ties over another's.
If you notice the spec violating this, flag it.

---

## 2. Goal of Phase 1

A **local, offline, single-page prototype** that proves the data model renders and
behaves correctly with hand-curated seed data. This is a throwaway-quality draft to
validate the schema — not production.

**Definition of done:** I can run one command, open a browser, see six seed figures as
an interactive force-directed graph, toggle the grouping dimension, filter by evidence
tier and relationship layer, and click any edge to read its citation.

---

## 3. Non-Goals (do NOT build in Phase 1)

- ❌ LLM extraction pipeline (Phase 2 — but see §4.4 for the schema hook it needs)
- ❌ Any database server (Postgres, Neo4j, Supabase). JSON files on disk only.
- ❌ Authentication, user accounts, deployment, CI, Docker
- ❌ Web scraping, news ingestion, or any network calls at runtime
- ❌ Wikidata API integration (store the QID as a string field; do not fetch)
- ❌ Admin/CRUD UI for editing data (I will edit JSON by hand this phase)
- ❌ Timeline/time-slider animation
- ❌ Tests beyond the schema validator in Task 2
- ❌ i18n framework (hardcode the bilingual fields defined in §4)

---

## 4. Data Model — authoritative spec

Implement this exactly. It is the single source of truth; the UI is derived from it.

Use **TypeScript** with `zod` schemas as the runtime contract. Generate the TS types
from the zod schemas (`z.infer`), do not hand-write duplicate interfaces.

### 4.1 Enums (closed vocabularies — do not extend without asking me)

```ts
EntityType   = 'person' | 'party' | 'government_body' | 'company'
             | 'media_org' | 'association'

RelationLayer = 'governance' | 'economic' | 'cross_strait'
              | 'personal' | 'enforcement'

RelationType =
  // governance
  | 'member_of' | 'position_held' | 'appointed_by' | 'endorsed'
  | 'coalition_with' | 'opposes' | 'criticizes'
  // economic
  | 'employer' | 'board_member' | 'shareholder' | 'donor_to'
  | 'business_partner' | 'contract_with'
  // cross_strait
  | 'met_officially_with' | 'attended_forum' | 'participated_in_exchange'
  | 'holds_prc_position' | 'prc_entity_business_tie' | 'made_prc_visit'
  // personal
  | 'spouse' | 'relative_of' | 'mentor_of' | 'educated_at'
  // enforcement
  | 'investigated_by' | 'indicted_by' | 'ruled_on'

TemporalScope = 'event'     // bounded, happened on a date
              | 'state'     // persists, may change
              | 'property'  // definitional, does not change

Valence = 'positive' | 'neutral' | 'negative'

EvidenceTier =
  | 'T1'  // official record: govt filing, court judgment, company registry,
          //   official meeting readout, legislative vote
  | 'T2'  // >=2 independent reputable outlets
  | 'T3'  // single reputable outlet
  | 'T4'  // claim/allegation — an assertion that a tie exists, NOT the tie itself

ReviewStatus = 'draft' | 'reviewed' | 'rejected'
```

Maintain a single exported constant `RELATION_LAYER_MAP: Record<RelationType, RelationLayer>`
so layer is always derived, never stored redundantly on the edge.

### 4.2 Node

```ts
Node = {
  id: string                    // stable slug, e.g. 'ma-ying-jeou'
  wikidata_qid: string | null   // e.g. 'Q16101' — stored only, never fetched
  name_zh: string               // 正體中文 (Traditional). NEVER simplified.
  name_en: string
  aliases: string[]             // all surface forms: 馬前總統, Ma Ying-jeou, ...
  entity_type: EntityType
  party_affiliations: Array<{   // dated — people switch parties
    party_id: string
    start: string | null        // ISO 'YYYY-MM-DD' or 'YYYY'
    end: string | null          // null = ongoing
  }>
  roles: Array<{
    title_zh: string
    title_en: string
    org_id: string | null
    start: string | null
    end: string | null
  }>
  tags: string[]                // free-form grouping labels, see §4.5
  bio_short_zh: string | null   // one line, for hover tooltip
  bio_short_en: string | null
  last_updated: string          // ISO date
}
```

### 4.3 Edge

```ts
Edge = {
  id: string
  source_id: string             // must resolve to a Node.id
  target_id: string
  relation_type: RelationType
  temporal_scope: TemporalScope
  valence: Valence
  evidence_tier: EvidenceTier
  directed: boolean             // false for symmetric types (spouse, coalition_with)
  start: string | null
  end: string | null
  status: 'active' | 'historical' | 'disputed'
  evidence: Evidence[]          // MUST have length >= 1
  review_status: ReviewStatus
  notes: string | null
}

Evidence = {
  source_url: string | null
  source_name: string           // outlet or issuing body
  source_type: 'official_record' | 'news' | 'academic' | 'other'
  published_date: string | null
  quote: string | null          // verbatim supporting excerpt from the source
  retrieved_date: string | null
}
```

**Hard invariants — enforce in the validator (Task 2) and fail loudly:**

1. `evidence.length >= 1` for every edge. An edge with no source is invalid data.
2. `source_id !== target_id`.
3. Both endpoints must exist in `nodes.json`.
4. If `evidence_tier === 'T1'`, at least one evidence entry must have
   `source_type === 'official_record'`.
5. If `evidence_tier === 'T2'`, `evidence.length >= 2`.
6. `directed === false` is only permitted for symmetric relation types
   (`spouse`, `relative_of`, `coalition_with`, `business_partner`, `member_of`).
7. Edge IDs and node IDs are unique.

### 4.4 Derived weight — computed, never hand-assigned

Implement as a **pure function** in its own module, `src/lib/weight.ts`:

```ts
computeEdgeWeight(edge: Edge, opts: WeightOptions): number  // returns 0..1
```

Base it on, in this order of contribution: evidence tier (T1 highest), evidence count,
temporal scope (`property` > `state` > `event`), and recency decay against a
`referenceDate` passed in `opts`. Export the tunable coefficients as a named config
object so I can adjust them without touching logic.

This function must be **deterministic and side-effect free**, and I want it isolated
because the whole credibility of the visual rests on weight being reproducible rather
than editorially assigned.

### 4.5 Grouping dimensions

The UI must support switching the grouping/colour dimension at runtime. Implement as a
registry of accessor functions, not a switch statement scattered through components:

```ts
GroupingDimension = {
  id: string
  label_zh: string
  label_en: string
  accessor: (node: Node, ctx: GraphContext) => string   // returns group key
}
```

Ship these four in Phase 1: `party`, `entity_type`, `role_type`, `cross_strait_engagement`.

`cross_strait_engagement` is derived at runtime from the node's incident edges in the
`cross_strait` layer (bucket into `none` / `low` / `medium` / `high` by count and tier).
It must **not** be a stored field on the node — it is an observation about the data,
and storing it would let editorial judgement leak into the source of truth.

---

## 5. Tech Stack (pinned — do not substitute)

- **Vite + React 18 + TypeScript**, strict mode on
- **d3-force** for the simulation; render to **SVG** via React (not canvas, not
  `react-force-graph` — I want direct control of the simulation for Phase 2)
- **zod** for schema validation
- **Tailwind CSS** for styling
- Node 20+, `pnpm` if available else `npm`
- No state-management library. React state + context is sufficient at this size.

**Rendering constraints:**
- Dark and light mode via CSS custom properties on `:root`, respecting
  `prefers-color-scheme`. Define colours as tokens; no hardcoded hex in components.
- All UI chrome bilingual (zh-Hant primary, en secondary). **Traditional Chinese only —
  never simplified characters anywhere in the codebase, data, or UI.**
- Must be legible at 1280×800 and not break below 768px width.

---

## 6. Seed Data (use exactly this — do not add or embellish)

Six figures, illustrative. Every China-facing edge below is deliberately drawn from the
official public record so the prototype's strongest claims rest on T1 evidence, and
DPP/KMT-internal edges are recorded under identical rules.

**Nodes** (people only for Phase 1; add party nodes only if a `member_of` edge needs
a target):

| id | name_zh | name_en | qid | party | tags |
|---|---|---|---|---|---|
| `ma-ying-jeou` | 馬英九 | Ma Ying-jeou | Q16101 | KMT | former_president, party_elder |
| `hung-hsiu-chu` | 洪秀柱 | Hung Hsiu-chu | Q706446 | KMT | former_party_chair |
| `hsia-li-yan` | 夏立言 | Hsia Li-yan | Q713359 | KMT | party_vice_chair, cross_strait_liaison |
| `tsai-ing-wen` | 蔡英文 | Tsai Ing-wen | Q19217 | DPP | former_president, former_party_chair |
| `lai-ching-te` | 賴清德 | Lai Ching-te | Q19226 | DPP | president, former_premier |
| `xi-jinping` | 習近平 | Xi Jinping | Q15031 | CCP | prc_leadership |

⚠️ **Verify every QID above before writing it into `nodes.json`.** I have not confirmed
them. If you cannot verify one offline, write `null` and add a `// TODO: verify QID`
comment. Do not guess.

**Edges:**

| source → target | relation_type | scope | valence | tier | date | note |
|---|---|---|---|---|---|---|
| ma-ying-jeou → xi-jinping | met_officially_with | event | positive | T1 | 2015-11-07 | Singapore meeting |
| ma-ying-jeou → xi-jinping | met_officially_with | event | positive | T1 | 2024-04-10 | Beijing meeting |
| hung-hsiu-chu → xi-jinping | met_officially_with | event | positive | T1 | 2016-11-01 | as KMT chair |
| hsia-li-yan → xi-jinping | made_prc_visit | event | positive | T2 | 2023 | delegation visits |
| lai-ching-te → xi-jinping | opposes | state | negative | T1 | — | public positions, no direct contact |
| tsai-ing-wen → lai-ching-te | appointed_by | event | positive | T1 | 2017 | Premier appointment |
| ma-ying-jeou → tsai-ing-wen | opposes | state | negative | T2 | — | successive administrations |
| hung-hsiu-chu → ma-ying-jeou | member_of | property | neutral | T1 | — | same party (KMT) |

For `evidence[]` on each edge, populate `source_name`, `source_type`, and
`published_date` where the table gives enough to do so honestly; set `source_url` and
`quote` to `null` with `review_status: 'draft'`. **Do not fabricate URLs or quotes.**
The point of the prototype is to prove the pipeline, and a fake citation defeats it.

Note the `appointed_by` direction: on this edge the arrow means "was appointed by", so
verify subject/object order matches the semantics you implement, and add a
`RELATION_DIRECTION_SEMANTICS` comment block documenting the reading of every directed
type you use.

---

## 7. UI Requirements

**Layout:** left sidebar (controls) + main graph canvas + right drawer (details).

**Graph:**
- d3-force simulation: `forceLink`, `forceManyBody`, `forceCenter`, `forceCollide`
- Drag nodes; drag pins the node until released
- Zoom/pan on the canvas
- Hover a node → highlight its 1-hop neighbourhood, dim everything else
- Node radius scales with weighted degree
- Node colour = active grouping dimension
- **Edge stroke colour = valence** (positive / neutral / negative — pick three
  colour-blind-safe tokens, do not use plain red/green)
- **Edge stroke style = evidence tier**: T1 solid, T2 solid thinner, T3 dashed,
  T4 dotted + reduced opacity
- Edge width = `computeEdgeWeight()` output
- Arrowheads on directed edges only

**Controls (left sidebar):**
- Grouping dimension selector (the four from §4.5)
- Relation-layer toggles (5 checkboxes, all on by default **except** none —
  all five on)
- Evidence-tier toggles — **T4 must default to OFF**, with a visible label explaining
  that T4 records an allegation, not an established relationship
- Valence filter (show positive / neutral / negative)
- Minimum-weight slider
- Node search by name or alias

**Detail drawer (right):**
- Click a node → its profile: names, party history, roles, tags, and every incident
  edge grouped by layer
- Click an edge → relation type, scope, valence, tier, dates, and the **full evidence
  list** with source name, type, date, link, and quote
- Every edge must be traceable to its sources in ≤2 clicks. This is a hard requirement,
  not a nice-to-have.

**Empty/edge states:** handle zero search results, a node with no visible edges after
filtering, and an evidence entry with all-null fields.

---

## 8. Task Order

Work through these one at a time. Stop after each and report.

1. **Scaffold.** Vite + React + TS + Tailwind + zod. `pnpm dev` runs. Directory
   structure only, plus a README with run instructions.
2. **Schema + validator.** `src/schema/*.ts` (zod), plus
   `scripts/validate-data.ts` that loads the JSON, checks every invariant in §4.3,
   and exits non-zero with a readable report of every violation. Wire it to
   `pnpm validate`.
3. **Seed data.** `data/nodes.json`, `data/edges.json` per §6. `pnpm validate` passes.
4. **Weight function.** `src/lib/weight.ts` per §4.4, with a handful of unit
   assertions (plain `node:test` or a tiny script — no test framework install).
5. **Static graph render.** Nodes and edges on screen with force simulation, drag,
   zoom. No filtering yet.
6. **Visual encoding.** Valence colours, tier stroke styles, weight-based widths,
   arrowheads, degree-based radii.
7. **Grouping dimensions.** Registry per §4.5 + selector wired to node colour.
8. **Filters.** Layer, tier (T4 off by default), valence, min-weight, search.
9. **Detail drawer.** Node profile and edge evidence panel.
10. **Polish pass.** Dark/light tokens, responsive check, empty states, README update
    documenting the schema and how to add a record by hand.

---

## 9. Phase 2 Hooks (build the seam, not the feature)

Do not implement extraction. But structure the code so it slots in:

- Keep `data/` loading behind a single module `src/lib/dataSource.ts` exporting
  `loadGraph(): Promise<{nodes: Node[], edges: Edge[]}>`. Everything else imports from
  there, so swapping JSON for an API later touches one file.
- Include `review_status` on edges from day one (already in §4.3) and treat
  `'draft'` as renderable-but-marked. Phase 2 adds a staging table where extracted
  edges land as `'draft'` and are promoted only by human review — never auto-promoted.
- Do not couple any component directly to a JSON import path.

---

## 10. Acceptance Criteria

- [ ] `pnpm install && pnpm dev` works from a clean clone
- [ ] `pnpm validate` passes on seed data and fails loudly on a deliberately broken record
- [ ] All six figures render; graph settles without nodes flying off-canvas
- [ ] Switching grouping dimension recolours without remounting the simulation
- [ ] T4 edges are hidden on first load
- [ ] Every visible edge reaches its evidence list in ≤2 clicks
- [ ] `computeEdgeWeight` is pure, isolated, and returns identical output for identical input
- [ ] Zero simplified-Chinese characters anywhere in repo or UI
- [ ] No fabricated data: every `source_url` and `quote` is either real or `null`
- [ ] TypeScript strict passes with no `any` in `src/`

---

## 11. Open Questions — answer these before starting, don't guess

1. Any of the six QIDs you cannot verify offline?
2. Any relation type in §4.1 whose direction semantics are ambiguous as specified?
3. Anything in §7 that conflicts with the d3-force + React + SVG constraint in §5?

Answer these, give me your file-by-file plan for Task 1, then wait for my go-ahead.
