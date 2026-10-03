# Research log: TPP and 柯文哲 (2026-10-03)

**Queue item:** N2 in [`QUEUE.md`](QUEUE.md). Split: this iteration covers
the TPP node, its two chairs, and 柯文哲's Shanghai rounds of the twin-city
forum. The 蔣萬安 rounds, the Taipei-hosted rounds, and the 「兩岸一家親」
remarks moved to N2b. Conventions are as in
[`2026-10-02-dpp-cross-strait.md`](2026-10-02-dpp-cross-strait.md): only
excerpts marked **(read)** are used as quotes.

**Queries run:**
- 台灣民眾黨 成立 2019年8月6日 柯文哲 黨主席 內政部 政黨備案
- 黃國昌 當選 民眾黨主席 2025 黨主席選舉 柯文哲 卸任
- 雙城論壇 2015 上海 柯文哲 楊雄 會見 2017 2019 應勇 柯文哲 上海
- 柯文哲 首度訪上海 2015年8月 雙城論壇 楊雄 中央社
- 柯文哲 張志軍 會面 2017年7月3日 上海 柯張會 會後

**Attribution caveat:** all four of 柯文哲's cross-strait edges below
(2015, 2017, 2017, 2019) **predate the TPP**, which was founded 2019-08-06.
At the time he was Taipei's independent (無黨籍) mayor. Each edge's `notes`
says so. `npm run coverage` buckets people by "ever a member", so it counts
these as TPP.

---

## 1. TPP founding, 2019-08-06 → node `tpp`, `ko-member-of-tpp`, `ko-tpp-chair` (T2, taken)

| Source | Excerpt | |
|---|---|---|
| [鏡週刊, 2019-08-06](https://www.mirrormedia.mg/story/amp/20190806inv004) | 「台北市長柯文哲創立台灣民眾黨，今（6日）舉行創黨大會，他以黨主席的身分發表創黨宣言」 | **(read)** |
| [自由時報 2897354, 2019-08-27](https://news.ltn.com.tw/amp/news/politics/breakingnews/2897354) | 「8月6日正式召開政黨成立大會」. About the MOI accepting the party's registration | **(read)** |

**Not found:** the MOI party register entry itself (the T1 record). A search
summary mentions MOI 民政司 approving the filing in August 2019. Lead for
V4 or X3.

## 2. 柯文哲 steps down; 黃國昌 elected chair → `huang-member-of-tpp`, `huang-tpp-chair` (T2, taken)

| Source | Excerpt | |
|---|---|---|
| [公視新聞網 737944, 2025-02-15](https://news.pts.org.tw/article/737944) | 「民眾黨今（15）日下午宣布黨主席補選結果，由民眾黨代理主席黃國昌以8903票勝出，得票率96.11%」; 「柯文哲涉京華城弊案及政治獻金等案遭羈押禁見後，在今（2025）年元旦請辭黨主席」 | **(read)** |
| [TVBS 2780549, 2025-02-15](https://news.tvbs.com.tw/politics/2780549) | 「黃國昌得票數為8903票，得票率96.11%；蔡壁如得票數360票，得票率3.89%，結果由黃國昌勝出。」 | **(read)** |

**Verdict:** taken.
- 柯文哲's chair role ends 2025-01-01, per PTS.
- 黃國昌's chair role starts 2025-02-15, the election. He was acting chair
  from 2025-01, which is in `notes`.
- 黃國昌's TPP join date was **not** looked up.
- His earlier New Power Party (時代力量) chairmanship is noted but not
  modelled, because there's no NPP node.
- **Not checked:** whether 柯文哲's party membership has changed since his
  indictment (E1 covers the case). `ko-member-of-tpp` is `active` as of these
  sources.

## 3. Twin-city forum (上海–臺北雙城論壇), Shanghai rounds → `ko-shanghai-forum-2015`, `-2017`, `-2019` (T2, taken)

| Year | Source | Excerpt | |
|---|---|---|---|
| 2015 | [自由時報 1415730, 2015-08-18](https://news.ltn.com.tw/amp/news/politics/breakingnews/1415730) | 「台北市長柯文哲和上海市長楊雄在今日上午9點左右，輕裝、並肩踏入會場。」 | **(read)** |
| 2015 | [公視新聞網 304088](https://news.pts.org.tw/article/304088) | 「柯文哲將在上海瑞金賓館,和上海市長楊雄進行會談,也有產業界隨行.」 | **(read)**. The page is dated **2015-10-28**, which doesn't match the August trip. This is the second PTS archive date mismatch (see N1), so `published_date` is null |
| 2017 | [鏡週刊, 2017-07-02](https://www.mirrormedia.mg/story/20170702inv001) | 「雙城論壇今天上午在上海東方濱江酒店舉行，東道主上海市長應勇和台北市長柯文哲均發表致詞。」 | **(read)** |
| 2017 | [自由時報 2118424, 2017-07-02](https://news.ltn.com.tw/amp/news/politics/breakingnews/2118424) | 「台北、上海雙城論壇今天上午登場，中共總書記習近平愛將、上海市長應勇率先致詞」 | **(read)** |
| 2019 | [Newtalk, 2019-07-04](https://newtalk.tw/news/view/2019-07-04/268196) | 「柯文哲上午前往上海金山假日酒店出席雙城論壇主論壇開幕式，而上海市長應勇致詞時，強調「兩岸一家親」。」 | **(read)** |
| 2019 | [鏡週刊, 2019-07-03](https://www.mirrormedia.mg/story/20190703inv008) | 「台北上海雙城論壇明天（4日）登場，上海市長應勇今晚（3日）作東，在上海興國賓館宴請台北市長柯文哲率領的北市府團隊及貴賓」 | **(read)** |
| 2015 | [The News Lens 22786](https://www.thenewslens.com/article/22786) | 403 | not used |

**Verdict:** three `attended_forum` edges, T2, targeting
`shanghai-municipal-government` as the host. That's the same target used for
陳菊 and 賴清德 in N1.

## 4. 柯文哲 meets TAO director 張志軍, Shanghai, 2017-07-03 → `ko-zhang-zhijun-2017` (T2, taken)

| Source | Excerpt | |
|---|---|---|
| [中央社, 2017-07-03](https://www.cna.com.tw/news/acn/201707030073.aspx) | 「台北市政府公布，台北市長柯文哲預計今天下午4時30分和大陸國台辦主任張志軍在上海會面，地點將另行通知。」 | **(read)**. This is the pre-meeting announcement |
| [Newtalk, 2017-07-04](https://newtalk.tw/news/view/2017-07-04/91232) | 「台北市長柯文哲結束為期3天的雙城論壇行程，返台前與中國國台辦主任張志軍會面，受到外界關注。」 | **(read)**. Confirms the meeting happened |
| [鏡週刊, 2017-07-03](https://www.mirrormedia.mg/story/20170703inv012) | Started 16:30 at 上海迎賓館, about 35 minutes behind closed doors | **(read)**, but the fetch tool returned the excerpt with an ellipsis in the middle, so **`quote` is null** for this source |

**Verdict:** taken, `met_officially_with` the TAO. This lead wasn't in the
queue. It came up while searching the forum.
