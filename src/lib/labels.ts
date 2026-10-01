import type { EntityType, EvidenceTier, RelationLayer, Valence } from '../schema/index'

// UI labels for enum values: zh-Hant first, English second (§5).
export type Label = { zh: string; en: string }

export const ENTITY_TYPE_LABEL: Record<EntityType, Label> = {
  person: { zh: '人物', en: 'Person' },
  party: { zh: '政黨', en: 'Party' },
  government_body: { zh: '政府機關', en: 'Government body' },
  company: { zh: '企業', en: 'Company' },
  media_org: { zh: '媒體', en: 'Media' },
  association: { zh: '團體／論壇', en: 'Association / forum' },
  institution: { zh: '學校', en: 'School' },
}

export const LAYER_LABEL: Record<RelationLayer, Label> = {
  governance: { zh: '政治', en: 'Governance' },
  economic: { zh: '經濟', en: 'Economic' },
  cross_strait: { zh: '兩岸', en: 'Cross-strait' },
  personal: { zh: '個人', en: 'Personal' },
  enforcement: { zh: '司法與監管', en: 'Enforcement' },
}

// Describes the tie, not a verdict on it: "positive" in the data means
// cooperative, which 正向 / Positive would read as approval.
export const VALENCE_LABEL: Record<Valence, Label> = {
  positive: { zh: '合作', en: 'Cooperative' },
  neutral: { zh: '中性', en: 'Neutral' },
  negative: { zh: '對立', en: 'Adversarial' },
}

export const TIER_LABEL: Record<EvidenceTier, Label> = {
  T1: { zh: '官方紀錄', en: 'Official record' },
  T2: { zh: '兩個以上獨立來源', en: '2+ independent outlets' },
  T3: { zh: '單一來源', en: 'Single outlet' },
  T4: { zh: '指控（非確立關係）', en: 'Allegation, not established' },
}
