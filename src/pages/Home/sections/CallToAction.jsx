import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import { Reveal } from '@/components/common/Reveal'

export default function CallToAction() {
  return (
    <section aria-labelledby="cta-heading" className="pt-24 sm:pt-32">
      <Container>
        <Reveal className="rounded-surface bg-brand-deep px-6 py-12 text-paper sm:px-12 sm:py-16 lg:flex lg:items-end lg:justify-between lg:gap-12 lg:px-16">
          <div className="max-w-xl">
            <h2 id="cta-heading" className="text-section lg:text-[2.5rem] lg:leading-[1.1]">
              Selling or letting out a property?
            </h2>
            <p className="mt-4 text-body text-paper/80">
              Tell us about it and an agent will review your details, arrange photographs and publish the listing once it is verified.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 lg:mt-0 lg:shrink-0">
            <Button to="/sell" variant="light" size="lg">
              List your property
            </Button>
            <Button to="/contact" variant="outlineLight" size="lg">
              Talk to an agent
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
