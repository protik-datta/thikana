import { Heart } from 'lucide-react'
import Container from '@/components/ui/Container'
import EmptyState from '@/components/common/EmptyState'
import PropertyGrid from '@/components/property/PropertyGrid'
import { Reveal } from '@/components/common/Reveal'
import { useApp } from '@/context/AppContext'
import { usePageMeta } from '@/hooks/usePageMeta'
import { PROPERTIES } from '@/data/properties'

export default function Favorites() {
  usePageMeta({
    title: 'Saved properties',
    description: 'The properties you have saved, in one place.',
  })

  const { favorites } = useApp()
  const saved = PROPERTIES.filter((p) => favorites.includes(p.id))

  return (
    <Container className="py-8 sm:py-12">
      <Reveal>
        <h1 className="text-page">Saved properties</h1>
        <p className="mt-2 text-body text-muted">
          {saved.length === 0
            ? 'You have not saved any properties yet.'
            : `${saved.length} ${saved.length === 1 ? 'property' : 'properties'} saved.`}
        </p>
      </Reveal>

      {saved.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="No saved properties"
          message="When you find a property you like, tap the heart icon to save it here for later."
          actions={[
            { label: 'Browse properties', to: '/properties', variant: 'brand' },
            { label: 'See new listings', to: '/properties?sort=newest', variant: 'secondary' },
          ]}
        />
      ) : (
        <PropertyGrid properties={saved} className="mt-10" />
      )}
    </Container>
  )
}
