import { ENTITY_COLOR, VALENCE_COLOR, tierDash, tierOpacity } from '@/lib/encoding'
import type { EntityType, EvidenceTier, Valence } from '@/schema/index'

const VALENCE_LABELS: Array<[Valence, string, string]> = [
  ['positive', '正向', 'Positive'],
  ['neutral', '中性', 'Neutral'],
  ['negative', '負向', 'Negative'],
]

const TIER_LABELS: Array<[EvidenceTier, string, string]> = [
  ['T1', '官方紀錄', 'Official record'],
  ['T2', '兩個以上獨立來源', '2+ independent outlets'],
  ['T3', '單一來源', 'Single outlet'],
  ['T4', '指控（非確立關係）', 'Allegation, not established'],
]

const NODE_LABELS: Array<[EntityType, string, string]> = [
  ['person', '人物', 'Person'],
  ['party', '政黨', 'Party'],
  ['institution', '學校', 'School'],
]

export function Legend() {
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

      <Group title="節點" sub="Nodes">
        {NODE_LABELS.map(([type, zh, en]) => (
          <Row key={type} zh={zh} en={en}>
            <svg width="28" height="12" aria-hidden>
              <circle cx="14" cy="6" r="5" fill={ENTITY_COLOR[type]} />
            </svg>
          </Row>
        ))}
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

function Row({ zh, en, children }: { zh: string; en: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      {children}
      <span>{zh}</span>
      <span className="text-content-muted">{en}</span>
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
