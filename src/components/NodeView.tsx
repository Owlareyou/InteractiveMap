import { useState } from 'react'
import { isPrcControlled } from '@/lib/encoding'
import { dimensionById, engagementOf, type Engagement } from '@/lib/grouping'
import { COUNTRY_LABEL, ENTITY_TYPE_LABEL, LAYER_LABEL, RELATION_LABEL, type Label } from '@/lib/labels'
import { RELATION_LAYER_MAP, RelationLayer, type Edge, type Node } from '@/schema/index'
import { ENGAGEMENT_SETTINGS } from '@/settings/grouping'
import { Badge, Bi, DateText, Field, Fields, LinkButton, Notice, SectionTitle, type DrawerEnv } from './DrawerParts'

type Tab = 'overview' | 'ties' | 'china'

const TABS: Array<[Tab, Label]> = [
  ['overview', { zh: '概覽', en: 'Overview' }],
  ['ties', { zh: '關係', en: 'Ties' }],
  ['china', { zh: '中國連結', en: 'China ties' }],
]

export function NodeView({ node, env }: { node: Node; env: DrawerEnv }) {
  // Kept when moving between nodes, so the same tab can be compared.
  const [tab, setTab] = useState<Tab>('overview')
  const incident = env.ctx.incident.get(node.id) ?? []

  return (
    <article>
      <Badge tone="muted">
        {ENTITY_TYPE_LABEL[node.entity_type].zh} <span className="opacity-70">{ENTITY_TYPE_LABEL[node.entity_type].en}</span>
      </Badge>
      <h2 className="mt-2 text-lg font-semibold leading-tight">{node.name_zh}</h2>
      <p className="text-content-secondary text-sm">{node.name_en}</p>

      <div role="tablist" className="border-edge-subtle mb-4 mt-4 flex border-b text-xs">
        {TABS.map(([id, label]) => (
          <button
            key={id}
            role="tab"
            type="button"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className="aria-selected:border-accent aria-selected:text-content-primary text-content-secondary -mb-px border-b-2 border-transparent px-2.5 py-1.5"
          >
            {label.zh} <span className="text-content-muted">{label.en}</span>
            {id === 'ties' && <span className="text-content-muted ml-1 tabular-nums">{incident.length}</span>}
          </button>
        ))}
      </div>

      {tab === 'overview' && <Overview node={node} env={env} />}
      {tab === 'ties' && <Ties node={node} edges={incident} env={env} />}
      {tab === 'china' && <ChinaTies node={node} env={env} />}
    </article>
  )
}

