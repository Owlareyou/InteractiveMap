import { drag } from 'd3-drag'
import type { Simulation } from 'd3-force'
import { select } from 'd3-selection'
import { zoom, zoomIdentity, type ZoomTransform } from 'd3-zoom'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  VALENCE_COLOR,
  edgeGeometry,
  edgeWidth,
  isPrcControlled,
  nodeRadius,
  parallelOffsets,
  rangeOf,
  tierDash,
  tierOpacity,
  weightedDegrees,
} from '@/lib/encoding'
import type { Group } from '@/lib/grouping'
import { RELATION_LABEL } from '@/lib/labels'
import type { Selection } from '@/lib/selection'
import { createSimulation, endpoint, type SimLink, type SimNode } from '@/lib/simulation'
import { useElementSize } from '@/lib/useElementSize'
import type { Edge, Node } from '@/schema/index'
import { GRAPH_SETTINGS } from '@/settings/graph'

type Props = {
  nodes: Node[]
  edges: Edge[]
  weights: ReadonlyMap<string, number>
  // The props below are read only while rendering, so changing grouping or
  // filters restyles the graph without rebuilding or reheating the
  // simulation (§10). Positions stay put.
  groupOf: ReadonlyMap<string, Group>
  visibleEdges: ReadonlySet<string>
  matchedNodes: ReadonlySet<string> // search hits
  selection: Selection
  onSelect: (s: Selection) => void
}

type DrawnLink = SimLink & { width: number; offset: number }

