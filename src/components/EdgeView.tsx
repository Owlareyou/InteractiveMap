import {
  LAYER_LABEL,
  RELATION_LABEL,
  REVIEW_LABEL,
  SCOPE_LABEL,
  SOURCE_TYPE_LABEL,
  STAGE_LABEL,
  STATUS_LABEL,
  TIER_LABEL,
  TIER_MEANING,
  VALENCE_LABEL,
} from '@/lib/labels'
import { weightBreakdown } from '@/lib/weight'
import { RELATION_DIRECTION_SEMANTICS, RELATION_LAYER_MAP, type Edge, type Evidence } from '@/schema/index'
import {
  Badge,
  Bi,
  DateText,
  Field,
  Fields,
  LinkButton,
  Missing,
  Notice,
  SectionTitle,
  type DrawerEnv,
} from './DrawerParts'

export function EdgeView({ edge, env }: { edge: Edge; env: DrawerEnv }) {
  const source = env.ctx.nodesById.get(edge.source_id)
  const target = env.ctx.nodesById.get(edge.target_id)
  const relation = RELATION_LABEL[edge.relation_type]
  const arrow = edge.directed ? '→' : '—'
  const reading = RELATION_DIRECTION_SEMANTICS[edge.relation_type]
    .replaceAll('SOURCE', source?.name_en ?? edge.source_id)
    .replaceAll('TARGET', target?.name_en ?? edge.target_id)
  const b = weightBreakdown(edge, { referenceDate: env.referenceDate })
  const ongoing = edge.temporal_scope !== 'event' && edge.status === 'active'

  return (
    <article>
      <div className="mb-3 flex flex-wrap gap-1.5">
        <Badge tone="muted">
          關係 <span className="opacity-70">Tie</span>
        </Badge>
        {edge.review_status !== 'reviewed' && (
          <Badge tone="draft">
            {REVIEW_LABEL[edge.review_status].zh} <span className="opacity-70">{REVIEW_LABEL[edge.review_status].en}</span>
          </Badge>
        )}
        {edge.evidence_tier === 'T4' && (
          <Badge tone="alert">
            T4 指控 <span className="opacity-70">Allegation</span>
          </Badge>
        )}
      </div>

      <h2 className="text-base font-semibold leading-snug">
        <LinkButton onClick={() => env.onSelect({ kind: 'node', id: edge.source_id })}>{source?.name_zh}</LinkButton>
        <span className="text-content-muted mx-1.5">{arrow}</span>
        <LinkButton onClick={() => env.onSelect({ kind: 'node', id: edge.target_id })}>{target?.name_zh}</LinkButton>
        <span>：{relation.zh}</span>
      </h2>
      <p className="text-content-secondary mt-1 text-xs leading-snug">{reading}</p>

      {!env.visibleEdges.has(edge.id) && (
        <Notice>
          此關係目前被篩選隱藏 <span className="text-content-muted">This tie is hidden by the current filters</span>
        </Notice>
      )}

      <SectionTitle zh="關係" en="The tie" />
      <Fields>
        <Field label={{ zh: '類型', en: 'Type' }}>
          <Bi {...relation} /> <code className="text-content-muted text-[0.6875rem]">{edge.relation_type}</code>
        </Field>
        <Field label={{ zh: '關係層', en: 'Layer' }}>
          <Bi {...LAYER_LABEL[RELATION_LAYER_MAP[edge.relation_type]]} />
        </Field>
        <Field label={{ zh: '性質', en: 'Valence' }}>
          <Bi {...VALENCE_LABEL[edge.valence]} />
        </Field>
        <Field label={{ zh: '時間性', en: 'Scope' }}>
          <Bi {...SCOPE_LABEL[edge.temporal_scope]} />
        </Field>
        <Field label={{ zh: '方向', en: 'Direction' }}>
          {edge.directed ? <Bi zh="有方向" en="Directed" /> : <Bi zh="雙向（對稱）" en="Symmetric" />}
        </Field>
        <Field label={{ zh: '日期', en: 'Dates' }}>
          <DateText start={edge.start} end={edge.end} ongoing={ongoing} />
        </Field>
        <Field label={{ zh: '狀態', en: 'Status' }}>
          <Bi {...STATUS_LABEL[edge.status]} />
        </Field>
      </Fields>

      <SectionTitle zh="證據等級" en="Evidence tier" />
      <p className="text-xs leading-snug">
        <span className="font-medium">
          {edge.evidence_tier} {TIER_LABEL[edge.evidence_tier].zh}
        </span>
        <br />
        {TIER_MEANING[edge.evidence_tier].zh}
        <br />
        <span className="text-content-muted">{TIER_MEANING[edge.evidence_tier].en}</span>
      </p>

      {edge.education && (
        <>
          <SectionTitle zh="學歷" en="Education" />
          <Fields>
            <Field label={{ zh: '階段', en: 'Stage' }}>
              <Bi {...STAGE_LABEL[edge.education.stage]} />
            </Field>
            <Field label={{ zh: '學位', en: 'Degree' }}>{edge.education.degree ?? <Missing />}</Field>
            <Field label={{ zh: '領域', en: 'Field' }}>{edge.education.field ?? <Missing />}</Field>
          </Fields>
        </>
      )}

      {edge.notes && (
        <>
          <SectionTitle zh="備註" en="Notes" />
          <p className="text-xs leading-relaxed">{edge.notes}</p>
        </>
      )}

      <SectionTitle zh="為何是這個粗細" en="Why this thickness" />
      <p className="text-xs tabular-nums leading-relaxed">
        {b.confidence.toFixed(2)} <Bi zh="可信度" en="confidence" /> × {b.intensity.toFixed(2)}{' '}
        <Bi zh="強度" en="intensity" /> × {b.scope.toFixed(2)} <Bi zh="時間性" en="scope" /> × {b.recency.toFixed(2)}{' '}
        <Bi zh="時近" en="recency" /> = <span className="font-semibold">{b.weight.toFixed(2)}</span>
      </p>
      <p className="text-content-muted mt-1 text-[0.6875rem] leading-snug">
        {b.distinctSources} 個不同來源 distinct sources · 基準日 reference date {env.referenceDate} ·{' '}
        {b.recency === 1
          ? '不隨時間淡化 does not fade'
          : b.recencyDate
            ? `時近自 measured from ${b.recencyDate}`
            : '無日期，以下限計 undated, scored at the floor'}
      </p>

      <SectionTitle zh={`證據（${edge.evidence.length}）`} en={`Evidence (${edge.evidence.length})`} />
      <ol className="flex flex-col gap-3">
        {edge.evidence.map((ev, i) => (
          <EvidenceItem key={i} ev={ev} />
        ))}
      </ol>
    </article>
  )
}

