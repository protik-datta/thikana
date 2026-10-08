import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import Container from '@/components/ui/Container'
import { Reveal, Stagger, StaggerItem } from '@/components/common/Reveal'
import { PROPERTY_TYPES } from '@/constants/propertyTypes'

export default function PropertyTypes() {
  return (
    <section aria-labelledby="types-heading" className="pt-24 sm:pt-32">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <Reveal>
          <h2 id="types-heading" className="text-section">
            Browse by property type
          </h2>
          <p className="mt-2 max-w-sm text-body text-muted">
            Whether you need a flat, a plot or a shopfront, each type has its own filters and details.
          </p>
        </Reveal>

        <Stagger as="ul" interval={0.04} className="border-t border-line">
          {PROPERTY_TYPES.map(({ value, label, note, icon: Icon }) => (
            <StaggerItem as="li" key={value} className="border-b border-line">
              <Link
                to={`/properties?type=${value}`}
                className="group flex items-center gap-4 py-4 transition-colors sm:gap-5 sm:py-5"
              >
                <Icon className="size-6 shrink-0 text-brand" strokeWidth={1.5} aria-hidden="true" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[1.125rem] font-medium">{label}</span>
                  <span className="mt-0.5 block text-meta text-muted">{note}</span>
                </span>
                <ChevronRight
                  className="size-5 shrink-0 text-subtle transition-all duration-200 group-hover:translate-x-1 group-hover:text-ink"
                  aria-hidden="true"
                />
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
