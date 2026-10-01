import { useId } from 'react'
import { VALENCE_COLOR } from '@/lib/encoding'
import { DEFAULT_FILTERS, type FilterState } from '@/lib/filters'
import { ENTITY_TYPE_LABEL, LAYER_LABEL, TIER_LABEL, VALENCE_LABEL, type Label } from '@/lib/labels'
import { EvidenceTier, RelationLayer, Valence, type Node } from '@/schema/index'

type Props = {
  value: FilterState
  onChange: (next: FilterState) => void
  shownEdges: number
  totalEdges: number
  matches: Node[]
  selectedNodeId: string | null
  onSelectNode: (id: string) => void
}

export function Filters({ value, onChange, shownEdges, totalEdges, matches, selectedNodeId, onSelectNode }: Props) {
  const set = <K extends keyof FilterState>(key: K, v: FilterState[K]) => onChange({ ...value, [key]: v })
  const isDefault = JSON.stringify(value) === JSON.stringify(DEFAULT_FILTERS)
  const searchId = useId()
  const weightId = useId()

  return (
    <section className="flex flex-col gap-4 text-xs">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-medium">
          篩選 <span className="text-content-secondary font-normal">Filters</span>
        </h2>
        <button
          type="button"
          onClick={() => onChange(DEFAULT_FILTERS)}
          disabled={isDefault}
          className="text-accent disabled:text-content-muted hover:underline disabled:no-underline"
        >
          重設 Reset
        </button>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={searchId} className="text-content-secondary">
          搜尋節點 <span className="text-content-muted">Find a node</span>
        </label>
        <input
          id={searchId}
          type="search"
          value={value.query}
          onChange={(e) => set('query', e.target.value)}
          placeholder="中文名、英文名或別名 · name or alias"
          className="border-edge-strong bg-surface-base placeholder:text-content-muted focus:outline-accent rounded border px-2 py-1.5"
        />
        {value.query.trim() !== '' &&
          (matches.length === 0 ? (
            <p className="text-content-secondary">
              找不到符合的節點 <span className="text-content-muted">No matches</span>
            </p>
          ) : (
            <ul className="border-edge-subtle max-h-44 overflow-y-auto rounded border" aria-label="Search results">
              {matches.map((n) => (
                <li key={n.id}>
                  <button
                    type="button"
                    onClick={() => onSelectNode(n.id)}
                    aria-current={n.id === selectedNodeId}
                    className="hover:bg-surface-sunken aria-[current=true]:bg-surface-sunken flex w-full items-baseline gap-2 px-2 py-1 text-left"
                  >
                    <span>{n.name_zh}</span>
                    <span className="text-content-muted truncate">{n.name_en}</span>
                    <span className="text-content-muted ml-auto shrink-0">{ENTITY_TYPE_LABEL[n.entity_type].zh}</span>
                  </button>
                </li>
              ))}
            </ul>
          ))}
      </div>

      <Toggles
        title={{ zh: '關係層', en: 'Layer' }}
        keys={RelationLayer.options}
        labels={LAYER_LABEL}
        value={value.layers}
        onChange={(v) => set('layers', v)}
      />

      <Toggles
        title={{ zh: '證據等級', en: 'Evidence tier' }}
        keys={EvidenceTier.options}
        labels={TIER_LABEL}
        prefixKey
        value={value.tiers}
        onChange={(v) => set('tiers', v)}
        note={{ zh: 'T4 為指控，非確立之關係', en: 'T4 is an allegation, not an established tie' }}
      />

      <Toggles
        title={{ zh: '關係性質', en: 'Valence' }}
        keys={Valence.options}
        labels={VALENCE_LABEL}
        value={value.valences}
        onChange={(v) => set('valences', v)}
        swatch={(v) => (
          <svg width="16" height="8" aria-hidden>
            <line x1="1" y1="4" x2="15" y2="4" stroke={VALENCE_COLOR[v]} strokeWidth="2.5" />
          </svg>
        )}
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor={weightId} className="text-content-secondary flex justify-between">
          <span>
            最低關係強度 <span className="text-content-muted">Minimum weight</span>
          </span>
          <span className="tabular-nums">{value.minWeight.toFixed(2)}</span>
        </label>
        <input
          id={weightId}
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={value.minWeight}
          onChange={(e) => set('minWeight', Number(e.target.value))}
          className="accent-accent"
        />
      </div>

      <p className="text-content-secondary" aria-live="polite">
        顯示 {shownEdges} / {totalEdges} 條關係{' '}
        <span className="text-content-muted">
          Showing {shownEdges} of {totalEdges} ties
        </span>
      </p>
    </section>
  )
}

function Toggles<K extends string>({
  title,
  keys,
  labels,
  value,
  onChange,
  note,
  prefixKey = false,
  swatch,
}: {
  title: Label
  keys: readonly K[]
  labels: Record<K, Label>
  value: Record<K, boolean>
  onChange: (next: Record<K, boolean>) => void
  note?: Label
  prefixKey?: boolean // show the raw key first, e.g. "T1"
  swatch?: (key: K) => React.ReactNode
}) {
  return (
    <fieldset className="flex flex-col gap-1">
      <legend className="text-content-secondary mb-1">
        {title.zh} <span className="text-content-muted">{title.en}</span>
      </legend>
      {keys.map((k) => (
        <label key={k} className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={value[k]}
            onChange={(e) => onChange({ ...value, [k]: e.target.checked })}
            className="accent-accent"
          />
          {swatch?.(k)}
          <span>
            {prefixKey && `${k} `}
            {labels[k].zh}
          </span>
          <span className="text-content-muted">{labels[k].en}</span>
        </label>
      ))}
      {note && (
        <p className="text-content-secondary border-edge-strong mt-1 border-l-2 pl-2 leading-snug">
          {note.zh}
          <br />
          <span className="text-content-muted">{note.en}</span>
        </p>
      )}
    </fieldset>
  )
}
