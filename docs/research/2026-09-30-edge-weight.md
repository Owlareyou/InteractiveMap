# Research log — edge weight (2026-09-30)

A record of what was searched, what came back, and what was taken from it.
This is the evidence behind `docs/decisions/edge-weight.md`. Excerpts are
quoted from search results as returned on this date. Re-check the primary
source before citing any of them publicly.

**Why this research happened:** the first Task 4 draft used numbers that were
guesses (10-year half-life, 0.5 for undated ties, a 40/25/20/15 additive
split). Jing asked where they came from. They came from nowhere, so we looked
at how professionals grade evidence and model tie strength.

---

## 1. Grading sources vs. grading information: NATO / Admiralty Code

**Query:** Admiralty Code NATO source reliability information credibility
grading A-F 1-6 intelligence evaluation

**Found:**
- The two-character rating (for example "B2") is formally the NATO
  Intelligence Grading System (AJP-2.1, STANAG 2511).
  - Source reliability: A (completely reliable) to F (cannot be judged).
  - Information credibility: 1 (confirmed by other sources) to 6 (cannot be
    judged).
- "Each descriptor considered in isolation to ensure that the reliability of
  the source does not influence the assessed accuracy of the report."
- Credibility 1 requires that the information "originates from another source
  than the already existing information", which means independence matters.

**Taken:**
- Keep "is it true?" (confidence) separate from "how strong is it?"
  (strength), and combine them by multiplying.
- Corroboration only counts from independent sources.

**Links:**
- https://pangearesearch.substack.com/p/the-admiralty-code-nato-6x6-system
- https://eugit.opencloud.lu/MISP/misp-taxonomies/raw/tag/rm/admiralty-scale/README.md
- https://military-history.fandom.com/wiki/Admiralty_code

## 2. Words to numbers: ICD 203

**Query:** ICD 203 analytic standards source quality credibility "expressions
of likelihood" almost certain very likely percent ranges

**Found:**
- ICD 203 (US Intelligence Community Directive, post-9/11 tradecraft
  standards) requires analysts to describe "quality and credibility of
  underlying sources".
- It fixes likelihood words to ranges:

  | Phrase | Range |
  |---|---|
  | almost no chance / remote | 1–5% |
  | very unlikely | 5–20% |
  | unlikely | 20–45% |
  | roughly even chance | 45–55% |
  | likely | 55–80% |
  | very likely | 80–95% |
  | almost certain | 95–99% |

  (The search excerpt listed five of these seven bands. "Unlikely" and
  "roughly even chance" come from the full ICD 203 table.)

**Taken:**
- The tier scores are points inside these bands: T1 0.95, T2 0.85, T3 0.65,
  T4 0.30.
- The T4 cap of 0.50 sits at the top of "roughly even chance".

**Links:**
- https://eugit.opencloud.lu/MISP/misp-taxonomies/commit/26ac124fe96a6cee9001c9c332cb9cc7328e7f09
- https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6330287/

## 3. Combining several sources: Knowledge Vault

**Query:** knowledge graph fact confidence combining multiple independent
sources noisy-or corroboration Knowledge Vault

**Found:**
- Knowledge Vault (Dong et al., Google, KDD 2014) is a web-scale knowledge
  base that "computes calibrated probabilities of fact correctness" by fusing
  many noisy extractors.
- Confidence rises as independent sources corroborate.

**Taken:**
- The idea that each extra independent source removes part of the remaining
  doubt. (Knowledge Vault learns its fusion from data. The fixed 40% step
  here is our simplification, not theirs.)

**Links:**
- https://lunadong.com/publication/kv_kdd.pdf
- https://research.google/pubs/pub45634/

## 4. False corroboration: circular reporting

**Query:** circular reporting intelligence corroboration independent sources
same original source counted twice

**Found:**
- "Circular reporting, or false confirmation, is a situation in source
  criticism where a piece of information appears to come from multiple
  independent sources, but in reality comes from only one source."
- The problem is named in intelligence, journalism and scholarship alike.

**Taken:**
- Duplicate `source_name`s count once.
- T4 is capped, so repetition can't turn an allegation into fact.
- **Limitation:** our de-duplication only catches identical names. Two outlets
  both re-running the same wire story still count as two. Phase 2 extraction
  should record the original source.

**Link:** https://en.wikipedia.org/wiki/Circular_reporting

## 5. What makes a tie strong: tie-strength literature

**Query:** tie strength measurement recency frequency duration Marsden Campbell
social network decay of ties over time

**Found:**
- Marsden & Campbell, "Measuring Tie Strength" (1984), compared indicators and
  found closeness / intensity the best measure.
- Later work models tie strength through **recency**, **frequency** and
  **duration**.
- Granovetter's original definition (1973): time, emotional intensity,
  intimacy, reciprocity. (This one is from background knowledge, not from
  this search.)

**Taken:**
- Permanence (our `temporal_scope`) isn't a recognised dimension of strength,
  so it is the weakest factor.
- Intensity is a recognised dimension. That's the justification for the
  per-type intensity table, which fixes education outranking official
  meetings.
- Recency is a recognised dimension, so it gets its own factor.

**Links:**
- https://arxiv.org/pdf/1112.2774
- https://arxiv.org/pdf/1706.06188
- https://arxiv.org/pdf/2101.09417

## 6. How ties fade: tie-decay networks

**Queries:**
- exponential time decay half-life temporal network edge weight link
  prediction political elite network
- tie-decay networks Ahmad Porter Taylor continuous time exponential decay
  edge weight

**Found:**
- "Tie-decay networks assume that the edge weight instantaneously increases by
  1 upon an event arrival and that the edge weight exponentially decays over
  time in the absence of events" (Ahmad, Porter, Beguerisse-Díaz).
- In link prediction, the decay rate "depends on the problem and can be
  estimated", so no universal half-life exists.
- Nothing specific to political-elite networks turned up.

**Taken:**
- Exponential decay as the shape of the curve.
- The half-life and floor are ours: 8 years, 0.75.

**Links:**
- https://www.math.ucla.edu/~mason/papers/ahmad2021-TNSE.pdf
- https://arxiv.org/html/2408.11913v2
- https://arxiv.org/pdf/2210.00032

## 7. Searched, not used

- **LittleSis methodology** (query: LittleSis relationship strength weighting
  sources methodology power mapping). Results described the project and its
  mapping tool, but no weighting method. As far as we found, LittleSis
  requires a source per relationship and doesn't score strength.
- **GRADE** (medical evidence grading, High / Moderate / Low / Very Low with
  downgrades). It's a useful parallel for "start from a tier, adjust for
  problems", but it isn't used directly.

## Open questions for later research

- Is there published work on how fast *political* ties fade? That would
  replace the 8-year judgement.
- Is there an established intensity scale for relation types in elite
  networks? VALPOP (cited in the brief) may have one. It wasn't checked here.
