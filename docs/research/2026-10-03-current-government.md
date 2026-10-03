# Research log: the current government's cross-strait structure (2026-10-03)

**Queue item:** N3 in [`QUEUE.md`](QUEUE.md). It covers the premier, the
MAC chair, the SEF chairs since 2024, and 邱垂正's 2009 Straits Forum
attendance, carried over from N1. Only excerpts marked **(read)** are used
as quotes.

**Queries run:**
- 總統府 新聞稿 特任 卓榮泰 為行政院院長 2024年5月20日
- 邱垂正 陸委會主委 任命 2024 行政院 內閣名單 學歷 黨籍 / site:mac.gov.tw 主任委員 邱垂正 簡歷 學歷 經歷 / 邱垂正 接任陸委會主委 5月20日 交接 海基會副董事長 2024 宣誓
- 海基會 董事長 2024 鄭文燦 辭職 繼任 董事長 2025 2026 / site:sef.org.tw 董事長 蘇嘉全 歷任董事長 吳豐山 鄭文燦 / 鄭文燦 請辭海基會董事長 7月7日 2024 陸委會 證實 就任 6月
- 陸委會 國台辦 官方溝通管道 中斷 2016 以來 邱垂正 宋濤 會面 海基會 海協會 2025

---

## 1. Premier 卓榮泰 → `cho-premier` (T1), `cho-appointed-by-lai` (T3)

| Source | Excerpt | |
|---|---|---|
| [行政院, 2024-05-20](https://www.ey.gov.tw/Page/9277F759E41CCD91/347ac719-9b3d-4bf3-a6e0-191bbd9d3001) | 「新任行政院長卓榮泰在蕭美琴副總統監交下，從卸任陳建仁院長手中接下印信。」 | **(read)**. Official record |
| [公視 689614, 2024-04-10](https://news.pts.org.tw/article/689614) | 「由前民進黨主席卓榮泰接任行政院長，前文化部長鄭麗君擔任行政副院長」 | **(read)** |

**Verdict:**
- `position_held` at the new `executive-yuan` node: T1 (the Executive Yuan's
  own release).
- `appointed_by` 賴清德: **T3**, because only PTS was read. The 總統府
  appointment order is the T1 source, but it **wasn't found**. The EY page
  mentions Lai's inauguration, not the appointment.
- 卓榮泰's DPP affiliation rests on PTS's 「前民進黨主席」.

## 2. MAC chair 邱垂正 → `chiu-mac-chair` (T2), `chiu-straits-forum-2009` (T2)

| Source | Excerpt | |
|---|---|---|
| [CNA English, 2024-04-25, via GlobalSecurity](https://www.globalsecurity.org/wmd/library/news/taiwan/2024/taiwan-240425-cna04.htm) | "Chiu, former deputy head of MAC and current SEF vice chairman, will take over as the head of Taiwan's top government agency handling cross-strait affairs when the new administration takes office on May 20." | **(read)**. A reprint of CNA, so it's cited as CNA |
| [公視 692049, 2024-04-25](https://news.pts.org.tw/article/692049) | 「現任海基會副董事長邱垂正接任陸委會主委」 | **(read)** |
| [mac.gov.tw minister page](https://www.mac.gov.tw/cp.aspx?n=B1A6B7D3E4F4B5F4) | **403** | not used. The URL was a guess, so it isn't cited on any edge |

The 2009 Straits Forum edge uses the udn and LTN excerpts from
[`2026-10-02-dpp-cross-strait.md`](2026-10-02-dpp-cross-strait.md) §5.

**Party:** **unverified**, so `party_affiliations` is empty. LTN calls him a
*former* DPP International Affairs deputy director. That's a staff post, not
proof of membership. Because his party is unknown, coverage counts his 2009
forum edge under "none".

## 3. SEF chairs since 2024 → `cheng-sef-chair`, `wu-feng-shan-sef-chair`, `su-sef-chair` (T2)

| Chair | Term | Sources | |
|---|---|---|---|
| 鄭文燦 | ? to 2024-07-07 | [公視 691863, 2024-04-24](https://news.pts.org.tw/article/691863): 「外傳陪同出席的鄭文燦，經賴清德徵詢後，點頭接任海基會董事長」; [台灣英文新聞 5899118, 2024-07-07](https://www.taiwannews.com.tw/zh/news/5899118): 「董事長鄭文燦基於避免影響團隊政務推動，已請辭董事長職務」 | **(read)**. The start date (a summary says early June 2024) **wasn't found on a read page**, so `start` is null |
| (許勝雄, acting) | 2024-07 to 11 | search summary only | **not taken** |
| 吳豊山 (CNA spelling. Also written 吳豐山) | 2024-11-04 to 2025-12-18 | [中央社 202512180322, 2025-12-18](https://www.cna.com.tw/news/acn/202512180322.aspx): 「吳豊山於2024年11月4日的第12屆董監事第5次聯席會議上被推選為海基會董事長，至今任職13個月。」; [工商時報, 2024-10-18](https://www.ctee.com.tw/news/20241018701267-430801): 「陸委會今日宣布，面對兩岸交流互動的諸多挑戰，推薦由前監委吳豐山擔任海基會新任董事長。」 | **(read)** |
| 蘇嘉全 | 2026-01-23 to now | [Newtalk, 2026-01-23](https://newtalk.tw/news/view/2026-01-23/1016504): 「海峽交流基金會今（23）日下午舉行第12屆董監事第1次臨時聯席會議，會中推選蘇嘉全出任董事長。」; [TVBS 3099631, 2026-01-14](https://news.tvbs.com.tw/politics/3099631): 「總統賴清德今天任命前台灣日本關係協會會長蘇嘉全出任海基會董事長。」 | **(read)** |

**New nodes:**
- `straits-exchange-foundation`, typed `government_body` as X6 asks,
  although legally it's a 財團法人 (a foundation).
- `cheng-wen-tsan` and `su-jia-chyuan`, both DPP. Their membership isn't
  sourced in this log, so they're added to X7.
- `wu-feng-shan`, with no party.
- 鄭文燦's corruption case belongs to E1.

## 4. Official cross-strait contact by the current government: none, by design

- Search found **no** meeting between the MAC or SEF leadership and the TAO
  or ARATS since 2024.
- The TAO–MAC and SEF–ARATS mechanisms have been suspended since
  2016-06-25, by the PRC side. Source: [CNA, via GlobalSecurity, 2016-06-25](https://www.globalsecurity.org/wmd/library/news/taiwan/2016/taiwan-160625-cna02.htm),
  search summary only, **not read**.
- This is a state of affairs, not a tie, so it's not an edge. It's worth a
  line in the app's methodology text, so that the absence of
  government-to-government edges after 2016 isn't read as a data gap.
