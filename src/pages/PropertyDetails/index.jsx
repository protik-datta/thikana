import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BadgeCheck, ChevronRight, Hash, MapPin } from 'lucide-react'
import Container from '@/components/ui/Container'
import EntityNotFound from '@/components/common/EntityNotFound'
import ShareButton from '@/components/common/ShareButton'
import { Reveal } from '@/components/common/Reveal'
import AgentPanel from '@/components/property/AgentPanel'
import AmenityList from '@/components/property/AmenityList'
import PropertyGallery from '@/components/property/PropertyGallery'
import PropertyGrid from '@/components/property/PropertyGrid'
import PropertyOverview from '@/components/property/PropertyOverview'
import PropertySpecs from '@/components/property/PropertySpecs'
import StickyContactBar from '@/components/property/StickyContactBar'
import RecentlyViewed from '@/components/property/RecentlyViewed'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useApp } from '@/context/AppContext'
import { formatDate, formatPropertyId } from '@/utils/format'
import { getAgentById } from '@/utils/agentSelectors'
import { getPropertyBySlug, getRelatedProperties } from '@/utils/propertySelectors'

function Section({ title, children }) {
  return (
    <section className="border-t border-line pt-8">
      <h2 className="text-[1.375rem] font-semibold tracking-[-0.015em]">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  )
}

function PropertyView({ property }) {
  const agent = getAgentById(property.agentId)
  const related = getRelatedProperties(property)
  const isSale = property.transactionType === 'sale'
  const listingPath = isSale ? '/buy' : '/rent'
  const { addRecentlyViewed } = useApp()

  usePageMeta({ title: property.title, description: property.description })

  useEffect(() => {
    addRecentlyViewed(property.id)
  }, [property.id, addRecentlyViewed])

  return (
    <>
      <Container className="py-6 sm:py-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-meta text-muted">
          <Link to="/" className="transition-colors hover:text-ink">Home</Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <Link to={listingPath} className="transition-colors hover:text-ink">
            {isSale ? 'For sale' : 'For rent'}
          </Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <span aria-current="page" className="truncate text-ink">{property.area}</span>
        </nav>

        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_22.5rem] lg:gap-14">
          <div className="min-w-0">
            <PropertyGallery images={property.images} title={property.title} />

            <header className="mt-8">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-meta text-muted">
                <span className="rounded-[4px] bg-canvas px-2.5 py-1 text-label text-ink">
                  {property.status === 'Ready' ? (isSale ? 'For sale' : 'For rent') : property.status}
                </span>
                {property.isVerified && (
                  <span className="inline-flex items-center gap-1.5">
                    <BadgeCheck className="size-4 text-brand" aria-hidden="true" />
                    Verified listing
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <Hash className="size-3.5" aria-hidden="true" />
                  {formatPropertyId(property.id)}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
                <h1 className="max-w-2xl text-[1.875rem] font-semibold leading-[1.15] tracking-[-0.025em] sm:text-[2.25rem]">
                  {property.title}
                </h1>
                <ShareButton title={property.title} />
              </div>

              <p className="mt-3 flex items-center gap-1.5 text-body text-muted">
                <MapPin className="size-4 shrink-0" aria-hidden="true" />
                {property.address}
              </p>
              <p className="mt-5 text-[1.75rem] font-semibold tracking-[-0.02em] lg:hidden">{property.priceLabel}</p>
            </header>

            <div className="mt-10 space-y-10">
              <Section title="Overview">
                <PropertyOverview property={property} />
              </Section>

              <Section title="About this property">
                <p className="max-w-2xl text-body text-ink/90">{property.description}</p>
              </Section>

              {property.amenities.length > 0 && (
                <Section title="Amenities">
                  <AmenityList amenities={property.amenities} />
                </Section>
              )}

              <Section title="Specifications">
                <PropertySpecs property={property} />
              </Section>
            </div>
          </div>

          <aside id="contact" aria-label="Price and agent" className="lg:self-start">
            <div className="rounded-surface border border-line p-5 sm:p-6 lg:sticky lg:top-24">
              <p className="hidden text-[2rem] font-semibold tracking-[-0.025em] lg:block">{property.priceLabel}</p>
              <p className="hidden text-meta text-muted lg:block">Listed {formatDate(property.createdAt)}</p>
              <div className="my-5 hidden border-t border-line lg:block" />
              <p className="mb-4 text-label text-muted">Listing agent</p>
              {agent && <AgentPanel agent={agent} property={property} />}
            </div>
          </aside>
        </div>
      </Container>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="pt-16 sm:pt-20">
          <Container>
            <Reveal>
              <h2 id="related-heading" className="text-section">Similar properties</h2>
            </Reveal>
            <PropertyGrid properties={related} className="mt-8" />
          </Container>
        </section>
      )}

      <RecentlyViewed excludeId={property.id} />

      <StickyContactBar priceLabel={property.priceLabel} phone={agent?.phone} />
    </>
  )
}

export default function PropertyDetails() {
  const { slug } = useParams()
  const property = getPropertyBySlug(slug)

  if (!property) {
    return (
      <EntityNotFound
        title="This property is no longer listed"
        message="It may have been sold, rented or removed by the owner. Browse current listings to find something similar."
        actionTo="/properties"
        actionLabel="Browse properties"
      />
    )
  }

  return <PropertyView key={property.id} property={property} />
}
