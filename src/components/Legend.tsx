import { VALENCE_COLOR, tierDash, tierOpacity } from '@/lib/encoding'
import type { Group, GroupingDimension } from '@/lib/grouping'
import type { EvidenceTier, Valence } from '@/schema/index'

// Describes the tie, not a verdict on it: "positive" in the data means
// cooperative, which 正向 / Positive would read as approval.
const VALENCE_LABELS: Array<[Valence, string, string]> = [
  ['positive', '合作', 'Cooperative'],
  ['neutral', '中性', 'Neutral'],
  ['negative', '對立', 'Adversarial'],
]

const TIER_LABELS: Array<[EvidenceTier, string, string]> = [
  ['T1', '官方紀錄', 'Official record'],
  ['T2', '兩個以上獨立來源', '2+ independent outlets'],
  ['T3', '單一來源', 'Single outlet'],
  ['T4', '指控（非確立關係）', 'Allegation, not established'],
]

type Props = {
  dimension: GroupingDimension
  groups: Group[]
  counts: ReadonlyMap<string, number> // nodes per group key
}

export function Legend({ dimension, groups, counts }: Props) {
  return (
    <section className="flex flex-col gap-4 text-xs">
      <h2 className="text-sm font-medium">
        圖例 <span className="text-content-secondary font-normal">Legend</span>
      </h2>

      <Group title="線條顏色" sub="Line colour">
        {VALENCE_LABELS.map(([v, zh, en]) => (
          <Row key={v} zh={zh} en={en}>
            <LineSwatch colour={VALENCE_COLOR[v]} />
          </Row>
        ))}
      </Group>

      <Group title="線條樣式 = 證據等級" sub="Line style = evidence tier">
        {TIER_LABELS.map(([t, zh, en]) => (
          <Row key={t} zh={`${t} ${zh}`} en={en}>
            <LineSwatch colour="var(--text-secondary)" dash={tierDash(t)} opacity={tierOpacity(t)} />
          </Row>
        ))}
      </Group>

      <Group title={`節點顏色 = ${dimension.label_zh}`} sub={`Node colour = ${dimension.label_en}`}>
        {groups.map((g) => {
          const count = counts.get(g.key) ?? 0
          return (
            <div key={g.key} className={count === 0 ? 'opacity-40' : undefined}>
              <Row zh={g.zh} en={g.en} count={count}>
                <svg width="28" height="12" aria-hidden>
                  <circle cx="14" cy="6" r="5" fill={g.colour} />
                </svg>
              </Row>
            </div>
          )
        })}
        {dimension.note && (
          <p className="text-content-muted leading-snug">
            {dimension.note.zh}
            <br />
            {dimension.note.en}
          </p>
        )}
        <Row zh="紅框：中國（含港澳）機構" en="Red outline: PRC-based organisation">
          <svg width="28" height="12" aria-hidden>
            <circle cx="14" cy="6" r="4.5" fill="var(--group-na)" stroke="var(--prc-outline)" strokeWidth="2" />
          </svg>
        </Row>
      </Group>

      <p className="text-content-secondary leading-relaxed">
        線條粗細 = 關係強度；節點大小 = 連結總強度；箭頭 = 方向。
        <br />
        <span className="text-content-muted">
          Line width = tie weight · node size = total weight of its ties · arrow = direction.
        </span>
      </p>
    </section>
  )
}

function Group({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-content-secondary">
        {title} <span className="text-content-muted">{sub}</span>
      </p>
      {children}
    </div>
  )
}

function Row({ zh, en, count, children }: { zh: string; en: string; count?: number; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      {children}
      <span>{zh}</span>
      <span className="text-content-muted">{en}</span>
      {count !== undefined && <span className="text-content-muted ml-auto tabular-nums">{count}</span>}
    </div>
  )
}

function LineSwatch({ colour, dash, opacity = 1 }: { colour: string; dash?: string | undefined; opacity?: number }) {
  return (
    <svg width="28" height="12" aria-hidden>
      <line x1="2" y1="6" x2="26" y2="6" stroke={colour} strokeWidth="2.5" strokeDasharray={dash} opacity={opacity} />
    </svg>
  )
}
