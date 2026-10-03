# Research log: V1, the six flagged seed edges (2026-10-03)

**Queue item:** V1 in [`QUEUE.md`](QUEUE.md). These are the six edges under
"Check these first" in [`../seed-verification.md`](../seed-verification.md).
Only excerpts marked **(read)** are used as quotes. Edges stay `draft`.

**Queries run:**
- 夏立言 第十五屆海峽論壇 2023年6月 廈門 出席 致詞 國民黨副主席
- 饒慶鈴 宋濤 會面 2025年1月 移民署 違規 未報備 變更行程 陸委會
- 「報告主任」 蔡衍明 王毅 中時 2008 旺旺月刊 天下雜誌
- 臺中國際會展中心 開幕活動 決標 中國電視事業股份有限公司 400萬 政府電子採購網

---

## 1. `rao-song-tao-2025`: the meeting is now confirmed on its own; the MAC's "violation" stays its characterisation

| Source | Excerpt | |
|---|---|---|
| [公視 733184, 2025-01-10](https://news.pts.org.tw/article/733184) | 「台東縣長饒慶鈴率團赴中國與國台辦主任宋濤會面。」 | **(read)**. Contemporaneous |
| [聯合新聞網 9571220, 2026-06-17](https://udn.com/news/story/7331/9571220) | 「大陸國台辦主任宋濤曾在去年1月4日傍晚在釣魚台國賓館會見來訪的台東縣長饒慶鈴一行。」 | **(read)** |
| [鏡新聞, 2026-06-17](https://www.mirrormedia.mg/external/mnews_20260617nm006) | 「饒慶鈴先前前往中國訪問，在未向移民署依法報備的情況下，私自變更行程去會見中共國台辦主任宋濤」 | **(read)** |
| [世界新聞網 9571359](https://www.worldjournal.com/wj/amp/story/121218/9571359) | Same text as udn. **Same group (聯合報系), so not counted separately** | read, not cited |
| [公視 813402](https://news.pts.org.tw/article/813402) | 邱垂正's statement. The fetch returned 「竡改」, which looks like a transcription error, so it isn't quoted | read, **removed** from the edge |
| [NOWnews 6848296](https://www.nownews.com/news/6848296) | About the 2026 video appearance. **Doesn't mention the meeting** | **removed** from the edge |

**Changes:**
- `start` 2025-01 → 2025-01-04.
- Evidence replaced. Every piece now has a URL and a quote.
- `notes` now separate the reported fact (the meeting) from the MAC's
  characterisation (a violation) and 饒慶鈴's response (she says she didn't
  know beforehand).

## 2. `fu-kun-chi-edu-jnu`: still disputed; quotes added; status set to `disputed`

| Source | Excerpt | |
|---|---|---|
| [中央社 202503140137, 2025-03-14](https://www.cna.com.tw/news/aipl/202503140137.aspx) | Profile box: 「學歷：國立花蓮高中、淡江大學交通管理學系、淡江大學中國大陸研究所、國立東華大學公共行政研究所、廣州暨南大學法學博士」 | **(read)** |
| [Newtalk 949161, 2024-12-16](https://newtalk.tw/news/view/2024-12-16/949161) | 「國民黨總召傅崐萁2008年擔任第7屆立委時，學歷曾掛上『廣州暨南大學法學博士班』，但近兩屆卻悄悄拿掉了」 | **(read)**. An opinion column (管仁健觀點) |

**Change:** `status` historical → **disputed**. Two sources disagree on
whether a degree or only enrolment is claimed. `degree` stays null. This is a
judgement call, flagged in NOTES.

**Still to find:** the Legislative Yuan's legislator profile (T1) for terms
7 to 11, and the CEC candidate bulletins.

## 3. `want-want-owns-ctv`: the 51.20% explained; MOPS not reachable

| Source | Excerpt | |
|---|---|---|
| [Money-Link 9928](https://ww2.money-link.com.tw/TWStock/StockBasic.aspx?SymId=9928) | Insider holdings as of 2026-08: 神旺投資股份有限公司 **49.79%**, 正聲廣播股份有限公司 **1.41%**. Group: 旺旺 | **(read)**. A data table, so no sentence to quote |

**Finding:** 49.79 + 1.41 = **51.20%**, the "directors' and supervisors'
holding" in the seed notes. The note now names the two holders.

**Not done:** the original filing on MOPS (公開資訊觀測站). Its query
interface needs JavaScript. **For Jing:** MOPS, company 9928, 「董監持股」
or 「內部人持股異動」, to confirm 神旺投資 is a 旺旺 entity.

## 4. `tsai-eng-meng-wang-yi-2008`: a second readable account added; the original is still 403

| Source | Excerpt | |
|---|---|---|
| [自由時報 2726113, 2019-03-13](https://news.ltn.com.tw/amp/news/politics/breakingnews/2726113) | 「蔡衍明在2008年12月5日與時任國台辦主任的王毅見面，蔡衍明正襟危坐地向王毅表示，是要『借助媒體的力量，來推動兩岸關係進一步發展』，王毅也允諾『如果集團將來有需要，國台辦定會全力支援。』」 | **(read)**. LTN reports this from 何清漣's book 《紅色滲透》 |
| [天下 Crossing 11525](https://crossing.cw.com.tw/article/11525) | **403** again | not readable |
| [The News Lens 115816](https://www.thenewslens.com/article/115816) | **403** | not readable |

**Chain of sources:** 旺旺月刊 (the company's own account) → 天下 → 何清漣's
book → LTN 2019. These aren't independent: all of them trace back to 旺旺's
own magazine. The edge stays T2, because the primary is 旺旺 itself
describing its chair's meeting. The notes record the chain.

## 5. `ctv-taichung-tender-2025`: quote added; still single-source T3

| Source | Excerpt | |
|---|---|---|
| [自由時報 5547622, 2026-08-21](https://news.ltn.com.tw/news/politics/breakingnews/5547622) | 「2025年的台中國際會展中心開幕活動標案400萬元，也是由市長盧秀燕妹妹盧秀芳擔任董事長兼總經理的中視得標承攬。」 | **(read)**. No case number |
| [Taiwan News 6222430](https://www.taiwannews.com.tw/news/6222430) | About the venue opening. Doesn't mention the tender | not used |

**Not found:** the award notice on 政府電子採購網. A search turned up
Taichung's 2026-08-11 city-government meeting minutes
(rdec.taichung.gov.tw, 第728次市政會議紀錄). **Not read**, but they might
mention it. **For Jing:** web.pcc.gov.tw, 決標公告, search 「臺中國際會展中心
開幕」 or the tenderer 「中國電視事業」. A record there would make this T1.

## 6. `hsia-straits-forum-2023`: specific articles found; T3 → T2

| Source | Excerpt | |
|---|---|---|
| [人民日報, 2023-06-15](https://paper.people.com.cn/rmrb/html/2023-06/15/nw.D110000renmrb_20230615_2-14.htm) | 「中国国民党副主席夏立言将应邀率团出席。」 | **(read)**. Simplified, converted to 正體 on the edge, with the notes saying so |
| [台灣英文新聞 4918557, 2023-06-16](https://www.taiwannews.com.tw/ch/news/4918557) | 「國民黨副主席夏立言今(16日) 率團前往中國福建，出席第15屆海峽論壇。」 | **(read)**. Replaces the topic page |
| [公視 590010](https://news.pts.org.tw/article/590010) | Actually about 2022 (the 14th forum), where 夏立言 spoke **by video** | not used. A possible separate 2022 edge, so it's in Inbox |
