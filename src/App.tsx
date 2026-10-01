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
    <div className="grid h-full grid-cols-[18rem_1fr_20rem] max-lg:grid-cols-1 max-lg:grid-rows-[auto_minmax(24rem,1fr)_auto]">
      <aside className="border-edge-subtle bg-surface-raised flex flex-col gap-6 overflow-y-auto border-r p-5 max-lg:border-r-0 max-lg:border-b">
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

      <main className="bg-surface-base relative min-h-0">
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
        {state.status === 'loading' && <Notice zh="載入中…" en="Loading…" />}
        {state.status === 'error' && (
          <Notice zh="資料載入失敗" en="Data failed to load" detail={state.message} />
        )}
      </main>

      <aside className="border-edge-subtle bg-surface-raised overflow-y-auto border-l p-5 max-lg:border-l-0 max-lg:border-t">
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
