import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import { usePageMeta } from '@/hooks/usePageMeta'

export default function PlaceholderPage({ title, description, phase }) {
  usePageMeta({ title, description })

  return (
    <Container className="py-14 sm:py-20">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-meta text-muted">
        <Link to="/" className="transition-colors hover:text-ink">
          Home
        </Link>
        <ChevronRight className="size-3.5" aria-hidden="true" />
        <span aria-current="page" className="text-ink">
          {title}
        </span>
      </nav>

      <h1 className="mt-6 max-w-3xl text-page">{title}</h1>
      <p className="mt-4 max-w-xl text-lead text-muted">{description}</p>

      <div className="mt-10 max-w-xl border-t border-line pt-6">
        <p className="text-meta text-muted">This page is scheduled for Phase {phase} of the build.</p>
        <Button to="/" variant="secondary" className="mt-5">
          Back to home
        </Button>
      </div>
    </Container>
  )
}
