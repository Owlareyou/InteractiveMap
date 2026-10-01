import { zoomIdentity, type ZoomTransform } from 'd3-zoom'

type Placed = { x?: number | undefined; y?: number | undefined; radius: number }
type FitOptions = {
  padding: number // screen px kept clear around the graph
  labelRoom: number // screen px allowed beside or below a node for its label
  minScale: number
  maxScale: number
}

/**
 * The zoom transform that fits every node, label included, inside a
 * width × height viewport. The graph is drawn around (0, 0) and the view
 * centres that point, so (0, 0) sits at (width / 2, height / 2) before
 * zooming.
 */
export function fitTransform(nodes: readonly Placed[], width: number, height: number, opts: FitOptions): ZoomTransform {
  if (width <= 0 || height <= 0) return zoomIdentity
  // Labels keep a minimum screen size, so their room in graph units depends
  // on the scale being solved for. Two passes settle it closely enough.
  let k = 1
  let box = bounds(nodes, opts.labelRoom)
  for (let pass = 0; pass < 2 && box; pass++) {
    k = scaleFor(box, width, height, opts)
    box = bounds(nodes, opts.labelRoom / k)
  }
  if (!box) return zoomIdentity
  k = scaleFor(box, width, height, opts)
  const cx = (box.minX + box.maxX) / 2 + width / 2
  const cy = (box.minY + box.maxY) / 2 + height / 2
  return zoomIdentity.translate(width / 2 - k * cx, height / 2 - k * cy).scale(k)
}

type Box = { minX: number; maxX: number; minY: number; maxY: number }

function bounds(nodes: readonly Placed[], room: number): Box | null {
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  for (const n of nodes) {
    if (n.x === undefined || n.y === undefined) continue
    minX = Math.min(minX, n.x - n.radius - room)
    maxX = Math.max(maxX, n.x + n.radius + room)
    minY = Math.min(minY, n.y - n.radius)
    maxY = Math.max(maxY, n.y + n.radius + room) // labels sit below
  }
  return Number.isFinite(minX) ? { minX, maxX, minY, maxY } : null
}

function scaleFor(box: Box, width: number, height: number, opts: FitOptions): number {
  const fit = Math.min(
    (width - 2 * opts.padding) / (box.maxX - box.minX || 1),
    (height - 2 * opts.padding) / (box.maxY - box.minY || 1),
  )
  return Math.min(opts.maxScale, Math.max(opts.minScale, fit))
}
