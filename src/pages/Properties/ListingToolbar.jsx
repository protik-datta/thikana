import { ArrowUpDown, SlidersHorizontal } from 'lucide-react'
import ListingSearchInput from '@/components/property/ListingSearchInput'
import { SORT_OPTIONS } from '@/constants/filters'

export default function ListingToolbar({ query, sort, activeCount, onSearch, onSort, onOpenFilters }) {
  return (
    <div className="grid gap-3 sm:grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto]">
      <ListingSearchInput value={query} onCommit={onSearch} />

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onOpenFilters}
          className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-control border border-line-strong px-4 text-[0.9375rem] font-medium transition-colors hover:border-ink sm:flex-none lg:hidden"
        >
          <SlidersHorizontal className="size-4" aria-hidden="true" />
          Filters
          {activeCount > 0 && (
            <span className="inline-flex size-5 items-center justify-center rounded-full bg-ink text-label text-paper">{activeCount}</span>
          )}
        </button>

        <label className="relative flex-1 sm:flex-none">
          <span className="sr-only">Sort properties</span>
          <ArrowUpDown className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <select
            value={sort}
            onChange={(event) => onSort(event.target.value)}
            className="h-11 w-full appearance-none rounded-control border border-line-strong bg-paper pl-10 pr-4 text-[0.9375rem] transition-colors hover:border-ink focus-visible:border-brand focus-visible:outline-offset-0 sm:w-52"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  )
}