function Overview({ node, env }: { node: Node; env: DrawerEnv }) {
  const nameOf = (id: string | null) => (id ? (env.ctx.nodesById.get(id)?.name_zh ?? id) : null)
  const country = node.country ? COUNTRY_LABEL[node.country] : undefined

  return (
    <>
      {node.bio_short_zh && (
        <p className="mb-3 text-xs leading-relaxed">
          {node.bio_short_zh}
          {node.bio_short_en && <span className="text-content-muted block">{node.bio_short_en}</span>}
        </p>
      )}
      {isPrcControlled(node) && (
        <Notice>
          紅框：中國（含港澳）機構，依 <code>country</code> 欄位推導，非人工標記。
          <br />
          <span className="text-content-muted">Red outline: PRC-based organisation, derived from `country`, never hand-tagged.</span>
        </Notice>
      )}
      <Fields>
        <Field label={{ zh: '別名', en: 'Aliases' }}>{node.aliases.length ? node.aliases.join('、') : <None />}</Field>
        <Field label={{ zh: '國家／地區', en: 'Country' }}>
          {node.country ? (country ? <Bi {...country} /> : node.country) : <Bi zh="不適用" en="n/a" className="text-content-muted" />}
        </Field>
        <Field label={{ zh: 'Wikidata', en: 'QID' }}>
          {node.wikidata_qid ?? <Bi zh="未查證" en="unverified" className="text-content-muted italic" />}
        </Field>
        <Field label={{ zh: '標籤', en: 'Tags' }}>
          {node.tags.length ? <span className="font-mono text-[0.6875rem]">{node.tags.join(', ')}</span> : <None />}
        </Field>
        <Field label={{ zh: '最後更新', en: 'Last updated' }}>{node.last_updated}</Field>
      </Fields>

      {node.entity_type === 'person' && (
        <>
          <SectionTitle zh="職務" en="Roles" />
          {node.roles.length === 0 ? (
            <None />
          ) : (
            <ul className="flex flex-col gap-1.5 text-xs">
              {node.roles.map((r, i) => (
                <li key={i}>
                  {r.title_zh} <span className="text-content-muted">{r.title_en}</span>
                  {r.org_id && <span className="text-content-secondary"> · {nameOf(r.org_id)}</span>}
                  <br />
                  <DateText start={r.start} end={r.end} ongoing />
                </li>
              ))}
            </ul>
          )}

          <SectionTitle zh="黨籍" en="Party history" />
          {node.party_affiliations.length === 0 ? (
            <None />
          ) : (
            <ul className="flex flex-col gap-1.5 text-xs">
              {node.party_affiliations.map((p, i) => (
                <li key={i}>
                  <LinkButton onClick={() => env.onSelect({ kind: 'node', id: p.party_id })}>{nameOf(p.party_id)}</LinkButton>
                  <br />
                  <DateText start={p.start} end={p.end} ongoing />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  )
}

function None() {
  return <Bi zh="無紀錄" en="none recorded" className="text-content-muted text-xs" />
}

function Ties({ node, edges, env }: { node: Node; edges: readonly Edge[]; env: DrawerEnv }) {
  if (edges.length === 0)
    return (
      <p className="text-content-secondary text-xs">
        此節點沒有任何關係紀錄 <span className="text-content-muted">No ties recorded for this node</span>
      </p>
    )
  const hidden = edges.filter((e) => !env.visibleEdges.has(e.id)).length
  return (
    <>
      {hidden > 0 && (
        <Notice>
          {edges.length} 條中有 {hidden} 條目前被篩選隱藏，以灰色列出。
          <br />
          <span className="text-content-muted">
            {hidden} of {edges.length} hidden by the current filters, shown in grey.
          </span>
        </Notice>
      )}
      {RelationLayer.options.map((layer) => {
        const inLayer = edges.filter((e) => RELATION_LAYER_MAP[e.relation_type] === layer)
        if (inLayer.length === 0) return null
        return (
          <section key={layer}>
            <SectionTitle {...LAYER_LABEL[layer]} />
            <ul className="flex flex-col">
              {inLayer.map((e) => (
                <li key={e.id}>
                  <TieRow node={node} edge={e} env={env} />
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </>
  )
}

function TieRow({ node, edge, env, extra }: { node: Node; edge: Edge; env: DrawerEnv; extra?: React.ReactNode }) {
  const outgoing = edge.source_id === node.id
  const otherId = outgoing ? edge.target_id : edge.source_id
  const other = env.ctx.nodesById.get(otherId)
  const arrow = !edge.directed ? '—' : outgoing ? '→' : '←'
  const relation = RELATION_LABEL[edge.relation_type]
  const date = edge.start ?? edge.end
  return (
    <button
      type="button"
      onClick={() => env.onSelect({ kind: 'edge', id: edge.id })}
      className={`hover:bg-surface-sunken -mx-1.5 flex w-[calc(100%+0.75rem)] items-baseline gap-2 rounded px-1.5 py-1 text-left text-xs ${
        env.visibleEdges.has(edge.id) ? '' : 'opacity-40'
      }`}
    >
      <span className="text-content-muted w-3 shrink-0">{arrow}</span>
      <span className="min-w-0 flex-1">
        <span className="font-medium">{other?.name_zh ?? otherId}</span>
        <span className="text-content-secondary"> · {relation.zh}</span>
        <span className="text-content-muted"> {relation.en}</span>
        {extra}
      </span>
      <span className="text-content-muted shrink-0 tabular-nums">{date ?? '—'}</span>
      <span className="text-content-secondary shrink-0 font-mono">{edge.evidence_tier}</span>
    </button>
  )
}

function ChinaTies({ node, env }: { node: Node; env: DrawerEnv }) {
  const e: Engagement = engagementOf(node, env.ctx)
  const group = dimensionById('cross_strait_engagement')
    .groups(env.ctx)
    .find((g) => g.key === e.bucket)

  const header = (
    <div className="mb-3 flex items-center gap-2 text-sm">
      <svg width="14" height="14" aria-hidden>
        <circle cx="7" cy="7" r="6" fill={group?.colour} />
      </svg>
      {group && <Bi zh={group.zh} en={group.en} className="font-medium" />}
      {e.bucket !== 'prc' && <span className="text-content-secondary ml-auto tabular-nums">分數 score {e.score.toFixed(2)}</span>}
    </div>
  )

  if (e.bucket === 'prc')
    return (
      <>
        {header}
        <p className="text-xs leading-relaxed">
          此節點位於中國（含港澳），自成一類，不計分；否則每一次會面都落在它身上，它會被誤讀為「往來最多」。它的關係仍列在「關係」分頁。
        </p>
        <p className="text-content-muted mt-1 text-xs leading-relaxed">
          This node is based in a PRC region, so it sits in its own bucket and isn't scored. Otherwise every meeting
          would land on it and it would read as the "most engaged". Its ties are still listed under Ties.
        </p>
      </>
    )

  return (
    <>
      {header}
      <p className="text-content-secondary text-xs leading-snug">
        每條兩岸層關係加上其證據等級的信心值；1949年10月1日後在中國（含港澳）就學亦同。各政黨適用同一規則。
        <br />
        <span className="text-content-muted">
          Each cross-strait tie adds its evidence tier's confidence; so does study in a PRC region from 1 Oct 1949. One
          rule for every party.
        </span>
      </p>
      <p className="text-content-muted mt-1 text-[0.6875rem]">
        低 low &lt; {ENGAGEMENT_SETTINGS.thresholds.medium} · 中 medium &lt; {ENGAGEMENT_SETTINGS.thresholds.high} · 高 high ≥{' '}
        {ENGAGEMENT_SETTINGS.thresholds.high}
      </p>

      <SectionTitle zh="計入的關係" en="What counts" />
      {e.contributions.length === 0 ? (
        <p className="text-content-secondary text-xs">
          沒有兩岸層關係，也沒有在中國就學的紀錄。 <span className="text-content-muted">No cross-strait ties or PRC study on record.</span>
        </p>
      ) : (
        <ul className="flex flex-col">
          {e.contributions.map((c) => (
            <li key={c.edge.id} className="flex items-baseline gap-1">
              <span className="min-w-0 flex-1">
                <TieRow
                  node={node}
                  edge={c.edge}
                  env={env}
                  extra={
                    c.undated && (
                      <span className="text-content-secondary block italic">日期未載，推定為1949年後 · undated, assumed after 1949</span>
                    )
                  }
                />
              </span>
              <span className="w-10 shrink-0 text-right text-xs tabular-nums">+{c.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      )}

      {e.excluded.length > 0 && (
        <>
          <SectionTitle zh="未計入" en="Not counted" />
          <p className="text-content-muted mb-1 text-[0.6875rem]">
            1949年10月1日前的就學（當時屬中華民國），或設定關閉時日期未載者。 Study before 1 Oct 1949 (under the ROC), or
            undated study while that setting is off.
          </p>
          <ul>
            {e.excluded.map((edge) => (
              <li key={edge.id}>
                <TieRow node={node} edge={edge} env={env} />
              </li>
            ))}
          </ul>
        </>
      )}
      {e.contributions.some((c) => !env.visibleEdges.has(c.edge.id)) && (
        <Notice>
          分數不受篩選影響；灰色項目目前被篩選隱藏。
          <br />
          <span className="text-content-muted">The score ignores filters; grey rows are currently hidden.</span>
        </Notice>
      )}
    </>
  )
}
