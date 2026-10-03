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

### 2026-10-03 · #3 · N2 TPP and 柯文哲 (part 1)
Coverage: people TPP 0 → 2; cross-strait edges KMT 27 / DPP 8 / TPP 0 → KMT 27 / DPP 8 / TPP 4; evidence without URL 50 → 50
Log: docs/research/2026-10-03-tpp-ko-wen-je.md
Added: 3 nodes (tpp, ko-wen-je, huang-kuo-chang), 8 edges (ko-member-of-tpp, ko-tpp-chair, huang-member-of-tpp, huang-tpp-chair, ko-shanghai-forum-2015, ko-shanghai-forum-2017, ko-zhang-zhijun-2017, ko-shanghai-forum-2019). Changed: none
Found:
- The TPP was founded 2019-08-06 with 柯文哲 as chair. He resigned 2025-01-01 while detained. 黃國昌 won the 2025-02-15 by-election with 96.11%.
- 柯文哲 attended the twin-city forum in Shanghai in 2015, 2017 and 2019, meeting mayors 楊雄 and 應勇, and met TAO director 張志軍 on 2017-07-03.
- **Caveat:** all 4 of the "TPP" cross-strait edges predate the TPP. He was an independent mayor then. Coverage buckets by "ever a member", so read the TPP figure with that in mind.
Not found: the MOI party-register record (T1) for the TPP; 黃國昌's join date; any change to 柯文哲's membership after his indictment (not searched; see E1).
Ready to promote: ko-member-of-tpp, ko-tpp-chair, huang-member-of-tpp, huang-tpp-chair, ko-shanghai-forum-2015, ko-shanghai-forum-2017, ko-shanghai-forum-2019. Not ko-zhang-zhijun-2017: its 鏡週刊 evidence has quote null, though its other two sources are quoted.
Schema gaps: none new. The 「兩岸一家親」 remarks are statements, not ties, and will need a call in N2b (likely no edge).
Next: N2b (the rest of N2), then N3. Iteration #5 is due to re-rank Now.

