import { BadgeCheck, Building2, MapPin, Users } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { Reveal, Stagger, StaggerItem } from '@/components/common/Reveal'
import { usePageMeta } from '@/hooks/usePageMeta'
import { BRAND } from '@/constants/brand'
import { AGENTS } from '@/data/agents'

const VALUES = [
  { icon: BadgeCheck, title: 'Verified listings only', description: 'Every listing on Thikana Estates is checked by a member of our team before it appears on the site. We verify ownership documents, building permits and current occupancy status.' },
  { icon: Users, title: 'Agents we know by name', description: 'We work with a curated group of experienced agents across Dhaka and Chattogram. Each one has been introduced through a referral and has an active track record of transactions.' },
  { icon: Building2, title: 'Honest property information', description: 'We describe properties as they are. Photographs are taken during a site visit. Floor area is measured, not estimated. Conditions and restrictions are listed clearly.' },
  { icon: MapPin, title: 'Local knowledge, properly applied', description: 'Our team has lived and worked in the areas we cover. We know which roads flood in monsoon, which buildings have reliable power, and which management associations work well.' },
]

export default function About() {
  usePageMeta({
    title: 'About us',
    description: 'Thikana Estates lists verified homes, offices and land in Dhaka and Chattogram.',
  })

  const featured = AGENTS.slice(0, 4)

  return (
    <>
      {/* Hero */}
      <div className="border-b border-line bg-canvas">
        <Container className="py-16 sm:py-24">
          <Reveal className="max-w-3xl">
            <p className="text-label uppercase tracking-widest text-muted">About us</p>
            <h1 className="mt-4 text-display">Find an address worth keeping.</h1>
            <p className="mt-6 max-w-2xl text-lead text-muted">
              Thikana Estates was built around one idea: that finding a home or office should be less stressful and more honest. We list fewer properties than the big portals, but we check every one.
            </p>
          </Reveal>
        </Container>
      </div>

      {/* Values */}
      <Container className="py-16 sm:py-20">
        <Reveal>
          <h2 className="text-section">How we work</h2>
        </Reveal>
        <Stagger interval={0.08} className="mt-10 grid gap-8 sm:grid-cols-2">
          {VALUES.map(({ icon: Icon, title, description }) => (
            <StaggerItem key={title} className="flex gap-5">
              <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-control bg-brand-tint text-brand">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-[1.0625rem] font-semibold">{title}</h3>
                <p className="mt-2 text-body text-muted">{description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>

      {/* Team preview */}
      <div className="border-t border-line bg-canvas">
        <Container className="py-16 sm:py-20">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-section">The team</h2>
            <Button to="/agents" variant="secondary">View all agents</Button>
          </Reveal>
          <Stagger interval={0.07} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((agent) => (
              <StaggerItem key={agent.id} className="flex items-center gap-3">
                <img src={agent.photo} alt={`Portrait of ${agent.name}`} loading="lazy" className="size-12 rounded-full object-cover bg-canvas" />
                <div className="min-w-0">
                  <p className="font-semibold truncate">{agent.name}</p>
                  <p className="text-meta text-muted truncate">{agent.role}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </div>

      {/* Contact CTA */}
      <Container className="py-16 sm:py-20">
        <Reveal className="max-w-xl">
          <h2 className="text-section">Talk to us</h2>
          <p className="mt-3 text-body text-muted">
            Whether you are buying, selling, renting or simply exploring the market, our team is available Saturday to Thursday, 9:30 am to 6:30 pm.
          </p>
          <p className="mt-2 text-body text-muted">{BRAND.address}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href={BRAND.phoneHref} variant="brand">{BRAND.phone}</Button>
            <Button to="/contact" variant="secondary">Send a message</Button>
          </div>
        </Reveal>
      </Container>
    </>
  )
}
