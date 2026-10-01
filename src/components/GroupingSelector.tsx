import { GROUPING_DIMENSIONS, type GroupingId } from '@/lib/grouping'

type Props = {
  value: GroupingId
  onChange: (id: GroupingId) => void
}

export function GroupingSelector({ value, onChange }: Props) {
  return (
    <fieldset className="flex flex-col gap-1.5 text-xs">
      <legend className="mb-1.5 text-sm font-medium">
        節點分組 <span className="text-content-secondary font-normal">Group nodes by</span>
      </legend>
      {GROUPING_DIMENSIONS.map((d) => (
        <label key={d.id} className="flex cursor-pointer items-center gap-2">
          <input
            type="radio"
            name="grouping"
            value={d.id}
            checked={value === d.id}
            onChange={() => onChange(d.id)}
            className="accent-accent"
          />
          <span>{d.label_zh}</span>
          <span className="text-content-muted">{d.label_en}</span>
        </label>
      ))}
    </fieldset>
  )
}
