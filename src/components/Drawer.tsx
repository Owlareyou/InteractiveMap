import type { Selection } from '@/lib/selection'
import type { DrawerEnv } from './DrawerParts'
import { EdgeView } from './EdgeView'
import { NodeView } from './NodeView'

/**
 * Right-hand panel. Clicking any edge on the graph opens its evidence list
 * directly, so every source is one click away (§7 asks for at most two).
 */
export function Drawer({ selection, env }: { selection: Selection; env: DrawerEnv }) {
  const node = selection?.kind === 'node' ? env.ctx.nodesById.get(selection.id) : undefined
  const edge = selection?.kind === 'edge' ? env.edgesById.get(selection.id) : undefined

  if (node) return <NodeView node={node} env={env} />
  if (edge) return <EdgeView edge={edge} env={env} />
  return (
    <div className="text-xs">
      <h2 className="text-sm font-medium">
        詳細資料 <span className="text-content-secondary font-normal">Details</span>
      </h2>
      <p className="text-content-secondary mt-2 leading-relaxed">
        點選節點查看人物或機構資料；點選關係線查看其證據來源。
        <br />
        <span className="text-content-muted">Click a node for its profile, or a line for its sources.</span>
      </p>
    </div>
  )
}
