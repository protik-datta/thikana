import { Link } from 'react-router-dom'
import { Calendar, ExternalLink } from 'lucide-react'
import EmptyState from '@/components/common/EmptyState'
import { useApp } from '@/context/AppContext'
import { usePageMeta } from '@/hooks/usePageMeta'
import { PROPERTIES } from '@/data/properties'
import { formatDate } from '@/utils/format'

export default function AccountViewings() {
  usePageMeta({ title: 'Your viewing requests' })

  const { viewings } = useApp()

  return (
    <div>
      <h1 className="text-[1.5rem] font-semibold">Viewing requests</h1>
      <p className="mt-1 text-body text-muted">Viewings you have requested — agents will confirm by phone or email.</p>

      {viewings.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No viewing requests"
          message="When you request a viewing from a property page, it will appear here."
          actions={[{ label: 'Browse properties', to: '/properties', variant: 'brand' }]}
        />
      ) : (
        <ul className="mt-6 divide-y divide-line">
          {viewings.map((viewing) => {
            const property = PROPERTIES.find((p) => p.id === viewing.propertyId)
            return (
              <li key={viewing.id} className="py-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-[4px] bg-brand-tint px-2.5 py-1 text-label text-brand">Pending confirmation</span>
                      <p className="text-meta text-muted">Submitted {formatDate(viewing.date?.split('T')[0] ?? '')}</p>
                    </div>
                    <p className="mt-2 font-semibold text-[0.9375rem]">{viewing.propertyTitle}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-meta text-muted">
                      <Calendar className="size-3.5" aria-hidden="true" />
                      {viewing.date} at {viewing.time}
                    </p>
                    <p className="mt-0.5 text-meta text-muted">{viewing.name} · {viewing.phone}</p>
                  </div>
                  {property && (
                    <Link to={`/properties/${property.slug}`} className="shrink-0 rounded-control border border-line-strong p-2 transition-colors hover:border-ink" aria-label="View property">
                      <ExternalLink className="size-4 text-muted" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
