# Research log: media ownership, mirror of 旺旺/中天, part 1 (2026-10-03)

**Queue item:** N4 in [`QUEUE.md`](QUEUE.md), split. This part covers
**三立 (SET), 民視 (FTV) and TVBS**, using the same rules as the 旺旺 edges
in [`2026-10-01-kmt-ccp-ties.md`](2026-10-01-kmt-ccp-ties.md) §4:
`shareholder` for owners, `board_member` for chairs. 東森, 鏡電視, and
political ties or editorial allegations for all five outlets moved to N4b.
Only excerpts marked **(read)** are used as quotes.

**Queries run:**
- 三立電視 股東 林崑海 張榮華 持股 董事長 公司登記
- 民視 董事長 郭倍宏 2020 當選 民間全民電視公司 股東 創辦 蔡同榮
- TVBS 股權 王雪紅 2015 香港TVB 出售 聯利媒體 NCC 核准
- lawplayer 民間全民電視股份有限公司 統一編號 董事長 / lawplayer 聯利媒體股份有限公司 統一編號 董事長 陳文琦

**T1 attempts:**
- [findbiz.nat.gov.tw](https://findbiz.nat.gov.tw/fts/query/QueryBar/queryInit.do),
  the MOEA company registry, returned **403**.
- [LawPlayer](https://lawplayer.com/) mirrors the registry (經濟部商業發展署
  商工登記公示資料). It worked for 三立 (統編 23740512), but its search didn't
  find 民間全民電視 or 聯利媒體. Two wrong companies came up (聯合發行
  24228174, 佳聯有線 97176779) and were discarded.
- LawPlayer is cited as `other`, not as T1.
- **For Jing:** the 統編 for 民間全民電視 and 聯利媒體 would let these be
  checked on findbiz by hand.

---

## 1. TVBS → `cher-wang-owns-tvbs` (T2), `chen-wen-chi-chairs-tvbs` (T2)

| Source | Excerpt | |
|---|---|---|
| [今周刊, 2017-05-18](https://www.businesstoday.com.tw/article/category/80392/post/201705180026/) | 「王雪紅人馬在TVB席次雖只僅剩一席，卻成功從TVB手中取得台灣聯利媒體（TVBS）經營權，分別在一五、一六年陸續透過利茂、德恩、連信三家投資公司取得TVBS九六％持股」 | **(read)** |
| [鏡週刊, 2019-08-11](https://www.mirrormedia.mg/story/20190806fin001) | 「身為TVBS最大股東，王雪紅家族持股65％」; 「聯利媒體董事會通過宏達電董事長王雪紅夫婿陳文琦接任董座」 | **(read)** |
| [TechNews, 2019-07-02](https://finance.technews.tw/2019/07/02/tvbs-president-retire-in-sep/) | 「TVBS 將於 7 月召開董事會，推舉威盛董事長陳文琦接任董事長」 | **(read)** |

**Verdict:** both edges taken, T2.

**Discrepancy:** 96% (2017) against 65% for the family (2019). A search
summary says a 35% stake went to 丁廣鋐's 富仕宇投資 to satisfy the NCC.
That's **unread**, so it's only mentioned in `notes`.

**Not found:** the NCC's decision approving the 2015–16 share transfer
(that's T1). Moved to N4b.

## 2. 三立 (SET) → `chang-jung-hua-chairs-set` (T2)

| Source | Excerpt | |
|---|---|---|
| [民報, 2025-08-19](https://www.peoplenews.tw/?p=4473) | 「今年69歲的張榮華，是已故三立電視創辦人林崑海的妻弟，3年前林崑海逝世，原總經理張榮華便接下董事長一職。」 | **(read)** |
| [LawPlayer 23740512](https://lawplayer.com/company/23740512) (registry mirror, updated 2026-09-18) | Chair 張榮華 holds 0 shares; vice chair 林旭信 holds 16,000; corporate director 永興資本 (統編 70784552, represented by 林義魚) holds 16,254,432 | **(read)** |
| [TechNews, 2025-08-01](https://finance.technews.tw/2025/08/01/board/) | 三立 bought 6.07% of 大同 for NT$5.285 bn, in 張榮華's name | **(read)**. Context only |

**Verdict:** the chair edge is taken, T2. **No `shareholder` edge**, because
no read source gives 三立's ownership structure. The registry shows only
directors' holdings, and the total share count is unknown.

## 3. 民視 (FTV) → `wang-ming-yu-chairs-ftv` (T2), `minjian-investment-owns-ftv` (T3)

| Source | Excerpt | |
|---|---|---|
| [Newtalk, 2019-04-02](https://newtalk.tw/news/view/2019-04-02/228196) | 「電子媒體民間全民電視今天(2日)召開臨時股東會，最後總經理王明玉高票當選新任董事長。」 | **(read)** |
| [鏡週刊, 2019-04-02](https://www.mirrormedia.mg/story/amp/20190402fin008) | 「會後也隨即開董事會，推舉王明玉擔任董事長、黃明展為副董事長。」 | **(read)** |
| [鏡週刊, 2019-03-15](https://www.mirrormedia.mg/story/20190315fin001) | 「民視母公司、最大股東「民間投資股份有限公司」」; former chair 郭倍宏 「遭到撤換」 | **(read)** |

**Verdict:**
- The chair edge is taken, T2. Whether 王明玉 is still chair in 2026 rests on
  2019 reporting. The 2026 registry entry for the subsidiary 民視文化事業
  (16080795) lists 王明玉 as its representative. That was seen in a search
  result only, and it's a different company.
- The ownership edge is **T3**, from one outlet. The percentage is unknown.

**Political ties, not done here (N4b):**
- 民視's founder 蔡同榮 (a DPP legislator, from a search summary)
- former chair 郭倍宏 (喜樂島聯盟)

## Split-off (N4b)

- 東森 (EBC) and 鏡電視 (Mirror TV): ownership and chairs.
- Political ties, for all five outlets and to the same standard as 旺旺:
  founders' and chairs' party roles, and allegations of editorial direction
  (T4 only), e.g. Mirror's 2019 headline 「陳文琦接TVBS董座挺韓惹議」.
- NCC decisions: the TVBS share transfer (2015–16), and 鏡電視's licence
  (2022).
