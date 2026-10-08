import { Link } from 'react-router-dom'
import { Phone } from 'lucide-react'
import Container from '@/components/ui/Container'
import { BRAND } from '@/constants/brand'

export default function AnnouncementBar() {
  return (
    <div className="bg-ink text-paper">
      <Container className="flex h-10 items-center justify-center text-label sm:justify-between">
        <p className="truncate">
          {BRAND.announcement}
          <span className="hidden sm:inline">
            <span className="mx-2 text-paper/40" aria-hidden="true">
              |
            </span>
            <Link to="/properties" className="underline underline-offset-4 decoration-paper/40 transition-colors hover:decoration-paper">
              Browse listings
            </Link>
          </span>
        </p>
        <a
          href={BRAND.phoneHref}
          className="hidden items-center gap-2 text-paper/80 transition-colors hover:text-paper sm:inline-flex"
        >
          <Phone className="size-3.5" aria-hidden="true" />
          {BRAND.phone}
        </a>
      </Container>
    </div>
  )
}
