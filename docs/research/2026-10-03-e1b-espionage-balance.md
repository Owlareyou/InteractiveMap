# Research log: E1b, espionage cases for the other parties (2026-10-03)

**Queue item:** E1b in [`QUEUE.md`](QUEUE.md). It's the balance check for
E1, which had recorded only the DPP-linked 黃取榮 case. It also checks the
appeal status of the E1 rulings. Only excerpts marked **(read)** are
quoted.

**Queries run:**
- 共諜案 國民黨 立委 助理 起訴 判決 2024 2025 2026 國家安全法
- 共諜案 民眾黨 黨工 助理 起訴 判決 2025 2026 國安法 / 民眾黨 共諜 起訴 柯文哲 OR 黃國昌 助理 OR 黨工 國安法 調查局 2024 2025 2026
- 林岳龍 王鴻薇 前助理 共諜 起訴 判決 國安法 北檢
- 陳惟仁 李易諧 林雍達 共諜案 判決 定讞 國會助理 年
- 柯文哲 京華城案 上訴 二審 高等法院 2026 檢方 上訴

## Verdicts by party

| Party link | Case | Stage reached | Edge |
|---|---|---|---|
| **KMT** (aide to KMT legislators 許宇甄, 王鴻薇, 林倩綺) | 林岳龍, 2025-06 | **Investigated.** Searched, questioned, bail NT$100,000. No indictment found | `lin-yueh-lung-investigated-2025` (T2) |
| **KMT** (aide to KMT legislator 陳淑慧) | 陳惟仁, former-aides ring (active 2014–18) | Investigated or detained 2020-06. **Final** 10-month sentence, Supreme Court, 2022-02 | `chen-wei-jen-investigated-2020` (T2), `chen-wei-jen-ruled-2022` (**T3**, CNA only) |
| KMT (aide to 張麗善) | 李易諴, same ring | Detained 2020-06. Case dropped after his death (2020-09, summary) | Not added (died; no outcome) |
| DPP (aide to DPP legislator 陳進丁) | 林雍達, same ring | Outcome not found | Not added |
| **DPP** | 朱政騏 (DPP Taipei councillor-primary winner, expelled), indicted 2026-04 per summary | Not read | Not added (Inbox). Balance note: a further DPP-linked case |
| **TPP** | — | **Searched, nothing found** for staff of TPP officials. 徐春鶯 (once considered for the TPP's list) was indicted by 新北地檢 under the 反滲透法 and on fraud and banking-law charges (summary). She wasn't party staff, and it isn't an espionage case | Not added (Inbox) |

## Sources (all **read**)

- [TVBS 2898750, 2025-06-11](https://news.tvbs.com.tw/politics/2898750): 「林岳龍也涉共諜案昨遭檢調約談，凌晨裁定10萬交保。」 Also 朱立倫: 「只要有任何本黨黨員牽涉到共諜案，考紀會立即做最嚴格處分，不容許這些份子留在國民黨裡面。」 That's a general statement, so it **doesn't establish** 林岳龍's own membership, and `party_affiliations` stays empty.
- [公視 755528, 2025-06-11](https://news.pts.org.tw/article/755528): 「10日調查局國安站兵分多路搜索議會和林岳龍住家，因為他還有一個身分，就是議員助理。」
- [公視 483639, 2020-06-18](https://news.pts.org.tw/article/483639): 「陳惟仁、李易諴予法院裁定收押禁見。其中，李易諴是現任雲林縣長張麗善做立委時期的助理」
- [CNA English via GlobalSecurity, 2022-02-16](https://www.globalsecurity.org/intell/library/news/2022/intell-220216-cna01.htm): "The Taiwan Supreme Court has upheld a decision by a lower court sentencing former legislative aide Chen Wei-jen (陳惟仁) to 10 months imprisonment … The Supreme Court's decision is final." It names him as an aide to KMT lawmaker 陳淑慧.

## Appeal status (from E1)

- **柯文哲:** both the prosecutors and 柯文哲 (with 6 co-defendants) appealed.
  The High Court's second-instance trial opened on 2026-09-08
  ([中央社 202609080023](https://cna.com.tw/news/asoc/202609080023.aspx)
  **(read)**: 「台灣台北地方檢察署與柯文哲等7名被告都提起上訴。二審由高院謙股承審」).
  Added as evidence to `ko-ruled-2026`, which stays `disputed`.
- **黃取榮:** whether anyone appealed to the Supreme Court **wasn't checked**.
  It stays `disputed`.

## Note on attribution

The aides have no party affiliation in the data, so coverage counts them as
"none". Each edge's notes name whose aide they were. That's honest, but it
means the "cross-strait edges by party" figure doesn't reflect these staff
links. Worth considering when the app explains its party balance.
