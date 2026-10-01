import type { EntityType } from '../schema/index'

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
