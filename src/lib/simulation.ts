import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  type Simulation,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from 'd3-force'
import type { Edge, Node } from '../schema/index'
import { GRAPH_SETTINGS } from '../settings/graph'

export type SimNode = SimulationNodeDatum & { id: string; data: Node; radius: number }
export type SimLink = SimulationLinkDatum<SimNode> & { id: string; data: Edge; weight: number }

// Laid out around (0, 0); the view centres that point, so resizing the panel
// never restarts the simulation.
export function createSimulation(
  nodes: SimNode[],
  links: SimLink[],
  f = GRAPH_SETTINGS.forces,
): Simulation<SimNode, SimLink> {
  return forceSimulation(nodes)
    .force(
      'link',
      forceLink<SimNode, SimLink>(links)
        .id((d) => d.id)
        .distance(f.linkDistance),
    )
    .force('charge', forceManyBody<SimNode>().strength(f.chargeStrength))
    .force('center', forceCenter(0, 0))
    .force('x', forceX<SimNode>(0).strength(f.centerPull))
    .force('y', forceY<SimNode>(0).strength(f.centerPull))
    .force(
      'collide',
      forceCollide<SimNode>((d) => d.radius + f.collidePadding),
    )
}

// A link's endpoints start as id strings and are swapped for node objects by
// forceLink; this reads whichever is there.
export function endpoint(end: SimLink['source']): SimNode | null {
  return typeof end === 'object' ? end : null
}
