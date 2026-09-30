# Task 2 plan — schema + validator

Status: **built**, with these changes from review:

- Lean validator: no fixtures folder, and no `roles[].org_id` check. The
  validator was verified by hand against a throwaway broken sample instead.
- HK and MO count as PRC regions, each with a tunable weight (default 1.0).
- The China-influence explanation gets its own side tab (Task 9).
- Real education records for all six seed figures are added in Task 3.
- `country` stays on every node, with `null` meaning not applicable.

## What Task 2 delivers

The "tables": zod schemas for the two data files (`data/nodes.json`,
`data/edges.json`), and `npm run validate`, which checks every record and
fails loudly with a readable list of every problem.

## Decisions folded in

| # | Decision | Why |
|---|---|---|
| A | Seed sources use option (b): real issuing bodies/outlets only, `source_url` and `quote` null, every edge `review_status: 'draft'`, plus a verify checklist in Task 3. | Prototype pace without fabricating. |
| B | New entity type `institution`. `educated_at` runs person → institution, one edge per stage. | Spec decision 6. |
| C | Education block kept minimal (below). New details are added later as optional fields that default to `null`, so existing records never need editing. | "Simple now, room for nuance later." |
| D | New `country` field on **every** node (two-letter code: `TW`, `CN`, `US`… or `null`). | Needed to tell "studied in the PRC" apart, and to avoid flagging PRC figures themselves (see F). |
| E | Endpoint rules: `member_of` → party, `educated_at` → institution, `spouse` / `relative_of` / `mentor_of` link two people. | Catches typos cheaply. |
| F | China influence is **derived, never stored**. See section below. | §4.5 and the neutrality rule. |
| G | `tsx` added as a dev-only tool to run the validator (and Task 4's checks). | Node 20 can't run `.ts` files directly. |

### Education block (only on `educated_at` edges)

```ts
education: {
  stage: 'secondary' | 'bachelor' | 'master' | 'doctorate' | 'other'
  degree: string | null     // free text: 'LL.M.', 'S.J.D.'
  field: string | null      // free text: '法律', 'Law'
}
```

- **School name and country** live on the institution node.
- **Dates** use the edge's existing `start` and `end`.
- **Remarks** use the edge's existing `notes`.
- The validator requires this block on `educated_at` edges and rejects it on
  every other edge type.
- **Choosing what's shown** is a display concern, handled in Task 9. The drawer
  will show stage, school and country by default and put the rest behind a
  "more" toggle, driven by one list of fields you can edit.

### China influence (design only; built in Tasks 7 and 9)

There is **no hand-set tag or flag**. A manual "China influence" tag would be
editorial judgement with no evidence trail, which is what §4.5 forbids. The
signal is instead computed from the data, by one rule applied the same way to
every party:

- **Counts toward it:**
  - every edge in the `cross_strait` layer (meetings, forums, PRC positions,
    PRC business ties, visits), weighted by evidence tier
  - every `educated_at` edge to an institution whose `country` is in
    `PRC_COUNTRY_CODES`
- **`PRC_COUNTRY_CODES`** starts as `['CN']`. Whether `HK` and `MO` belong in
  it is your call, made in one config line.
- **Buckets:** `none` / `low` / `medium` / `high`. Nodes whose own `country`
  is `CN` get a separate `prc` bucket instead of a level, so Xi isn't marked
  as "influenced by China".
- **Shown as:**
  - the `cross_strait_engagement` grouping: nodes are coloured on a scale that
    ends in red (Task 7), kept distinct from the edge valence colours
  - a derived chip in the node drawer listing the edges behind it (Task 9), so
    every red node can answer "why?"

Task 2's only part in this is the schema support: the `country` field and the
`institution` type.

## Files

| File | Contents |
|---|---|
| `src/schema/enums.ts` | All §4.1 enums + `institution` + `EducationStage`; `RELATION_LAYER_MAP`; `SYMMETRIC_RELATION_TYPES` (spouse, relative_of, coalition_with, business_partner); `RELATION_ENDPOINT_RULES`; `RELATION_DIRECTION_SEMANTICS` (one-line reading per directed type) |
| `src/schema/primitives.ts` | Shared field schemas: slug id, date (`YYYY`, `YYYY-MM`, `YYYY-MM-DD`), country code |
| `src/schema/node.ts` | `NodeSchema` per §4.2 + `country` |
| `src/schema/edge.ts` | `EvidenceSchema`, `EducationSchema`, `EdgeSchema` per §4.3 + `education` (null unless `educated_at`) |
| `src/schema/index.ts` | Re-exports; types via `z.infer` only |
| `scripts/validate-data.ts` | Loads JSON, parses each record, runs cross-record checks, prints a grouped report, exits 1 on any error. `--data <dir>` points it at another folder |
| `scripts/fixtures/broken/{nodes,edges}.json` | Obviously synthetic records (`test-person-a`, 測試甲), one per rule broken, to prove the validator fails loudly. Not political data |
| `package.json` | `tsx` dev dependency; `"validate"` script |
| `README.md` | Spec decisions B–G, `npm run validate` in the scripts table, Progress row |

### What the validator checks

1. The shape of every record (zod, strict: unknown fields are errors, which
   catches typos).
2. §4.3 invariants 1–7, with invariant 6's symmetric list revised (spouse,
   relative_of, coalition_with, business_partner). Symmetric types must also be
   `directed: false`.
3. Endpoint rules (E), and that the education block appears exactly on
   `educated_at` edges.
4. `party_affiliations[].party_id` points at a party node, and a non-null
   `roles[].org_id` resolves to a node.
5. `start ≤ end` wherever both are set.

### Direction readings to confirm

Most directed types read naturally as "source *verb* target". Two are ambiguous:

- `employer`: **source is employed by target**, the Wikidata convention
  (person → company).
- `ruled_on`: **target ruled on source** (person → court), which keeps the
  person as the source like `investigated_by` and `indicted_by`.

## Knock-on for Task 3

- The §6 row `hung-hsiu-chu → ma-ying-jeou member_of` becomes
  `hung-hsiu-chu → kmt`.
- `country`: the five Taiwanese figures and `kmt` / `dpp` get `TW`; `xi-jinping`
  and `ccp` get `CN`.
- **Gap:** §6 has no education data, so the "studied in the PRC" signal can't
  be seen in the prototype. Adding one or two real, sourced `educated_at`
  records after Task 4 would exercise it. That needs your OK, because §6 says
  not to add seed data.

## Verify

- `npm run validate` on the empty `data/` folder reports the missing files and
  exits 1. It passes once Task 3 lands.
- `npm run validate -- --data scripts/fixtures/broken` exits 1 and names every
  broken rule.
- `npm run typecheck` passes with no `any`.
