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

- [ ] **N2 · TPP and 柯文哲.** The 上海–臺北雙城論壇 (2015, 2017, 2019,
  and later rounds under 蔣萬安, which belong under KMT), 柯文哲's
  「兩岸一家親」 remarks, and the founding (2019) and leadership of the TPP:
  柯文哲, then 黃國昌 as chair from 2025. Add a `tpp` party node. *Done when:*
  the TPP has a node, member edges and its cross-strait edges.
- [ ] **N3 · Cross-strait edges for the current government.** MAC chair
  邱垂正, premier 卓榮泰, and SEF (海基會) leadership. Look for
  `position_held`, `appointed_by`, and any `met_officially_with` across
  the strait. *Why:* the government side of cross-strait policy is missing
  as a structure. *Carried over from N1:* 邱垂正 attended the 2009 Straits
  Forum as an academic. udn 9573918 and LTN 5476333 make it T2-ready (see
  `2026-10-02-dpp-cross-strait.md` §5). His party status is unverified.
- [ ] **N4 · Mirror of the media item.** 旺旺/中天 is in the data. Research
  ownership and political ties at 三立 (SET), 民視 (FTV), TVBS, 東森 and
  鏡電視 under the same rules: TWSE/MOEA registry filings for ownership
  (T1), NCC rulings (T1), and allegations of editorial direction as T4.
  *Done when:* each outlet has an ownership edge, or the log says why not.

### Make existing data trustworthy

- [ ] **V1 · Fill in the 6 flagged edges** from `seed-verification.md`
  ("Check these first"): `rao-song-tao-2025`, `fu-kun-chi-edu-jnu`,
  `want-want-owns-ctv` (公開資訊觀測站), `tsai-eng-meng-wang-yi-2008`,
  `ctv-taichung-tender-2025` (政府電子採購網), `hsia-straits-forum-2023`.
- [ ] **V2 · Fill in the 8 original §6 edges.** Find the URL and a verbatim
  quote for each: 總統府 releases, 新華社 readouts. These are the brief's
  T1 anchors, so they should be the first edges ready for promotion.
- [ ] **V3 · Education edges with low or medium confidence:**
  `hsia-edu-georgetown`, `hung-edu-truman`, `hung-edu-pccu`,
  `hsia-edu-nccu`. *Where:* 立法院 legislator profiles, 總統府 and 行政院
  official biographies.
- [ ] **V4 · Evidence with no URL** (50 entries). Work through them in
  batches of about 10, starting with T1. Done when `npm run coverage` shows
  0.

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
- [ ] **X7 · Fill in thin nodes.** 鄭麗文, 朱立倫 and 吳伯雄 each have ≤1
  edge. Add party roles, education and `member_of` from official records.
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
- Mirror: KMT attendees of the 兩岸經貿文化論壇 (e.g. 吳伯雄 led the 2009
  delegation) aren't linked to the new `cross-strait-forum-kmt-ccp` node.
  Same log, §2.
- September 2016: eight non-DPP magistrates and mayors met 張志軍 and
  俞正聲. KMT and independent side. Same log, §4.
- 陳菊's 2013 trip also went to Shenzhen, Xiamen and Fuzhou. Counterparts
  unchecked. Same log, §1.
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
