# Research log: DPP cross-strait contacts, part 2 (2026-10-03)

**Queue item:** N1b in [`QUEUE.md`](QUEUE.md), split from N1 (see
[`2026-10-02-dpp-cross-strait.md`](2026-10-02-dpp-cross-strait.md)). The
method and conventions are the same as in that log. Only excerpts marked
**(read)** come from pages I fetched, and only those are used as quotes.

**Queries run:**
- 2009 第一屆海峽論壇 許信良 李文忠 許榮淑 鄭朝明 出席 民進黨 蔡英文 禁令 / 海峽論壇 2009年5月 廈門 許信良 出席 民進黨 前主席 / Hsu Hsin-liang Straits Forum Xiamen May 2009 DPP former chairman attend
- 許信良 恢復黨籍 民進黨 2008 OR 2009 重回民進黨 / 許信良 2008年 恢復民進黨黨籍 回黨
- 許榮淑 開除黨籍 2009年7月 民進黨 兩岸經貿文化論壇 長沙 / 范振宗 許榮淑 國共論壇 停權 除名 民進黨中評會 2009 / "范振宗" "許榮淑" 兩岸經貿文化論壇 長沙 2009 參加 (extended)
- 陳菊 天津 訪問 2013 東亞運 會見 張志軍 / 陳菊 天津 張志軍 晚宴 2013年8月 中央社 高雄推介會 / 张志军 会见 陈菊 天津 2013年8月10日 高雄市长
- 民進黨籍縣市長 訪問大陸 2013 2015 林佳龍 鄭文燦 登陸 會見 / 民進黨 縣長 市長 赴中國大陸 參訪 2010 2011 2012 2015 2016 綠營首長 登陸 / DPP mayor magistrate visit China 2010..2016 met Taiwan Affairs Office official
- 蘇治芬 雲林縣長 2008年7月 北京 天津 農產品 率團 會見

---

## 1. 陳菊, Tianjin, 2013-08-10 → `chen-chu-tianjin-2013` (T2, taken)

This was the Inbox lead from N1, now confirmed. 陳菊 led a Kaohsiung city
delegation to Tianjin and met TAO director 張志軍 that evening. The same 2013
trip also went to Shenzhen, Xiamen and Fuzhou.

