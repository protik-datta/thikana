import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Img from '@/components/ui/Img'
import EntityNotFound from '@/components/common/EntityNotFound'
import { Reveal } from '@/components/common/Reveal'
import { usePageMeta } from '@/hooks/usePageMeta'
import { GUIDES } from '@/data/guides'

const GUIDE_BODY = {
  'buying-your-first-apartment': [
    'Buying a home in Dhaka involves more steps than in many other markets. The process starts well before you visit a single property.',
    'Set your budget first — not the price you can borrow, but the total you can commit including registration fees (typically 10–12% on top of the purchase price), legal fees and any renovation. Most first-time buyers underestimate these costs significantly.',
    'Once your budget is set, check your land title options. The two main ownership structures are freehold (freeholders own the land outright) and leasehold under RAJUK. Both are valid, but the paperwork differs. A deed checker or advocate familiar with Dhaka\'s sub-registration offices is essential.',
    'Shortlist buildings rather than individual apartments first. Look for a Completion Certificate from RAJUK or the relevant authority, a clear mutation record, and an active and functional owners\' association. Buildings without working associations often have poor maintenance and disputed common areas.',
    'During viewings, check natural light, cross-ventilation, water pressure and power stability. Ask which months experience load-shedding and whether the generator covers lifts. Look at the lobby, stairwell and rooftop — they tell you how the building is managed.',
    'Before signing anything, have the sale agreement reviewed by an independent advocate. The agreement should specify the payment schedule, handover date, penalty clauses for delays, and exactly what fixtures and fittings are included.',
  ],
  'choosing-the-right-neighbourhood': [
    'The neighbourhood you choose will shape your daily life more than the apartment itself. Address prestige matters for resale, but practical liveability matters for the years you live there.',
    'Start with your commute. Map every regular journey from each shortlisted area — office, school, market, family. In Dhaka, a difference of two kilometres can mean forty additional minutes in peak traffic. Areas with metro access have a measurable advantage for northbound commutes.',
    'Ask about monsoon flooding. Several popular residential areas flood annually, some severely. Visit your shortlisted roads during or immediately after the first rains. A flooded street once a year is manageable. A flooded building basement is not.',
    'Schools matter even if you do not have children — they are a strong signal of neighbourhood stability and resale value. Dhanmondi, Uttara and Banani have the highest concentration of well-regarded schools. Bashundhara R/A has grown significantly in school provision in recent years.',
    'Noise deserves more weight than buyers usually give it. A flat on a main road in Mirpur or Mohammadpur can be significantly louder than one set back on a side street. Visit at different times of day.',
    'Finally, talk to residents, not just agents. Ask shopkeepers and guards about water supply, power cuts and the building committee. Their answers are more reliable than any listing description.',
  ],
  'understanding-property-prices': [
    'Property prices in Dhaka are shaped by several factors that are not always visible in the listed price. Understanding them helps you negotiate with confidence.',
    'Location is the dominant factor, but it is more specific than the area name suggests. A flat on Road 11 in Banani commands a premium over one two streets away. The premium is real and persistent — it reflects access to the main road, proximity to offices and footfall, and the relative prestige of the immediate block.',
    'Floor level has a direct effect on price. Ground and first floors trade at a discount (security, privacy, noise), while middle floors (four to eight in most Dhaka buildings) are preferred. The highest floors command a view premium only if the view is genuinely clear, which is rare in dense areas.',
    'Building age and quality matter enormously. A 2020 building with RCC frame construction, quality tiles and a reliable generator is worth meaningfully more than a 2005 building with deferred maintenance, even if the listed price is similar. Ask about the building\'s last structural inspection and lift maintenance contract.',
    'In the resale market, seller motivation is often the single largest factor. Sellers who need to close quickly (emigration, debt, estate settlement) frequently accept 10–15% below comparable transactions. The agent should be able to tell you why the property is being sold.',
    'Registration fees in Bangladesh are among the highest in the region. Budget 10–12% of the purchase price for stamp duty, registration fee and deed writing. This is in addition to any agent commission, which is typically negotiated separately.',
  ],
  'preparing-to-sell-a-property': [
    'A well-prepared sale takes less time and achieves a better price. Most sellers underinvest in the process — which creates an advantage for those who do not.',
    'Start with the documents. Gather your original deed, mutation papers, utility receipts for the last six months, building completion certificate, NOC from the owners\' association and your tax payment receipt (if applicable). Missing documents are the single most common cause of delayed or failed transactions.',
    'Price the property correctly from the start. Overpriced listings sit on the market, attract fewer serious buyers and often sell for less than a correctly priced listing would have. Ask your agent to show you the actual transaction prices (not listing prices) for comparable flats in the same building or block within the last twelve months.',
    'Photography is more important than most sellers realise. Listings with daylight photographs taken when rooms are clean and uncluttered receive significantly more inquiries. Remove personal photographs, clear countertops, and open curtains before the shoot.',
    'Minor repairs have an outsized effect on buyer confidence. Fix dripping taps, broken switches and cracked tiles. Repaint walls that are marked or yellowed. These repairs typically cost a fraction of a percent of the sale price but remove objections that buyers use to negotiate discounts.',
    'Choose an agent who lists fewer properties and manages each one actively. An agent with one hundred listings cannot give yours the attention it needs. Ask how many listings they currently have and how they plan to market yours specifically.',
  ],
  'renting-in-dhaka-a-practical-guide': [
    'Renting in Dhaka has become more professional over the last decade, but the process is still largely relationship-driven. Understanding what to expect at each step makes it significantly less stressful.',
    'Most landlords require a security deposit of two to three months\' rent, paid before you move in. This is refundable at the end of the tenancy subject to condition inspection. Some landlords also ask for advance rent — typically one to three months — which is applied to the final months of the lease.',
    'Service charges are common in newer buildings and cover common area maintenance, guard salaries, lift servicing and cleaning. They are typically ৳2,000–৳8,000 per month depending on building quality and are in addition to rent. Confirm the exact amount in writing before signing the lease.',
    'During viewings, run every tap, check the overhead tank and underground reservoir capacity, test the generator, and ask when it was last serviced. Water shortages during dry season and power failures during peak summer are the two most common sources of tenant complaints in Dhaka.',
    'Read the lease agreement carefully before signing. Pay particular attention to the termination clause (usually 60–90 days notice required from either side), restrictions on subletting and alterations, and who is responsible for maintenance of fixtures. If anything is unclear, ask the agent to clarify in writing.',
    'Your rights as a tenant in Bangladesh are protected under the Premises Rent Control Act, though enforcement is variable. Keep copies of all receipts, document the condition of the flat on move-in with photographs, and maintain a clear record of all payments made.',
  ],
  'understanding-land-titles-in-bangladesh': [
    'Property transactions in Bangladesh are built on a system of land titles and registration records that can be complex to navigate without guidance. Understanding the basics will help you ask the right questions.',
    'Every plot of land in Bangladesh is recorded in the survey records maintained by the Department of Land Records and Surveys. There are three main survey records: the CS (Cadastral Survey) from the British era, the SA (State Acquisition) record from the 1950s, and the RS (Revisional Survey) which updated the SA records. In Dhaka, there is also the BS (Bangladesh Survey) for Dhaka district.',
    'Mutation (namjari) is the process by which the government records are updated to reflect a change of ownership. After purchasing a property and registering the deed, the buyer must apply for mutation to transfer the holding in the government records. Without mutation, you may struggle to pay utility bills, obtain building permits, or prove ownership in court.',
    'RAJUK (Rajdhani Unnayan Kartripakkha) is the urban development authority for Dhaka. Properties in RAJUK-designated areas require compliance with their development plans. Many apartments in Dhaka are built on RAJUK-leased land — in this case, you own the flat but not the land beneath it, and the lease has a fixed term (often 99 years). Check how many years remain.',
    'The sale deed is registered at the Sub-Registrar\'s office in the area where the property is located. Both buyer and seller (or their authorised representatives) must appear in person. The deed writer prepares the document; your advocate should review it before execution. Keep the original deed in a secure location.',
    'Before any purchase, obtain a certified copy of the chain of title going back at least three transactions. Have an advocate confirm that there are no encumbrances, mortgages or disputes registered against the property. A single missed lien can derail a transaction months after money has changed hands.',
  ],
}

