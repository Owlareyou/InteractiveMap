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

### 2026-10-02 · #1 · N1 DPP cross-strait contacts
Coverage: people DPP 2 → 4; cross-strait edges KMT 27 / DPP 0 → KMT 27 / DPP 5; evidence without URL 50 → 50
Log: docs/research/2026-10-02-dpp-cross-strait.md
Added: 4 nodes (hsieh-chang-ting, chen-chu, beijing-municipal-government, shanghai-municipal-government), 5 edges (hsieh-wang-yi-2012, chen-chu-beijing-2009, chen-chu-shanghai-2009, chen-chu-zhang-zhijun-2014, lai-shanghai-2014). Changed: none
Found:
- 謝長廷 met TAO director 王毅 in Beijing (2012-10-06, personal capacity), also 戴秉國 and 陳雲林.
- 陳菊 as Kaohsiung mayor met Beijing mayor 郭金龍 and Shanghai mayor 韓正 (May 2009, World Games), and TAO director 張志軍 in Kaohsiung (2014-06-27).
- 賴清德 as Tainan mayor visited Shanghai (June 2014, 陳澄波 exhibition, 復旦 discussion). The 楊雄 meeting rests on his own 2019 account.
- 邱垂正 attended the first Straits Forum (2009) as an academic. Two outlets confirm it, but it's deferred to N3.
Not found: DPP councillors or township heads at the Straits Forum 2010–16 (zh + en queries); a 劉淇 meeting in 2009; a TAO readout on gwytb.gov.cn for the 張志軍–陳菊 meeting (so it's T2, not T1).
Ready to promote: all 5 new edges have a URL and a verbatim quote on every evidence entry: hsieh-wang-yi-2012, chen-chu-beijing-2009, chen-chu-shanghai-2009, chen-chu-zhang-zhijun-2014, lai-shanghai-2014.
Schema gaps: none. Counterparts with no node (戴秉國, 陳雲林, 張志軍, 郭金龍, 韓正, 楊雄) are named in `notes`, and the edges target the hosting body or an existing node.
Next: N1b (the rest of N1, split off), then N2.

### 2026-10-03 · #2 · N1b DPP cross-strait contacts, part 2
Coverage: people DPP 4 → 6; cross-strait edges KMT 27 / DPP 5 → KMT 27 / DPP 8; evidence without URL 50 → 50
Log: docs/research/2026-10-03-dpp-cross-strait-2.md
Added: 3 nodes (hsu-jung-shu, fan-chen-tsung, cross-strait-forum-kmt-ccp), 5 edges (chen-chu-tianjin-2013, hsu-jung-shu-kmt-ccp-forum-2009, fan-chen-tsung-kmt-ccp-forum-2009, hsu-jung-shu-member-of-dpp, fan-chen-tsung-member-of-dpp). Changed: none
Found:
- 陳菊 met TAO director 張志軍 in Tianjin on 2013-08-10 (the N1 Inbox lead, now confirmed).
- 許榮淑 and 范振宗 attended the 2009 KMT–CPC forum in Changsha despite the DPP ban, and were expelled on 2009-07-27. An MJIB-published journal (展望與探索) is one of the sources.
Not found: a fetched source for 許信良 at the 2009 Straits Forum (China Daily returns 404) or for his 2009 party status; any source besides a 2026 KMT attack list for 李文忠, 鄭朝明 and 顏建發; PRC trips by 林佳龍 or 鄭文燦; a PRC counterpart for 蘇治芬's 2008 Beijing expo trip.
Ready to promote: all 5 new edges have a URL and a verbatim quote on every evidence entry.
Schema gaps: no relation type for party discipline (suspension or expulsion). It's recorded as member_of with an end date, plus notes.
Next: N2 (TPP and 柯文哲). Note that N1 and N1b gave DPP people `party_affiliations` but, except for 許榮淑 and 范振宗, no `member_of` edges (謝長廷, 陳菊). That fits under X3 or X7.
