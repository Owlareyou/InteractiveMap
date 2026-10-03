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

### 2026-10-03 · #10 · Re-rank, then V1 The six flagged seed edges
Re-rank (every 5 iterations): the neutrality items are done except N5b, which adds more KMT forum rounds. Coverage's thinnest spot is still trust: 50 evidence entries without a URL, unchanged since the baseline. So V1 and V2 move ahead of N5b. Order now: V1, V2, N5b, V3, V4, X7, E1–E4.
Coverage: tiers T3 6 → 5 (hsia-straits-forum-2023 → T2); evidence without quote 125 → 119; evidence without URL 50 → 50 (none of the six had URL-less evidence except 旺旺月刊, which is a print source)
Log: docs/research/2026-10-03-v1-flagged-edges.md
Added: 0 nodes, 0 edges. Changed: rao-song-tao-2025 (evidence replaced, start 2025-01-04), fu-kun-chi-edu-jnu (quotes; status → disputed), want-want-owns-ctv (51.20% = 神旺投資 49.79% + 正聲廣播 1.41%), tsai-eng-meng-wang-yi-2008 (+LTN 2019 source), ctv-taichung-tender-2025 (quote), hsia-straits-forum-2023 (specific sources; T3 → T2)
Found:
- The 饒慶鈴–宋濤 meeting (2025-01-04, 釣魚台國賓館) is reported as fact by two independent outlets. "Violation" remains the MAC's word.
- CTV's 51.20% is two 旺旺-group insiders.
- 傅崐萁's doctorate: CNA's profile lists it, and Newtalk says it was removed from his legislator profile. Set to `disputed` (my judgement, please check).
Not found: MOPS and 政府電子採購網 records (both need JavaScript, so manual lookups are listed for Jing in the log); 天下 11525 (403 again).
Ready to promote: rao-song-tao-2025, hsia-straits-forum-2023, fu-kun-chi-edu-jnu (as disputed). Not the other three (null quotes or a single source).
Schema gaps: none.
Next: V2 (the 8 original §6 edges).

