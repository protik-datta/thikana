import { Link } from 'react-router-dom'
import { GitCompareArrows, X } from 'lucide-react'
import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import EmptyState from '@/components/common/EmptyState'
import Img from '@/components/ui/Img'
import { Reveal } from '@/components/common/Reveal'
import { useApp } from '@/context/AppContext'
import { usePageMeta } from '@/hooks/usePageMeta'
import { PROPERTIES } from '@/data/properties'
import { AMENITY_ICONS } from '@/constants/amenities'
import { PROPERTY_TYPE_LABELS } from '@/constants/propertyTypes'
import { formatArea } from '@/utils/format'
import { cn } from '@/utils/cn'

const ALL_AMENITIES = ['Parking', 'Balcony', 'Lift', 'Generator', 'Security', 'Gym', 'Swimming Pool', 'Rooftop', 'Furnished']

function Row({ label, children, highlight = false }) {
  return (
    <tr className={cn('border-b border-line', highlight && 'bg-brand-tint/40')}>
      <td className="w-44 py-3 pr-4 text-meta font-medium text-muted sm:w-52">{label}</td>
      {children}
    </tr>
  )
}

function Cell({ children }) {
  return (
    <td className="py-3 pr-6 text-[0.9375rem] first-of-type:pl-0 last:pr-0">{children}</td>
  )
}

function AmenityCell({ amenity, amenities }) {
  const has = amenities.includes(amenity)
  const Icon = AMENITY_ICONS[amenity]
  return (
    <Cell>
      {has ? (
        <span className="flex items-center gap-1.5 text-ink">
          {Icon && <Icon className="size-4 shrink-0 text-brand" aria-hidden="true" />}
          {amenity}
        </span>
      ) : (
        <span className="text-muted/50">—</span>
      )}
    </Cell>
  )
}

function CompareCard({ property, onRemove }) {
  return (
    <div className="relative">
      <div className="aspect-[4/3] overflow-hidden rounded-surface">
        <Img src={property.images[0].src} alt={property.images[0].alt} className="size-full object-cover" />
      </div>
      <div className="mt-3">
        <p className="text-[1.25rem] font-semibold tracking-tight">{property.priceLabel}</p>
        <h3 className="mt-1 text-[0.9375rem] font-medium leading-snug">
          <Link to={`/properties/${property.slug}`} className="underline-offset-4 hover:underline">
            {property.title}
          </Link>
        </h3>
      </div>
      <button
        type="button"
        onClick={() => onRemove(property.id)}
        className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-ink/70 text-paper transition-colors hover:bg-ink"
        aria-label={`Remove ${property.title} from comparison`}
      >
        <X className="size-3.5" aria-hidden="true" />
      </button>
    </div>
  )
}

export default function Compare() {
  usePageMeta({
    title: 'Compare properties',
    description: 'Compare up to three properties side by side.',
  })

  const { compareIds, removeCompare, clearCompare } = useApp()
  const properties = PROPERTIES.filter((p) => compareIds.includes(p.id))

  return (
    <Container className="py-8 sm:py-12">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-page">Compare properties</h1>
          <p className="mt-2 text-body text-muted">
            {properties.length === 0
              ? 'Add properties to comparison from any listing.'
              : `Comparing ${properties.length} of 3 properties.`}
          </p>
        </div>
        {properties.length > 0 && (
          <button
            type="button"
            onClick={clearCompare}
            className="text-[0.9375rem] font-medium underline underline-offset-4 decoration-line-strong hover:decoration-ink"
          >
            Clear all
          </button>
        )}
      </Reveal>

      {properties.length === 0 ? (
        <EmptyState
          icon={GitCompareArrows}
          title="No properties to compare"
          message="Add up to 3 properties from any listing page using the compare icon on property cards."
          actions={[
            { label: 'Browse properties', to: '/properties', variant: 'brand' },
          ]}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 overflow-x-auto"
        >
          {/* Property headers */}
          <div
            className="grid gap-6 pb-6"
            style={{ gridTemplateColumns: `12rem repeat(${properties.length}, minmax(200px, 1fr))` }}
          >
            <div />
            {properties.map((p) => (
              <CompareCard key={p.id} property={p} onRemove={removeCompare} />
            ))}
          </div>

          {/* Comparison table */}
          <table className="w-full min-w-max table-fixed border-collapse">
            <caption className="sr-only">Property comparison</caption>
            <colgroup>
              <col className="w-44 sm:w-52" />
              {properties.map((p) => (
                <col key={p.id} />
              ))}
            </colgroup>
            <tbody>
              <Row label="Price">
                {properties.map((p) => <Cell key={p.id}><span className="font-semibold">{p.priceLabel}</span></Cell>)}
              </Row>
              <Row label="Type">
                {properties.map((p) => <Cell key={p.id}>{PROPERTY_TYPE_LABELS[p.type]}</Cell>)}
              </Row>
              <Row label="Location">
                {properties.map((p) => <Cell key={p.id}>{p.location}</Cell>)}
              </Row>
              <Row label="Status">
                {properties.map((p) => <Cell key={p.id}>{p.status}</Cell>)}
              </Row>
              <Row label="Bedrooms" highlight>
                {properties.map((p) => <Cell key={p.id}>{p.bedrooms === 0 ? 'Studio' : p.bedrooms}</Cell>)}
              </Row>
              <Row label="Bathrooms" highlight>
                {properties.map((p) => <Cell key={p.id}>{p.bathrooms || '—'}</Cell>)}
              </Row>
              <Row label="Area" highlight>
                {properties.map((p) => <Cell key={p.id}>{formatArea(p.areaSqft)}</Cell>)}
              </Row>
              <Row label="Floor">
                {properties.map((p) => (
                  <Cell key={p.id}>
                    {p.floor > 0 ? `${p.floor} of ${p.totalFloors}` : '—'}
                  </Cell>
                ))}
              </Row>
              <Row label="Parking">
                {properties.map((p) => <Cell key={p.id}>{p.parking > 0 ? p.parking : '—'}</Cell>)}
              </Row>
              <Row label="Furnishing">
                {properties.map((p) => <Cell key={p.id}>{p.furnishing}</Cell>)}
              </Row>
              <Row label="Year built">
                {properties.map((p) => <Cell key={p.id}>{p.yearBuilt || '—'}</Cell>)}
              </Row>
              <Row label="Facing">
                {properties.map((p) => <Cell key={p.id}>{p.features?.facing || '—'}</Cell>)}
              </Row>
              <Row label="Ownership">
                {properties.map((p) => <Cell key={p.id}>{p.features?.ownership || '—'}</Cell>)}
              </Row>
              <tr>
                <td colSpan={properties.length + 1} className="pt-6 pb-2 text-label font-semibold uppercase tracking-wider text-muted">
                  Amenities
                </td>
              </tr>
              {ALL_AMENITIES.map((amenity) => (
                <Row key={amenity} label={amenity}>
                  {properties.map((p) => <AmenityCell key={p.id} amenity={amenity} amenities={p.amenities} />)}
                </Row>
              ))}
            </tbody>
          </table>

          {compareIds.length < 3 && (
            <div className="mt-8 border-t border-line pt-6">
              <p className="text-meta text-muted">You can compare up to 3 properties. Add another from any listing.</p>
              <Button to="/properties" variant="secondary" className="mt-4">
                Find more properties
              </Button>
            </div>
          )}
        </motion.div>
      )}
    </Container>
  )
}
