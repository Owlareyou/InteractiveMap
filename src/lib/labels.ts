import type {
  EducationStage,
  EntityType,
  Edge,
  Evidence,
  EvidenceTier,
  RelationLayer,
  RelationType,
  ReviewStatus,
  TemporalScope,
  Valence,
} from '../schema/index'

// UI labels for enum values: zh-Hant first, English second (§5).
export type Label = { zh: string; en: string }

// Short names for the relation, read source → target. The full English
// reading is RELATION_DIRECTION_SEMANTICS in src/schema/enums.ts.
export const RELATION_LABEL: Record<RelationType, Label> = {
  member_of: { zh: '黨員', en: 'Member of' },
  position_held: { zh: '任職', en: 'Holds a position in' },
  appointed_by: { zh: '受任命', en: 'Appointed by' },
  endorsed: { zh: '表態支持', en: 'Endorsed' },
  coalition_with: { zh: '結盟', en: 'In coalition with' },
  opposes: { zh: '反對', en: 'Opposes' },
  criticizes: { zh: '批評', en: 'Criticized' },
  employer: { zh: '受僱於', en: 'Employed by' },
  board_member: { zh: '擔任董事', en: 'On the board of' },
  shareholder: { zh: '持股', en: 'Shareholder in' },
  donor_to: { zh: '捐款', en: 'Donated to' },
  business_partner: { zh: '商業夥伴', en: 'Business partners' },
  contract_with: { zh: '得標承攬', en: 'Holds a contract from' },
  met_officially_with: { zh: '正式會面', en: 'Met officially with' },
  attended_forum: { zh: '出席論壇', en: 'Attended a forum of' },
  participated_in_exchange: { zh: '參與交流', en: 'Took part in an exchange of' },
  holds_prc_position: { zh: '擔任中國職務', en: 'Holds a PRC position in' },
  prc_entity_business_tie: { zh: '與中國實體有商業往來', en: 'Business tie to a PRC entity' },
  made_prc_visit: { zh: '訪問中國', en: 'Visited the PRC, hosted by' },
  reported_editorial_direction: { zh: '遭報導受其編輯指示', en: 'Reported to take editorial direction from' },
  spouse: { zh: '配偶', en: 'Spouses' },
  relative_of: { zh: '親屬', en: 'Relatives' },
  mentor_of: { zh: '指導', en: 'Mentored' },
  educated_at: { zh: '就讀', en: 'Studied at' },
  investigated_by: { zh: '受調查', en: 'Investigated by' },
  indicted_by: { zh: '遭起訴', en: 'Indicted by' },
  ruled_on: { zh: '受裁決', en: 'Subject of a ruling by' },
}

export const SCOPE_LABEL: Record<TemporalScope, Label> = {
  event: { zh: '事件：發生於特定日期', en: 'Event: happened on a date' },
  state: { zh: '狀態：持續，可能改變', en: 'State: persists, may change' },
  property: { zh: '屬性：定義性，不會改變', en: 'Property: definitional, does not change' },
}

export const TIER_MEANING: Record<EvidenceTier, Label> = {
  T1: {
    zh: '官方紀錄：政府文件、法院判決、公司登記、官方會面紀錄、立法表決',
    en: 'Official record: government filing, court judgment, company registry, official readout, legislative vote',
  },
  T2: { zh: '兩個以上獨立且可信的媒體', en: 'Two or more independent reputable outlets' },
  T3: { zh: '單一可信媒體', en: 'A single reputable outlet' },
  T4: {
    zh: '指控：記錄的是「有人聲稱此關係存在」，不是關係本身',
    en: 'Allegation: records a claim that the tie exists, not the tie itself',
  },
}

export const STATUS_LABEL: Record<Edge['status'], Label> = {
  active: { zh: '持續中', en: 'Active' },
  historical: { zh: '已結束', en: 'Historical' },
  disputed: { zh: '有爭議', en: 'Disputed' },
}

export const REVIEW_LABEL: Record<ReviewStatus, Label> = {
  draft: { zh: '草稿·未審核', en: 'Draft, not reviewed' },
  reviewed: { zh: '已審核', en: 'Reviewed' },
  rejected: { zh: '已駁回', en: 'Rejected' },
}

export const SOURCE_TYPE_LABEL: Record<Evidence['source_type'], Label> = {
  official_record: { zh: '官方紀錄', en: 'Official record' },
  news: { zh: '新聞', en: 'News' },
  academic: { zh: '學術', en: 'Academic' },
  other: { zh: '其他', en: 'Other' },
}

export const STAGE_LABEL: Record<EducationStage, Label> = {
  secondary: { zh: '中學', en: 'Secondary' },
  bachelor: { zh: '學士', en: "Bachelor's" },
  master: { zh: '碩士', en: "Master's" },
  doctorate: { zh: '博士', en: 'Doctorate' },
  other: { zh: '其他', en: 'Other' },
}

// Only the codes that appear in the data; anything else shows its code.
export const COUNTRY_LABEL: Readonly<Record<string, Label>> = {
  TW: { zh: '臺灣', en: 'Taiwan' },
  CN: { zh: '中國', en: 'PRC' },
  HK: { zh: '香港', en: 'Hong Kong' },
  MO: { zh: '澳門', en: 'Macau' },
  US: { zh: '美國', en: 'United States' },
  GB: { zh: '英國', en: 'United Kingdom' },
}

export const NOT_PROVIDED: Label = { zh: '未提供', en: 'not provided' }

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
