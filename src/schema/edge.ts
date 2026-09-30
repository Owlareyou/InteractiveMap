import { z } from 'zod'
import { EducationStage, EvidenceTier, RelationType, ReviewStatus, TemporalScope, Valence } from './enums'
import { PartialDate, Slug } from './primitives'

export const EvidenceSchema = z
  .object({
    source_url: z.string().url().nullable(),
    source_name: z.string().min(1),
    source_type: z.enum(['official_record', 'news', 'academic', 'other']),
    published_date: PartialDate.nullable(),
    quote: z.string().nullable(), // verbatim only; null rather than paraphrase
    retrieved_date: PartialDate.nullable(),
  })
  .strict()

export type Evidence = z.infer<typeof EvidenceSchema>

// Deliberately small. New details go in as `.nullable().default(null)` so
// existing records stay valid without edits. School name and country live on
// the institution node; dates and remarks use the edge's start/end/notes.
export const EducationSchema = z
  .object({
    stage: EducationStage,
    degree: z.string().nullable(), // free text: 'LL.M.', 'S.J.D.'
    field: z.string().nullable(), // free text: '法律'
  })
  .strict()

export type Education = z.infer<typeof EducationSchema>

export const EdgeSchema = z
  .object({
    id: Slug,
    source_id: Slug,
    target_id: Slug,
    relation_type: RelationType,
    temporal_scope: TemporalScope,
    valence: Valence,
    evidence_tier: EvidenceTier,
    directed: z.boolean(),
    start: PartialDate.nullable(),
    end: PartialDate.nullable(),
    status: z.enum(['active', 'historical', 'disputed']),
    evidence: z.array(EvidenceSchema).min(1, 'every edge needs at least one piece of evidence'),
    review_status: ReviewStatus,
    notes: z.string().nullable(),
    education: EducationSchema.nullable().default(null), // only on educated_at
  })
  .strict()

export type Edge = z.infer<typeof EdgeSchema>
