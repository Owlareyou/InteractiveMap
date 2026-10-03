# Research queue

The to-do list for the long research loop. State lives here and in
[`NOTES.md`](NOTES.md), not in the conversation, so a fresh session can pick
up where the last one stopped.

- **QUEUE.md** (this file): what is still to investigate, in priority order.
- **NOTES.md**: one short entry per iteration, appended, never rewritten.
- **`docs/research/YYYY-MM-DD-<topic>.md`**: the receipts (queries, URLs,
  excerpts, verdicts), as before. NOTES points to these; it doesn't repeat them.

---

## How to run one iteration

1. **Orient.** Read the last 3 entries of `NOTES.md` and run `npm run coverage`.
2. **Pick.** Take the first unchecked item under **Now**. Do one item per
   iteration. If it's bigger than about 10 edges or 15 sources, split it: do
   the first part and put the rest back as a new item directly below.
3. **Research.** Search in 中文 first, then English. Prefer T1 sources
   (government records, court judgments, company registries, official
   readouts). Fetch the page itself for any detail that goes into a `quote`.
4. **Log receipts** in `docs/research/<today>-<topic>.md`, in the same format
   as `2026-10-01-kmt-ccp-ties.md`: claim, URLs, excerpt, verdict (taken,
   not taken, or disputed). Record what you searched for and *didn't* find too.
5. **Edit data** in `data/nodes.json` and `data/edges.json`, then run
   `npm run validate` until it passes.
6. **Append to NOTES.md** using the template there, including the
   before → after line from `npm run coverage`.
7. **Update this file.** Tick the item, write its result in one line, and put
   new leads in **Inbox**, not at the top. Move anything that needs a call
   from Jing to **Needs Jing**.
8. **Commit** as `Research: <item id> <topic>`, one commit per iteration, so
   any iteration can be reverted on its own.

Every 5 iterations, re-rank **Now** from **Next** and **Inbox**, using what
`npm run coverage` says is thinnest.

## Rules (apply to every item)

- **Never invent.** No guessed URLs, quotes, dates or QIDs. Unknown means
  `null`. A search-engine summary is a lead, not a `quote`.
- **Quotes are verbatim** from a page you fetched and read, at most 2
  sentences. If the page can't be fetched (403, paywall), leave `quote` null
  and say so in the log.
- **Simplified Chinese in sources:** convert the quote to 正體 one
  character at a time and add 「引文原為簡體，已轉正體」 to the edge's
  `notes`. (Default until Jing decides. See Needs Jing.)
- **`review_status` stays `draft`.** Claude fills in `source_url` and
  `quote`. Jing promotes edges to `reviewed`. List edges that are ready for
  promotion in the NOTES entry.
- **Tiers follow the brief, §4.1.** T2 needs at least 2 *independent*
  outlets: two outlets reprinting the same CNA wire count as one source.
  Allegations are T4 and stay T4.
- **Enforcement edges:** an investigation is not an indictment, and an
  indictment is not a conviction. Use the relation type that matches the
  stage reached, and set `status: 'disputed'` while an appeal is pending.
- **Closed vocabularies.** If a tie doesn't fit an existing `RelationType`
  or `EntityType`, don't force it in. Log it under "Schema gaps" in NOTES.
- **Neutrality.** Put the same search effort into every party. Every item
  aimed at one party has a mirrored item for the others. If an item is
  skipped, its mirror is skipped too, or the gap is written down.
- **New people** need at least one T1 or T2 edge to be added. Don't add a
  node just to hang a T3 or T4 edge on it.

---

## Now

Ordered by what most improves the data's honesty first, then its breadth.
Each item reads: question, why it matters, where to look, done when.

### Neutrality gap

