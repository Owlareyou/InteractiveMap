# Research log: media mirror, part 3, political ties (2026-10-03)

**Queue item:** N4c in [`QUEUE.md`](QUEUE.md). It covers political ties for
三立, 民視, TVBS, 東森 and 鏡電視 to the same standard as 旺旺 (see
[`2026-10-01-kmt-ccp-ties.md`](2026-10-01-kmt-ccp-ties.md) §4), with the
same search effort for each outlet. Only excerpts marked **(read)** are used
as quotes.

**Queries run:**
- 民視 創辦人 蔡同榮 民進黨 立委 創台 1996 董事長
- 三立 創辦人 林崑海 國大代表 民進黨 政治 背景
- 東森 王令麟 國民黨 立法委員 曾任 東森集團 創辦人
- 陳文琦 TVBS 挺韓 2019 趙少康 請辭 新聞 立場 爭議
- 三立 新聞 民進黨 介入 指控 政論節目 立場 NCC 裁罰 偏頗
- 民視 新聞 政治 介入 指控 郭倍宏 經營權 民進黨 2019 新聞部
- 東森 新聞 政治立場 指控 王令麟 國民黨 新聞部 介入
- 王令麟 出售 東森電視 21.32% 持股 茂德 2017

---

## Schema decision: domestic editorial allegations aren't recorded as edges

`reported_editorial_direction` is the only allegation type. It maps to the
**cross_strait** layer (spec decision 19 was written for the 旺旺/TAO case).
A domestic allegation recorded with it (e.g. "TVBS was directed to back
韓國瑜") would show up in the cross-strait layer, which would mislead.
Following the closed-vocabulary rule, **no domestic allegation edges were
added**. They're listed below for every outlet, so the gap is even. It's
parked in Needs Jing.

## Per-outlet verdicts

### 民視 (FTV): governance tie taken

| Source | Excerpt | |
|---|---|---|
| [TVBS 412223, 2003-06-09](https://news.tvbs.com.tw/life/412223) | 「被黨內同志羅文嘉點名，身兼民視董事長的立委蔡同榮心裡很不是滋味」 | **(read)** |
| [今周刊, 2003-09-04](https://www.businesstoday.com.tw/article/category/80392/post/200309040033/) | 「蔡同榮在陳水扁定出的「九五大限」之前，宣布辭去民視董事長職務。」 | **(read)** |

- **Taken:** `tsai-tung-jung-chairs-ftv`, T2. 蔡同榮 was a DPP legislator
  and 民視's founding chair. He stepped down in 2003 under the rule requiring
  parties, government and the military to leave the media (黨政軍退出媒體).
- **Allegations (search summary only, unread):**
  - 2017: reports that DPP figures encouraged shareholders to oppose
    郭倍宏. A major shareholder denied any contact.
  - 2019: chair 王明玉 said 郭倍宏 had made 民視 「政黨工具」.
  - 民間投資 held 49.7% (summary). That would upgrade `minjian-investment-owns-ftv`
    if confirmed on a read page.

### 三立 (SET): governance tie taken; faction link is a schema gap

| Source | Excerpt | |
|---|---|---|
| [TVBS 1716305, 2022-02-15](https://news.tvbs.com.tw/politics/1716305) | 「三立電視董事長林崑海辭世」; 「奉林崑海為精神領袖的民進黨的湧言會」 | **(read)** |
| [民報, 2025-08-19](https://www.peoplenews.tw/?p=4473) | 「…已故三立電視創辦人林崑海…3年前林崑海逝世，原總經理張榮華便接下董事長一職。」 | **(read)** (full sentence on the edge) |
| [The News Lens 137984](https://www.thenewslens.com/article/137984) | 403 | not used |

- **Taken:** `lin-kun-hai-chairs-set`, T2 (founder and chair, died
  2022-02-14).
- **Not modelled:** his role as the 「精神領袖」 of the DPP faction 湧言會
  (formerly 海派), which per a search summary includes legislators 管碧玲,
  趙天麟, 王定宇 and 林楚茵. There's no entity type for factions, so that's a
  schema gap. His party membership is **unverified**, so `party_affiliations`
  is empty.
- **Allegations (summaries only):**
  - The TPP alleged 三立 favoured the DPP during the 2024 campaign.
  - 三立 bought 27% of 中嘉 (a media-concentration question).

### TVBS: allegation only

- 鏡週刊 2019-08-11, [20190806fin001](https://www.mirrormedia.mg/story/20190806fin001),
  was read in N4. Its headline is 「陳文琦接TVBS董座挺韓惹議」. A summary
  adds that 陳文琦 pushed 《少康戰情室》 to back 韓國瑜, and that 趙少康
  offered to resign.
- Domestic allegation, so **not recorded** (see the schema decision).
- No party office was found for 王雪紅 or 陳文琦, so there's **no governance
  tie at T2 or above**.

### 東森 (EBC): former owner's party tie, not modelled; allegations noted

| Source | Excerpt | |
|---|---|---|
| [鏡週刊, 2017-05-10](https://www.mirrormedia.mg/story/amp/20170509fin014) | 「曾任三屆立委、國民黨黨員的王令麟」 | **(read)** |
| [公視 254038, 2013-11-01](https://news.pts.org.tw/article/254038) | 「東森國際創辦人王令麟早上出現在台北地檢署。他因為力霸、東森集團掏空案，遭判刑五年半定讞」 | **(read)** |
| [鏡週刊, 2017-11-02](https://www.mirrormedia.mg/story/20171102fin005) | 「擁有21.32%股權的東森國際發佈新聞稿表示，以37.78億元賣出手中21.32%的東森電視股權給茂德國際投資公司」 | **(read)** |

- **Not taken:**
  - 王令麟 as a node. His KMT membership has one read source (T3).
  - His personal 東森 stake (about 10–13.68%) appears in summaries only.
  - The 21.32% stake was held by the company 東森國際, not by him personally.
  - So he has no T1 or T2 edge, and under the new-people rule he isn't added.
    Lead in Inbox.
- **Enforcement:** his 力霸/東森 embezzlement conviction (5.5 years, final)
  belongs to E1.
- **Allegations:**
  - 2024-01: 黃國昌 (TPP) accused 東森 of favouring 侯友宜 (summary).
  - 2024-07, cross-strait: LTN reported PRC media monitoring a Taiwanese
    talk show's production, and MAC deputy 梁文傑 named the outlet as 東森
    ([Newtalk, 2024-07-08](https://newtalk.tw/news/view/2024-07-08/927053),
    **read**: the headline is 「自由時報稱陸媒盯梢 梁文傑：就是東森新聞台」).
    That's PRC *monitoring*, not *direction*, so `reported_editorial_direction`
    doesn't fit. Not recorded. Lead in Inbox.

### 鏡電視 (Mirror TV): allegation only

- 2022: a recording released by legislator 陳椒華 had 裴偉 allegedly saying
  the President had assured him the licence would pass (N4b log). This is an
  allegation of political interference in *licensing*, not editorial
  direction, and it's domestic. **Not recorded.**
- No party office was found for 裴偉 or the later chairs. **No governance
  tie at T2 or above.**

## Balance check

- Governance ties found and recorded: 民視 (DPP legislator as founding chair)
  and 三立 (founder linked to a DPP faction, with no party edge).
- 東森's KMT-member former owner is documented only at T3, so not recorded.
- TVBS and 鏡電視: none found.
- Domestic allegations exist for every outlet, against parties on both
  sides, and none are recorded, pending Jing's call.
