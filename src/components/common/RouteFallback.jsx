import Container from '@/components/ui/Container'
import Skeleton from '@/components/ui/Skeleton'

export default function RouteFallback() {
  return (
    <Container className="py-16" role="status" aria-label="Loading page">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="mt-6 h-10 w-full max-w-lg" />
      <Skeleton className="mt-4 h-4 w-full max-w-md" />
    </Container>
  )
}
