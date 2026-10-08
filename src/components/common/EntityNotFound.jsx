import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import { usePageMeta } from '@/hooks/usePageMeta'

export default function EntityNotFound({ title, message, actionTo, actionLabel }) {
  usePageMeta({ title, description: message })

  return (
    <Container className="py-24 sm:py-32">
      <p className="text-meta text-muted">Not found</p>
      <h1 className="mt-3 max-w-2xl text-page">{title}</h1>
      <p className="mt-4 max-w-md text-lead text-muted">{message}</p>
      <Button to={actionTo} variant="brand" className="mt-8">
        {actionLabel}
      </Button>
    </Container>
  )
}
