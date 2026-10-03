# Research log: DPP cross-strait contacts (2026-10-02)

**Queue item:** N1 in [`QUEUE.md`](QUEUE.md). It mirrors the 2026-10-01
KMT–CCP round so both parties get the same search effort.

**Method:** web searches in 中文 first, then English. Every excerpt below
marked **(read)** comes from fetching the page itself, and those are the only
ones used as an edge's `quote`. Simplified-character excerpts were converted
to 正體 one character at a time, and the edge's `notes` says so. Every edge
added from this log has `retrieved_date: 2026-10-02` and `review_status: draft`.

**Queries run:**
- 謝長廷 2012 訪問 廈門 北京 會見 王毅 戴秉國 / 謝長廷 北京 會見 王毅 2012年10月 中央社 / 王毅会见谢长廷 新华社 2012年10月6日
- 賴清德 2014 台南市長 上海 復旦大學 演講 訪問 / 賴清德 上海 2014 中華藝術宮 陳澄波 中央社 / 賴清德 上海 2014 上海市台辦 李文輝 會面 或 楊雄
- 民進黨 縣市長 訪問中國 陳菊 2013 上海 北京 / 陳菊 2009年5月 北京 劉淇 會面 世運 中央社 / 陳菊 北京 郭金龍 「中央政府我們的馬英九總統」 2009
- 張志軍 陳菊 會面 高雄 2014年6月 國台辦主任 / 国台办 张志军 会见 陈菊 高雄 2014年6月27日 gwytb
- 民進黨籍 參加 海峽論壇 議員 陸委會 黨紀 / 海峽論壇 民進黨籍 出席 2009 2010 2011 2012 縣市議員 鄉鎮長 / DPP member attended Straits Forum Xiamen 2010s Democratic Progressive Party councillor

---

## 1. 謝長廷, Beijing, October 2012 → edge `hsieh-wang-yi-2012` (T2, taken)

**Claim:** 謝長廷, a former premier, visited the PRC in a personal capacity
(as chair of the 台灣維新基金會) from 2012-10-04. He went to Xiamen first,
then Beijing, where he met TAO director 王毅, state councillor 戴秉國 and
ARATS president 陳雲林.

