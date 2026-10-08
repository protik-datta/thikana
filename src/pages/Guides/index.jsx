import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Clock } from 'lucide-react'
import Container from '@/components/ui/Container'
import Img from '@/components/ui/Img'
import { Reveal, Stagger, StaggerItem } from '@/components/common/Reveal'
import { usePageMeta } from '@/hooks/usePageMeta'
import { GUIDES } from '@/data/guides'

const GUIDE_CONTENT = {
  'buying-your-first-apartment': {
    body: [
      'Buying a home in Dhaka involves more steps than in many other markets. The process starts well before you visit a single property.',
      'Set your budget first — not the price you can borrow, but the total you can commit including registration fees (typically 10–12% on top of the purchase price), legal fees and any renovation. Most first-time buyers underestimate these costs significantly.',
      'Once your budget is set, check your land title options. The two main ownership structures are freehold (freeholders own the land outright) and leasehold under RAJUK. Both are valid, but the paperwork differs. A deed checker or advocate familiar with Dhaka\'s sub-registration offices is essential.',
      'Shortlist buildings rather than individual apartments first. Look for a Completion Certificate from RAJUK or the relevant authority, a clear mutation record, and an active and functional owners\' association. Buildings without working associations often have poor maintenance and disputed common areas.',
      'During viewings, check natural light, cross-ventilation, water pressure and power stability. Ask which months experience load-shedding and whether the generator covers lifts. Look at the lobby, stairwell and rooftop — they tell you how the building is managed.',
      'Before signing anything, have the sale agreement reviewed by an independent advocate. The agreement should specify the payment schedule, handover date, penalty clauses for delays, and exactly what fixtures and fittings are included.',
    ],
  },
  'choosing-the-right-neighbourhood': {
    body: [
      'The neighbourhood you choose will shape your daily life more than the apartment itself. Address prestige matters for resale, but practical liveability matters for the years you live there.',
      'Start with your commute. Map every regular journey from each shortlisted area — office, school, market, family. In Dhaka, a difference of two kilometres can mean forty additional minutes in peak traffic. Areas with metro access have a measurable advantage for northbound commutes.',
      'Ask about monsoon flooding. Several popular residential areas flood annually, some severely. Visit your shortlisted roads during or immediately after the first rains. A flooded street once a year is manageable. A flooded building basement is not.',
      'Schools matter even if you do not have children — they are a strong signal of neighbourhood stability and resale value. Dhanmondi, Uttara and Banani have the highest concentration of well-regarded schools. Bashundhara R/A has grown significantly in school provision in recent years.',
      'Noise deserves more weight than buyers usually give it. A flat on a main road in Mirpur or Mohammadpur can be significantly louder than one set back on a side street. Visit at different times of day.',
      'Finally, talk to residents, not just agents. Ask shopkeepers and guards about water supply, power cuts and the building committee. Their answers are more reliable than any listing description.',
    ],
  },
  'understanding-property-prices': {
    body: [
      'Property prices in Dhaka are shaped by several factors that are not always visible in the listed price. Understanding them helps you negotiate with confidence.',
      'Location is the dominant factor, but it is more specific than the area name suggests. A flat on Road 11 in Banani commands a premium over one two streets away. The premium is real and persistent — it reflects access to the main road, proximity to offices and footfall, and the relative prestige of the immediate block.',
      'Floor level has a direct effect on price. Ground and first floors trade at a discount (security, privacy, noise), while middle floors (four to eight in most Dhaka buildings) are preferred. The highest floors command a view premium only if the view is genuinely clear, which is rare in dense areas.',
      'Building age and quality matter enormously. A 2020 building with RCC frame construction, quality tiles and a reliable generator is worth meaningfully more than a 2005 building with deferred maintenance, even if the listed price is similar. Ask about the building\'s last structural inspection and lift maintenance contract.',
      'In the resale market, seller motivation is often the single largest factor. Sellers who need to close quickly (emigration, debt, estate settlement) frequently accept 10–15% below comparable transactions. The agent should be able to tell you why the property is being sold.',
      'Registration fees in Bangladesh are among the highest in the region. Budget 10–12% of the purchase price for stamp duty, registration fee and deed writing. This is in addition to any agent commission, which is typically negotiated separately.',
    ],
  },
  'preparing-to-sell-a-property': {
    body: [
      'A well-prepared sale takes less time and achieves a better price. Most sellers underinvest in the process — which creates an advantage for those who do not.',
      'Start with the documents. Gather your original deed, mutation papers, utility receipts for the last six months, building completion certificate, NOC from the owners\' association and your tax payment receipt (if applicable). Missing documents are the single most common cause of delayed or failed transactions.',
      'Price the property correctly from the start. Overpriced listings sit on the market, attract fewer serious buyers and often sell for less than a correctly priced listing would have. Ask your agent to show you the actual transaction prices (not listing prices) for comparable flats in the same building or block within the last twelve months.',
      'Photography is more important than most sellers realise. Listings with daylight photographs taken when rooms are clean and uncluttered receive significantly more inquiries. Remove personal photographs, clear countertops, and open curtains before the shoot.',
      'Minor repairs have an outsized effect on buyer confidence. Fix dripping taps, broken switches and cracked tiles. Repaint walls that are marked or yellowed. These repairs typically cost a fraction of a percent of the sale price but remove objections that buyers use to negotiate discounts.',
      'Choose an agent who lists fewer properties and manages each one actively. An agent with one hundred listings cannot give yours the attention it needs. Ask how many listings they currently have and how they plan to market yours specifically.',
    ],
  },
}

