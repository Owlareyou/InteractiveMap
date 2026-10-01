import { z } from 'zod'
import edgesJson from '../../data/edges.json'
import nodesJson from '../../data/nodes.json'
import { EdgeSchema, NodeSchema, type Edge, type Node } from '../schema/index'

export type GraphData = { nodes: Node[]; edges: Edge[] }

/**
 * The only module that knows where graph data lives (§9). Phase 2 replaces the
 * JSON imports with an API call; nothing else changes. Async already, so
 * callers won't need to change either.
 *
 * Parsing here as well as in `npm run validate` means a hand-edit that skipped
 * the validator still fails loudly instead of rendering wrong.
 */
export async function loadGraph(): Promise<GraphData> {
  return {
    nodes: z.array(NodeSchema).parse(nodesJson),
    edges: z.array(EdgeSchema).parse(edgesJson),
  }
}
