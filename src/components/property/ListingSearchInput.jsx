import { useEffect, useState } from 'react'
import { Search, X } from 'lucide-react'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'

export default function ListingSearchInput({ value, onCommit }) {
  const [text, setText] = useState(value)
  const debounced = useDebouncedValue(text, 300)

  useEffect(() => {
    setText(value)
  }, [value])

  useEffect(() => {
    if (debounced.trim() !== value) onCommit(debounced.trim())
  }, [debounced])

  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
      <input
        type="search"
        value={text}
        onChange={(event) => setText(event.target.value)}
        aria-label="Search by area, road or property name"
        placeholder="Search by area, road or property name"
        className="h-11 w-full rounded-control border border-line-strong bg-paper pl-10 pr-10 text-[0.9375rem] transition-colors placeholder:text-subtle hover:border-ink focus-visible:border-brand focus-visible:outline-offset-0 [&::-webkit-search-cancel-button]:hidden"
      />
      {text && (
        <button
          type="button"
          onClick={() => setText('')}
          aria-label="Clear search"
          className="absolute right-1.5 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-control text-muted hover:text-ink"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
