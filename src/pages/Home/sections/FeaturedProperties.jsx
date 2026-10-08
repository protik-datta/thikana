import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import SectionHeader from '@/components/common/SectionHeader'
import PropertyGrid from '@/components/property/PropertyGrid'
import { getFeaturedProperties, getNewProperties, getPremiumProperties } from '@/utils/propertySelectors'
import { cn } from '@/utils/cn'

const TABS = [
  { id: 'featured', label: 'Featured', load: getFeaturedProperties },
  { id: 'new', label: 'New listings', load: getNewProperties },
  { id: 'premium', label: 'Premium', load: getPremiumProperties },
]

export default function FeaturedProperties() {
  const [active, setActive] = useState(TABS[0].id)
  const tabRefs = useRef([])
  const activeTab = TABS.find((tab) => tab.id === active)

  const onKeyDown = (event, index) => {
    const offset = { ArrowRight: 1, ArrowLeft: -1 }[event.key]
    if (!offset) return
    event.preventDefault()
    const next = (index + offset + TABS.length) % TABS.length
    setActive(TABS[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <section aria-labelledby="featured-heading" className="pt-24 sm:pt-32">
      <Container>
        <SectionHeader
          headingId="featured-heading"
          title="Properties worth a visit"
          description="A short selection from our verified listings, updated as agents add new homes."
          linkTo="/properties"
          linkLabel="View all properties"
        />

        <div role="tablist" aria-label="Property collections" className="mt-8 flex gap-6 border-b border-line">
          {TABS.map((tab, index) => {
            const selected = tab.id === active
            return (
              <button
                key={tab.id}
                ref={(node) => {
                  tabRefs.current[index] = node
                }}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={selected}
                aria-controls="featured-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={cn(
                  'relative h-12 text-[0.9375rem] font-medium transition-colors duration-200',
                  selected ? 'text-ink' : 'text-muted hover:text-ink',
                )}
              >
                {tab.label}
                {selected && (
                  <motion.span layoutId="featured-tab" className="absolute inset-x-0 -bottom-px h-0.5 bg-brand" />
                )}
              </button>
            )
          })}
        </div>

        <div role="tabpanel" id="featured-panel" aria-labelledby={`tab-${active}`} className="mt-10">
          <PropertyGrid key={active} properties={activeTab.load()} />
        </div>
      </Container>
    </section>
  )
}
