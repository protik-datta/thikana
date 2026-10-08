import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import { usePageMeta } from '@/hooks/usePageMeta'

export default function NotFound() {
  usePageMeta({
    title: 'Page not found',
    description: 'The page you are looking for does not exist or has moved.',
  })

  return (
    <Container className="py-24 sm:py-32">
      <p className="text-meta text-muted">Error 404</p>
      <h1 className="mt-3 max-w-2xl text-page">We could not find that page</h1>
      <p className="mt-4 max-w-md text-lead text-muted">
        The link may be out of date, or the property may no longer be listed.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button to="/" variant="brand">
          Go to home
        </Button>
        <Button to="/properties" variant="secondary">
          Browse properties
        </Button>
      </div>
    </Container>
  )
}
