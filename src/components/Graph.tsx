import { drag } from 'd3-drag'
import type { Simulation } from 'd3-force'
import { select } from 'd3-selection'
import { zoom, zoomIdentity, type ZoomTransform } from 'd3-zoom'
import { useEffect, useMemo, useRef, useState } from 'react'
import { createSimulation, endpoint, type SimLink, type SimNode } from '@/lib/simulation'
import { useElementSize } from '@/lib/useElementSize'
import type { Edge, Node } from '@/schema/index'
import { GRAPH_SETTINGS } from '@/settings/graph'

type Props = {
  nodes: Node[]
  edges: Edge[]
  weights: ReadonlyMap<string, number>
}

export function Graph({ nodes, edges, weights }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const nodeEls = useRef(new Map<string, SVGGElement>())
  const { width, height } = useElementSize(containerRef)
  const [transform, setTransform] = useState<ZoomTransform>(zoomIdentity)
  const [, setFrame] = useState(0)

  // d3 mutates these objects in place (x, y, vx, vy), so they are built once
  // per data change and kept stable across renders.
  const graph = useMemo(() => {
    const simNodes: SimNode[] = nodes.map((n) => ({
      id: n.id,
      data: n,
      radius: GRAPH_SETTINGS.nodeRadiusPx,
    }))
    const simLinks: SimLink[] = edges.map((e) => ({
      id: e.id,
      source: e.source_id,
      target: e.target_id,
      data: e,
      weight: weights.get(e.id) ?? 0,
    }))
    return { nodes: simNodes, links: simLinks }
  }, [nodes, edges, weights])

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
      <svg ref={svgRef} width={width} height={height} className="block cursor-grab active:cursor-grabbing">
        <g transform={transform.toString()}>
          <g transform={`translate(${width / 2},${height / 2})`}>
            <g>
              {graph.links.map((l) => {
                const s = endpoint(l.source)
                const t = endpoint(l.target)
                if (!s || !t) return null
                return (
                  <line
                    key={l.id}
                    x1={s.x}
                    y1={s.y}
                    x2={t.x}
                    y2={t.y}
                    stroke="var(--border-strong)"
                    strokeWidth={1.5}
                  />
                )
              })}
            </g>
            <g>
              {graph.nodes.map((n) => (
                <g
                  key={n.id}
                  ref={(el) => {
                    if (el) nodeEls.current.set(n.id, el)
                    else nodeEls.current.delete(n.id)
                  }}
                  transform={`translate(${n.x ?? 0},${n.y ?? 0})`}
                  className="cursor-pointer"
                >
                  <title>{n.data.name_en}</title>
                  <circle r={n.radius} fill="var(--accent)" stroke="var(--surface-raised)" strokeWidth={1.5} />
                  <text
                    y={n.radius + 12}
                    textAnchor="middle"
                    fontSize={11}
                    fill="var(--text-secondary)"
                    className="pointer-events-none select-none"
                  >
                    {n.data.name_zh}
                  </text>
                </g>
              ))}
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}
