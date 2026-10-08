import { Link } from 'react-router-dom'
import { Building2, ExternalLink } from 'lucide-react'
import EmptyState from '@/components/common/EmptyState'
import { useApp } from '@/context/AppContext'
import { usePageMeta } from '@/hooks/usePageMeta'
import { PROPERTIES } from '@/data/properties'
import { formatDate } from '@/utils/format'

export default function AccountInquiries() {
  usePageMeta({ title: 'Your inquiries' })

  const { inquiries } = useApp()

  return (
    <div>
      <h1 className="text-[1.5rem] font-semibold">Inquiries</h1>
      <p className="mt-1 text-body text-muted">Messages you have sent to agents.</p>

      {inquiries.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="No inquiries yet"
          message="When you send an inquiry from a property page, it will appear here."
          actions={[{ label: 'Browse properties', to: '/properties', variant: 'brand' }]}
        />
      ) : (
        <ul className="mt-6 divide-y divide-line">
          {inquiries.map((inquiry) => {
            const property = PROPERTIES.find((p) => p.id === inquiry.propertyId)
            return (
              <li key={inquiry.id} className="py-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-meta text-muted">{formatDate(inquiry.date?.split('T')[0] ?? '')}</p>
                    <p className="mt-1 font-semibold text-[0.9375rem]">{inquiry.propertyTitle}</p>
                    <p className="mt-0.5 text-meta text-muted">To: {inquiry.agentName}</p>
                    <p className="mt-2 text-[0.9375rem] text-ink/80 line-clamp-2">{inquiry.message}</p>
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
