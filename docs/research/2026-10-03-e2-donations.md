# Research log: E2, political donations (2026-10-03)

**Queue item:** E2 in [`QUEUE.md`](QUEUE.md). It covers 旺旺 donations (the
README's open question) and the largest corporate donors in the 2024
presidential cycle. Source: the 監察院 政治獻金公開查閱平臺
(<https://ardata.cy.gov.tw/>), which is T1.

## How the platform was queried (reusable)

The site is an Angular app, but its data comes from a public JSON API. I
worked out the parameters from the app's own bundle (`main.js`,
`search-search-module.js`):

- `GET https://ardata.cy.gov.tw/api/v1/search?…` returns
  `{data:[…], paging:{pageNumber,pageSize,pageCount,recordCount}}`.
- Working filters:
  - `donor=<substring>`: the counterparty name (donor *or* payee)
  - `keyword=<name>&keywordRanges=Candidate`: the account holder
  - `classType=12`: corporate donations (營利事業捐贈)
  - `page`, `pageSize` (≤100)
  - Other names in the bundle: `electionYear`, `electionCode`,
    `accountingSerial`, `reportedYear`, `transactionDateBegin/End`,
    `amountBegin/End`, `isMoney`, `payType`, `keywordRanges=PoliticalParty|Donor|ExpenditureTarget`.
- **Field meanings, verified on records:**
  - `donor` is the counterparty.
  - `receivedAmount` is income (a donation).
  - `donationAmount` is **spending** (e.g. ads, insurance).
  - `typeCode` 12 is a corporate donation, 11 an individual one. 2x and 4x
    are spending.
  - Records with no `electionName` are party accounts.
- **Limit:** itemised income shows up for candidates and small parties.
  The KMT and DPP (「PoliticalPartyLarge」) don't list donors through this
  search. Their large-party reports are a separate download type, not
  explored.

## 1. 旺旺: no donations found in itemised records

Queried with `donor=` for: 旺旺, 宜蘭食品, 神旺投資, 中國時報, 中時, 中天,
中天電視, 中國電視事業, 旺旺友聯, 旺旺中時.

| Counterparty | Records | As donor (income) | As payee |
|---|---|---|---|
| 「旺旺」 (any) | 403 | **3**, all from unrelated small firms: 旺旺鑫科技 (高雄, NT$6,666 to 柯文哲 2023, **returned** 已返還), 旺旺環保工程 (NT$20,000, 竹東 2022), 旺旺電子商務 (NT$30,000, 高雄市議員 2018). No link to the 旺旺 group shown | 400 (incl. 旺旺友聯產物保險 = insurance purchases, 查查旺旺創意 = ad vendor) |
| 中國時報 | 1,053 | **0** | 1,053 (ads, and newspaper subscriptions incl. KMT party offices) |
| 中天電視 | 49 | **0** | 49 |
| 中國電視事業 | 45 | **0** | 45 |
| 旺旺友聯 | 103 | **0** | 103 |
| 宜蘭食品, 神旺投資, 旺旺中時 | 0 | 0 | 0 |

**Verdict:** in the platform's itemised records (candidates and small
parties), **no donation from a 旺旺-group entity was found**. The group's
media appear only as vendors paid by campaigns of every party. **This
doesn't settle donations to the KMT or DPP party accounts**, which aren't
itemised in this search. Parked for Jing: the large-party annual reports
(「政黨」 accounts) would need a manual download.

## 2. 2024 presidential cycle: corporate donors (113年總統、副總統選舉)

Query: `keyword=<candidate>&keywordRanges=Candidate&classType=12`, all
pages, filtered to the presidential account. The full extract (1,131
donor-candidate rows, with record ids) is in
[`2026-10-03-e2-2024-presidential-corporate-donations.csv`](2026-10-03-e2-2024-presidential-corporate-donations.csv).

| Ticket (party) | Corporate-donation records | Total from companies | Donors at the NT$1,000,000 cap |
|---|---|---|---|
| 賴清德 (DPP) | 580 | NT$166,665,839 | 91 of 531 |
| 侯友宜 (KMT) | 148 | NT$54,259,984 | 36 of 130 |
| 柯文哲 (TPP) | 643 | NT$17,344,229 | 6 of 468 |

**Why there's no "top 5":** the queue asked for the 5 largest corporate
donors per party. But **91, 36 and 6 donors respectively gave exactly
NT$1,000,000**, which looks like the per-candidate legal cap for a company.
(That's my reading of the data, not checked against the 政治獻金法 text in
this iteration.) Any top 5 would be an arbitrary pick among ties, so none
was added.

**More informative: companies that gave to more than one camp.** 14 did.
Three gave the maximum to **both** 賴清德 and 侯友宜:
- 環球購物中心股份有限公司 (80296032)
- 揚潤營造股份有限公司 (91759468)
- 璞吉廣告股份有限公司 (52365254)

The full list is in the CSV.

**Cross-check against the press:** a Storm (VIP) summary said 璞園建設 was
the top donor in 2024 (NT$15.45m across presidential *and* legislative
races). Not checked against the API in this iteration.

## Data changes

**None.** The `donor_to` edges are left for Jing to choose (see Needs
Jing). Adding 15 to 18 single-donation company nodes would add noise
without a clear rule. If Jing wants edges, the CSV gives record ids for T1
evidence (`source_url` = the API query, `quote` null).