export default function GuideArticle() {
  const { slug } = useParams()
  const guide = GUIDES.find((g) => g.slug === slug)
  const body = GUIDE_BODY[slug]

  usePageMeta({
    title: guide?.title,
    description: guide?.excerpt,
  })

  if (!guide) {
    return (
      <EntityNotFound
        title="Guide not found"
        message="This guide may have moved or no longer exists."
        actionTo="/guides"
        actionLabel="View all guides"
      />
    )
  }

  const others = GUIDES.filter((g) => g.slug !== slug).slice(0, 3)

  return (
    <Container className="py-8 sm:py-12">
      <Reveal>
        <Link to="/guides" className="inline-flex items-center gap-1.5 text-meta text-muted transition-colors hover:text-ink">
          <ArrowLeft className="size-4" aria-hidden="true" />
          All guides
        </Link>
      </Reveal>

      <div className="mx-auto mt-8 max-w-3xl">
        <Reveal>
          <p className="text-label uppercase tracking-wider text-muted">{guide.category}</p>
          <h1 className="mt-3 text-[2rem] font-semibold leading-[1.2] tracking-[-0.025em] sm:text-[2.5rem]">
            {guide.title}
          </h1>
          <p className="mt-2 flex items-center gap-1.5 text-meta text-muted">
            <Clock className="size-3.5" aria-hidden="true" />
            {guide.readMinutes} min read
          </p>
        </Reveal>

        <div className="mt-8 overflow-hidden rounded-surface">
          <Img src={guide.image} alt={guide.title} className="aspect-[16/7] w-full object-cover" eager />
        </div>

        <article className="mt-10 space-y-5 text-body text-ink/90 leading-relaxed" aria-label="Article content">
          {(body ?? [guide.excerpt]).map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </article>

        <div className="mt-12 border-t border-line pt-8">
          <h2 className="text-[1.125rem] font-semibold">More guides</h2>
          <ul className="mt-6 space-y-4">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  to={`/guides/${other.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-control border border-line px-4 py-3.5 transition-colors hover:border-ink"
                >
                  <div>
                    <p className="text-label text-muted">{other.category}</p>
                    <p className="mt-0.5 font-medium">{other.title}</p>
                  </div>
                  <span className="shrink-0 text-meta text-muted">{other.readMinutes} min</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 rounded-surface bg-canvas border border-line p-6">
          <h3 className="text-[1.0625rem] font-semibold">Have specific questions?</h3>
          <p className="mt-2 text-meta text-muted">Our agents are available to answer questions about specific areas, buildings and the purchase process.</p>
          <Button to="/agents" variant="brand" className="mt-4">Talk to an agent</Button>
        </div>
      </div>
    </Container>
  )
}
