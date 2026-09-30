import { z } from 'zod'
import { EntityType } from './enums'
import { CountryCode, PartialDate, Slug } from './primitives'

export const PartyAffiliation = z
  .object({
    party_id: Slug,
    start: PartialDate.nullable(),
    end: PartialDate.nullable(), // null = ongoing
  })
  .strict()

export const Role = z
  .object({
    title_zh: z.string().min(1),
    title_en: z.string().min(1),
    org_id: Slug.nullable(),
    start: PartialDate.nullable(),
    end: PartialDate.nullable(),
  })
  .strict()

export const NodeSchema = z
  .object({
    id: Slug,
    wikidata_qid: z.string().regex(/^Q\d+$/).nullable(), // stored, never fetched
    name_zh: z.string().min(1),
    name_en: z.string().min(1),
    aliases: z.array(z.string()),
    entity_type: EntityType,
    // Drives the derived China-influence signal: education at an institution
    // in a PRC region counts, and PRC nodes themselves are bucketed apart.
    country: CountryCode.nullable(),
    party_affiliations: z.array(PartyAffiliation),
    roles: z.array(Role),
    tags: z.array(z.string()),
    bio_short_zh: z.string().nullable(),
    bio_short_en: z.string().nullable(),
    last_updated: PartialDate,
  })
  .strict()

export type Node = z.infer<typeof NodeSchema>
