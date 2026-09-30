import type { Edge } from '../schema/index'
import { DEFAULT_WEIGHT_SETTINGS, type WeightSettings } from '../settings/weight'

export type WeightOptions = {
  // Passed in rather than read from the clock, so identical input gives
  // identical output.
  referenceDate: string
  settings?: WeightSettings
}

export type WeightBreakdown = {
  weight: number
  confidence: number
  intensity: number
  scope: number
  recency: number
  distinctSources: number
  recencyDate: string | null // the date recency was measured from, if any
}

const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000

export function computeEdgeWeight(edge: Edge, opts: WeightOptions): number {
  return weightBreakdown(edge, opts).weight
}

// The four factors separately, so the UI can explain a line's thickness.
export function weightBreakdown(edge: Edge, opts: WeightOptions): WeightBreakdown {
  const s = opts.settings ?? DEFAULT_WEIGHT_SETTINGS

  // Same source_name twice is one source: guards against circular reporting.
  const distinctSources = new Set(edge.evidence.map((ev) => ev.source_name.trim())).size
  const extra = Math.max(0, distinctSources - s.confidence.minSources[edge.evidence_tier])
  let confidence =
    1 - (1 - s.confidence.tier[edge.evidence_tier]) * (1 - s.confidence.extraSourceDoubtRemoved) ** extra
  if (edge.evidence_tier === 'T4') confidence = Math.min(confidence, s.confidence.t4Cap)

  const intensity = s.intensity[edge.relation_type]
  const scope = s.scope[edge.temporal_scope]

  const recencyDate = pickRecencyDate(edge)
  const recency = recencyFactor(edge, recencyDate, opts.referenceDate, s)

  const weight = clamp01(confidence * intensity * scope * recency)
  return { weight, confidence, intensity, scope, recency, distinctSources, recencyDate }
}

function recencyFactor(
  edge: Edge,
  date: string | null,
  referenceDate: string,
  s: WeightSettings,
): number {
  if (edge.temporal_scope === 'property') return 1
  if (edge.temporal_scope === 'state' && edge.status === 'active') return 1
  // No date means we assume old; otherwise omitting a date would make a tie look fresh.
  if (date === null) return s.recency.floor
  const ageYears = Math.max(0, (toTime(referenceDate) - toTime(date)) / MS_PER_YEAR)
  const decay = 0.5 ** (ageYears / s.recency.halfLifeYears)
  return s.recency.floor + (1 - s.recency.floor) * decay
}

function pickRecencyDate(edge: Edge): string | null {
  if (edge.end) return edge.end
  if (edge.start) return edge.start
  const published = edge.evidence
    .map((ev) => ev.published_date)
    .filter((d): d is string => d !== null)
    .sort()
  return published.at(-1) ?? null
}

// Partial dates count from the middle of their period: '2023' is mid-2023.
function toTime(date: string): number {
  const [y, m, d] = date.split('-').map(Number)
  if (y === undefined) return NaN
  if (m === undefined) return Date.UTC(y, 6, 1)
  if (d === undefined) return Date.UTC(y, m - 1, 15)
  return Date.UTC(y, m - 1, d)
}

function clamp01(x: number): number {
  return Math.min(1, Math.max(0, x))
}
