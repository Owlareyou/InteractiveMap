# Why grouping and node colour work the way they do

- **Settings (the numbers and rules):** `src/settings/grouping.ts`, `src/settings/china.ts`
- **Colours:** `src/styles/tokens.css`
- **Code:** `src/lib/grouping.ts` (tests in `src/lib/grouping.test.ts`)

Tags follow `edge-weight.md`: **[R]** researched or a fact, **[J]**
judgement, **[M]** mock.

## The four dimensions

| Dimension | Rule | Tag |
|---|---|---|
| Party | Current affiliation (`end: null`), otherwise the most recent, otherwise "none recorded". A party node is its own group. Non-person nodes are "not applicable" | [J] |
| Entity type | `entity_type` as stored | — |
| Role | First keyword rule that matches a **current** role title (see below). No current role → "no current role". Non-person nodes → "not applicable" | [J] |
| Cross-strait engagement | Score from incident edges, bucketed (see below) | [J] / [M] |

"None recorded" and "not applicable" are kept apart on purpose. A school
having no party isn't missing data. A person with no recorded party might
be.

## Role rules

Rules are tried in order, and the first match wins. The order matters where
one keyword contains another:
- 「國家主席」 and 「政協主席」 must reach PRC leadership before 「主席」 reaches
  party leadership.
- 「立法院長」 must reach legislator before 「院長」 reaches official.

「主任委員」 was added next to the plan's 「主委」, because titles in the data use
the full form (行政院大陸委員會主任委員).

**Only current roles count.** Former presidents (馬英九, 蔡英文) and former
chairs therefore show as "no current role". That's accurate to the data and
says nothing about their influence. If it reads badly on screen, an
alternative is to fall back to the most recent role, the way party does.

## Cross-strait engagement (spec decisions 9, 14, 18)

```
score = Σ tier confidence of each incident cross_strait-layer edge
      + Σ tier confidence × region weight of each educated_at edge
          from this node to an institution in CN / HK / MO,
          if the study ended (or started, when there's no end) on or after 1949-10-01
```

- **Tier confidence** is the base value from `src/settings/weight.ts` (T1
  0.95, T2 0.85, T3 0.65, T4 0.3). Extra sources don't add anything here. The
  score counts ties, not how well each tie is sourced.
- **Both ends count** for cross-strait edges. Education counts only for the
  person who studied.
- **Buckets [M]:** none = 0, low < 1, medium < 3, high ≥ 3. One T1 meeting
  (0.95) is low, two are medium, and four are high. These are the numbers
  most likely to change once seen on screen.
- **PRC-based nodes** (`country` in CN / HK / MO) get a separate `prc`
  bucket whatever their score. Otherwise Xi Jinping would be the most
  "engaged" node simply because every meeting lands on him.
- **Every party is scored by the same rule.** A test checks that the same
  ties give the same score under any affiliation.

### Undated PRC study is counted [J], decided 2026-10-01

All three PRC-education edges for Taiwanese figures (陳玉珍 at 北京大學,
羅明才 at 四川大學, 傅崐萁 at 暨南大學) have no `start` or `end`. The research
log lists them as post-1949 study (section 6, "after 1949"), but the dates
weren't recorded.

With the cutoff applied strictly, undated study wouldn't count, and the
education signal would contribute nothing to any Taiwanese node. So undated
study **does count**, and the China-ties tab marks each one "undated" so the
assumption stays visible. Set `countUndatedPrcEducation: false` to switch
this off. The better fix is adding the years to the data once they're
sourced.

## Colour

All palettes were checked with the dataviz skill's validator
(`validate_palette.js`) against this app's surfaces (`#f7f6f3` light,
`#14161a` dark). Every pair was compared, not just neighbours, because any
two nodes can sit side by side on a force graph.

| Set | Mode | Worst colour-blind ΔE (≥ 8 target) | Worst normal-vision ΔE (≥ 15 floor) | Below 3:1 contrast |
|---|---|---|---|---|
| Party (4) | light | 15.5 | 16.2 | DPP, TPP |
| Party (4) | dark | 9.3 | 17.9 | — |
| Role (7) | light | 8.1 | 15.4 | legislator, local executive |
| Role (7) | dark | 8.4 | 15.8 | head of state, business / media |
| Entity (6 + neutral) | light | 9.7 | 16.9 | person, company |
| Entity (6 + neutral) | dark | 8.0 | 15.1 | company |
| Engagement (low → high) | both | ordinal checks pass: one hue, lightness steps ≥ 0.06, light end ≥ 2:1 | | |

- **Contrast below 3:1** is allowed only with a second channel. Here every
  node carries a text label, and the hover tooltip names its group.
- **Party colours are conventional** (KMT blue, DPP green, CCP red, TPP
  teal), as Jing chose. The first attempt failed the colour-blind check:
  DPP green and CCP red merge under deuteranopia. They're now separated by
  lightness (lighter green, darker red in light mode), which passes. KMT is a
  royal blue, darker and more violet than the "cooperative" edge blue, so
  nodes and lines don't read as the same thing.
- **Seven role colours** is more than the validator's guide of three for
  every-pair use. The set was found by searching lightness and chroma at
  fixed hues until every pair cleared both floors.
- **Engagement** is a one-hue ordinal ramp. In light mode it runs pale to
  deep red. In dark mode it runs dim to bright, and stays saturated so "high"
  never looks like the pale `prc` neutral. `prc` is a neutral off the ramp
  (charcoal in light mode, bone in dark), so a PRC body is never read as
  "very engaged".
- **Schools** stay a recessive neutral under entity type: there are 14 of
  them, and they're context rather than actors.

**Known overlap:** red appears in three places: CCP (party), PRC leadership
(role), and the engagement scale. All three point at the same thing, and the
red outline on PRC organisations adds to it. It's consistent, but it's a lot
of red. Worth a look on screen.
