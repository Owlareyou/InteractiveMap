# Research log: twin-city forum, remaining rounds (2026-10-03)

**Queue item:** N2b in [`QUEUE.md`](QUEUE.md), split from N2 (see
[`2026-10-03-tpp-ko-wen-je.md`](2026-10-03-tpp-ko-wen-je.md)). Only
excerpts marked **(read)** are used as quotes.

**Queries run:**
- 雙城論壇 歷屆 2016 2018 台北舉行 上海副市長 周波 率團 來台
- 2016 台北上海城市論壇 8月23日 沙海林 率團 柯文哲 台北
- 蔣萬安 雙城論壇 2023 上海 2024 台北 2025 上海 出席 陸委會 同意
- 2023 雙城論壇 上海 蔣萬安 龔正 會見 8月30日 / 2024 雙城論壇 台北 上海副市長 華源 蔣萬安 12月
- 蔣萬安 上海 世界會客廳 龔正 2025年12月28日 雙城論壇 主論壇 返台
- 柯文哲 「兩岸一家親」 首次 說出 2015 雙城論壇 國台辦 回應
- 內政部 政黨名冊 台灣民眾黨 備案 2019 政黨及政治團體

**Target convention:** every round targets `shanghai-municipal-government`.
- Rounds held in Shanghai are `attended_forum`.
- Rounds where the Shanghai delegation came to Taipei are `met_officially_with`.

---

## Round-by-round verdicts, 2015 onwards

| Year | Host | Taipei mayor | Shanghai lead | Edge | Verdict |
|---|---|---|---|---|---|
| 2015 | Shanghai | 柯文哲 | Mayor 楊雄 | `ko-shanghai-forum-2015` | Taken in N2 |
| 2016 | Taipei, 08-23 | 柯文哲 | 沙海林, Shanghai CCP standing committee member and United Front Work Dept head, as the mayor's representative | `ko-shanghai-delegation-2016` | Taken, T2 |
| 2017 | Shanghai | 柯文哲 | Mayor 應勇 | `ko-shanghai-forum-2017` | Taken in N2 |
| 2018 | Taipei, 12-19 to 20 | 柯文哲 | Deputy mayor 周波 | `ko-shanghai-delegation-2018` | Taken, T2 |
| 2019 | Shanghai | 柯文哲 | Mayor 應勇 | `ko-shanghai-forum-2019` | Taken in N2 |
| 2020–22 | — | — | — | — | **Not researched.** The pandemic years: whether rounds were held, or held online, is unknown. Inbox |
| 2023 | Shanghai, 08-29 to 31 | 蔣萬安 | Mayor 龔正 | `chiang-shanghai-forum-2023` | Taken, T2 |
| 2024 | Taipei, 12-17 | 蔣萬安 | Deputy mayor 華源 | `chiang-shanghai-delegation-2024` | Taken, T2 |
| 2025 | Shanghai, 12-28 | 蔣萬安 | Mayor 龔正 | `chiang-shanghai-forum-2025` | Taken, T2. Originally set for 09-25 to 27, then held in December |

## Sources

