import { useEffect, useMemo, useState } from 'react'
import { Graph } from '@/components/Graph'
import { GroupingSelector } from '@/components/GroupingSelector'
import { Legend } from '@/components/Legend'
import { loadGraph, type GraphData } from '@/lib/dataSource'
import { buildContext, DEFAULT_GROUPING, dimensionById, type Group, type GroupingId } from '@/lib/grouping'
import { computeEdgeWeight } from '@/lib/weight'

type LoadState = { status: 'loading' } | { status: 'error'; message: string } | { status: 'ready'; data: GraphData }

// Weight's recency is measured against this. Fixed per page load so every
// edge is scored against the same day.
const REFERENCE_DATE = new Date().toISOString().slice(0, 10)

const EMPTY: GraphData = { nodes: [], edges: [] }

/**
 * Filters land in Task 8, the drawer in Task 9.
 */
export default function App() {
  const [state, setState] = useState<LoadState>({ status: 'loading' })
  const [groupingId, setGroupingId] = useState<GroupingId>(DEFAULT_GROUPING)

  useEffect(() => {
    loadGraph()
      .then((data) => setState({ status: 'ready', data }))
      .catch((err: unknown) =>
        setState({ status: 'error', message: err instanceof Error ? err.message : String(err) }),
      )
  }, [])

  const data = state.status === 'ready' ? state.data : EMPTY

  const weights = useMemo(
    () => new Map(data.edges.map((e) => [e.id, computeEdgeWeight(e, { referenceDate: REFERENCE_DATE })])),
    [data],
  )

  const ctx = useMemo(() => buildContext(data.nodes, data.edges), [data])
  const dimension = dimensionById(groupingId)
  const grouping = useMemo(() => {
    const groups = dimension.groups(ctx)
    const byKey = new Map(groups.map((g) => [g.key, g]))
    const groupOf = new Map<string, Group>()
    const counts = new Map<string, number>()
    for (const n of data.nodes) {
      const key = dimension.accessor(n, ctx)
      const group = byKey.get(key)
      if (group) groupOf.set(n.id, group)
      counts.set(key, (counts.get(key) ?? 0) + 1)
    }
    return { groups, groupOf, counts }
  }, [dimension, ctx, data])

  return (
    <div className="grid h-full grid-cols-[18rem_1fr_20rem] max-lg:grid-cols-1 max-lg:grid-rows-[auto_minmax(24rem,1fr)_auto]">
      <aside className="border-edge-subtle bg-surface-raised flex flex-col gap-6 overflow-y-auto border-r p-5 max-lg:border-r-0 max-lg:border-b">
        <header>
          <h1 className="text-base font-semibold leading-tight">臺灣政治關係圖</h1>
          <p className="text-content-secondary text-xs">
            Taiwan Political Relationship Map
          </p>
        </header>
        <GroupingSelector value={groupingId} onChange={setGroupingId} />
        <Placeholder zh="篩選" en="Filters" note="Task 8" />
        <Legend dimension={dimension} groups={grouping.groups} counts={grouping.counts} />
      </aside>

      <main className="bg-surface-base relative min-h-0">
        {state.status === 'ready' && (
          <Graph nodes={data.nodes} edges={data.edges} weights={weights} groupOf={grouping.groupOf} />
        )}
        {state.status === 'loading' && <Notice zh="載入中…" en="Loading…" />}
        {state.status === 'error' && (
          <Notice zh="資料載入失敗" en="Data failed to load" detail={state.message} />
        )}
      </main>

      <aside className="border-edge-subtle bg-surface-raised overflow-y-auto border-l p-5 max-lg:border-l-0 max-lg:border-t">
        <Placeholder zh="詳細資料" en="Details" note="Task 9" />
      </aside>
    </div>
  )
}

function Notice({ zh, en, detail }: { zh: string; en: string; detail?: string }) {
  return (
    <div className="grid h-full place-items-center p-5">
      <div className="max-w-md text-center">
        <p className="text-sm font-medium">{zh}</p>
        <p className="text-content-secondary text-xs">{en}</p>
        {detail && (
          <pre className="text-content-muted mt-3 whitespace-pre-wrap text-left font-mono text-[0.6875rem]">
            {detail}
          </pre>
        )}
      </div>
    </div>
  )
}

function Placeholder({ zh, en, note }: { zh: string; en: string; note: string }) {
  return (
    <section className="border-edge-subtle rounded-md border border-dashed p-4">
      <h2 className="text-sm font-medium">{zh}</h2>
      <p className="text-content-secondary text-xs">{en}</p>
      <p className="text-content-muted mt-2 font-mono text-[0.6875rem] uppercase tracking-wider">
        {note}
      </p>
    </section>
  )
}