| Source | Excerpt | |
|---|---|---|
| [Newtalk, 2013-08-10](https://newtalk.tw/news/view/2013-08-10/39089) | 「高雄市長陳菊今(10)日晚間與中國國台辦主任張志軍會晤」 | **(read)** |
| [風傳媒 32805, 2014-06-27](https://www.storm.mg/article/32805) | 「由於陳菊與張志軍曾在天津會晤，張志軍一看到在現場迎接的陳菊，高興地說：「我們已經握過手了。」」 | **(read)** |
| [NOWnews 6086907, 2023-03-20](https://www.nownews.com/news/6086907) | 「2013年，陳菊率市府代表團到天津、深圳、廈門與福州等城市時，民進黨也稱『正面肯定』。」 | **(read)** |

**Verdict:** taken. `made_prc_visit` to the TAO (張志軍 has no node). Whom
she met in Shenzhen, Xiamen and Fuzhou is **not checked**.

## 2. 許榮淑 and 范振宗 at the 5th KMT–CPC forum, Changsha, July 2009 (T2, taken)

**Claim:** the DPP leadership barred current and former party office-holders
from the 5th 兩岸經貿文化論壇 (國共論壇, 2009-07-11 to 12, Changsha).
Former legislator 許榮淑 and former COA minister 范振宗 (a former Hsinchu
magistrate) went anyway, as 2 of 7 people with a DPP background who
attended. The DPP's Central Review Committee suspended them for three years
on 2009-07-23 and expelled them on 2009-07-27.

| Source | Excerpt | |
|---|---|---|
| [展望與探索 vol. 7 no. 8 (published by 法務部調查局), 潘錫堂, 2009-08](https://www.mjib.gov.tw/FileUploads/eBooks/9b5195134789425eaadaa0ce30a53630/Section_file/69a6423d05234c91b2ae5016a0c1a244.pdf) | 「儘管民進黨中央禁止現任及卸任黨公職人員參加，仍有農委會前主委范振宗、前立委許榮淑等7人與會。」 | **(read)**. PDF text extracted locally with `pdftotext` |
| [大紀元, 2009-07-20](https://www.epochtimes.com/b5/nf4311_30.htm) | 「日前前往中國大陸參加兩岸論壇的前民進黨籍立委許榮淑、前農委會主委范振宗昨天返台，對於民進黨擬開除黨籍，許榮淑、范振宗表達遺憾與心痛」 | **(read)** |
| [自由時報 247137, 2009-07-27](https://news.ltn.com.tw/news/politics/breakingnews/247137) | 「中評委認為兩人言行茲事體大，有必要重新議處，會後決議正式開除兩人黨籍。」 | **(read)** |
| [自由時報 322769, 2009-07-28](https://news.ltn.com.tw/news/focus/paper/322769) | 「許榮淑、范振宗兩人違紀赴中遭停權後，仍以不當言行破壞政黨形象，中評會決議將兩人開除黨籍。」 | **(read)** |
| [VOA, 2009-07-12](https://www.voachinese.com/a/a-21-2009-07-12-voa24-61381267/1028684.html) | doesn't name them | not used |
| [中國時報 20100712000375](https://www.chinatimes.com/newspapers/20100712000375-260107) | 403 | not used |
| zh.wikipedia 許榮淑, 范振宗 | used only to find the LTN citations above | not cited |

**Verdict:** taken.
- `attended_forum` edges for both of them are T2, from the MJIB journal and
  大紀元, two independent publications.
- `member_of` edges to `dpp`, ending 2009-07-27, are T2 (LTN and 大紀元).
- New node `cross-strait-forum-kmt-ccp` (兩岸經貿文化論壇, alias 國共論壇).
- Their `party_affiliations` end on 2009-07-27. Their join dates were **not**
  looked up, so `start` is null.

**Unread, recorded only in `notes`:** a TVBS summary says 范振宗 announced
he was leaving the party the same morning he was expelled.

**Mirror note:** this forum's KMT attendees (for example 吳伯雄, who led the
2009 delegation per the MJIB piece) aren't linked to the new forum node yet.
That's in Inbox.

**Schema gap:** there's no relation type for party discipline (suspension or
expulsion). It's recorded as `member_of` with `end` set, plus `notes`.

## 3. Other 2009 Straits Forum attendees with a DPP history

| Name | What was found | Verdict |
|---|---|---|
| 許信良 | A Xinhua item reprinted by China Daily (2009-05-18) says he attended the forum as "former DPP chairman" (search summary only, because the China Daily pages return **404** on both hosts). His party status in 2009 is unclear: a summary says he "returned to the DPP as an adviser" in 2008, but no fetched page confirms membership | **not taken**. Needs a fetched source for both the attendance and his 2009 membership |
| 李文忠, 鄭朝明 | Named only in LTN 5476333 (2026), quoting KMT legislator 陳菁徽's list | **not taken**. One source, made in a political attack, 17 years after the event |
| 許榮淑 | Same 2026 list for the Straits Forum. Her well-documented 2009 case is the KMT–CPC forum, §2 | Straits Forum **not taken**. KMT–CPC forum taken |
| 顏建發 | Same 2026 list. An academic, and a former DPP department head | **not taken**. One source |
| 邱垂正 | Already T2-ready, deferred to N3 | see N3 |

## 4. Other DPP local executives, 2008–2016

- **陳菊:** see N1 and §1 above.
- **蘇治芬** (Yunlin magistrate): led a delegation to Beijing for a farm
  produce expo in July 2008, and reportedly to Shanghai (January 2011) and
  Shenzhen (March 2011). This comes from search summaries. The cited NOWnews
  page didn't contain it when fetched. **No PRC host or counterpart is
  named**, so there's no tie to record. **Not taken**, and it's in Inbox.
- **林佳龍, 鄭文燦:** searched, **nothing found** for PRC trips in 2014–16.
- **September 2016:** eight Taiwanese magistrates and mayors met 張志軍 and
  俞正聲. They were from KMT-aligned or non-DPP counties, so they're not part
  of this item. It's in Inbox for the KMT and independent side.
- **After 2016:** one summary says no DPP county or city executive has visited
  the PRC since 2016. That's unverified, so it's not recorded as a finding.
