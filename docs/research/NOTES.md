# Research notes

One entry per iteration of the loop in [`QUEUE.md`](QUEUE.md), newest at the
bottom. Append only. Fix a past mistake with a new entry that points back to
the old one, never by editing it.

Keep each entry short. Receipts (queries, URLs, excerpts) go in the dated log,
and the entry links to it.

## Template

```
### <YYYY-MM-DD> · #<n> · <item id> <topic>
Coverage: <before> → <after>   (people by party; cross-strait edges by party; evidence without URL)
Log: docs/research/<file>.md
Added: <n> nodes, <n> edges. Changed: <edge ids>
Found: <2–4 bullets: what the sources established>
Not found: <what was searched for and came back empty, so nobody repeats it>
Ready to promote: <edge ids with URL + verbatim quote, or "none">
Schema gaps: <ties that didn't fit the vocabularies, or "none">
Next: <the item to do next, or anything left half-done>
```

---

### 2026-10-02 · #0 · Setup and baseline

Coverage baseline (`npm run coverage`):
- 54 nodes, 77 edges, 122 evidence entries. All 77 edges are `draft`.
- People by party: KMT 15, DPP 2, CCP 4, none 2. No TPP node yet.
- Cross-strait edges by the Taiwan-side person's party: **KMT 27, DPP 0,
  TPP 0**. This is the biggest gap. Most of it comes from where searching
  was done (2026-10-01 was KMT-only, at Jing's request), not from a finding.
- Layers: cross_strait 31, personal 19, governance 17, economic 7,
  enforcement 3.
- Never-used relation types: endorsed, coalition_with, criticizes, donor_to,
  business_partner, participated_in_exchange, holds_prc_position, spouse,
  mentor_of, indicted_by.
- Evidence without URL: 50 of 122. Without quote: 122 of 122. QIDs: 0 of 54.
  People without a bio: 23 of 23.

Queue seeded with neutrality items first (N1–N4), then verification
(V1–V4), then empty layers (E1–E4).

Ready to promote: none.
Schema gaps: none yet.
Next: N1, DPP cross-strait contacts.
