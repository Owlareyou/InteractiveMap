import type { GraphContext } from '@/lib/grouping'
import { NOT_PROVIDED, type Label } from '@/lib/labels'
import type { Selection } from '@/lib/selection'
import type { Edge } from '@/schema/index'

// Everything the drawer's views need from the app, passed as one object.
export type DrawerEnv = {
  ctx: GraphContext
  edgesById: ReadonlyMap<string, Edge>
  weights: ReadonlyMap<string, number>
  visibleEdges: ReadonlySet<string>
  referenceDate: string
  onSelect: (s: Selection) => void
}

export function Bi({ zh, en, className }: Label & { className?: string }) {
  return (
    <span className={className}>
      {zh} <span className="text-content-muted">{en}</span>
    </span>
  )
}

export function SectionTitle({ zh, en }: Label) {
  return (
    <h3 className="text-content-secondary mb-1.5 mt-5 text-xs font-medium first:mt-0">
      {zh} <span className="text-content-muted font-normal">{en}</span>
    </h3>
  )
}

export function Fields({ children }: { children: React.ReactNode }) {
  return <dl className="grid grid-cols-[6.5rem_1fr] gap-x-3 gap-y-1.5 text-xs">{children}</dl>
}

export function Field({ label, children }: { label: Label; children: React.ReactNode }) {
  return (
    <>
      <dt className="text-content-secondary">
        {label.zh}
        <br />
        <span className="text-content-muted">{label.en}</span>
      </dt>
      <dd className="min-w-0 break-words">{children}</dd>
    </>
  )
}

export function Missing() {
  return <Bi {...NOT_PROVIDED} className="text-content-muted italic" />
}

const BADGE_TONE = {
  draft: 'border-edge-strong text-content-secondary border-dashed',
  // Ink rather than a hue: every hue already means something on the graph.
  alert: 'border-content-primary text-content-primary font-medium',
  muted: 'border-edge-subtle text-content-muted',
}

export function Badge({ tone, children }: { tone: keyof typeof BADGE_TONE; children: React.ReactNode }) {
  return <span className={`inline-block rounded border px-1.5 py-0.5 text-[0.6875rem] ${BADGE_TONE[tone]}`}>{children}</span>
}

export function Notice({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-edge-strong text-content-secondary my-2 border-l-2 pl-2 text-xs leading-snug">{children}</p>
  )
}

/**
 * "2015 – 至今", "2015", "? – 2016", or null when there's no date at all.
 * `ongoing` says whether a missing end means "still true" (roles, active
 * states) or just "not recorded" (events).
 */
export function dateRange(start: string | null, end: string | null, ongoing: boolean): string | null {
  if (start && end) return start === end ? start : `${start} – ${end}`
  if (start) return ongoing ? `${start} – 至今 present` : start
  if (end) return `? – ${end}`
  return null
}

export function DateText({ start, end, ongoing }: { start: string | null; end: string | null; ongoing: boolean }) {
  const text = dateRange(start, end, ongoing)
  return text ? <span className="tabular-nums">{text}</span> : <Bi zh="日期未載" en="no date" className="text-content-muted" />
}

export function LinkButton({ onClick, children, className = '' }: { onClick: () => void; children: React.ReactNode; className?: string }) {
  return (
    <button type="button" onClick={onClick} className={`text-left hover:underline ${className}`}>
      {children}
    </button>
  )
}
