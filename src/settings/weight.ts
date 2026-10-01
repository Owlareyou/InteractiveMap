import type { EvidenceTier, RelationType, TemporalScope } from '../schema/index'

/**
 * Every tunable number behind edge weight, in one place.
 *
 *   weight = confidence × intensity × scope × recency
 *
 * Why each number is what it is: docs/decisions/edge-weight.md
 * The research behind it:        docs/research/2026-09-30-edge-weight.md
 *
 * [R] = anchored in published practice. [J] = our judgement, tune freely.
 * [M] = mock placeholder, expected to change once seen on screen.
 */
export type WeightSettings = {
  confidence: {
    tier: Record<EvidenceTier, number>
    minSources: Record<EvidenceTier, number>
    extraSourceDoubtRemoved: number
    t4Cap: number
  }
  intensity: Record<RelationType, number>
  scope: Record<TemporalScope, number>
  recency: {
    halfLifeYears: number
    floor: number
  }
}

export const DEFAULT_WEIGHT_SETTINGS: WeightSettings = {
  confidence: {
    // [R] ICD 203 probability bands; exact point in each band is [J].
    tier: { T1: 0.95, T2: 0.85, T3: 0.65, T4: 0.3 },
    // Sources a tier already requires; only sources beyond these count as extra.
    minSources: { T1: 1, T2: 2, T3: 1, T4: 1 },
    // [R] method (independent corroboration raises confidence); 40% is [J].
    extraSourceDoubtRemoved: 0.4,
    // [J] top of ICD 203 "roughly even chance": repetition doesn't make an allegation true.
    t4Cap: 0.5,
  },

  // [M] How strong a tie of this type is, if it exists. Mock numbers, applied
  // identically to every party. Cross-strait types sit on the same scale as
  // their domestic counterparts (an official meeting = 1.0 either way).
  intensity: {
    member_of: 0.7,
    position_held: 0.9,
    appointed_by: 0.9,
    endorsed: 0.7,
    coalition_with: 0.8,
    opposes: 0.8,
    criticizes: 0.6,
    employer: 0.8,
    board_member: 0.8,
    shareholder: 0.7,
    donor_to: 0.7,
    business_partner: 0.8,
    contract_with: 0.7,
    met_officially_with: 1.0,
    attended_forum: 0.6,
    participated_in_exchange: 0.6,
    holds_prc_position: 1.0,
    prc_entity_business_tie: 0.8,
    made_prc_visit: 0.7,
    // As strong as a board seat if true. These edges are T4, so the T4 cap
    // keeps the weight low however strong the tie would be.
    reported_editorial_direction: 0.8,
    spouse: 1.0,
    relative_of: 0.8,
    mentor_of: 0.8,
    educated_at: 0.6,
    investigated_by: 0.8,
    indicted_by: 0.9,
    ruled_on: 0.9,
  },

  // [J] Brief §4.4 order (property > state > event), kept the weakest factor:
  // permanence is not the same as strength.
  scope: { property: 1.0, state: 0.95, event: 0.9 },

  recency: {
    // [R] exponential tie decay; 8 years (two presidential terms) is [J].
    halfLifeYears: 8,
    // [J] this is an archive of documented ties, so old ties thin but never vanish.
    floor: 0.75,
  },
}
