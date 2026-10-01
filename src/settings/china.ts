/**
 * PRC regions for China-related rules (spec decisions 9 and 18). [J]
 * Shared by the red outline and the cross-strait engagement scale.
 *
 * The weight scales how much study at an institution in that region adds to
 * the engagement score. Decision 9 sets each to 1.0 by default.
 */
export const PRC_REGION_WEIGHT: Readonly<Record<string, number>> = { CN: 1, HK: 1, MO: 1 }

export const PRC_REGIONS: ReadonlySet<string> = new Set(Object.keys(PRC_REGION_WEIGHT))
