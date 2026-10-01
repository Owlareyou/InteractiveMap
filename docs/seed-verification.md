# Seed data — verification checklist

Every edge in `data/edges.json` is `review_status: 'draft'`. Sources name a
real issuing body or outlet, but `source_url` and `quote` are `null` until
someone checks them. Work down this list, fill in the URL and a verbatim quote,
and set the edge to `'reviewed'`.

Confidence is how sure the author was of the fact itself when entering it.

## §6 relationship edges

| Edge id | Source(s) to find | Confidence |
|---|---|---|
| `ma-xi-2015-singapore` | 總統府 news release, 2015-11-07 | High |
| `ma-xi-2024-beijing` | 新華社 readout, 2024-04-10 | High |
| `hung-xi-2016` | 新華社 readout, and 國民黨 release, 2016-11-01 | High |
| `hsia-prc-visits-2023` | 中央社 and Reuters coverage of the 2023 visits. T2 needs both | High for the visits. Note he met senior officials, not Xi; the §6 target is kept as given |
| `lai-opposes-xi` | 總統府 inauguration speech, 2024-05-20 | Medium: "opposes" is a characterisation of a speech |
| `lai-appointed-by-tsai-2017` | 總統府 appointment order, September 2017 | High |
| `ma-opposes-tsai` | 聯合報 and 自由時報 coverage (outlets chosen from both sides of the spectrum) | Medium: vague as specified in §6 |
| `hung-member-of-kmt` | 立法院 legislator profile | High |

## Education edges (added beyond §6)

| Edge id | Fact | Confidence |
|---|---|---|
| `ma-edu-*` | 臺大 LL.B. 1972, NYU LL.M. 1976, Harvard S.J.D. 1981 | High |
| `tsai-edu-*` | 臺大 LL.B. 1978, Cornell LL.M. 1980, LSE Ph.D. 1984 | High |
| `lai-edu-ntu` | 臺大 physical therapy | High (year left null) |
| `lai-edu-ncku` | 成大 post-bacc medicine | High (year left null) |
| `lai-edu-harvard` | Harvard M.P.H. | High (year left null) |
| `hung-edu-pccu` | 中國文化學院 law | Medium: check the department and degree |
| `hung-edu-truman` | 東北密蘇里州立大學, education master's | **Medium: verify** |
| `hsia-edu-nccu` | 政大 diplomacy, bachelor's | Medium |
| `hsia-edu-georgetown` | Georgetown, master's | **Low: verify first** |
| `xi-edu-tsinghua-1979` | 清華 chemical engineering, 1975–79 | High |
| `xi-edu-tsinghua-2002` | 清華 法學博士, 1998–2002, part-time | High |

## Party membership edges (added 2026-10-01, beyond §6)

Added at Jing's request so DPP and CCP aren't left without edges. The facts are
already stated in each person's `party_affiliations`, so these edges only make
them visible on the graph.

The sources were named from background knowledge, not from a search. Same rule
as before: real issuing bodies, URL and quote left null, draft status.

| Edge id | Source(s) to find | Tier | Confidence |
|---|---|---|---|
| `ma-member-of-kmt` | 中央選舉委員會 candidate registration (2008, 2012 presidential) | T1 | High |
| `hsia-member-of-kmt` | 中央社 report of his appointment as KMT vice chair, plus the 國民黨 announcement | T2 | High. Not T1, because a party's own announcement isn't a government record |
| `tsai-member-of-dpp` | 中央選舉委員會 candidate registration (2012, 2016, 2020 presidential) | T1 | High |
| `lai-member-of-dpp` | 中央選舉委員會 candidate registration (2024 presidential) | T1 | High |
| `xi-member-of-ccp` | 新華社 official biography (CCP General Secretary) | T1 | High |

## KMT–CCP enrichment (added 2026-10-01)

**34 nodes and 47 edges** were added from
`docs/research/2026-10-01-kmt-ccp-ties.md`. That log is the checklist for
these: each row there names the claim, the URLs and a verdict.

Unlike the earlier seed edges, most of these already carry a `source_url`.
They're still `draft`. To promote one, open its URL, paste a verbatim `quote`,
and set `review_status: 'reviewed'`.

Check these first:
- **`rao-song-tao-2025`:** rests on the MAC chair's characterisation.
- **`fu-kun-chi-edu-jnu`:** the degree is disputed.
- **`want-want-owns-ctv`:** confirm the 51.20% on TWSE's 公開資訊觀測站.
- **`tsai-eng-meng-wang-yi-2008`:** the account comes from 旺旺's own magazine.
  The 天下 link returned 403.
- **`ctv-taichung-tender-2025`:** single outlet. Confirm on the government
  e-procurement site.
- **`hsia-straits-forum-2023`:** cites a Taiwan News topic page. Find the
  specific article.

## Not filled in (deliberately)

- `wikidata_qid` is `null` on every node (spec decision 2).
- `bio_short_*` and party membership dates are empty.
- `roles[]`: added on 2026-10-01 for the six original figures and most new
  people. These are well-known offices and dates from background knowledge,
  not researched for this round. Verify them alongside the edges. A few vice
  chair roles have unknown dates (`null`).
- PRC education now exists in the data: 陳玉珍 at 北京大學 and 羅明才 at
  四川大學 (both official CEC records), and 傅崐萁 at 暨南大學 (disputed).
  None of the six original figures studied at a PRC institution.
