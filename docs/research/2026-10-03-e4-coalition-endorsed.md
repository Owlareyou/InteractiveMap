# Research log: E4, `coalition_with` and `endorsed` (2026-10-03)

**Queue item:** E4 in [`QUEUE.md`](QUEUE.md). The rule: do both the KMT and
the DPP, or neither. Only excerpts marked **(read)** are quoted.

**Queries run:**
- 藍白合 2023年11月15日 馬英九 協議 侯友宜 柯文哲 六點共識 破局 11月23日
- 國民黨 民眾黨 立法院 合作 2024 韓國瑜 院長 民眾黨團 支持 藍白 國會改革 聯手
- 藍白 聯手 三讀 國會改革法案 2024年5月28日 國民黨 民眾黨 立委 通過
- 2026 九合一 縣市長 提名 民進黨 徵召 國民黨 提名 蔣萬安 連任 台北市長 提名 名單

## Coalition (KMT–TPP)

| Edge | What | Sources (**read**) |
|---|---|---|
| `kmt-tpp-coalition-2023` (event, `historical`, undirected) | The 2024 presidential 「藍白合」. A six-point consensus on 2023-11-15 at 馬英九's office **collapsed** at the 2023-11-23 君悅 meeting. The coalition never formed | [TVBS 2308130, 2023-11-17](https://news.tvbs.com.tw/politics/2308130): 「「藍白合」於15日協商達成六點共識，預估明（18）日公布民調結果，決定正副人選」; [NOWnews 6307920, 2023-11-24](https://www.nownews.com/news/6307920): 「藍白合正式宣告破局！…」 |
| `kmt-tpp-legislature-2024` (event, undirected) | The KMT and TPP jointly passed the 國會改革 bills in third reading on 2024-05-28. **Recorded as a dated event, not an ongoing coalition state**, because the sources show joint votes, not a formal pact | [今周刊 202405290003](https://www.businesstoday.com.tw/article/category/183027/post/202405290003/): 「國民黨與民眾黨聯手強勢通過表決，終讓『國會改革』相關修正法案在5月28日全數三讀通過。」; [TVBS 2488729, 2024-05-17](https://news.tvbs.com.tw/politics/2488729), headline: 「近身肉搏戰藍白聯手首役告捷　黃國昌順利遞國會改革案」 |

**Also found, not recorded:** in the 2024-02-01 Speaker election, the TPP's
8 legislators didn't vote in the second round, and 韓國瑜 won (summary).
That's a non-vote, not cooperation.

**Not searched:**
- DPP–TPP or DPP–other coalitions. The queue item only named KMT–TPP.
- 2026 local-election KMT–TPP cooperation. The CNA list shows **no TPP
  candidate in Taipei**, which may reflect cooperation, but no read source
  says so. Inbox.

## Endorsements (2026 local elections, Taipei)

| Edge | Sources |
|---|---|
| `kmt-endorsed-chiang-2026` (KMT → 蔣萬安, incumbent) | [中央社 202609045002, 2026-09-04](https://cna.com.tw/news/aipl/202609045002.aspx), the registration list: 「蔣萬安 中國國民黨」; [公視 801606](https://news.pts.org.tw/article/801606), the candidate list. Both **read**, both tables, so **quote is null** |
| `dpp-endorsed-shen-2026` (DPP → 沈伯洋) | Same two sources. New node `shen-po-yang` (DPP) |

**Mirror:** both main parties' nominees in the same race. Other races (新北
李四川 / 蘇巧慧, 桃園 張善政 / 黃世杰, 台中 江啟臣 / 何欣純) are in the same
sources, but the candidates aren't nodes. Adding them all would be a
breadth task. Inbox.

**Taipei's other candidates** (CNA, read): 郭璽 (台灣麻將最大黨), 蕭文乾,
唐新民, 林志成 (independent). Not added.
