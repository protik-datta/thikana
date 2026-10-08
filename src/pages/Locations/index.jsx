import { Link } from 'react-router-dom'
import { ArrowRight, MapPin } from 'lucide-react'
import Container from '@/components/ui/Container'
import Img from '@/components/ui/Img'
import { Stagger, StaggerItem, Reveal } from '@/components/common/Reveal'
import { usePageMeta } from '@/hooks/usePageMeta'
import { LOCATIONS } from '@/data/locations'
import { PROPERTIES } from '@/data/properties'

function LocationCard({ location }) {
  const count = PROPERTIES.filter((p) => p.area.toLowerCase().startsWith(location.name.toLowerCase().split(' ')[0].toLowerCase()) ||
    location.name === 'Gulshan' ? ['Gulshan 1', 'Gulshan 2'].includes(p.area) : p.area === location.name
  ).length || location.listingCount

  return (
    <article className="group relative overflow-hidden rounded-surface">
      <div className="aspect-[3/2] overflow-hidden">
        <Img
          src={location.image}
          alt={location.name}
          className="size-full transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-label text-paper/75">{location.city}</p>
        <h3 className="mt-1 text-[1.25rem] font-semibold text-paper">
          <Link
            to={`/locations/${location.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-offset-2 focus-visible:outline-paper"
          >
            {location.name}
          </Link>
        </h3>
        <p className="mt-1 text-meta text-paper/75">{location.summary}</p>
        <p className="mt-2 text-label text-paper/60">{location.listingCount} listings</p>
      </div>
    </article>
  )
}

export default function Locations() {
  usePageMeta({
    title: 'Locations',
    description: 'Explore neighbourhoods across Dhaka and Chattogram with price ranges and available listings.',
  })

  return (
    <Container className="py-8 sm:py-12">
      <Reveal>
        <h1 className="text-page">Explore locations</h1>
        <p className="mt-2 max-w-xl text-body text-muted">
          From the diplomatic enclaves of Gulshan to the planned sectors of Uttara and the new town at Purbachal.
        </p>
      </Reveal>

      <Stagger interval={0.07} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {LOCATIONS.map((loc) => (
          <StaggerItem key={loc.slug}>
            <LocationCard location={loc} />
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-16 border-t border-line pt-12">
        <Reveal>
          <h2 className="text-section">All areas</h2>
        </Reveal>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: 'Gulshan 1', slug: 'gulshan-1', city: 'Dhaka' },
            { name: 'Gulshan 2', slug: 'gulshan-2', city: 'Dhaka' },
            { name: 'Banani', slug: 'banani', city: 'Dhaka' },
            { name: 'Baridhara', slug: 'baridhara', city: 'Dhaka' },
            { name: 'Bashundhara R/A', slug: 'bashundhara-ra', city: 'Dhaka' },
            { name: 'Dhanmondi', slug: 'dhanmondi', city: 'Dhaka' },
            { name: 'Uttara', slug: 'uttara', city: 'Dhaka' },
            { name: 'Mirpur', slug: 'mirpur', city: 'Dhaka' },
            { name: 'Mohammadpur', slug: 'mohammadpur', city: 'Dhaka' },
            { name: 'Badda', slug: 'badda', city: 'Dhaka' },
            { name: 'Purbachal', slug: 'purbachal', city: 'Dhaka' },
            { name: 'Khulshi', slug: 'khulshi', city: 'Chattogram' },
          ].map((area) => (
            <li key={area.slug}>
              <Link
                to={`/locations/${area.slug}`}
                className="group flex items-center justify-between rounded-control border border-line px-4 py-3 transition-colors hover:border-ink"
              >
                <span className="flex items-center gap-2 text-[0.9375rem] font-medium">
                  <MapPin className="size-4 text-muted" aria-hidden="true" />
                  {area.name}
                  <span className="text-meta text-muted">{area.city}</span>
                </span>
                <ArrowRight className="size-4 text-muted transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  )
}
