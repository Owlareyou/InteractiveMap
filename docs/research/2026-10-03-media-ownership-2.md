# Research log: media ownership, part 2 (東森, 鏡電視, NCC) (2026-10-03)

**Queue item:** N4b in [`QUEUE.md`](QUEUE.md), part (a) only. Part (b),
political ties and editorial allegations for all five outlets, is split
into N4c. Conventions are as in
[`2026-10-03-media-ownership.md`](2026-10-03-media-ownership.md). Only
excerpts marked **(read)** are used as quotes.

**Queries run:**
- 東森電視 股權 2017 王令麟 買回 凱雷 董事長 NCC 核准
- NCC 核准 東森電視 股權轉讓 張高祥 茂德 2018 附款 東森 董事長
- 鏡電視 NCC 核准 2022 裴偉 持股 鏡傳媒 股東 董事長 / 鏡電視 最大股東 持股比例 董事長 2024 2025 鏡電視 股權結構
- NCC 新聞稿 鏡電視 新聞台 申設案 核准 2022年1月19日 負擔 附款
- NCC 核准 TVBS 股權轉讓 聯意製作 利茂 德恩 連信 2015 附款
- 裴偉 辭去 鏡電視董事長 2021年5月 陳建平 接任

---

## 1. 東森 (EBC) → `maode-owns-ebc` (T2), `ebc-ncc-2018` (T2)

**Background** (from search summaries, not edges):
- 2016-10: Carlyle sold EBC to 台數科.
- 2017-05: the NCC rejected that sale. 2017-08: MOEA's Investment Commission
  rejected it too.
- 王令麟 sued over his right of first refusal.
- 2017-11: 茂德's 張高祥 agreed to buy, and 王令麟 sold his 21.32%.

| Source | Excerpt | |
|---|---|---|
| [鏡週刊, 2017-11-08](https://www.mirrormedia.mg/story/amp/20171106fin012) | 「這次茂德機構總裁張高祥以160億元買下東森電視95%股權」 | **(read)** |
| [ETtoday, 2018-01-31](https://finance.ettoday.net/news/1104539) | 「國家通訊傳播委員會（NCC）今天（31日）審查同意「茂德國際收購東森電視案」」 | **(read)**. The fetch tool returned this sentence followed by an ellipsis. Only the part before the ellipsis is used |
| [中央社, 2023-08-16](https://www.cna.com.tw/news/afe/202308160224.aspx) | 「東森電視2018年提報股權交易案有14項承諾待履行」 | **(read)** |
| [鏡週刊 20180116fin009](https://www.mirrormedia.mg/story/amp/20180116fin009) | About the 2018-01-16 NCC hearing. No approval language | read, not used |

**Verdict:**
- Ownership edge taken, T2, about 95%.
- **Not verified:** that the deal closed after the Investment Commission's
  approval. The CNA piece from 2023 treats the 2018 transaction as standing.
- The NCC edge is `ruled_on`, an approval with 14 commitments. Valence is
  `neutral`. By comparison, the CTi licence refusal is `negative`.
- **Not done:** EBC's current chair, the 2017 NCC rejection of 台數科, and
  張高祥 as a node (no edge of his own beyond the company's).

## 2. 鏡電視 (Mirror TV) → `mirror-tv-ncc-2022` (T2), `pei-wei-chairs-mirror-tv` (T2)

| Source | Excerpt | |
|---|---|---|
| [公視 643655, 2023-06-28](https://news.pts.org.tw/article/643655) | 「2022年1月19日，NCC核准鏡電視新聞台申設案，是繼2012年UDN新聞台後，近10年首度獲准申設的新聞台，不過NCC也附帶通過12項負擔、14項附款以及16項行政指導等決議。」; 「2020年5月，鏡電視獲經濟部商業司核准設立，首任董事長為裴偉，創設外部公評人制度，確保新聞內容符合正確、平衡、公平。」 | **(read)** |
| [Newtalk, 2022-01-19](https://newtalk.tw/news/view/2022-01-19/698916) | 「許可衛星廣播電視「鏡電視新聞台」申設，並就其未來營運附加附款及行政指導。」 | **(read)** |
| [NOWnews, 2022-03-10](https://www.nownews.com/news/5741021) | 「《鏡電視》2021年7月9日稱裴偉已辭去董事長，但裴是在8月18日才辭職」 | **(read)** |
| [Newtalk, 2022-09-28](https://newtalk.tw/news/view/2022-09-28/823532) | Names 裴偉 as chair of 鏡傳媒. No shareholdings | read, not used |

**Verdict:**
- The NCC approval and 裴偉's first chairmanship (2020-05 to 2021-08-18)
  are taken, both T2.
- **No ownership edge.** No read source gives 鏡電視's shareholders or
  percentages. The NCC conditions required dispersed shareholding, and
  required shareholders with 5% or more to sign the editorial charter.
- Later chairs: 陳建平, then 李永豐 from 2022-03-04, then 鄭優 (2022
  reporting). From summaries only. Not taken.

**Political allegations: noted, not recorded here (N4c):**
- During the licensing, 立委陳椒華 released a recording of a 2021-12-17
  shareholder meeting in which 裴偉 allegedly said the President had assured
  him the licence would pass. Premier 蘇貞昌 dismissed the claim.
- That's an allegation, so at most T4. It belongs in N4c with the other
  outlets' allegations, to the same standard.

## 3. TVBS share transfer, NCC record: not found

The search didn't return the NCC decision on the 2015–16 transfer to 利茂,
德恩 and 連信, or its conditions. A TVBS-hosted PDF of news rules
(cc.tvbs.com.tw, 2020) came up but isn't relevant. Carried to N4c.
