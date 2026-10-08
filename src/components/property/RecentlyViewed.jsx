import Container from '@/components/ui/Container'
import PropertyGrid from '@/components/property/PropertyGrid'
import { Reveal } from '@/components/common/Reveal'
import { useApp } from '@/context/AppContext'
import { PROPERTIES } from '@/data/properties'

export default function RecentlyViewed({ excludeId, limit = 4 }) {
  const { recentlyViewed } = useApp()

  const properties = recentlyViewed
    .filter((id) => id !== excludeId)
    .map((id) => PROPERTIES.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, limit)

  if (properties.length === 0) return null

  return (
    <section aria-labelledby="recently-viewed-heading" className="pt-16 sm:pt-20">
      <Container>
        <Reveal>
          <h2 id="recently-viewed-heading" className="text-section">Recently viewed</h2>
        </Reveal>
        <PropertyGrid properties={properties} columns="compact" className="mt-8" />
      </Container>
    </section>
  )
}