(N1–N5 done; see Done. N5b moved under V2 at the #10 re-rank.)

### Make existing data trustworthy

- [ ] **X7 · Fill in thin nodes** (promoted from Next at the #5 re-rank).
  鄭麗文, 朱立倫, 吳伯雄 and 謝長廷 each have ≤1 edge. Add party roles,
  education and `member_of` from official records. Also add `member_of`
  edges for 陳菊, 謝長廷, 蔣萬安, 卓榮泰, 鄭文燦 and 蘇嘉全, who have
  `party_affiliations` but no sourced membership edge.

### Empty layers and relation types

- [ ] **E1 · Enforcement, for every party.** Court judgments (司法院裁判書
  查詢 is T1) and indictments: 柯文哲 and 京華城 (indicted 2024-12);
  鄭文燦 (bribery case, 2024); 傅崐萁 (past securities convictions).
  Also prosecutions of PRC espionage involving staff of any party's
  officials (lead: 黃取榮). Use `indicted_by`, `ruled_on` and
  `investigated_by` strictly by the stage reached.
- [ ] **E2 · Political donations (`donor_to`).** Use the 監察院
  政治獻金公開查閱平台. Start with 旺旺 (the README has this as an open
  question), then the 5 largest corporate donors to each of the KMT, DPP
  and TPP in the most recent presidential cycle. If the platform can't be
  queried from here, write down exactly what Jing needs to look up by hand.
- [ ] **E3 · Family and spouse ties.** Only where both people are already
  nodes or qualify on their own: 連戰–連勝文 (`relative_of`); 傅崐萁–
  徐榛蔚 (`spouse`, Hualien magistrate); 朱立倫–高思博. Find the
  equivalents for DPP and TPP figures.
- [ ] **E4 · `coalition_with` and `endorsed`.** The November 2023 KMT–TPP
  talks (藍白合, which failed, so record them as an event with
  `status: 'historical'`), KMT–TPP cooperation in the 2024 legislature, and
  DPP nominations and endorsements in the 2026 local elections. Do both the
  KMT and the DPP, or neither.

## Next

- [ ] **V4b · Evidence with no URL, remaining 27** (moved from Now at #16).
  Batches 1–3 took it from 50 to 27. The rest need sites that were blocked
  on 2026-10-03 (CEC 404 and DNS failure, NCC, the 總統府 archive, HKEX) or
  a decision from Jing. Each entry and its route is in
  `2026-10-03-v4-batch3.md`. Retry when the CEC sites respond.

- [ ] **X1 · Wikidata QIDs.** Look up each node's QID on wikidata.org and
  check the label and description match. That makes this a research step,
  not a runtime fetch, so it's allowed under spec decision 2. Write a QID
  only when the label and one other fact (birth year, office) both match.
- [ ] **X2 · `bio_short_zh` / `bio_short_en`** for all 23 people. One line
  each, factual, from an official bio. No adjectives.
- [ ] **X3 · Verify `roles[]`.** These came from background knowledge on
  2026-10-01. Check them against official bios, and fill in the null vice
  chair dates.
- [ ] **X4 · `holds_prc_position`.** Taiwanese nationals in CPPCC (政協) or
  other PRC posts. *Where:* MAC enforcement announcements (T1) and court
  cases for the Cross-Strait Act's article 33. Be strict: name people only
  where a T1 or T2 source does.
- [ ] **X5 · Retired ROC generals at PRC events.** The 2016 Sun Yat-sen
  150th anniversary in Beijing and the 2015 parade. Lead: 吳斯懷, later a KMT
  legislator. Check the 國防部 and MAC responses.
- [ ] **X6 · Institutional channels, 2008–2016.** The 江陳會 / 海基會–
  海協會 talks and their signed agreements. These need `government_body`
  nodes for SEF and ARATS.
- [ ] **X8 · `participated_in_exchange`.** Local-level exchanges (township
  heads, councillors, temple pilgrimage delegations led by officials). For
  every party, only where an official or two-outlet record exists.

## Later

- [ ] **L1 · `criticizes` / `opposes` events.** Dated public statements
  between leaders, as events, from official transcripts only. These are
  high-noise, so do them last.
- [ ] **L2 · `mentor_of`.** Reported political mentorships, at T2 or above.
  Find candidates from coverage of every party. Don't start from names
  remembered without a source.
- [ ] **L3 · `business_partner` ties of the business figures already in
  the data.** Use the MOEA company registry (T1).
- [ ] **L4 · 2025 recall campaign (大罷免).** Who organised, endorsed or
  opposed it. Contested, so do it only with Jing's go-ahead.

## Inbox

New leads found during iterations land here with one line and a source.
They're re-ranked every 5 iterations.

- 許信良 at the 2009 Straits Forum, and his DPP status in 2009. A Xinhua
  item via China Daily (2009-05-18) returned 404. Needs a fetchable
  contemporaneous source. `2026-10-03-dpp-cross-strait-2.md` §3.
- 蘇治芬 (Yunlin, DPP): a Beijing produce expo in 2008, Shanghai and
  Shenzhen in 2011. No PRC counterpart identified yet. Same log, §4.
- September 2016: eight non-DPP magistrates and mayors met 張志軍 and
  俞正聲. KMT and independent side. Same log, §4.
- 陳菊's 2013 trip also went to Shenzhen, Xiamen and Fuzhou. Counterparts
  unchecked. Same log, §1.
- Twin-city forum 2020–22: were rounds held, or held online, and who took
  part? Not searched. `2026-10-03-twin-city-forum.md`.
- Why the 2025 forum slipped from September to December: udn 9020523 says
  「賴政府技術性卡關」. Unread. N3 is done, so this is open for whoever does E4 or L1. Same log.
- 柯文哲's 2015-03-30 「一五新觀點」 interview (新華社, CCTV, 中評社) and
  the TAO's 03-31 response. From a search summary only. Same log.
- The 總統府 appointment order for 卓榮泰 (2024-05-20) would make
  `cho-appointed-by-lai` T1. The MAC minister bio page returned 403.
  `2026-10-03-current-government.md`.
- Acting SEF chair 許勝雄 (2024-07 to 11): search summary only. Same log.
- Methodology text: say in the app that government-to-government
  cross-strait edges stop in 2016 because the PRC suspended the channels,
  not because of a data gap. Same log, §4.
- 王雪紅 and 陳文琦: Mirror 2019 calls him her husband (夫婿). It's a
  `spouse` candidate for E3, with one source so far.
  `2026-10-03-media-ownership.md` §1.
- 夏立言 spoke **by video** at the 2022 (14th) Straits Forum (公視 590010).
  A possible separate edge. `2026-10-03-v1-flagged-edges.md` §6.
- KMT–CPC forum rounds 2006–09 and 2011–12: confirmed held, but no
  fetchable T2 naming the KMT lead. Try www.chinadaily.com.cn (not the
  covid-19 mirror), 新華網, or the 國民黨 news archive.
  `2026-10-03-kmt-ccp-forum.md` Part 2.
- 王令麟: KMT member and former three-term legislator (鏡週刊 2017, one
  source), and 東森's founder. Needs a second source to qualify as a node.
  His 力霸/東森 conviction fits E1. `2026-10-03-media-political-ties.md`.
- 民間投資's 49.7% of 民視 (search summary) would upgrade
  `minjian-investment-owns-ftv` to T2 if read. Same log.
- The 統編 for 民間全民電視 and 聯利媒體 would allow registry checks via
  findbiz or LawPlayer. Same log.
- 謝長廷 reportedly dined with two PLA General Political Department major
  generals in October 2012 (search summary only). Source: same log, §1.
- People with no node who appear in N1 edges' `notes`: 戴秉國, 陳雲林
  (fits X6), 張志軍 (TAO director 2013–18), 郭金龍, 韓正, 楊雄.

## Needs Jing

Decisions the loop can't make. Park the item and carry on with the next.

- **Simplified-character quotes.** Is converting to 正體 with a note in
  `notes` acceptable, or should quotes from PRC sources stay `null` and the
  log keep the original? The current default is convert-and-note.
- **Who promotes to `reviewed`?** The current default: only Jing. Claude
  lists the edges that are ready.
- **TPP in the MOI party register:** the search form at party.moi.gov.tw
  can't be queried from here. Look up 「台灣民眾黨」 and paste the record's
  URL and registration date, which makes `ko-member-of-tpp` T1. See
  `2026-10-03-twin-city-forum.md`.
- **Statement edges:** is a schema change worth it for positive or neutral
  public statements (e.g. 柯文哲's 「兩岸一家親」)? Today only the negative
  `criticizes` and `opposes` exist. The default is to keep statements out of
  the graph.
- **Domestic media allegations:** `reported_editorial_direction` maps to
  the cross_strait layer. Should there be a domestic counterpart (e.g. in
  governance), or should domestic bias allegations stay out of the graph?
  Every outlet has some (`2026-10-03-media-political-ties.md`). Also: model
  party factions (湧言會, 新潮流, …) as nodes? And is PRC *monitoring* of an
  outlet (東森, 2024) a tie?
- **Manual registry lookups** (V1): MOPS 9928 insider holdings (is
  神旺投資 a 旺旺 entity?), and 政府電子採購網 for the 臺中國際會展中心 opening
  tender. Each would make an edge T1. See `2026-10-03-v1-flagged-edges.md`.
- **`fu-kun-chi-edu-jnu` status:** set to `disputed` in V1. Confirm, or
  revert to `historical`.
- **Two §6 characterisations** (V2): `lai-opposes-xi`. The inaugural
  speech says the ROC and PRC are 互不隸屬 but doesn't name Xi, so should
  the edge stay, be retargeted to `prc-government`, or go? And
  `ma-opposes-tsai` is too vague to source: replace it with dated
  `criticizes` events (L1), or drop it?
- **夏立言's education** (V3): `hsia-edu-nccu` is probably a master's
  (政大外交研究所) after a 輔大 law degree, per summaries of an NCCU
  interview that is now 404. Change the stage? `hsia-edu-georgetown` has no
  source at all: keep it as draft, or remove it?
- **Quotes for registry-style records:** LY member pages, Money-Link, and
  LawPlayer are tables with nothing sentence-like to quote. Is URL plus
  `quote: null` enough to promote such edges, or should a field value (e.g.
  「第 11 屆／中國國民黨／花蓮縣選舉區」) go in `quote`?
- **旺旺 donations** (from the README): the Control Yuan platform may need a
  manual lookup. See E2.

## Done

(Ticked items move here with their date, a one-line result, and a link to
their log.)

- [x] **N1 · DPP cross-strait contacts** (2026-10-02, #1). Added 5 T2 edges
  (謝長廷→王毅 2012; 陳菊 Beijing and Shanghai 2009; 陳菊–張志軍 2014;
  賴清德 Shanghai 2014). Cross-strait edges for DPP went from 0 to 5. The
  rest was split into N1b.
  [Log](2026-10-02-dpp-cross-strait.md)
- [x] **N1b · DPP cross-strait contacts, part 2** (2026-10-03, #2). Added
  陳菊–張志軍 in Tianjin (2013), and 許榮淑 and 范振宗 at the 2009
  KMT–CPC forum plus their expulsion. Cross-strait edges for DPP went from 5
  to 8. 許信良, 李文忠, 鄭朝明 and 顏建發 weren't taken (single or
  unfetchable sources). [Log](2026-10-03-dpp-cross-strait-2.md)
- [x] **N2 · TPP and 柯文哲, part 1** (2026-10-03, #3). Added the `tpp`
  node, 柯文哲 and 黃國昌 (membership and chair), 柯文哲's Shanghai forum
  rounds in 2015, 2017 and 2019, and the 2017 柯張會. All 4 cross-strait
  edges predate the TPP. The rest is in N2b. [Log](2026-10-03-tpp-ko-wen-je.md)
- [x] **N2b · Twin-city forum, rest** (2026-10-03, #4). Added the
  Taipei-hosted rounds of 2016 and 2018 (柯文哲) and the 2023, 2024 and 2025
  rounds (蔣萬安, new KMT node). 「兩岸一家親」 isn't an edge (schema gap).
  The MOI record went to Needs Jing. [Log](2026-10-03-twin-city-forum.md)
- [x] **N3 · Cross-strait structure of the current government** (2026-10-03,
  #5). Added 卓榮泰 as premier (T1), 邱垂正 as MAC chair and his 2009 Straits
  Forum attendance, and SEF chairs 鄭文燦, 吳豊山 and 蘇嘉全. No official
  cross-strait contact since 2016, by PRC suspension. Not an edge.
  [Log](2026-10-03-current-government.md)
- [x] **N4 · Media mirror, part 1** (2026-10-03, #6). TVBS (王雪紅
  ownership, chair 陳文琦), 三立 (chair 張榮華, no ownership source), 民視
  (chair 王明玉, parent 民間投資 at T3). The rest is in N4b.
  [Log](2026-10-03-media-ownership.md)
- [x] **N4b · Media mirror, part 2** (2026-10-03, #7). 東森 (茂德 owns
  about 95%; NCC approval 2018-01-31), 鏡電視 (NCC approval 2022-01-19;
  founding chair 裴偉; shareholders not found). Political ties are in N4c.
  [Log](2026-10-03-media-ownership-2.md)
- [x] **N4c · Media mirror, part 3: political ties** (2026-10-03, #8).
  蔡同榮 (DPP legislator) chaired 民視, and 林崑海 (DPP faction 湧言會) chaired
  三立. 王令麟 (KMT) has one source only. Domestic allegations are logged for
  all five outlets but not recorded (schema gap).
  [Log](2026-10-03-media-political-ties.md)
- [x] **N5 · KMT side of the 兩岸經貿文化論壇, part 1** (2026-10-03, #9).
  Linked 吳伯雄 (2010, 2013), 朱立倫 (2015) and 洪秀柱 (2016, renamed
  forum), all T2. The rest is in N5b. [Log](2026-10-03-kmt-ccp-forum.md)
- [x] **V1 · The 6 flagged edges** (2026-10-03, #10). 饒慶鈴–宋濤 now
  rests on two independent reports. 夏立言 2023 went from T3 to T2. CTV's
  51.20% is explained. 傅崐萁's degree is set to disputed. MOPS and
  e-procurement lookups are left for Jing. [Log](2026-10-03-v1-flagged-edges.md)
- [x] **V2 · The 8 original §6 edges** (2026-10-03, #11). T1 URLs and
  quotes for the three leader meetings and Lai's inaugural speech. Reuters
  replaced by TVBS for 夏立言 2023. The 2017 appointment order wasn't found.
  `ma-opposes-tsai` went to Needs Jing. [Log](2026-10-03-v2-anchor-edges.md)
- [x] **N5b · KMT–CPC forum, remaining rounds** (2026-10-03, #12). The
  2026-02 revival (蕭旭岑, 「兩岸交流合作前瞻論壇」) was added at T2. The
  2006–09 and 2011–12 rounds have verdicts but no T2 KMT lead (China Daily
  404s). [Log](2026-10-03-kmt-ccp-forum.md)
- [x] **V3 · Education edges with low or medium confidence** (2026-10-03,
  #13). Both 洪秀柱 edges confirmed against her LY profile (T1). The two
  夏立言 edges were not confirmed and are flagged (政大 is probably a
  master's; no source for Georgetown). [Log](2026-10-03-v3-education.md)
- [~] **V4 · Evidence with no URL, batches 1–3** (2026-10-03, #14–16). 50 →
  27. The remainder (blocked sources) moved to Next as V4b.
  [Logs](2026-10-03-v4-batch3.md)
