import { Link, useParams } from 'react-router-dom'
import { ArrowRight, ChevronRight, MapPin } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Img from '@/components/ui/Img'
import EntityNotFound from '@/components/common/EntityNotFound'
import PropertyGrid from '@/components/property/PropertyGrid'
import { Reveal } from '@/components/common/Reveal'
import { usePageMeta } from '@/hooks/usePageMeta'
import { LOCATIONS } from '@/data/locations'
import { PROPERTIES } from '@/data/properties'
import { LOCATION_FILTERS } from '@/constants/filters'
import { PROPERTY_TYPES } from '@/constants/propertyTypes'

const LOCATION_DETAILS = {
  gulshan: {
    headline: 'Dhaka\'s premier business and residential address',
    overview: 'Gulshan sits on the eastern shore of Gulshan Lake, flanked by embassies, multinational offices, and some of the city\'s most expensive apartments. Road 11 and Gulshan Avenue are the main commercial spines. The area is divided into Gulshan 1 and Gulshan 2, each with its own character — 1 is slightly older and quieter, 2 is the centre of the business zone.',
    priceRange: '৳2.5 Cr – ৳25 Cr',
    amenities: ['International schools', 'Embassy row', 'Shopping malls', 'Restaurants', 'Hospitals', 'Lake promenade'],
  },
  banani: {
    headline: 'Residential calm beside the commercial heart of Dhaka',
    overview: 'Banani\'s lettered blocks form a quiet grid between Gulshan and Mohakhali. The lake frontage at Road 11 is lined with cafés and offices. Most buildings are mid-rise and owner-maintained. Streets are tree-lined and comparatively uncongested for inner Dhaka.',
    priceRange: '৳1.8 Cr – ৳10 Cr',
    amenities: ['Banani Lake', 'Kemal Ataturk Avenue', 'Local markets', 'Cafés', 'Schools', 'Metro access'],
  },
  dhanmondi: {
    headline: 'Established family living around Dhanmondi Lake',
    overview: 'Dhanmondi is one of Dhaka\'s oldest planned residential areas, now a mix of families, academics, and professionals. The lake is a public park used daily for walking and fishing. Road 8A, 27, and 32 have the highest concentration of schools and universities in the city.',
    priceRange: '৳1.5 Cr – ৳8 Cr',
    amenities: ['Dhanmondi Lake', 'Universities', 'Schools', 'Hospitals', 'Local markets', 'Parks'],
  },
  'bashundhara-ra': {
    headline: 'Planned residential development east of the city',
    overview: 'Bashundhara R/A is a large planned township with wide internal roads and lettered blocks. Most buildings are under ten years old. It houses one of the largest private universities in Bangladesh and is served by multiple shopping centres. New apartment projects continue at pace.',
    priceRange: '৳80 Lakh – ৳4 Cr',
    amenities: ['Universities', 'International City shopping', 'Schools', 'Wide roads', 'Parks', 'Hospitals'],
  },
  uttara: {
    headline: 'Sector-based living with direct metro access to Dhaka',
    overview: 'Uttara is divided into thirteen sectors north of the airport. Each sector has its own market, school, and mosque. The metro line connects Uttara North to Motijheel in under forty minutes. The area is popular with families who want more space than inner Dhaka and a predictable street grid.',
    priceRange: '৳70 Lakh – ৳5 Cr',
    amenities: ['Metro station', 'Sector markets', 'Schools', 'Airport proximity', 'Wide roads', 'Parks'],
  },
  purbachal: {
    headline: 'The new town on Dhaka\'s eastern edge',
    overview: 'Purbachal is a RAJUK-planned new town with a 6,000-acre masterplan. Most of the infrastructure is in place — roads, utilities, school plots. Construction is active in Sectors 7 through 16. The area appeals to buyers who want a large plot or a new build at a lower price per square foot than inner Dhaka.',
    priceRange: '৳60 Lakh – ৳3 Cr',
    amenities: ['Wide planned roads', 'Schools', 'Hospital', 'Lakes', 'RAJUK allotments', 'Open space'],
  },
}

const DEFAULT_DETAIL = {
  headline: 'Properties available in this area',
  overview: 'Browse available apartments, houses and commercial space in this neighbourhood.',
  priceRange: 'Varies',
  amenities: [],
}

function getAreaName(slug) {
  const filterItem = LOCATION_FILTERS.find((f) => f.value === slug)
  return filterItem?.label ?? slug
}

function getPropertiesForSlug(slug) {
  const filterItem = LOCATION_FILTERS.find((f) => f.value === slug)
  if (!filterItem) return []
  if (filterItem.city) return PROPERTIES.filter((p) => p.city === filterItem.city)
  return PROPERTIES.filter((p) => filterItem.areas.includes(p.area))
}

function getLocationImage(slug) {
  const loc = LOCATIONS.find((l) => l.slug === slug)
  return loc?.image
}