### 2026-10-03 · #4 · N2b Twin-city forum, remaining rounds
Coverage: people KMT 15 → 16; cross-strait edges KMT 27 / DPP 8 / TPP 4 → KMT 30 / DPP 8 / TPP 6; evidence without URL 50 → 50
Log: docs/research/2026-10-03-twin-city-forum.md
Added: 1 node (chiang-wan-an), 5 edges (ko-shanghai-delegation-2016, ko-shanghai-delegation-2018, chiang-shanghai-forum-2023, chiang-shanghai-delegation-2024, chiang-shanghai-forum-2025). Changed: none
Found:
- Every round from 2015 to 2025 except 2020–22 now has a verdict. Taipei hosted in 2016 (Shanghai's United Front head 沙海林 led) and 2018 (deputy mayor 周波).
- 蔣萬安 went to Shanghai in 2023 and 2025 and hosted in Taipei in 2024. The 2025 round slipped from September to December.
- 柯文哲's 「兩岸一家親」 is documented (2019 quote read), but it's a statement, and no relation type fits it.
Not found: the 2020–22 rounds (not searched); the TPP's MOI party-register record (the search form can't be fetched, so it needs Jing's manual lookup, see the log); 蔣萬安's KMT membership source.
Ready to promote: ko-shanghai-delegation-2018, chiang-shanghai-forum-2023, chiang-shanghai-delegation-2024, chiang-shanghai-forum-2025. Not ko-shanghai-delegation-2016: its 風傳媒 quote is null.
Schema gaps: no relation type for a public statement endorsing or adopting a formula (e.g. 「兩岸一家親」). `criticizes` and `opposes` are negative only.
Next: N3 (current government's cross-strait structure, including 邱垂正 from N1). Iteration #5: re-rank Now first.

### 2026-10-03 · #5 · Re-rank, then N3 Current government's cross-strait structure
Re-rank (every 5 iterations): Now keeps N3 and N4 first. Cross-strait edges are still KMT 30 / DPP 8 / TPP 6. Promoted N5 (KMT side of the KMT–CPC forum) from Inbox, because the forum node added in N1b only had DPP attendees. Promoted X7 (thin nodes) from Next, extended to cover `member_of` for people added with unsourced party affiliations.
Coverage: people DPP 6 → 9, none 2 → 4; cross-strait edges unchanged except none 1 → 2 (邱垂正, party unverified); evidence without URL 50 → 50
Log: docs/research/2026-10-03-current-government.md
Added: 7 nodes (executive-yuan, straits-exchange-foundation, cho-jung-tai, chiu-chui-cheng, cheng-wen-tsan, wu-feng-shan, su-jia-chyuan), 7 edges (cho-premier, cho-appointed-by-lai, chiu-mac-chair, chiu-straits-forum-2009, cheng-sef-chair, wu-feng-shan-sef-chair, su-sef-chair). Changed: none
Found:
- 卓榮泰 became premier on 2024-05-20 (T1, Executive Yuan release). 邱垂正, previously SEF vice chair, became MAC chair the same day.
- The SEF has had three chairs since 2024: 鄭文燦 (resigned 2024-07-07 amid the graft case), 吳豊山 (2024-11-04 to 2025-12-18), and 蘇嘉全 (from 2026-01-23, appointed by Lai on 01-14).
- No official cross-strait meetings by the current government. The channels have been suspended since 2016 (unread summary). That's not an edge, but worth stating in the app's methodology text.
Not found: the 總統府 appointment order for 卓榮泰 (so appointed_by is T3); the MAC minister bio page (403); 邱垂正's party membership; 鄭文燦's SEF start date on a read page.
Ready to promote: cho-premier, chiu-mac-chair, chiu-straits-forum-2009, cheng-sef-chair, wu-feng-shan-sef-chair, su-sef-chair. Not cho-appointed-by-lai (T3, single source).
Schema gaps: none new.
Next: N4 (mirror of the media item: SET, FTV, TVBS, EBC, Mirror TV ownership).

### 2026-10-03 · #6 · N4 Media ownership, part 1 (三立, 民視, TVBS)
Coverage: media_org nodes 3 → 6; economic-layer edges 7 → 12; evidence without URL 50 → 50; people with ≤1 edge 7 → 11 (the four new media figures)
Log: docs/research/2026-10-03-media-ownership.md
Added: 8 nodes (set-tv, ftv, tvbs, minjian-investment, cher-wang, chen-wen-chi, chang-jung-hua, wang-ming-yu), 5 edges (cher-wang-owns-tvbs, chen-wen-chi-chairs-tvbs, chang-jung-hua-chairs-set, wang-ming-yu-chairs-ftv, minjian-investment-owns-ftv). Changed: none
Found:
- TVBS: 王雪紅's investment vehicles bought it from Hong Kong TVB in 2015–16 (96% per 今周刊 2017; family 65% per Mirror 2019). 陳文琦 has been chair since 2019.
- 三立: chair 張榮華, brother-in-law of the late founder 林崑海. The registry mirror shows directors' holdings only, so there's no ownership edge.
- 民視: 王明玉 became chair on 2019-04-02 after the 郭倍宏 dispute. The parent and largest shareholder is 民間投資 (one source, T3).
Not found: the MOEA registry (findbiz returned 403; the LawPlayer mirror works only when the 統編 is known); NCC approval of the TVBS transfer; 三立's shareholder structure.
Ready to promote: cher-wang-owns-tvbs, chen-wen-chi-chairs-tvbs, wang-ming-yu-chairs-ftv. Not chang-jung-hua-chairs-set (LawPlayer evidence has quote null) or minjian-investment-owns-ftv (T3).
Schema gaps: none.
Next: N4b (東森, 鏡電視, political ties and allegations for all five outlets, NCC records).

### 2026-10-03 · #7 · N4b Media ownership, part 2 (東森, 鏡電視, NCC)
Coverage: media_org nodes 6 → 8; enforcement-layer ruled_on edges +2; evidence without URL 50 → 50
Log: docs/research/2026-10-03-media-ownership-2.md
Added: 4 nodes (ebc, maode-international, mirror-tv, pei-wei), 4 edges (maode-owns-ebc, ebc-ncc-2018, mirror-tv-ncc-2022, pei-wei-chairs-mirror-tv). Changed: none
Found:
- 東森: 茂德 (張高祥) bought about 95% in 2017. The NCC approved it with 14 commitments on 2018-01-31, and in 2023 chased it for missing its programme-investment pledges.
- 鏡電視: the NCC approved its news channel on 2022-01-19 with 12 burdens, 14 conditions and 16 guidance items. 裴偉 was founding chair, 2020-05 to 2021-08-18.
Not found: 鏡電視's shareholders; whether the 茂德 deal closed (Investment Commission); the NCC record of the TVBS transfer; 東森's current chair.
Ready to promote: ebc-ncc-2018, mirror-tv-ncc-2022, pei-wei-chairs-mirror-tv, maode-owns-ebc (its ETtoday quote is the part before an ellipsis in the fetch output, so check it when promoting).
Schema gaps: none.
Next: N4c (political ties and T4 allegations for all five outlets, to the 旺旺 standard), then N5.

### 2026-10-03 · #8 · N4c Media mirror, part 3: political ties
Coverage: people DPP 9 → 10, none 9 → 10; evidence without URL 50 → 50
Log: docs/research/2026-10-03-media-political-ties.md
Added: 2 nodes (tsai-tung-jung, lin-kun-hai), 2 edges (tsai-tung-jung-chairs-ftv, lin-kun-hai-chairs-set). Changed: none
Found:
- 民視's founding chair was DPP legislator 蔡同榮 (stepped down 2003). 三立's late founder 林崑海 was the 「精神領袖」 of the DPP faction 湧言會.
- 東森's founder 王令麟 is a former three-term KMT legislator (one read source, so T3, not added).
- Domestic bias or interference allegations exist for all five outlets (TVBS and 韓國瑜; 東森 and 侯友宜; 三立 favouring the DPP; 民視 and 郭倍宏; 鏡電視's licence). None are recorded (see Schema gaps).
Not found: party office for 王雪紅, 陳文琦, 裴偉 or later chairs; 林崑海's party membership; 王令麟's personal 東森 stake on a read page.
Ready to promote: tsai-tung-jung-chairs-ftv, lin-kun-hai-chairs-set.
Schema gaps: (1) `reported_editorial_direction` maps to the cross_strait layer, so it can't hold domestic allegations without mislabelling them. (2) There's no entity type for party factions (湧言會/海派, 新潮流, …). (3) PRC *monitoring* of an outlet (the 2024 東森 case) isn't *direction*. All three parked in Needs Jing.
Next: N5 (KMT side of the 兩岸經貿文化論壇).

### 2026-10-03 · #9 · N5 KMT side of the 兩岸經貿文化論壇 (part 1)
Coverage: cross-strait edges KMT 30 → 34 (DPP 8, TPP 6, none 2 unchanged); people with ≤1 edge loses wu-poh-hsiung and eric-chu; evidence without URL 50 → 50
Log: docs/research/2026-10-03-kmt-ccp-forum.md
Added: 0 nodes, 4 edges (wu-poh-hsiung-kmt-ccp-forum-2010, wu-poh-hsiung-kmt-ccp-forum-2013, eric-chu-kmt-ccp-forum-2015, hung-hsiu-chu-kmt-ccp-forum-2016). Changed: cross-strait-forum-kmt-ccp (alias 兩岸和平發展論壇)
Found:
- 吳伯雄 led the 6th (2010, Guangzhou) and 9th (2013, Nanning) rounds as honorary chair. 朱立倫 opened the 10th (2015, Shanghai). 洪秀柱 attended only the group sessions of the renamed 2016 兩岸和平發展論壇 in Beijing.
- No round in 2014. Postponed from 2017 (summary).
Not found: a second source for 2009 (MJIB only); any fetched source for 2006, 2008 (China Daily mirror 404s); 2007, 2011, 2012 and post-2017 not yet searched.
Ready to promote: all 4 new edges.
Schema gaps: none.
Next: N5b (remaining forum rounds), then V1. Iteration #10 is due to re-rank.
