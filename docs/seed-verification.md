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

## Not filled in (deliberately)

- `wikidata_qid` is `null` on every node (spec decision 2).
- `roles[]`, `bio_short_*` and party membership dates are empty, because §6
  doesn't give them. The `role_type` grouping in Task 7 will show "unknown"
  until roles are added.
- None of the six figures studied at a PRC institution (Xi's own country is
  `CN`, so he is bucketed separately). The "studied in the PRC" signal
  therefore can't be seen yet. Adding a real, sourced example would exercise it.