export default function LocationDetail() {
  const { slug } = useParams()
  const filterItem = LOCATION_FILTERS.find((f) => f.value === slug)

  if (!filterItem) {
    return (
      <EntityNotFound
        title="Location not found"
        message="We don't have a guide for this area yet. Browse all locations."
        actionTo="/locations"
        actionLabel="View all locations"
      />
    )
  }

  const areaName = getAreaName(slug)
  const properties = getPropertiesForSlug(slug).slice(0, 6)
  const detail = LOCATION_DETAILS[slug] || DEFAULT_DETAIL
  const image = getLocationImage(slug)

  usePageMeta({
    title: `Properties in ${areaName}`,
    description: detail.overview,
  })

  const typeBreakdown = PROPERTY_TYPES
    .map((type) => ({
      ...type,
      count: getPropertiesForSlug(slug).filter((p) => p.type === type.value).length,
    }))
    .filter((t) => t.count > 0)

  return (
    <>
      {/* Hero */}
      {image && (
        <div className="relative h-72 overflow-hidden sm:h-96">
          <Img src={image} alt={areaName} className="size-full object-cover" eager />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
            <Container>
              <p className="text-label text-paper/70">{filterItem.city || 'Bangladesh'}</p>
              <h1 className="text-[2rem] font-semibold text-paper sm:text-[2.75rem]">{areaName}</h1>
              <p className="mt-1 text-body text-paper/80">{detail.headline}</p>
            </Container>
          </div>
        </div>
      )}

      <Container className="py-10 sm:py-14">
        {!image && (
          <>
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-meta text-muted">
              <Link to="/" className="hover:text-ink">Home</Link>
              <ChevronRight className="size-3.5" aria-hidden="true" />
              <Link to="/locations" className="hover:text-ink">Locations</Link>
              <ChevronRight className="size-3.5" aria-hidden="true" />
              <span aria-current="page" className="text-ink">{areaName}</span>
            </nav>
            <h1 className="mt-6 text-page">{areaName}</h1>
          </>
        )}

        {image && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-meta text-muted">
            <Link to="/" className="hover:text-ink">Home</Link>
            <ChevronRight className="size-3.5" aria-hidden="true" />
            <Link to="/locations" className="hover:text-ink">Locations</Link>
            <ChevronRight className="size-3.5" aria-hidden="true" />
            <span aria-current="page" className="text-ink">{areaName}</span>
          </nav>
        )}

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          {/* Main */}
          <div>
            <Reveal>
              <h2 className="text-section">About {areaName}</h2>
              <p className="mt-4 text-body text-ink/90 max-w-2xl">{detail.overview}</p>
            </Reveal>

            {detail.amenities.length > 0 && (
              <div className="mt-8 border-t border-line pt-8">
                <h3 className="text-[1.125rem] font-semibold">Nearby amenities</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {detail.amenities.map((a) => (
                    <li key={a} className="rounded-control border border-line-strong px-3 py-1.5 text-meta">
                      <MapPin className="mr-1 inline size-3.5 text-muted" aria-hidden="true" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {typeBreakdown.length > 0 && (
              <div className="mt-8 border-t border-line pt-8">
                <h3 className="text-[1.125rem] font-semibold">Property types available</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {typeBreakdown.map(({ value, label, icon: Icon, count }) => (
                    <li key={value}>
                      <Link
                        to={`/properties?location=${slug}&type=${value}`}
                        className="group flex items-center justify-between rounded-control border border-line px-4 py-3 transition-colors hover:border-ink"
                      >
                        <span className="flex items-center gap-2.5 text-[0.9375rem]">
                          <Icon className="size-4 text-muted" aria-hidden="true" />
                          {label}
                        </span>
                        <span className="flex items-center gap-1 text-meta text-muted">
                          {count} listings
                          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {properties.length > 0 && (
              <div className="mt-10 border-t border-line pt-10">
                <h3 className="text-section">Properties in {areaName}</h3>
                <PropertyGrid properties={properties} columns="compact" className="mt-6" />
                <Button to={`/properties?location=${slug}`} variant="secondary" className="mt-8">
                  See all listings in {areaName}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside>
            <div className="rounded-surface border border-line p-5 lg:sticky lg:top-24">
              <h3 className="text-[1.0625rem] font-semibold">Quick overview</h3>
              <dl className="mt-4 space-y-3 text-meta">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">City</dt>
                  <dd className="font-medium">{filterItem.city || 'Dhaka'}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Price range</dt>
                  <dd className="font-medium">{detail.priceRange}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Active listings</dt>
                  <dd className="font-medium">{LOCATIONS.find((l) => l.slug === slug)?.listingCount ?? getPropertiesForSlug(slug).length}</dd>
                </div>
              </dl>
              <Button to={`/properties?location=${slug}`} variant="brand" className="mt-5 w-full">
                Browse all listings
              </Button>
            </div>
          </aside>
        </div>
      </Container>
    </>
  )
}
