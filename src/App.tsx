/**
 * Task 1 shell only: three regions, no behaviour. Controls land in Task 8,
 * the graph in Task 5, the drawer in Task 9.
 */
export default function App() {
  return (
    <div className="grid h-full grid-cols-[18rem_1fr_20rem] max-lg:grid-cols-1 max-lg:grid-rows-[auto_1fr_auto]">
      <aside className="border-edge-subtle bg-surface-raised flex flex-col gap-6 overflow-y-auto border-r p-5 max-lg:border-r-0 max-lg:border-b">
        <header>
          <h1 className="text-base font-semibold leading-tight">臺灣政治關係圖</h1>
          <p className="text-content-secondary text-xs">
            Taiwan Political Relationship Map
          </p>
        </header>
        <Placeholder zh="控制項" en="Controls" note="Tasks 7–8" />
      </aside>

      <main className="bg-surface-base grid place-items-center p-5">
        <Placeholder zh="關係圖" en="Graph" note="Tasks 5–6" />
      </main>

      <aside className="border-edge-subtle bg-surface-raised overflow-y-auto border-l p-5 max-lg:border-l-0 max-lg:border-t">
        <Placeholder zh="詳細資料" en="Details" note="Task 9" />
      </aside>
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
