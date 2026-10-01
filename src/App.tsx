import { useEffect, useMemo, useState } from 'react'
import { Drawer } from '@/components/Drawer'
import type { DrawerEnv } from '@/components/DrawerParts'
import { Filters } from '@/components/Filters'
import { Graph } from '@/components/Graph'
import { GroupingSelector } from '@/components/GroupingSelector'
import { Legend } from '@/components/Legend'
import { loadGraph, type GraphData } from '@/lib/dataSource'
import { DEFAULT_FILTERS, searchNodes, visibleEdgeIds, type FilterState } from '@/lib/filters'
import { buildContext, DEFAULT_GROUPING, dimensionById, type Group, type GroupingId } from '@/lib/grouping'
import type { Selection } from '@/lib/selection'
import { computeEdgeWeight } from '@/lib/weight'

type LoadState = { status: 'loading' } | { status: 'error'; message: string } | { status: 'ready'; data: GraphData }

// Weight's recency is measured against this. Fixed per page load so every
// edge is scored against the same day.
const REFERENCE_DATE = new Date().toISOString().slice(0, 10)

const EMPTY: GraphData = { nodes: [], edges: [] }

export default function App() {
  const [state, setState] = useState<LoadState>({ status: 'loading' })
  const [groupingId, setGroupingId] = useState<GroupingId>(DEFAULT_GROUPING)
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [selection, setSelection] = useState<Selection>(null)

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

  const visibleEdges = useMemo(() => visibleEdgeIds(data.edges, weights, filters), [data, weights, filters])
  const matches = useMemo(() => searchNodes(data.nodes, filters.query), [data, filters.query])
  const matchedNodes = useMemo(() => new Set(matches.map((n) => n.id)), [matches])
  const selectedNodeId = selection?.kind === 'node' ? selection.id : null

  const drawerEnv = useMemo<DrawerEnv>(
    () => ({
      ctx,
      edgesById: new Map(data.edges.map((e) => [e.id, e])),
      weights,
      visibleEdges,
      referenceDate: REFERENCE_DATE,
      onSelect: setSelection,
    }),
    [ctx, data, weights, visibleEdges],
  )

  return (
    // ≥ 1024 px: controls | graph | drawer. 768–1023 px: controls beside the
    // graph, drawer under it. Narrower: everything stacked, page scrolls.
    <div className="grid min-h-full grid-cols-1 md:h-full md:grid-cols-[16rem_minmax(0,1fr)] md:grid-rows-[minmax(0,1fr)_minmax(0,40%)] lg:grid-cols-[18rem_minmax(0,1fr)_20rem] lg:grid-rows-1">
      <aside className="border-edge-subtle bg-surface-raised flex flex-col gap-6 border-b p-5 md:row-span-2 md:overflow-y-auto md:border-b-0 md:border-r lg:row-span-1">
        <header>
          <h1 className="text-base font-semibold leading-tight">臺灣政治關係圖</h1>
          <p className="text-content-secondary text-xs">
            Taiwan Political Relationship Map
          </p>
        </header>
        <GroupingSelector value={groupingId} onChange={setGroupingId} />
        <Filters
          value={filters}
          onChange={setFilters}
          shownEdges={visibleEdges.size}
          totalEdges={data.edges.length}
          matches={matches}
          selectedNodeId={selectedNodeId}
          onSelectNode={(id) => setSelection({ kind: 'node', id })}
        />
        <Legend dimension={dimension} groups={grouping.groups} counts={grouping.counts} />
      </aside>

      <main className="bg-surface-base relative h-[65vh] min-h-[22rem] md:h-auto md:min-h-0">
        {state.status === 'ready' && (
          <Graph
            nodes={data.nodes}
            edges={data.edges}
            weights={weights}
            groupOf={grouping.groupOf}
            visibleEdges={visibleEdges}
            matchedNodes={matchedNodes}
            selection={selection}
            onSelect={setSelection}
          />
        )}
        {state.status === 'ready' && visibleEdges.size === 0 && (
          <p className="bg-surface-raised border-edge-strong pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded border px-3 py-1.5 text-center text-xs shadow-sm">
            目前的篩選條件下沒有任何關係 <span className="text-content-muted">No ties match the current filters</span>
          </p>
        )}
        {state.status === 'loading' && <Notice zh="載入中…" en="Loading…" />}
        {state.status === 'error' && (
          <Notice zh="資料載入失敗" en="Data failed to load" detail={state.message} />
        )}
      </main>

      <aside className="border-edge-subtle bg-surface-raised border-t p-5 md:overflow-y-auto lg:border-l lg:border-t-0">
        {state.status === 'ready' && <Drawer selection={selection} env={drawerEnv} />}
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
