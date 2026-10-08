import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import Container from '@/components/ui/Container'
import ActiveFilters from '@/components/property/ActiveFilters'
import FilterDrawer from '@/components/property/filters/FilterDrawer'
import FilterPanel from '@/components/property/filters/FilterPanel'
import ListingResults from '@/pages/Properties/ListingResults'
import ListingToolbar from '@/pages/Properties/ListingToolbar'
import { usePageMeta } from '@/hooks/usePageMeta'
import { usePropertyFilters } from '@/hooks/usePropertyFilters'

const COPY = {
  sale: {
    title: 'Properties for sale',
    crumb: 'For sale',
    description: 'Apartments, houses, villas and land for sale across Dhaka and Chattogram, each checked by our team.',
  },
  rent: {
    title: 'Properties for rent',
    crumb: 'For rent',
    description: 'Apartments, houses and offices to rent across Dhaka and Chattogram, with agents you can name.',
  },
  all: {
    title: 'All properties',
    crumb: 'All properties',
    description: 'Every verified listing in one place. Narrow it down by area, budget, bedrooms and amenities.',
  },
}

export default function Properties({ transaction }) {
  const { filters, results, chips, update, reset, signature } = usePropertyFilters(transaction)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const copy = COPY[transaction ?? 'all']
  const hasFilters = chips.length > 0

  usePageMeta({ title: copy.title, description: copy.description })

  return (
    <Container className="py-6 sm:py-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-meta text-muted">
        <Link to="/" className="transition-colors hover:text-ink">
          Home
        </Link>
        <ChevronRight className="size-3.5" aria-hidden="true" />
        <span aria-current="page" className="text-ink">
          {copy.crumb}
        </span>
      </nav>

      <header className="mt-5 max-w-2xl">
        <h1 className="text-[2rem] font-semibold leading-tight tracking-[-0.025em] sm:text-page">{copy.title}</h1>
        <p className="mt-2 text-body text-muted">{copy.description}</p>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-x-10 lg:grid-cols-[17.5rem_minmax(0,1fr)] xl:gap-x-14">
        <aside aria-label="Filters" className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-contain pb-6 pr-3">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[1.0625rem] font-semibold">Filters</h2>
              {hasFilters && (
                <button type="button" onClick={reset} className="text-meta font-medium underline underline-offset-4 decoration-line-strong hover:decoration-ink">
                  Clear all
                </button>
              )}
            </div>
            <FilterPanel filters={filters} onChange={update} showTransaction={!transaction} />
          </div>
        </aside>

        <section aria-label="Results" className="min-w-0">
          <ListingToolbar
            query={filters.q}
            sort={filters.sort}
            activeCount={chips.length}
            onSearch={(q) => update({ q })}
            onSort={(sort) => update({ sort })}
            onOpenFilters={() => setDrawerOpen(true)}
          />

          <div className="mt-5 flex min-h-8 flex-col gap-3">
            <p role="status" className="text-meta text-muted">
              <span className="font-semibold text-ink">{results.length}</span> {results.length === 1 ? 'property' : 'properties'}
            </p>
            <ActiveFilters chips={chips} onRemove={update} onClear={reset} />
          </div>

          <div className="mt-8">
            <ListingResults
              key={signature}
              properties={results}
              hasFilters={hasFilters}
              onReset={reset}
              browseTo={transaction ? '/properties' : '/'}
            />
          </div>
        </section>
      </div>

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onChange={update}
        onReset={reset}
        resultCount={results.length}
        showTransaction={!transaction}
      />
    </Container>
  )
}
