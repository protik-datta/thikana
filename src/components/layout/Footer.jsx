import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import Container from '@/components/ui/Container'
import Logo from '@/components/layout/Logo'
import { BRAND } from '@/constants/brand'
import { FOOTER_AREAS, FOOTER_NAV } from '@/constants/navigation'

function FooterLinkGroup({ title, links }) {
  return (
    <div>
      <h2 className="text-label font-semibold text-paper">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map(({ label, to }) => (
          <li key={to}>
            <Link to={to} className="text-meta text-paper/65 transition-colors hover:text-paper">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="mt-24 bg-ink text-paper">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.3fr_2.7fr] lg:gap-16">
        <div className="max-w-sm">
          <Logo inverted />
          <p className="mt-5 text-body text-paper/70">
            Verified homes, offices and land in Dhaka and Chattogram, listed by agents we know and can name.
          </p>
          <address className="mt-8 space-y-3 text-meta not-italic text-paper/70">
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {BRAND.address}
            </p>
            <p>
              <a href={BRAND.phoneHref} className="flex items-center gap-3 transition-colors hover:text-paper">
                <Phone className="size-4 shrink-0" aria-hidden="true" />
                {BRAND.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${BRAND.email}`} className="flex items-center gap-3 transition-colors hover:text-paper">
                <Mail className="size-4 shrink-0" aria-hidden="true" />
                {BRAND.email}
              </a>
            </p>
          </address>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          {FOOTER_NAV.map((group) => (
            <FooterLinkGroup key={group.title} {...group} />
          ))}
          <FooterLinkGroup title="Popular areas" links={FOOTER_AREAS} />
        </div>
      </Container>

      <div className="border-t border-paper/12">
        <Container className="flex flex-col gap-2 py-6 text-label text-paper/55 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {BRAND.fullName}. All rights reserved.</p>
          <p>Listings, agents and contact details on this site are demonstration content.</p>
        </Container>
      </div>
    </footer>
  )
}