| Edge | Source | Excerpt | |
|---|---|---|---|
| 2016 | [中央社 201608235006, 2016-08-23](https://www.cna.com.tw/news/firstnews/201608235006.aspx) | 沙海林's speech: 「過去8年，兩岸堅持九二共識，兩岸和平發展；當前由於『眾所周知的原因』，而出現中國大陸不願看到的局面。」 Doesn't mention 柯文哲 | **(read)** |
| 2016 | [風傳媒 157729, 2016-08-23](https://www.storm.mg/article/157729) | 柯文哲 gives 沙海林 a letterpress set. The fetch tool returned the excerpt with an ellipsis in the middle, so **`quote` is null** | **(read)** |
| 2018 | [ETtoday 1334789, 2018-12-19](https://www.ettoday.net/news/20181219/1334789.htm) | 「2018台北上海雙城論壇20日正式登場，由上海副市長周波領軍的上海團19日早上搭乘飛機抵台、晚間七點選在台北歷史悠久的圓山飯店舉辦晚宴，周波與台北市長柯文哲現場會致詞並互贈禮品」 | **(read)** |
| 2018 | [公視 416757, 2018-12-19](https://news.pts.org.tw/article/416757) | 「上海副市長周波上午率領參訪團抵達台北。上午陸委會主委陳明通呼籲，雙城論壇少點政治，多辦正事。」 | **(read)** |
| 2023 | [鏡週刊, 2023-09-06](https://www.mirrormedia.mg/story/20230904inv012) | 「蔣萬安8月29日率領市府團隊前往上海參加雙城論壇」 | **(read)** |
| 2023 | [公視 654000, 2023-08-30](https://news.pts.org.tw/article/654000) | 蔣萬安's speech: 「雙城好，兩岸好，兩岸關係恰如江河行舟，當然不應該是過盡千帆皆不是，但是也不應該一廂情願的認為輕舟已過萬重山。」 | **(read)** |
| 2024 | [公視 729200, 2024-12-17](https://news.pts.org.tw/article/729200) | 「上海市副市長華源宣布利台政策，上海陸客團恢復赴台旅遊；在北市與上海市副秘書長進行市政交流專題演講後，市長蔣萬安壓軸出席見證「推動智慧醫療」、「小貓熊物種交流及保育」2項MOU簽署」 | **(read)** |
| 2024 | [TVBS 2720663, 2024-12-17](https://news.tvbs.com.tw/politics/2720663) | 華源: 「上海方面將積極推動上海居民赴台團隊旅遊路線，一定會包含台北市」 | **(read)** |
| 2025 | [聯合新聞網 9230328, 2025-12-28](https://udn.com/news/story/7331/9230328) | 「2025年台北上海雙城論壇主論壇28日在上海『世界會客廳』登場，在主論壇開始前，上海市長龔正先會見台北市長蔣萬安及台北市代表團」 | **(read)** |
| 2025 | [公視 787967, 2025-12-28](https://news.pts.org.tw/article/787967) | 「雙方互贈禮物，分別為紀念錫盤及藝術瓷瓶，台北市長蔣萬安與上海市長龔正握手寒暄」 | **(read)** |
| 2025 (context) | [公視 770340, 2025-09-12](https://news.pts.org.tw/article/770340) | The forum was then scheduled for 09-25 to 27. DPP city councillors would not attend | **(read)**, but only cited in `notes` |
| 2025 (context) | [鏡週刊 20251223inv004, 2025-12-24](https://www.mirrormedia.mg/story/20251223inv004) | The trip was cut to a same-day visit after the 12-19 Taipei attack | **(read)**, but only cited in `notes` |

**Why 2025 moved from September to December:** [udn 9020523](https://udn.com/news/story/124612/9020523)
is headlined 「賴政府技術性卡關雙城論壇」. That's udn's framing, and I
didn't read the page. It isn't recorded on any edge. It's a lead for whoever
researches MAC approvals (N3).

**New node:** `chiang-wan-an` (蔣萬安), KMT, mayor of Taipei. Three T2 edges
qualify him. His KMT membership is entered in `party_affiliations` but **not
sourced in this iteration**. That's in X3.

## 「兩岸一家親」 (part c): statement, not taken as an edge

- **2015-03-30:** 柯文哲's 「一五新觀點」, in interviews with 新華社, CCTV and
  中評社, included 「兩岸一家親」. TAO spokesperson 范麗青 welcomed it on
  2015-03-31. This comes from a search summary. **Not read.**
- **2019-07-04, Shanghai:** [公視 436519](https://news.pts.org.tw/article/436519) **(read)**,
  柯文哲: 「互信的態度及兩岸一家親理念，彼此互相認識、互相了解、互相尊重、互相合作、互相諒解。」

**Verdict:** not an edge. It's a public statement, and the only statement
types are `criticizes` and `opposes`, which are negative. Recorded as a
schema gap in NOTES.

## TPP in the MOI party register (part d): not found

[party.moi.gov.tw](https://party.moi.gov.tw/) is the MOI's 政黨資訊網. The
party search (查政黨) is an interactive form that the fetch tool can't use.
**For Jing to look up by hand:** party.moi.gov.tw, 查政黨, 「台灣民眾黨」.
Note down the registration (備案) date and the responsible person, then paste
the record's URL into `ko-member-of-tpp` as a T1 source.
