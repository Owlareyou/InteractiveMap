# Research log: V2, the brief's 8 original §6 edges (2026-10-03)

**Queue item:** V2 in [`QUEUE.md`](QUEUE.md). These are the 8 edges in the
§6 table of [`../seed-verification.md`](../seed-verification.md), the
brief's T1 anchors. Only excerpts marked **(read)** are used as quotes.

**Queries run:**
- 總統府 新聞稿 2015年11月7日 馬英九 習近平 新加坡 會面 / Office of the President ROC press release November 7 2015 …
- 新华社 习近平会见马英九 2024年4月10日 北京 / 新华社 习近平会见洪秀柱 2016年11月1日 人民大会堂
- 總統府 新聞 2017年9月 總統任命 賴清德 為行政院長 令 特任
- 總統府 第16任總統就職演說 全文 2024年5月20日 中華民國與中華人民共和國互不隸屬
- 立法院 委員 洪秀柱 黨籍 中國國民黨 歷屆委員 ly.gov.tw 第8屆

**Tooling note:** the 總統府 "File/Doc" links serve **.docx files**, even
though some are labelled PDF. Their text was extracted locally with Python's
`zipfile`.

---

| Edge | Source now cited | Excerpt | Result |
|---|---|---|---|
| `ma-xi-2015-singapore` | [總統府 English release NEWS/4781, 2015-11-07](https://english.president.gov.tw/NEWS/4781) | "President Ma Ying-jeou on the morning of November 7 departed for Singapore to attend a meeting between the leaders of the two sides of the Taiwan Strait later in the day." **(read)** | URL and quote. T1. **Ready** |
| `ma-xi-2024-beijing` | [新華社 via gov.cn, 2024-04-10](https://www.gov.cn/yaowen/liebiao/202404/content_6944443.htm) | 「中共中央总书记习近平10日下午在京会见马英九一行。」 **(read)**, converted to 正體 | URL and quote. T1. **Ready** |
| `hung-xi-2016` | [新華社 readout, CSIS Interpret translation](https://interpret.csis.org/translations/general-secretary-xi-jinping-meets-with-kuomintang-chairperson-hung-hsiu-chu) | "BEIJING, Nov. 1 (Chen Jianxing, of Xinhua)—Xi Jinping … met with Hung Hsiu-chu … in Beijing on the afternoon of November 1." **(read)** | URL and quote. The 國民黨 release (second evidence entry) still has no URL. **Ready** on the Xinhua entry |
| `hsia-prc-visits-2023` | [中央社 202302080221, 2023-02-08](https://www.cna.com.tw/news/aipl/202302080221.aspx); [TVBS 2036580, 2023-02-08](https://news.tvbs.com.tw/politics/2036580) | 「夏立言今天率團訪陸，此行將拜會新任國台辦主任宋濤。」; 「預計會和國台辦主任宋濤，以及政治局長委王滬寧見面」 **(read)** | The Reuters entry (no URL, not found) is **replaced** by TVBS. `start` 2023 → 2023-02. T2. **Ready** |
| `lai-opposes-xi` | [總統府公報 第7721號, 2024-05-20 (NTU web archive)](https://webarchive.lib.ntu.edu.tw/archive/wayback/20240521013009/https://www.president.gov.tw/File/Doc/85ed7c50-3154-4259-8a7e-2241119e1734) | 「根據中華民國憲法，中華民國主權屬於國民全體；有中華民國國籍者，為中華民國國民；由此可見，中華民國與中華人民共和國互不隸屬。」 **(read)** | URL and quote. **Not ready:** the speech doesn't name 習近平. "Opposes Xi" is the §6 characterisation, and Jing should decide whether to keep it, retarget it to `prc-government`, or drop it |
| `lai-appointed-by-tsai-2017` | [TVBS 764704, 2017-09-05](https://news.tvbs.com.tw/politics/764704), added | 「行政院林全院長已經在昨天請辭獲准，新任行政院長將由台南市長賴清德市長接任。」 **(read)** | The 總統府 order (T1) **wasn't found**. Three gazette files were checked, but they're issues 7743, 7745 and 7810, from 2024–25. The 2017 issue (around 73xx) wasn't located. Not ready |
| `ma-opposes-tsai` | — | — | **Not researched.** As specified in §6, it's too vague to source ("successive administrations"). Proposed: replace it with dated `criticizes` events under L1, or drop it. **Needs Jing** |
| `hung-member-of-kmt` | [立法院 歷屆委員, nodeid=938](https://www.ly.gov.tw/Pages/List.aspx?nodeid=938) | A table entry: 第 4 屆, 中國國民黨, 全國不分區. **(read)** No sentence to quote | URL added. `quote` stays null, so not ready by the letter of the rule |

## Rejected fetch

[中新網 2016-11-01](https://www.chinanews.com/gn/2016/11-01/8050228.shtml):
the fetch tool returned 「中国国务院总理习近平…」. 習近平 was never premier,
so the tool's output **wasn't trusted**, and a second request couldn't
reproduce the text. Not used. Fetched text that is factually impossible like
this means the tool's output can't be relied on for that page.
