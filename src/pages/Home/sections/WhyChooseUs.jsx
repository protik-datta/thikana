import Container from '@/components/ui/Container'
import { Reveal, Stagger, StaggerItem } from '@/components/common/Reveal'

const REASONS = [
  {
    title: 'Verified listings',
    text: 'We check ownership documents and visit the property before it is published.',
  },
  {
    title: 'Trusted agents',
    text: 'Every agent is identified, reviewed by clients and named on the listing they manage.',
  },
  {
    title: 'Detailed property information',
    text: 'Floor, facing, utilities, ownership and construction status are shown up front, so you do not have to ask.',
  },
  {
    title: 'Easy property discovery',
    text: 'Filter by area, budget, bedrooms and amenities, then compare up to three homes side by side.',
  },
  {
    title: 'Transparent inquiry process',
    text: 'Send a message or request a viewing and follow each request from your account.',
  },
]

export default function WhyChooseUs() {
  return (
    <section aria-labelledby="why-heading" className="mt-24 bg-canvas py-20 sm:mt-32 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <Reveal>
          <h2 id="why-heading" className="text-section">
            Why people list and search with Thikana
          </h2>
          <p className="mt-3 max-w-sm text-body text-muted">
            Buying or renting in Dhaka is slow when details are missing. We put them on the page.
          </p>
        </Reveal>

        <Stagger as="dl" interval={0.07} className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
          {REASONS.map(({ title, text }) => (
            <StaggerItem key={title} className="border-t border-line-strong pt-4">
              <dt className="text-[1.0625rem] font-semibold">{title}</dt>
              <dd className="mt-2 text-meta text-muted">{text}</dd>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
