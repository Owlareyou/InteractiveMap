# Research log: E1, enforcement for every party (2026-10-03)

**Queue item:** E1 in [`QUEUE.md`](QUEUE.md). Each relation type matches
the stage reached: `indicted_by` for an indictment, and `ruled_on` for a
court ruling. Status is `disputed` while an appeal is possible or pending,
and `historical` once final. Valence is `negative`. Only excerpts marked
**(read)** are quoted. No 司法院 judgment was fetched (see "Not done"), so
everything here is T2.

**Queries run:**
- 柯文哲 京華城案 起訴 台北地檢署 2024年12月26日 一審 判決 2026 / 柯文哲 一審 判處 17年 褫奪公權 京華城案 台北地院 宣判 2026年3月26日
- 鄭文燦 收賄案 起訴 桃園地檢署 一審 判決 2025 2026
- 傅崐萁 內線交易 判刑 定讞 年份 證券交易法 最高法院
- 黃取榮 共諜案 起訴 判決 民進黨 助理 總統府 / 黃取榮 高等法院 改判6年 共諜案 2026年6月25日 …

**New nodes (government_body):** `taipei-district-prosecutors-office`,
`taipei-district-court`, `taoyuan-district-prosecutors-office`,
`supreme-court`, `taiwan-high-court`. **New person:** `huang-chu-jung`
(DPP, membership ended 2025-05, expelled).

| Party | Edge | Stage, status | Sources (all **read**) |
|---|---|---|---|
| TPP | `ko-indicted-2024` | Indicted 2024-12-26 by 北檢. `historical` (the event) | [Newtalk 950431](https://newtalk.tw/news/view/2024-12-26/950431): 「…今(26)日起訴，將柯文哲以圖利罪、違背職務行賄罪、公益侵占罪提起公訴」; [TVBS 2730420](https://news.tvbs.com.tw/politics/2730420): 「柯文哲等人遭起訴」 |
| TPP | `ko-ruled-2026` | First-instance conviction, 2026-03-26, 17 years. **`disputed`** (appealable; appeal status not checked) | [公視 800842](https://news.pts.org.tw/article/800842): 「…今（26）日一審宣判，判柯文哲17年徒刑、褫奪公權6年」; [台灣英文新聞 6328342](https://www.taiwannews.com.tw/zh/news/6328342): 「柯文哲一審遭判處17年有期徒刑，褫奪公權6年。可上訴。」 |
| DPP | `cheng-wen-tsan-indicted-2024` | Indicted 2024-08-27 by 桃檢 (graft, NT$5m). `historical`. **No verdict yet** (trial hearings in 2026-04 per summary) | [TVBS 2598351](https://news.tvbs.com.tw/politics/2598351): 「檢察官今（27）日偵查終結，依《貪污治罪條例》起訴鄭文燦等11人。」; [公視 711878](https://news.pts.org.tw/article/711878): 「桃園地檢署今（27）日偵結起訴鄭文燦及相關人員共11人」 (before the ellipsis) |
| DPP (former) | `huang-chu-jung-ruled-2026` | Second-instance espionage ruling, 2026-06-25: 10 → 6 years. **`disputed`** (appealable) | [聯合新聞網 9588009](https://udn.com/news/story/7321/9588009): 「民進黨前資深黨員黃取榮…台灣高等法院今改判黃6年徒刑」; [公視 814767](https://news.pts.org.tw/article/814767): 「改判黃取榮6年徒刑、民主學院前副主任邱世元判刑5年、副總統辦公室前諮議吳尚雨被判3年」 |
| KMT (then PFP) | `fu-ruled-2018` | Final, 2018-09-12, Supreme Court (合機 insider trading, 8 months) | [公視 406264](https://news.pts.org.tw/article/406264): 「最高法院昨天駁回上訴，全案定讞，傅崐萁必須入監服刑」; [TVBS 1329515](https://news.tvbs.com.tw/politics/1329515) |
| KMT | `fu-ruled-2020` | Final, 2020-05 (凱聚 etc., 2 years 10 months) | [TVBS 1329515](https://news.tvbs.com.tw/politics/1329515): 「立委傅崐萁因為內線炒股案，遭判刑2年10個月定讞」; [鏡週刊, 2020-05-27](https://www.mirrormedia.mg/story/20200527edi007/index.html): 「花蓮縣立委傅崐萁因內線炒股案，被判刑2年10個月定讞，…」 |

**黃取榮's party status:** [公視 752336, 2025-05-21](https://news.pts.org.tw/article/752336)
**(read)**: 「民進黨5黨員涉共諜案 中評會決議除名開除黨籍」, naming
「新北市議員李余典前特助黃取榮」. His `party_affiliations` end at 2025-05.

**Party-balance note:** 傅崐萁's 合機 offence took place while he was a 親民黨
(PFP) legislator (2003, per PTS). He's in the data as KMT. No PFP node
exists, so the edge notes record the party at the time.

**Not done:**
- **司法院 裁判書查詢 (T1):** not attempted. The search interface is
  interactive. Case numbers would let Jing pull the judgments.
- **Appeals after the rulings** (柯文哲, 黃取榮): not checked. Both are
  `disputed` until they're checked.
- **鄭文燦's first-instance verdict:** none found as of the search results
  (2026-04 hearings).
- **Espionage cases involving staff of KMT or TPP officials:** **not
  searched** in this iteration. That's a balance gap, split off as E1b.
- **王令麟's conviction** (力霸/東森 embezzlement, 5.5 years, final): one
  read source (公視 254038, N4c). He has no node, so it's in Inbox.
