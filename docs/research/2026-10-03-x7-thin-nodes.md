# Research log: X7, thin nodes and unsourced party affiliations (2026-10-03)

**Queue item:** X7 in [`QUEUE.md`](QUEUE.md). It adds sourced `member_of`
edges for people whose `party_affiliations` were entered without a source,
plus the thin nodes 鄭麗文, 朱立倫, 吳伯雄 and 謝長廷. 朱立倫 and 吳伯雄
already had more than one edge after N5. The CEC was unreachable (see V4),
so each edge uses two independent outlets. Party press releases
(dpp.org.tw) are typed `other`. Only excerpts marked **(read)** are quoted.

**Queries run:**
- 民進黨 代理主席 陳菊 2018 卸任 謝長廷 前民進黨主席 黨主席 2008 / 陳菊 接任 民進黨代理主席 2012年1月 …
- 蘇嘉全 民進黨秘書長 2012 副總統候選人 民進黨 鄭文燦 民進黨副主席 桃園市長
- 卓榮泰 當選 民進黨主席 2019年1月6日 補選 得票
- 謝長廷 民進黨主席 辭職 2008 敗選 總統候選人 民進黨提名
- 鄭文燦 民進黨籍 桃園市長 連任 2018 … 蔣萬安 國民黨籍 台北市長 當選 2022 / 國民黨籍 台北市長 蔣萬安 當選 2022年11月26日 …
- 鄭麗文 當選 國民黨主席 2025年10月18日 得票 就任 …

| Edge | Sources | Excerpts (all **read**) |
|---|---|---|
| `chen-chu-member-of-dpp` | [民進黨 4882, 2012-02-29](https://www.dpp.org.tw/media/contents/4882); [Newtalk 172675, 2018-11-27](https://newtalk.tw/news/view/2018-11-27/172675) | 「民進黨高雄市長暨中常委陳菊今（29）日從蔡英文主席手中接下印信，接任第十三屆代理黨主席職務。」; 「陳菊並未於當場允諾接受推選為代理主席，而是事後發出新聞稿表達接受之意。」 |
| `hsieh-member-of-dpp` | [民進黨 2062, 2008-03-26](https://www.dpp.org.tw/media/contents/2062); [今周刊, 2007-05-10](https://www.businesstoday.com.tw/article/category/183027/post/200705100001/) | 「民主進步黨謝長廷主席今（26）日辭去黨主席職務」; 「這次謝長廷終於成為民進黨二○○八年總統候選人，…」 |
| `cho-member-of-dpp` | [Newtalk 190644, 2019-01-06](https://newtalk.tw/news/view/2019-01-06/190644); [公視 689614, 2024-04-10](https://news.pts.org.tw/article/689614) | 「前行政院長卓榮泰以24,699票數勝出72.6%，…」; 「由前民進黨主席卓榮泰接任行政院長，…」 |
| `cheng-wen-tsan-member-of-dpp` | [鏡週刊, 2018-11-24](https://www.mirrormedia.mg/story/amp/20181124edi007); [Newtalk 926865, 2024-07-06](https://newtalk.tw/news/view/2024-07-06/926865) | 「尋求連任的現任市長民進黨籍候選人鄭文燦從選戰初期就「穩紮穩打」」 (the part before the ellipsis in the fetch output); 「接著他在黨職歷練，也當過民進黨組織部主任、中國事務委員會發言人、桃園縣黨部主委。」 |
| `su-jia-chyuan-member-of-dpp` | [Newtalk 17685, 2011-09-09](https://newtalk.tw/news/view/2011-09-09/17685); [民進黨 4229, 2011-09-09](https://www.dpp.org.tw/media/contents/4229) | 「民進黨總統候選人蔡英文今天下午偕同秘書長蘇嘉全在民進黨中央黨部召開…」; 「我已經邀請中央黨部秘書長蘇嘉全先生搭檔參選2012年的總統大選」 |
| `cheng-li-wun-member-of-kmt`, `cheng-li-wun-kmt-chair` | [台灣英文新聞 6222871, 2025-10-18](https://www.taiwannews.com.tw/zh/news/6222871); [TVBS 3020039, 2025-10-18](https://news.tvbs.com.tw/politics/3020039) | 「鄭麗文獲得 6 萬 5,122 票，以 50.15% 的得票率當選國民黨主席。」; 「恭喜鄭麗文當選新任黨主席，…」 |

**Rejected while reading:**
- 鏡週刊 20181212inv003 names 陳菊 only as 總統府祕書長.
- 鏡週刊 20180419inv006 names 謝長廷 only as 駐日大使.
- 民進黨 8787 is a later 卓榮泰 activity, not his election.
- NOWnews 5798214 is about 桃園, not 蔣萬安.

**Not done:**
- **`chiang-wan-an` (蔣萬安) KMT membership:** 鏡週刊 2022-11-27 and CNA
  202211265007 both confirm the 2022 win, but neither quote names his
  party. Best route: his 立法院 9th or 10th-term profile (party field).
  Inbox.
- **Join dates:** none of the new membership edges has a join date. `start`
  is null.
- **鄭麗文's earlier DPP membership:** not checked, and not added.
- **The nine remaining people with ≤1 edge** are media and SEF figures from
  N3 and N4 (吳豊山, 王雪紅, 陳文琦, 張榮華, 王明玉, 裴偉, 蔡同榮, 林崑海,
  蕭旭岑). Each has one T2 edge. In Inbox for a later breadth pass.
