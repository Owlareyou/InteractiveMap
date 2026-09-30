import { z } from 'zod'

// Closed vocabularies from §4.1. Extending any of these needs sign-off
// (see README "Spec decisions").

export const EntityType = z.enum([
  'person',
  'party',
  'government_body',
  'company',
  'media_org',
  'association',
  'institution', // spec decision 6: schools, for educated_at
])
export type EntityType = z.infer<typeof EntityType>

export const RelationLayer = z.enum([
  'governance',
  'economic',
  'cross_strait',
  'personal',
  'enforcement',
])
export type RelationLayer = z.infer<typeof RelationLayer>

export const RelationType = z.enum([
  // governance
  'member_of',
  'position_held',
  'appointed_by',
  'endorsed',
  'coalition_with',
  'opposes',
  'criticizes',
  // economic
  'employer',
  'board_member',
  'shareholder',
  'donor_to',
  'business_partner',
  'contract_with',
  // cross_strait
  'met_officially_with',
  'attended_forum',
  'participated_in_exchange',
  'holds_prc_position',
  'prc_entity_business_tie',
  'made_prc_visit',
  // personal
  'spouse',
  'relative_of',
  'mentor_of',
  'educated_at',
  // enforcement
  'investigated_by',
  'indicted_by',
  'ruled_on',
])
export type RelationType = z.infer<typeof RelationType>

export const TemporalScope = z.enum(['event', 'state', 'property'])
export type TemporalScope = z.infer<typeof TemporalScope>

export const Valence = z.enum(['positive', 'neutral', 'negative'])
export type Valence = z.infer<typeof Valence>

// T4 records an allegation that a tie exists, not the tie itself.
export const EvidenceTier = z.enum(['T1', 'T2', 'T3', 'T4'])
export type EvidenceTier = z.infer<typeof EvidenceTier>

export const ReviewStatus = z.enum(['draft', 'reviewed', 'rejected'])
export type ReviewStatus = z.infer<typeof ReviewStatus>

export const EducationStage = z.enum([
  'secondary',
  'bachelor',
  'master',
  'doctorate',
  'other',
])
export type EducationStage = z.infer<typeof EducationStage>

// Layer is derived from type, never stored on the edge, so the two can't drift.
export const RELATION_LAYER_MAP: Record<RelationType, RelationLayer> = {
  member_of: 'governance',
  position_held: 'governance',
  appointed_by: 'governance',
  endorsed: 'governance',
  coalition_with: 'governance',
  opposes: 'governance',
  criticizes: 'governance',
  employer: 'economic',
  board_member: 'economic',
  shareholder: 'economic',
  donor_to: 'economic',
  business_partner: 'economic',
  contract_with: 'economic',
  met_officially_with: 'cross_strait',
  attended_forum: 'cross_strait',
  participated_in_exchange: 'cross_strait',
  holds_prc_position: 'cross_strait',
  prc_entity_business_tie: 'cross_strait',
  made_prc_visit: 'cross_strait',
  spouse: 'personal',
  relative_of: 'personal',
  mentor_of: 'personal',
  educated_at: 'personal',
  investigated_by: 'enforcement',
  indicted_by: 'enforcement',
  ruled_on: 'enforcement',
}

// Spec decision 5: member_of is directed, so it is not in this list.
export const SYMMETRIC_RELATION_TYPES: ReadonlySet<RelationType> = new Set([
  'spouse',
  'relative_of',
  'coalition_with',
  'business_partner',
])

/**
 * How to read a directed edge `source → target`. Every entry is a sentence
 * with SOURCE and TARGET in it, so there is no guessing which end is which.
 * Where the type name alone is ambiguous, the reading follows the Wikidata
 * convention of putting the person first.
 */
export const RELATION_DIRECTION_SEMANTICS: Record<RelationType, string> = {
  member_of: 'SOURCE is a member of TARGET (a party).',
  position_held: 'SOURCE holds or held a position in TARGET.',
  appointed_by: 'SOURCE was appointed by TARGET.',
  endorsed: 'SOURCE endorsed TARGET.',
  coalition_with: 'SOURCE and TARGET are in coalition (symmetric).',
  opposes: 'SOURCE opposes TARGET.',
  criticizes: 'SOURCE publicly criticized TARGET.',
  employer: 'SOURCE is employed by TARGET. (TARGET is the employer.)',
  board_member: 'SOURCE sits on the board of TARGET.',
  shareholder: 'SOURCE holds shares in TARGET.',
  donor_to: 'SOURCE donated to TARGET.',
  business_partner: 'SOURCE and TARGET are business partners (symmetric).',
  contract_with: 'SOURCE holds a contract awarded by TARGET.',
  met_officially_with: 'SOURCE met TARGET in an official capacity.',
  attended_forum: 'SOURCE attended a forum hosted by TARGET.',
  participated_in_exchange: 'SOURCE took part in an exchange run by TARGET.',
  holds_prc_position: 'SOURCE holds a position in TARGET (a PRC body).',
  prc_entity_business_tie: 'SOURCE has a business tie to TARGET (a PRC entity).',
  made_prc_visit: 'SOURCE visited the PRC, hosted by or meeting TARGET.',
  spouse: 'SOURCE and TARGET are spouses (symmetric).',
  relative_of: 'SOURCE and TARGET are relatives (symmetric).',
  mentor_of: 'SOURCE mentored TARGET.',
  educated_at: 'SOURCE studied at TARGET (an institution).',
  investigated_by: 'SOURCE was investigated by TARGET.',
  indicted_by: 'SOURCE was indicted by TARGET.',
  ruled_on: 'SOURCE was the subject of a ruling by TARGET (a court). (TARGET did the ruling.)',
}

// Which entity types each end of an edge must be. Types not listed are
// unconstrained for now.
export const RELATION_ENDPOINT_RULES: Partial<
  Record<RelationType, { source?: EntityType; target?: EntityType }>
> = {
  member_of: { target: 'party' },
  educated_at: { source: 'person', target: 'institution' },
  spouse: { source: 'person', target: 'person' },
  relative_of: { source: 'person', target: 'person' },
  mentor_of: { source: 'person', target: 'person' },
}
