/**
 * Tunable parts of the grouping dimensions (src/lib/grouping.ts).
 * Why each value is what it is: docs/decisions/grouping.md
 *
 * [R] = anchored in a fact or published practice. [J] = our judgement.
 * [M] = mock placeholder, expected to change once seen on screen.
 */

export type RoleKey =
  | 'head_of_state'
  | 'official'
  | 'party_leadership'
  | 'legislator'
  | 'local_executive'
  | 'prc_leadership'
  | 'business_media'

/**
 * [J] Role type comes from a person's current role titles (`end: null`).
 * Rules are tried top to bottom and the first match wins, so the order
 * matters: 「國家主席」 must hit PRC leadership before 「主席」 hits party
 * leadership, and 「立法院長」 must hit legislator before 「院長」 hits
 * official.
 */
export const ROLE_RULES: ReadonlyArray<{ key: RoleKey; keywords: readonly string[] }> = [
  { key: 'head_of_state', keywords: ['總統', '副總統'] },
  { key: 'prc_leadership', keywords: ['總書記', '國家主席', '政協主席'] },
  { key: 'legislator', keywords: ['立法委員', '立法院長', '總召'] },
  { key: 'official', keywords: ['院長', '主委', '主任委員', '國台辦主任'] },
  { key: 'party_leadership', keywords: ['主席', '副主席'] },
  { key: 'local_executive', keywords: ['市長', '縣長'] },
  { key: 'business_media', keywords: ['董事長'] },
]

export const ENGAGEMENT_SETTINGS = {
  // [M] Bucket boundaries on the score, which adds up evidence-tier
  // confidences (one T1 meeting ≈ 0.95). Above 0 and below `medium` is low;
  // `high` and above is high.
  thresholds: { medium: 1, high: 3 },
  // [R] The PRC was founded on 1949-10-01. Earlier study on the mainland
  // (黃埔, for example) was under the ROC, so it doesn't count (decision 14).
  prcEducationCutoff: '1949-10-01',
  // [J] Count PRC-region study whose edge has no dates. The three such records
  // were researched as post-1949 study but stored without dates. The drawer
  // flags each one as "undated", so the assumption stays visible.
  countUndatedPrcEducation: true,
}