| Source | Excerpt | |
|---|---|---|
| [環球人物 (People's Daily group), 2012-10-16](https://paper.people.com.cn/hqrw/html/2012-10/16/content_1135595.htm) | 「虽然他是以个人身份前往，却与国务委员戴秉国、国台办主任王毅、海协会会长陈云林等大陆负责对台事务高官会面。」 | **(read)** |
| [Newtalk, 2019-12-28](https://newtalk.tw/news/view/2019-12-28/346764) | 「2012.10.07前往北京，拜會了王毅(國台辦主任)、戴秉國(中共中央對台工作領導小組秘書長)、陳雲林(海協會會長)等人」 | **(read)** |
| [China Digital Times reprint of a 新華社 report](https://chinadigitaltimes.net/chinese/?p=255241) | 「正在中国大陆访问的前台湾行政院院长谢长廷周六（10月6日）与中国国务院台办主任王毅会面。」 | **(read)**, but it's a reprint, so it's **not cited** on the edge. The original link it gives is farxian.com/news/g/58384 (not fetched) |

**Verdict:** taken, T2 (a PRC outlet and a Taiwanese one, independent of each
other). The date is 2012-10-06 per 新華社. Newtalk dates the Beijing leg to
10-07. The edge's `notes` records the discrepancy.

**Target choice:** `wang-yi`, who already has a node. 戴秉國 and 陳雲林 have
no node and were not added. They'd belong under X6 (the SEF–ARATS channel).

**Also reported, not used:** Hsieh dined with two PLA General Political
Department major generals (from a search summary only, unread, so not
recorded as a tie).

## 2. 陳菊, Beijing and Shanghai, May 2009 → `chen-chu-beijing-2009`, `chen-chu-shanghai-2009` (T2, taken)

**Claim:** Kaohsiung mayor 陳菊 went to Beijing and Shanghai from 2009-05-21
to promote the Kaohsiung World Games. She met Beijing mayor 郭金龍 (05-21),
General Administration of Sport director 劉鵬 (05-22) and Shanghai mayor
韓正 (05-23).

| Source | Excerpt | |
|---|---|---|
| [鳳凰網 special page](https://news.ifeng.com/taiwan/special/chenjufangwendalu/) | 「与北京市长郭金龙会面，会后推介高雄世运会」(5月21日); 「下午会见国家体育总局局长刘鹏」(5月22日); 「会见上海市长韩正」(5月23日) | **(read)** |
| [Newtalk, 2009-09-21](https://newtalk.tw/news/view/2009-09-21/399) | 「陳菊5月21日為宣傳高雄世運前往中國北京、上海，她稱此行為「破冰之旅」，卻有不少黨內人士反彈。」 | **(read)** |
| [公視新聞網 117530](https://news.pts.org.tw/article/117530) | 「高雄市長陳菊，前往中國行銷高雄世運會，在拜會過北京市、及中國奧會主席之後，今天已經飛到上海,和上海市長韓正會面」 | **(read)**. The page is dated **2011-08-02**, which doesn't match the 2009 trip, so `published_date` is null |
| [China Daily 2009-05-23](https://covid-19.chinadaily.com.cn/china/2009-05/23/content_7934806.htm) | returned a 404 page | not used |

**Verdict:** two edges taken, T2. They target two new `government_body`
nodes, `beijing-municipal-government` and `shanghai-municipal-government`,
the same pattern as spec decision 13 (target the hosting body when the
counterpart has no node).

**Searched, not found:** a meeting with 劉淇 (the query's guess). Sources
name 郭金龍 instead.

## 3. 張志軍 meets 陳菊, Kaohsiung, 2014-06-27 → `chen-chu-zhang-zhijun-2014` (T2, taken)

**Claim:** during TAO director 張志軍's visit to Taiwan (2014-06-25 to 28),
he met Kaohsiung mayor 陳菊 at 高雄巨蛋 at 09:10 on 06-27, behind closed doors.

| Source | Excerpt | |
|---|---|---|
| [風傳媒 32805, 2014-06-27](https://www.storm.mg/article/32805) | 「高雄市長陳菊27日上午9點10分，在高雄巨蛋與來訪的中國國台辦主任張志軍一行會晤，並舉行閉門晤談。」 | **(read)** |
| [人民政協網 (中新社 wire), 2014-06-30](https://www.rmzxw.com.cn/c/2014-06-30/345367.shtml) | 「张志军会见高雄市长陈菊时」 (a fragment. The page doesn't give the date or length) | **(read)** |
| [中新網 6332574](https://www.chinanews.com/hb/2014/06-30/6332574.shtml) | the fetch didn't contain the meeting passage | not used |
| [The News Lens 5058](https://www.thenewslens.com/article/5058) | 403 | not used |

**Verdict:** taken, T2, `met_officially_with`, with 陳菊 as source and the
TAO as target (張志軍 has no node). No TAO readout on gwytb.gov.cn was found,
so it isn't T1 yet.

**Lead, not followed up:** the search summary says 陳菊 thanked 張志軍 for
his hospitality on an *earlier* visit to Tianjin. That's a possible second
PRC trip. It's in Inbox.

## 4. 賴清德, Shanghai, June 2014 → `lai-shanghai-2014` (T2, taken)

**Claim:** as Tainan mayor, 賴清德 visited Shanghai for two days around
2014-06-06 to 07. He opened the Shanghai leg of the 陳澄波 120th-anniversary
touring exhibition (中華藝術宮) and held a discussion at 復旦大學. In 2019 he
said that apart from Shanghai mayor 楊雄, everyone he met was at city-government
level.

| Source | Excerpt | |
|---|---|---|
| [ETtoday, 2014-06-07](https://www.ettoday.net/news/20140607/365382.htm) | 「正在上海訪問的台南市長賴清德，7日上午借用大陸國家主席習近平最近說中美關係「不要對抗、不要衝突，要相互尊重、合作雙贏」的談話，表示中國不只和美國該如此，和台灣的關係也應該如此。」 | **(read)** |
| [風傳媒 32021, 2014-06-08](https://www.storm.mg/article/32021) | DPP chair 蔡英文: 「賴市長昨日在上海的談話，也表達了民進黨成長的歷史軌跡，這將有助於雙方進一步相互理解。」 | **(read)** |
| [Newtalk, 2019-12-23](https://newtalk.tw/news/view/2019-12-23/344444) | 「他見到的除了上海市長楊雄之外，都是市府層級的人；『談陳澄波的事情，藝術的交流、城市的交流』。」 | **(read)**. This is Lai's own account |
| [The News Lens 20046](https://www.thenewslens.com/article/20046) | 403 | not used |
| [風傳媒 5102934](https://www.storm.mg/article/5102934) | VIP paywall, not fetched | not used |

**Verdict:** taken, T2 for the visit (ETtoday and Storm). The 楊雄 meeting
rests on Lai's own statement, and the edge's `notes` says so. One search
summary named 上海市台辦 director 李文輝 at the 復旦 session. It wasn't
confirmed on a fetched page, so it isn't recorded.

## 5. DPP and the Straits Forum (海峽論壇), 2008–16

- **DPP policy:** the party tells members not to attend (spokesperson 吳崢,
  2026-06, [ETtoday 3177152](https://www.ettoday.net/news/20260603/3177152.htm),
  search summary only). That's not a tie. Recorded for context.
- **2009, first forum, 邱垂正 (now MAC chair):**
  - [聯合新聞網 9573918, 2026-06-18](https://udn.com/news/story/7331/9573918) **(read)**:
    「他2009年赴廈門時還是大學老師，當時政府也沒有限制人員參加海峽論壇；他以學者身分實地了解並訪談相關人士」
  - [自由時報 5476333, 2026-06-18](https://news.ltn.com.tw/news/politics/breakingnews/5476333) **(read)**:
    lists 「民進黨國際部前副主任邱垂正、民進黨中國事務部前主任顏建發等人」 among
    2009 attendees, in a report of KMT legislator 陳菁徽's criticism.
  - **Verdict: T2-ready but deferred to N3**, where his node, party status
    and MAC role get researched properly. LTN describes him as a *former*
    DPP staffer, not as a party member, so his party affiliation is unknown.
- **2009, other attendees with DPP history** (許信良, 李文忠, 鄭朝明, 許榮淑,
  顏建發): one search summary only. Several had left the DPP by 2009, so
  "DPP-side" needs checking person by person. **Not taken.** Moved to N1b.
- **2010–2016, DPP councillors or township heads at the forum:** searched in
  中文 and English, **nothing found** in the results. That's a null result
  for these queries, not proof that nobody attended.
