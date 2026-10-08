import Container from '@/components/ui/Container'
import Skeleton from '@/components/ui/Skeleton'

export default function PropertyDetailsSkeleton() {
  return (
    <Container className="py-8 sm:py-10" role="status" aria-label="Loading property">
      <Skeleton className="h-4 w-56" />
      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_22.5rem] lg:gap-14">
        <div>
          <Skeleton className="aspect-[4/3] w-full rounded-surface sm:aspect-[16/10]" />
          <div className="mt-3 flex gap-2">
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} className="h-16 w-24 shrink-0" />
            ))}
          </div>
          <Skeleton className="mt-10 h-9 w-3/4" />
          <Skeleton className="mt-4 h-4 w-1/2" />
          <Skeleton className="mt-10 h-24 w-full" />
          <Skeleton className="mt-10 h-40 w-full" />
        </div>
        <Skeleton className="hidden h-96 w-full rounded-surface lg:block" />
      </div>
    </Container>
  )
}
