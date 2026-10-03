# Research log: V3, education edges with low or medium confidence (2026-10-03)

**Queue item:** V3 in [`QUEUE.md`](QUEUE.md). It covers `hung-edu-pccu`,
`hung-edu-truman`, `hsia-edu-nccu` and `hsia-edu-georgetown`. Only excerpts
marked **(read)** are used as quotes.

**Queries run:**
- 立法院 洪秀柱 委員 學歷 中國文化學院 法律系 美國東北密蘇里州立大學 教育碩士
- 夏立言 學歷 政治大學 外交系 喬治城大學 外交 碩士 陸委會主委 簡歷 2015
- 夏立言 輔仁大學法律系 政治大學外交研究所 碩士 美國喬治城大學 學歷 國防部副部長 簡歷

---

## 洪秀柱: both confirmed (T1)

| Source | Excerpt | |
|---|---|---|
| [立法院 第3屆委員資料, nodeid=746](https://www.ly.gov.tw/Pages/List.aspx?nodeid=746) | Education field: 「省立台北第二女中」「私立文化大學法律系」「師範大學教育研究所進修」「美國密蘇里州立杜魯門大學教育學碩士」. Party: 中國國民黨 | **(read)** |

- `hung-edu-pccu`: URL and quote 「私立文化大學法律系」. The node's note
  (then called 中國文化學院) stands.
- `hung-edu-truman`: URL and quote. `degree` is now **教育學碩士**. The LY
  uses the current name (杜魯門大學). The edge's existing note gives the
  former name (東北密蘇里州立大學).
- 「師範大學教育研究所進修」 is non-degree study, so no edge.

## 夏立言: not confirmed; one edge probably mis-staged

- **`hsia-edu-nccu` (政大, bachelor, 外交):**
  - Two search summaries cite an NCCU Department of Diplomacy alumni
    interview ([PDF](https://diplomacy.nccu.edu.tw/upload/28/doc/5789/夏立言.pdf),
    which returned **404** when fetched, both by curl and by the fetch tool).
  - Per those summaries, he missed the 外交系 in the entrance exam, studied
    law at **輔仁大學**, then passed into the **政大外交研究所**.
  - If so, the edge's `stage` should be **master**, and a 輔大 bachelor's
    edge is missing (輔大 has no node).
  - **Data not changed**, because the source is unread. The edge's notes
    flag it, and it's in Needs Jing.
- **`hsia-edu-georgetown` (master's):**
  - **No source found** in 中文 or English.
  - The MAC minister page returned 403 (N3).
  - A 總統府 file in the results (1b9e1732…) turned out to be 姚立明's
    nominee biography, so it's irrelevant.
  - Read pages without education details: PTS 292169, Newtalk 799063,
    鏡週刊 20240625edi016.
  - Flagged in notes. Removing the edge is Jing's call.

**Where to look next:** the 國防部 or 外交部 official biographies from his
time as vice minister (2014–15), the 行政院 cabinet list of 2015-02, or the
陸委會 minister archive. All are T1, and all need a working page.
