import { Stagger, StaggerItem } from '@/components/common/Reveal'
import PropertyCard from '@/components/property/PropertyCard'
import PropertyCardSkeleton from '@/components/property/PropertyCardSkeleton'
import { cn } from '@/utils/cn'

const GRIDS = {
  wide: 'grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3',
  compact: 'grid gap-x-7 gap-y-12 sm:grid-cols-2 2xl:grid-cols-3',
}

export default function PropertyGrid({ properties, loading = false, skeletonCount = 6, columns = 'wide', className }) {
  if (loading) {
    return (
      <div role="status" aria-label="Loading properties" className={cn(GRIDS[columns], className)}>
        {Array.from({ length: skeletonCount }, (_, index) => (
          <PropertyCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  return (
    <Stagger as="ul" interval={0.06} className={cn(GRIDS[columns], className)}>
      {properties.map((property) => (
        <StaggerItem as="li" key={property.id}>
          <PropertyCard property={property} />
        </StaggerItem>
      ))}
    </Stagger>
  )
}
