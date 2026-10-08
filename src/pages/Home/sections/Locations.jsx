import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Container from '@/components/ui/Container'
import Img from '@/components/ui/Img'
import SectionHeader from '@/components/common/SectionHeader'
import { Stagger, StaggerItem } from '@/components/common/Reveal'
import { LOCATIONS } from '@/data/locations'
import { cn } from '@/utils/cn'

const SPANS = ['lg:col-span-6', 'lg:col-span-3', 'lg:col-span-3', 'lg:col-span-3', 'lg:col-span-3', 'lg:col-span-6']

export default function Locations() {
  return (
    <section aria-labelledby="locations-heading" className="pt-24 sm:pt-32">
      <Container>
        <SectionHeader
          headingId="locations-heading"
          title="Explore by neighbourhood"
          description="Start with the part of the city you already know, then compare prices and property types."
          linkTo="/locations"
          linkLabel="All locations"
        />

        <Stagger as="ul" interval={0.07} className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12">
          {LOCATIONS.map((location, index) => (
            <StaggerItem
              as="li"
              key={location.slug}
              className={cn((index === 0 || index === LOCATIONS.length - 1) && 'col-span-2 lg:col-span-1', SPANS[index])}
            >
              <Link
                to={`/locations/${location.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-surface sm:aspect-[4/3] lg:aspect-auto lg:h-80"
              >
                <Img
                  src={location.image}
                  alt={`${location.name}, ${location.city}`}
                  className="size-full transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-paper sm:p-5">
                  <div className="min-w-0">
                    <h3 className="text-[1.25rem] font-semibold leading-tight tracking-[-0.015em]">{location.name}</h3>
                    <p className="mt-0.5 text-meta text-paper/80">{location.listingCount} listings</p>
                  </div>
                  <ArrowUpRight
                    className="size-5 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