function EvidenceItem({ ev }: { ev: Evidence }) {
  const nameOnly = !ev.source_url && !ev.published_date && !ev.quote && !ev.retrieved_date
  return (
    <li className="border-edge-subtle bg-surface-base rounded border p-2.5 text-xs">
      <p className="font-medium">{ev.source_name}</p>
      <p className="text-content-secondary mb-1.5">
        <Bi {...SOURCE_TYPE_LABEL[ev.source_type]} />
      </p>
      {nameOnly ? (
        <p className="text-content-muted leading-snug">
          僅有來源名稱：連結、日期、引文皆未提供。
          <br />
          Source name only: no link, date or quote yet.
        </p>
      ) : (
        <Fields>
          <Field label={{ zh: '連結', en: 'Link' }}>
            {ev.source_url ? (
              <a href={ev.source_url} target="_blank" rel="noopener noreferrer" className="text-accent break-all hover:underline">
                {ev.source_url}
              </a>
            ) : (
              <Missing />
            )}
          </Field>
          <Field label={{ zh: '發布日期', en: 'Published' }}>{ev.published_date ?? <Missing />}</Field>
          <Field label={{ zh: '引文', en: 'Quote' }}>
            {ev.quote ? <blockquote className="border-edge-strong border-l-2 pl-2">{ev.quote}</blockquote> : <Missing />}
          </Field>
          <Field label={{ zh: '擷取日期', en: 'Retrieved' }}>{ev.retrieved_date ?? <Missing />}</Field>
        </Fields>
      )}
    </li>
  )
}