### 2026-10-03 · #11 · V2 The brief's 8 original §6 edges
Coverage: evidence without URL 50 → 43; without quote 119 → 113
Log: docs/research/2026-10-03-v2-anchor-edges.md
Added: 0 nodes, 0 edges. Changed: ma-xi-2015-singapore, ma-xi-2024-beijing, hung-xi-2016, hsia-prc-visits-2023 (Reuters → TVBS; start 2023-02), lai-opposes-xi, lai-appointed-by-tsai-2017 (+TVBS), hung-member-of-kmt (LY URL)
Found:
- T1 pages for 3 of the 3 leader meetings: the 總統府 English release (2015), and Xinhua via gov.cn (2024) and via CSIS translation (2016).
- Lai's inaugural speech text in 總統府公報 7721 (互不隸屬). It doesn't name Xi.
- The 總統府 "File/Doc" links are .docx files.
Not found: the 2017 總統府 appointment order for 賴清德 (gazette issue not located); a Reuters report for 夏立言 2023 (replaced). ma-opposes-tsai not researched (too vague as specified).
Ready to promote: ma-xi-2015-singapore, ma-xi-2024-beijing, hsia-prc-visits-2023, hung-xi-2016 (its KMT-release entry still has no URL).
Schema gaps: none. Two calls for Jing: lai-opposes-xi (the speech doesn't name Xi) and ma-opposes-tsai (too vague to source).
Next: N5b (remaining KMT–CPC forum rounds), then V3.

### 2026-10-03 · #12 · N5b KMT–CPC forum, remaining rounds
Coverage: cross-strait edges KMT 34 → 35; evidence without URL 43 → 43
Log: docs/research/2026-10-03-kmt-ccp-forum.md (Part 2)
Added: 1 node (hsiao-hsu-tsen), 1 edge (hsiao-hsu-tsen-kmt-ccp-forum-2026). Changed: cross-strait-forum-kmt-ccp (alias 兩岸交流合作前瞻論壇)
Found:
- The KMT–CCP forum was revived as a think-tank format, 「兩岸交流合作前瞻論壇」, in Beijing on 2026-02-02 to 04, led by vice chair 蕭旭岑.
- The 2011 (Chengdu) and 2012 (Harbin) rounds are confirmed, but read sources don't name the KMT lead.
Not found: fetchable sources for the 2006, 2007, 2008 and 2009 (second source) rounds. China Daily is consistently 404 on the covid-19 mirror. Whether a separate 2nd round existed in 2006 is unresolved.
Ready to promote: hsiao-hsu-tsen-kmt-ccp-forum-2026.
Schema gaps: none. One judgement call: the 2026 forum is folded into the same node (see log).
Next: V3 (education edges with low or medium confidence).

### 2026-10-03 · #13 · V3 Education edges with low or medium confidence
Coverage: evidence without URL 43 → 41; without quote 113 → 111
Log: docs/research/2026-10-03-v3-education.md
Added: 0 nodes, 0 edges. Changed: hung-edu-pccu, hung-edu-truman (LY URL and quotes; degree 教育學碩士), hsia-edu-nccu and hsia-edu-georgetown (notes only: flagged)
Found:
- 洪秀柱's 立法院 profile confirms 文化大學 law and a 杜魯門大學 master's in education.
- 夏立言: summaries of an NCCU alumni interview say 輔大 law, then 政大's graduate institute of diplomacy. That would make hsia-edu-nccu a master's, not a bachelor's.
Not found: any source for 夏立言 at Georgetown; the NCCU interview PDF itself (404); the MAC minister bio (403).
Ready to promote: hung-edu-pccu, hung-edu-truman.
Schema gaps: none.
Next: V4 (evidence with no URL, in batches of about 10, T1 first).

### 2026-10-03 · #14 · V4 Evidence with no URL, batch 1
Coverage: evidence without URL 41 → 34; without quote 111 → 105
Log: docs/research/2026-10-03-v4-batch1.md
Added: 0 nodes, 0 edges. Changed: lai-edu-ntu, lai-edu-ncku, lai-edu-harvard, cheng-xi-2026, lien-xi-2013, chu-xi-2015, lien-xi-2014 (URL only)
Found: the 總統府 English page for 賴清德 covers all three of his education edges. Xinhua readouts for 2013, 2015 and 2026 (via gov.cn and CSIS translations).
Not found: official 總統府 biographies of 馬英九 or 蔡英文; a clean quote for 連習會 2014. rmzxw.com.cn failed DNS today.
Ready to promote: lai-edu-ntu, lai-edu-ncku, lai-edu-harvard, cheng-xi-2026, lien-xi-2013, chu-xi-2015.
Schema gaps: none.
Next: V4 batch 2 (Xinhua biographies for wang-yi-tao, song-tao-tao, xi-*; LY legislator profiles; lien-xi-2015).

### 2026-10-03 · #15 · Re-rank (no change), then V4 batch 2
Re-rank (every 5 iterations): order unchanged (V4, X7, E1–E4). V4 still has 34 URL-less entries, and X7 (13 people with ≤1 edge, several with unsourced party affiliations) is an honesty fix. Enforcement is the thinnest layer (5 edges), so E1 follows X7.
Coverage: evidence without URL 34 → 28; without quote 105 → 103
Log: docs/research/2026-10-03-v4-batch2.md
Added: 0 nodes, 0 edges. Changed: xi-member-of-ccp, xi-edu-tsinghua-2002, fu-legislator, chen-yu-jen-legislator, lo-ming-tsai-legislator, han-speaker (+PTS), fu-kun-chi-edu-jnu (notes)
Found: the 2022 Xinhua leadership biographies (party membership and doctorate); 立法院 11th-term profiles for four KMT legislators. 傅崐萁's LY profile omits the 暨南 doctorate.
Not found: a reliable 1975–79 Tsinghua line (the fetch looked garbled, so it wasn't used); 王毅's TAO term in his 2022 biography; a first-party page for 宋濤's appointment.
Ready to promote: xi-member-of-ccp, xi-edu-tsinghua-2002. The LY legislator edges have URLs but null quotes (table fields). Jing may accept URL-only for registry-style records.
Schema gaps: none.
Next: V4 batch 3 (see the log's candidate list).

### 2026-10-03 · #16 · V4 batch 3, and V4 moved to Next
Coverage: evidence without URL 28 → 27; without quote 103 → 102
Log: docs/research/2026-10-03-v4-batch3.md
Added: 0 nodes, 0 edges. Changed: wang-yi-tao (URL, discrepancy noted), ctitv-licence-denied-2020 (PTS quote, +TechNews)
Found: little this batch. 王毅's 人民網 biography (term dates disagree with the edge: 2008-09 vs 2008-06, unresolved).
Not found: CEC bulletins (404 and DNS failure), the NCC release, 連習會 2015 (rmzxw DNS), a TAO page naming 宋濤.
Ready to promote: none new.
Schema gaps: none.
Decision: V4 → Next as V4b, with all 27 remaining entries listed in the log with a route for each. Most need blocked sites or a decision from Jing. Continuing with X7.
Next: X7 (thin nodes and unsourced party affiliations).

### 2026-10-03 · #17 · X7 Thin nodes and unsourced party affiliations
Coverage: edges 123 → 130; people with ≤1 edge 13 → 9 (remaining are the media and SEF figures); evidence without URL 27 → 27
Log: docs/research/2026-10-03-x7-thin-nodes.md
Added: 0 nodes, 7 edges (chen-chu-member-of-dpp, hsieh-member-of-dpp, cho-member-of-dpp, cheng-wen-tsan-member-of-dpp, su-jia-chyuan-member-of-dpp, cheng-li-wun-member-of-kmt, cheng-li-wun-kmt-chair). Changed: none
Found: party roles for every DPP figure added in N1 and N3 (acting chair, chair, secretary-general), and 鄭麗文's 2025-10-18 KMT chair election (50.15%).
Not found: a quotable source naming 蔣萬安's party (the 2022 win is confirmed; party not stated in quotes); join dates.
Ready to promote: all 7 new edges.
Schema gaps: none.
Next: E1 (enforcement, for every party).

### 2026-10-03 · #18 · E1 Enforcement, for every party
Coverage: enforcement-layer edges 5 → 11; `indicted_by` now used; people DPP 10 → 11 (黃取榮)
Log: docs/research/2026-10-03-e1-enforcement.md
Added: 6 nodes (5 prosecutors' offices and courts, huang-chu-jung), 6 edges (ko-indicted-2024, ko-ruled-2026, cheng-wen-tsan-indicted-2024, fu-ruled-2018, fu-ruled-2020, huang-chu-jung-ruled-2026). Changed: none
Found:
- TPP: 柯文哲 was indicted on 2024-12-26 and convicted at first instance on 2026-03-26 (17 years, appealable).
- DPP: 鄭文燦 was indicted on 2024-08-27 (trial ongoing). Former DPP member 黃取榮 (expelled 2025-05) had his espionage sentence cut to 6 years on appeal (2026-06-25).
- KMT: 傅崐萁 has two final insider-trading convictions (2018, 2020). The first offence was while he was a PFP legislator.
Not found or not done: 司法院 judgments (T1); appeal outcomes; 鄭文燦's verdict; espionage cases involving KMT or TPP officials' staff (not searched, so split into E1b for balance).
Ready to promote: all 6 new edges.
Schema gaps: none (no PFP node; party at the time recorded in notes).
Next: E1b (espionage cases involving KMT and TPP officials' staff), then E2.

### 2026-10-03 · #19 · E1b Espionage cases, the other parties
Coverage: enforcement-layer edges 11 → 14; tiers T3 5 → 6
Log: docs/research/2026-10-03-e1b-espionage-balance.md
Added: 2 nodes (lin-yueh-lung, chen-wei-jen), 3 edges (lin-yueh-lung-investigated-2025, chen-wei-jen-investigated-2020, chen-wei-jen-ruled-2022). Changed: ko-ruled-2026 (+CNA: both sides appealed; second instance opened 2026-09-08)
Found:
- KMT-linked: 林岳龍 (aide to three KMT legislators) was investigated in 2025-06 (bail, no indictment found). 陳惟仁 (aide to a KMT legislator) has a final 10-month national-security conviction (2022).
- TPP-linked: searched, no staff espionage case found.
- Another DPP-linked case (朱政騏, indicted 2026-04) is in Inbox.
Not found: whether 黃取榮 appealed; 林岳龍's indictment; the outcome for 林雍達.
Ready to promote: lin-yueh-lung-investigated-2025, chen-wei-jen-investigated-2020. Not chen-wei-jen-ruled-2022 (T3).
Schema gaps: none. Attribution note: aides have no party, so coverage counts them as "none".
Next: E2 (political donations).

### 2026-10-03 · #20 · Re-rank (no change), then E2 Political donations
Re-rank (every 5 iterations): Now is E2, E3, E4. All three fill never-used relation types. Order kept.
Coverage: unchanged (no data edits)
Log: docs/research/2026-10-03-e2-donations.md (+ CSV extract of 1,131 rows)
Added: 0 nodes, 0 edges. Changed: none
Found:
- The Control Yuan platform has a usable JSON API (/api/v1/search). Parameters are documented in the log.
- 旺旺: no donation from 旺旺-group entities in itemised records. 中時, 中天, 中視 and 旺旺友聯 appear only as payees (ads, subscriptions, insurance). Large-party (KMT/DPP) accounts aren't itemised through this API.
- 2024 presidential corporate donations: 賴 NT$166.7m (580 records), 侯 NT$54.3m (148), 柯 NT$17.3m (643). Many donors hit NT$1m (91, 36 and 6), so "top 5" is arbitrary. 3 companies gave the maximum to both 賴 and 侯.
Not found: the large-party donor lists; whether NT$1m is the statutory cap (not checked against the law text).
Ready to promote: none (no edges).
Schema gaps: none.
Next: E3 (family and spouse ties).

### 2026-10-03 · #21 · E3 Family and spouse ties
Coverage: personal-layer edges 19 → 22; `spouse` now used; T3 6 → 7
Log: docs/research/2026-10-03-e3-family.md
Added: 1 node (hsu-chen-wei), 4 edges (lien-chan-sean-lien, fu-kun-chi-hsu-chen-wei, cher-wang-chen-wen-chi, chang-jung-hua-owns-set [T3]). Changed: chang-jung-hua-chairs-set (notes)
Found:
- 連戰–連勝文 (father and son), 傅崐萁–徐榛蔚 (spouses), 王雪紅–陳文琦 (spouses).
- 三立 shareholding: 張榮華 48%, 林崑海 and 張秀 24% each (鏡週刊 2023, single source).
Not taken: 朱立倫–高思博 (relation not stated on a read page), 林崑海–張榮華 (sources conflict on 妻弟 vs 同居女友's brother), 許榮淑–張俊宏 (unsourced; 張 not a node). TPP: no qualifying pair.
Ready to promote: lien-chan-sean-lien, fu-kun-chi-hsu-chen-wei, cher-wang-chen-wen-chi.
Schema gaps: none.
Next: E4 (coalition_with and endorsed). It's the last item in Now.

### 2026-10-03 · #22 · E4 coalition_with and endorsed (last item in Now)
Coverage: edges 143 → 147; `endorsed` and `coalition_with` now used. Never-used types are down from 10 (baseline) to 6.
Log: docs/research/2026-10-03-e4-coalition-endorsed.md
Added: 1 node (shen-po-yang), 4 edges (kmt-tpp-coalition-2023, kmt-tpp-legislature-2024, kmt-endorsed-chiang-2026, dpp-endorsed-shen-2026). Changed: none
Found: the failed 2023 藍白合 (agreed 11-15, collapsed 11-23); the KMT–TPP joint passage of the 國會改革 bills (2024-05-28); 2026 Taipei nominees 蔣萬安 (KMT) and 沈伯洋 (DPP).
Not found or not done: other 2026 races (candidates aren't nodes); whether the KMT and TPP cooperate in 2026 (no TPP candidate in Taipei, cause unsourced).
Ready to promote: kmt-tpp-coalition-2023, kmt-tpp-legislature-2024. The endorsement edges have URLs but table-only sources (quote null).
Schema gaps: none.
Next: **Now is empty.** The loop stops here, as instructed ("until the Now section is done"). Next, Later, Inbox and Needs Jing remain for Jing to re-rank.

### 2026-10-03 · Session summary (iterations #1–#22)
Coverage, baseline → now:
- nodes 54 → 97; edges 77 → 147
- cross-strait edges by Taiwan-side party: KMT 27 / DPP 0 / TPP 0 → KMT 35 / DPP 8 / TPP 6 (all 6 TPP edges predate the TPP; see #3)
- evidence without URL 50 → 27; never-used relation types 10 → 6
- enforcement layer 3 → 14 edges
Biggest open decisions are in QUEUE.md under Needs Jing: statement edges, domestic media allegations, party factions, `donor_to` choice, the two §6 characterisation edges, 夏立言's education edges, URL-only evidence for registry tables, and the manual lookups (MOPS, e-procurement, MOI party register, CEC).
