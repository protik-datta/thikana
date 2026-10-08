import { X } from 'lucide-react'

export default function ActiveFilters({ chips, onRemove, onClear }) {
  if (chips.length === 0) return null

  return (
    <ul aria-label="Active filters" className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <li key={chip.id}>
          <button
            type="button"
            onClick={() => onRemove(chip.patch)}
            aria-label={`Remove filter: ${chip.label}`}
            className="inline-flex h-8 items-center gap-1.5 rounded-control border border-line-strong pl-3 pr-2 text-meta transition-colors hover:border-ink"
          >
            {chip.label}
            <X className="size-3.5 text-muted" aria-hidden="true" />
          </button>
        </li>
      ))}
      <li>
        <button
          type="button"
          onClick={onClear}
          className="h-8 px-2 text-meta font-medium underline underline-offset-4 decoration-line-strong hover:decoration-ink"
        >
          Clear all
        </button>
      </li>
    </ul>
  )
}