function GuideCard({ guide, featured }) {
  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-surface border border-line">
        <div className="aspect-[16/7] overflow-hidden">
          <Img
            src={guide.image}
            alt={guide.title}
            className="size-full transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
          />
        </div>
        <div className="p-6 sm:p-8">
          <p className="text-label uppercase tracking-wider text-muted">{guide.category}</p>
          <h3 className="mt-2 text-[1.375rem] font-semibold leading-snug tracking-tight">
            <Link to={`/guides/${guide.slug}`} className="after:absolute after:inset-0 after:content-[''] underline-offset-4 hover:underline">
              {guide.title}
            </Link>
          </h3>
          <p className="mt-3 text-body text-muted">{guide.excerpt}</p>
          <p className="mt-4 flex items-center gap-1.5 text-meta text-muted">
            <Clock className="size-3.5" aria-hidden="true" />
            {guide.readMinutes} min read
          </p>
        </div>
      </article>
    )
  }

  return (
    <article className="group relative border-t border-line py-6">
      <p className="text-label uppercase tracking-wider text-muted">{guide.category}</p>
      <h3 className="mt-2 text-[1.0625rem] font-semibold leading-snug">
        <Link to={`/guides/${guide.slug}`} className="after:absolute after:inset-0 after:content-[''] underline-offset-4 hover:underline">
          {guide.title}
        </Link>
      </h3>
      <p className="mt-1.5 text-meta text-muted line-clamp-2">{guide.excerpt}</p>
      <p className="mt-3 flex items-center gap-1.5 text-meta text-muted">
        <Clock className="size-3.5" aria-hidden="true" />
        {guide.readMinutes} min read
      </p>
    </article>
  )
}

export default function Guides() {
  usePageMeta({
    title: 'Property guides',
    description: 'Practical guides on buying, renting and selling property in Bangladesh.',
  })

  const [featured, ...rest] = GUIDES

  return (
    <Container className="py-8 sm:py-12">
      <Reveal>
        <div className="flex items-center gap-3">
          <BookOpen className="size-6 text-brand" aria-hidden="true" />
          <h1 className="text-page">Property guides</h1>
        </div>
        <p className="mt-2 max-w-xl text-body text-muted">
          Practical advice on buying, renting and selling property in Dhaka and Chattogram, written for the Bangladesh market.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-14">
        <div>
          <Reveal>
            <GuideCard guide={featured} featured />
          </Reveal>
          <Stagger interval={0.08} className="mt-2">
            {rest.map((guide) => (
              <StaggerItem key={guide.slug}>
                <GuideCard guide={guide} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <aside>
          <div className="lg:sticky lg:top-24 space-y-6">
            <div className="rounded-surface border border-line p-5">
              <h2 className="text-[1.0625rem] font-semibold">Browse by topic</h2>
              <ul className="mt-4 space-y-2">
                {['Buying', 'Renting', 'Selling', 'Neighbourhoods', 'Pricing', 'Legal'].map((topic) => (
                  <li key={topic}>
                    <span className="flex items-center justify-between py-1.5 text-[0.9375rem] text-muted">
                      {topic}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-surface border border-line-strong/50 bg-canvas p-5">
              <p className="text-[0.9375rem] font-medium">Need personal advice?</p>
              <p className="mt-1 text-meta text-muted">Our agents answer questions about specific areas and buildings — not just listings.</p>
              <Link to="/agents" className="mt-3 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-ink underline-offset-4 hover:underline">
                Talk to an agent
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </Container>
  )
}
