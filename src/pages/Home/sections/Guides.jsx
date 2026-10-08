import { Link } from 'react-router-dom'
import Container from '@/components/ui/Container'
import Img from '@/components/ui/Img'
import SectionHeader from '@/components/common/SectionHeader'
import { Reveal, Stagger, StaggerItem } from '@/components/common/Reveal'
import { GUIDES } from '@/data/guides'

export default function Guides() {
  const [lead, ...rest] = GUIDES

  return (
    <section aria-labelledby="guides-heading" className="pt-24 sm:pt-32">
      <Container>
        <SectionHeader
          headingId="guides-heading"
          title="Guides for buyers, tenants and sellers"
          linkTo="/guides"
          linkLabel="All guides"
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <Reveal as="article" className="group relative">
            <div className="aspect-[4/3] overflow-hidden rounded-surface">
              <Img
                src={lead.image}
                alt=""
                className="size-full transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
              />
            </div>
            <p className="mt-5 text-meta text-muted">
              {lead.category}, {lead.readMinutes} min read
            </p>
            <h3 className="mt-1.5 max-w-lg text-[1.625rem] font-semibold leading-tight tracking-[-0.02em]">
              <Link to={`/guides/${lead.slug}`} className="after:absolute after:inset-0 after:content-['']">
                {lead.title}
              </Link>
            </h3>
            <p className="mt-3 max-w-lg text-body text-muted">{lead.excerpt}</p>
          </Reveal>

          <Stagger as="ul" interval={0.08} className="divide-y divide-line border-y border-line">
            {rest.map((guide) => (
              <StaggerItem as="li" key={guide.slug}>
                <article className="group relative flex gap-4 py-5 sm:gap-5">
                  <div className="size-24 shrink-0 overflow-hidden rounded-control sm:size-28">
                    <Img
                      src={guide.image}
                      alt=""
                      className="size-full transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-meta text-muted">
                      {guide.category}, {guide.readMinutes} min read
                    </p>
                    <h3 className="mt-1 text-[1.0625rem] font-semibold leading-snug">
                      <Link to={`/guides/${guide.slug}`} className="after:absolute after:inset-0 after:content-['']">
                        {guide.title}
                      </Link>
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-meta text-muted">{guide.excerpt}</p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  )
}