export function Graph({ nodes, edges, weights, groupOf, visibleEdges, matchedNodes, selection, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const nodeEls = useRef(new Map<string, SVGGElement>())
  const { width, height } = useElementSize(containerRef)
  const [transform, setTransform] = useState<ZoomTransform>(zoomIdentity)
  const [hovered, setHovered] = useState<string | null>(null)
  const [, setFrame] = useState(0)

  // d3 mutates these objects in place (x, y, vx, vy), so they are built once
  // per data change and kept stable across renders.
  const graph = useMemo(() => {
    const degree = weightedDegrees(edges, weights)
    const maxDegree = rangeOf(degree.values()).max
    const weightRange = rangeOf(weights.values())
    const offsets = parallelOffsets(edges)

    const simNodes: SimNode[] = nodes.map((n) => ({
      id: n.id,
      data: n,
      radius: nodeRadius(degree.get(n.id) ?? 0, maxDegree),
    }))
    const simLinks: DrawnLink[] = edges.map((e) => {
      const weight = weights.get(e.id) ?? 0
      return {
        id: e.id,
        source: e.source_id,
        target: e.target_id,
        data: e,
        weight,
        width: edgeWidth(weight, weightRange),
        offset: offsets.get(e.id) ?? 0,
      }
    })
    return { nodes: simNodes, links: simLinks }
  }, [nodes, edges, weights])

  // Hover follows only the edges on screen; a filtered-out tie shouldn't
  // light up a neighbour.
  const neighbours = useMemo(() => {
    const map = new Map<string, Set<string>>()
    for (const e of edges) {
      if (!visibleEdges.has(e.id)) continue
      map.set(e.source_id, (map.get(e.source_id) ?? new Set()).add(e.target_id))
      map.set(e.target_id, (map.get(e.target_id) ?? new Set()).add(e.source_id))
    }
    return map
  }, [edges, visibleEdges])

  const isLit = (id: string) => hovered === null || id === hovered || (neighbours.get(hovered)?.has(id) ?? false)
  const { dimOpacity: dim, strandedOpacity } = GRAPH_SETTINGS.visual

  const simRef = useRef<Simulation<SimNode, SimLink> | null>(null)

  useEffect(() => {
    const sim = createSimulation(graph.nodes, graph.links)
    simRef.current = sim
    // Re-render at most once per animation frame, however often d3 ticks.
    let raf = 0
    sim.on('tick', () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setFrame((f) => f + 1))
    })
    return () => {
      sim.stop()
      cancelAnimationFrame(raf)
    }
  }, [graph])

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const behaviour = zoom<SVGSVGElement, unknown>()
      .scaleExtent([GRAPH_SETTINGS.zoom.min, GRAPH_SETTINGS.zoom.max])
      .on('zoom', (event: { transform: ZoomTransform }) => setTransform(event.transform))
    select(svg).call(behaviour)
    return () => {
      select(svg).on('.zoom', null)
    }
  }, [])

  // Drag pins a node while held (fx/fy) and releases it on drop (§7).
  useEffect(() => {
    const sim = simRef.current
    if (!sim) return
    const bound: SVGGElement[] = []
    for (const n of graph.nodes) {
      const el = nodeEls.current.get(n.id)
      if (!el) continue
      bound.push(el)
      select(el).call(
        drag<SVGGElement, unknown>()
          .on('start', (event: { active: number }) => {
            if (!event.active) sim.alphaTarget(0.3).restart()
            n.fx = n.x
            n.fy = n.y
          })
          .on('drag', (event: { x: number; y: number }) => {
            n.fx = event.x
            n.fy = event.y
          })
          .on('end', (event: { active: number }) => {
            if (!event.active) sim.alphaTarget(0)
            n.fx = null
            n.fy = null
          }),
      )
    }
    return () => {
      for (const el of bound) select(el).on('.drag', null)
    }
  }, [graph])

  return (
    <div ref={containerRef} className="h-full w-full overflow-hidden">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="block cursor-grab active:cursor-grabbing"
        // Only a click on empty canvas clears; d3-zoom swallows the click
        // that ends a pan, so panning never loses the selection.
        onClick={(ev) => ev.target === svgRef.current && onSelect(null)}
      >
        <g transform={transform.toString()}>
          <g transform={`translate(${width / 2},${height / 2})`}>
            <g>
              {graph.links.map((l) => {
                if (!visibleEdges.has(l.id)) return null
                const s = endpoint(l.source)
                const t = endpoint(l.target)
                if (!s || !t || s.x === undefined || s.y === undefined || t.x === undefined || t.y === undefined)
                  return null
                const e = l.data
                const { d, arrow } = edgeGeometry(
                  { x: s.x, y: s.y, r: s.radius },
                  { x: t.x, y: t.y, r: t.radius },
                  l.offset,
                  l.width,
                  e.directed,
                )
                const lit = hovered === null || s.id === hovered || t.id === hovered
                const colour = VALENCE_COLOR[e.valence]
                const selected = selection?.kind === 'edge' && selection.id === l.id
                const relation = RELATION_LABEL[e.relation_type]
                return (
                  <g
                    key={l.id}
                    opacity={selected ? 1 : tierOpacity(e.evidence_tier) * (lit ? 1 : dim)}
                    onClick={() => onSelect({ kind: 'edge', id: l.id })}
                    className="cursor-pointer"
                  >
                    <title>{`${s.data.name_zh} ${e.directed ? '→' : '—'} ${t.data.name_zh}：${relation.zh} ${relation.en} · ${e.evidence_tier} · 點選查看證據 click for sources`}</title>
                    {selected && (
                      <path d={d} fill="none" stroke="var(--highlight)" strokeOpacity={0.3} strokeWidth={l.width + 7} strokeLinecap="round" />
                    )}
                    <path
                      d={d}
                      fill="none"
                      stroke={colour}
                      strokeWidth={l.width}
                      strokeDasharray={tierDash(e.evidence_tier)}
                    />
                    {arrow && <polygon points={arrow} fill={colour} />}
                    {/* Thin lines are hard to hit, so each gets a wide invisible twin. */}
                    <path d={d} fill="none" stroke="transparent" strokeWidth={Math.max(GRAPH_SETTINGS.visual.edgeHitPx, l.width)} />
                  </g>
                )
              })}
            </g>
            <g>
              {graph.nodes.map((n) => {
                const institution = n.data.entity_type === 'institution'
                const group = groupOf.get(n.id)
                const selected = selection?.kind === 'node' && selection.id === n.id
                const marked = selected || matchedNodes.has(n.id)
                // Nodes whose every edge is filtered out fade rather than
                // vanish, so the layout doesn't change under the reader.
                const stranded = !neighbours.has(n.id) && !marked
                const opacity = (isLit(n.id) ? 1 : dim) * (stranded ? strandedOpacity : 1)
                return (
                  <g
                    key={n.id}
                    ref={(el) => {
                      if (el) nodeEls.current.set(n.id, el)
                      else nodeEls.current.delete(n.id)
                    }}
                    transform={`translate(${n.x ?? 0},${n.y ?? 0})`}
                    opacity={opacity}
                    onPointerEnter={() => setHovered(n.id)}
                    onPointerLeave={() => setHovered(null)}
                    // d3-drag suppresses the click that ends a drag, so this fires only on a real click.
                    onClick={() => onSelect({ kind: 'node', id: n.id })}
                    className="cursor-pointer"
                  >
                    <title>{`${n.data.name_en}${group ? ` · ${group.zh} ${group.en}` : ''}`}</title>
                    {marked && (
                      <circle
                        r={n.radius + (selected ? 6 : 5)}
                        fill="none"
                        stroke="var(--highlight)"
                        strokeWidth={selected ? 3 : 2}
                        strokeDasharray={selected ? undefined : '3 2'}
                      />
                    )}
                    <circle
                      r={n.radius}
                      fill={group?.colour ?? 'var(--group-none)'}
                      stroke={isPrcControlled(n.data) ? 'var(--prc-outline)' : 'var(--surface-base)'}
                      strokeWidth={isPrcControlled(n.data) ? 3 : 1.5}
                    />
                    <text
                      y={n.radius + 12}
                      textAnchor="middle"
                      fontSize={institution ? 10 : 11.5}
                      fontWeight={institution ? 400 : 600}
                      fill={institution ? 'var(--text-muted)' : 'var(--text-primary)'}
                      // A halo in the background colour keeps labels legible where lines cross.
                      stroke="var(--surface-base)"
                      strokeWidth={3.5}
                      strokeLinejoin="round"
                      paintOrder="stroke"
                      className="pointer-events-none select-none"
                    >
                      {n.data.name_zh}
                    </text>
                  </g>
                )
              })}
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}
