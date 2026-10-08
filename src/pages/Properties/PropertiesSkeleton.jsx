import Container from '@/components/ui/Container'
import Skeleton from '@/components/ui/Skeleton'
import PropertyGrid from '@/components/property/PropertyGrid'

export default function PropertiesSkeleton() {
  return (
    <Container className="py-6 sm:py-8" role="status" aria-label="Loading properties">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="mt-6 h-10 w-72" />
      <div className="mt-10 grid grid-cols-1 gap-x-10 lg:grid-cols-[17.5rem_minmax(0,1fr)]">
        <Skeleton className="hidden h-[34rem] lg:block" />
        <div>
          <Skeleton className="h-11 w-full" />
          <PropertyGrid loading columns="compact" skeletonCount={6} className="mt-10" />
        </div>
      </div>
    </Container>
  )
}
