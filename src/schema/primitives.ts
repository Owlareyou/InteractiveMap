import { z } from 'zod'

export const Slug = z
  .string()
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'lowercase-hyphenated slug, e.g. ma-ying-jeou')

// Partial dates are allowed because sources often give only a year. Plain
// strings compare correctly for ordering since the format is fixed-width.
export const PartialDate = z
  .string()
  .regex(/^\d{4}(-\d{2}(-\d{2})?)?$/, 'date as YYYY, YYYY-MM or YYYY-MM-DD')

// ISO 3166-1 alpha-2. null means not applicable (e.g. unknown or irrelevant).
export const CountryCode = z.string().regex(/^[A-Z]{2}$/, 'two-letter country code, e.g. TW')
