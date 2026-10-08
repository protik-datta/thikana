import Skeleton from '@/components/ui/Skeleton'

export default function PropertyCardSkeleton() {
  return (
    <div aria-hidden="true">
      <Skeleton className="aspect-[4/3] w-full rounded-surface" />
      <Skeleton className="mt-4 h-6 w-1/3" />
      <Skeleton className="mt-3 h-5 w-4/5" />
      <Skeleton className="mt-3 h-4 w-1/2" />
      <Skeleton className="mt-5 h-4 w-full" />
    </div>
  )
}
