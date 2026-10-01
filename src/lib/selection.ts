// What the drawer is showing. Shared by the graph, the search results and
// the drawer's own links.
export type Selection = { kind: 'node'; id: string } | { kind: 'edge'; id: string } | null
