import { useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { MapPin, Search, SearchX, X } from 'lucide-react'
import PropertyRow from '@/components/search/PropertyRow'
import { LOCATION_FILTERS } from '@/constants/filters'
import { PROPERTY_TYPES } from '@/constants/propertyTypes'
import { PROPERTIES } from '@/data/properties'
import { LOCATIONS } from '@/data/locations'
import { useDialog } from '@/hooks/useDialog'
import { fade, overlay } from '@/lib/motion'
import { searchProperties } from '@/utils/propertyFilters'
import { getFeaturedProperties } from '@/utils/propertySelectors'

const MAX_RESULTS = 5

function PillLink({ to, onNavigate, children }) {
  return (
    <Link
      to={to}
      onClick={onNavigate}
      className="inline-flex h-9 items-center rounded-control border border-line-strong px-3.5 text-[0.9375rem] transition-colors hover:border-ink"
    >
      {children}
    </Link>
  )
}

function Suggestions({ onNavigate }) {
  const suggested = useMemo(() => getFeaturedProperties(3), [])

  return (
    <div className="space-y-8">
      <section aria-labelledby="popular-locations">
        <h3 id="popular-locations" className="text-label text-muted">
          Popular locations
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {LOCATIONS.map((location) => (
            <PillLink key={location.slug} to={`/properties?location=${location.slug}`} onNavigate={onNavigate}>
              {location.name}
            </PillLink>
          ))}
        </div>
      </section>

      <section aria-labelledby="search-categories">
        <h3 id="search-categories" className="text-label text-muted">
          Browse by type
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {PROPERTY_TYPES.map((type) => (
            <PillLink key={type.value} to={`/properties?type=${type.value}`} onNavigate={onNavigate}>
              {type.label}
            </PillLink>
          ))}
        </div>
      </section>

      <section aria-labelledby="suggested-properties">
        <h3 id="suggested-properties" className="text-label text-muted">
          Suggested properties
        </h3>
        <ul className="mt-2 -mx-2">
          {suggested.map((property) => (
            <li key={property.id}>
              <PropertyRow property={property} onNavigate={onNavigate} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

function Results({ query, onNavigate }) {
  const matches = useMemo(() => searchProperties(PROPERTIES, query), [query])
  const areaMatches = useMemo(
    () => LOCATION_FILTERS.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())).slice(0, 4),
    [query],
  )

  if (matches.length === 0 && areaMatches.length === 0) {
    return (
      <div className="py-8 text-center">
        <SearchX className="mx-auto size-9 text-subtle" strokeWidth={1.25} aria-hidden="true" />
        <p className="mt-4 text-[1.0625rem] font-semibold">No results for &ldquo;{query}&rdquo;</p>
        <p className="mx-auto mt-1.5 max-w-sm text-meta text-muted">
          Check the spelling, or try an area such as Gulshan or a type such as apartment.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <PillLink to="/properties" onNavigate={onNavigate}>
            Browse all properties
          </PillLink>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {areaMatches.length > 0 && (
        <section aria-label="Matching locations">
          <ul className="flex flex-wrap gap-2">
            {areaMatches.map((item) => (
              <li key={item.value}>
                <Link
                  to={`/properties?location=${item.value}`}
                  onClick={onNavigate}
                  className="inline-flex h-9 items-center gap-1.5 rounded-control bg-canvas px-3.5 text-[0.9375rem] transition-colors hover:bg-line"
                >
                  <MapPin className="size-3.5" aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {matches.length > 0 && (
        <section aria-label="Matching properties">
          <ul className="-mx-2">
            {matches.slice(0, MAX_RESULTS).map((property) => (
              <li key={property.id}>
                <PropertyRow property={property} onNavigate={onNavigate} />
              </li>
            ))}
          </ul>
          <Link
            to={`/properties?q=${encodeURIComponent(query)}`}
            onClick={onNavigate}
            className="mt-3 inline-block text-[0.9375rem] font-medium underline underline-offset-[6px] decoration-line-strong hover:decoration-ink"
          >
            See all {matches.length} {matches.length === 1 ? 'result' : 'results'}
          </Link>
        </section>
      )}
    </div>
  )
}

function OverlayPanel({ onClose }) {
  const navigate = useNavigate()
  const panelRef = useRef(null)
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')
  const trimmed = query.trim()

  useDialog({ open: true, onClose, containerRef: panelRef, initialFocusRef: inputRef })

  const submit = (event) => {
    event.preventDefault()
    if (!trimmed) return
    navigate(`/properties?q=${encodeURIComponent(trimmed)}`)
    onClose()
  }

  return (
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Search properties"
      variants={overlay}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-[60] flex flex-col bg-paper sm:inset-x-0 sm:bottom-auto sm:max-h-[min(44rem,90dvh)] sm:rounded-b-[14px] sm:shadow-overlay"
    >
      <div className="mx-auto flex w-full max-w-3xl min-h-0 flex-1 flex-col px-5 pb-6 pt-4 sm:px-8 sm:pt-6">
        <form onSubmit={submit} role="search" className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search properties by area, road or name"
              placeholder="Search by area, road or property name"
              className="h-[3.25rem] w-full rounded-control border border-line-strong bg-paper pl-12 pr-4 text-[1.0625rem] placeholder:text-subtle focus-visible:border-brand focus-visible:outline-offset-0 [&::-webkit-search-cancel-button]:hidden"
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-control transition-colors hover:bg-canvas"
          >
            <X className="size-5" strokeWidth={1.75} aria-hidden="true" />
          </button>
        </form>

        <div className="mt-6 min-h-0 flex-1 overflow-y-auto overscroll-contain" aria-live="polite">
          {trimmed ? <Results query={trimmed} onNavigate={onClose} /> : <Suggestions onNavigate={onClose} />}
        </div>
      </div>
    </motion.div>
  )
}

export default function SearchOverlay({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            variants={fade}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 z-50 bg-black/45"
          />
          <OverlayPanel key="panel" onClose={onClose} />
        </>
      )}
    </AnimatePresence>
  )
}
