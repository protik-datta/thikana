import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { Reveal } from '@/components/common/Reveal'
import { usePageMeta } from '@/hooks/usePageMeta'

const FAQS = [
  {
    category: 'Listings',
    items: [
      { q: 'How do I know listings are genuine?', a: 'Every listing on Thikana Estates is verified by our team before publication. We check ownership documents, confirm the agent\'s identity and visit the property if anything is unclear. Listings marked "Verified" have passed this process.' },
      { q: 'How do I report an incorrect listing?', a: 'Use the Contact us page or call our office. We take errors seriously — a listing that misrepresents a property is removed until corrected.' },
      { q: 'Can I list my own property?', a: 'Yes. Use the List your property page to submit a property for review. Our team will contact you to arrange a verification visit before the listing goes live.' },
      { q: 'How long does it take for a submitted property to appear?', a: 'We aim to review new submissions within one business day. After verification, the listing is usually published within 48 hours.' },
    ],
  },
  {
    category: 'Viewings',
    items: [
      { q: 'How do I request a viewing?', a: 'Open any property page and click "Request viewing". Choose a date and time and submit your contact details. The listing agent will confirm by phone or email within one business day.' },
      { q: 'Can I view a property without an agent?', a: 'All viewings are arranged through the listing agent. This is standard practice and ensures you are meeting someone accountable for the property.' },
      { q: 'Is there a fee for arranging a viewing?', a: 'No. Arranging a viewing through Thikana Estates is free for buyers and renters.' },
    ],
  },
  {
    category: 'Buying',
    items: [
      { q: 'What should I check before making an offer?', a: 'Confirm the land title (RSO/BSO mutation), the developer\'s approval from RAJUK or CDA, and the building\'s safety certificate. Your agent can arrange a certified deed checker if required.' },
      { q: 'Are prices negotiable?', a: 'Most listed prices have some room for negotiation. Your agent can advise on the realistic range based on comparable transactions in the same area.' },
      { q: 'Do I need a lawyer for the purchase?', a: 'Yes. A registered deed writer or advocate must prepare and register the sale deed at the Sub-Registrar\'s office. Your agent can recommend a qualified professional.' },
    ],
  },
  {
    category: 'Renting',
    items: [
      { q: 'What is typically included in the rent?', a: 'This varies by property. Most apartments in Dhaka include water charges; gas and electricity are usually metered separately. Some buildings add a service charge for common area maintenance. Read the description carefully and ask the agent to clarify.' },
      { q: 'How much is a typical security deposit?', a: 'Usually two to three months\' rent, held by the landlord and returned on departure subject to condition inspection.' },
      { q: 'Can I negotiate a lease longer than twelve months?', a: 'Yes. Many landlords are open to longer terms, which can also provide leverage to negotiate a lower monthly rate.' },
    ],
  },
]

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-line">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-4 py-4 text-left"
      >
        <span className="text-[0.9375rem] font-medium">{question}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="mt-0.5 shrink-0 text-muted">
          <ChevronDown className="size-5" aria-hidden="true" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1, transition: { duration: 0.25 } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.18 } }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-body text-muted">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  usePageMeta({
    title: 'Frequently asked questions',
    description: 'Common questions about buying, renting, selling and viewing property through Thikana Estates.',
  })

  return (
    <Container className="py-8 sm:py-12">
      <Reveal>
        <h1 className="text-page">Frequently asked questions</h1>
        <p className="mt-2 max-w-xl text-body text-muted">
          Answers to common questions about listings, viewings, buying and renting in Bangladesh.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
        <div className="space-y-10">
          {FAQS.map(({ category, items }) => (
            <section key={category} aria-labelledby={`faq-${category}`}>
              <h2 id={`faq-${category}`} className="text-[1.125rem] font-semibold">{category}</h2>
              <div className="mt-2">
                {items.map(({ q, a }) => (
                  <FAQItem key={q} question={q} answer={a} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside>
          <div className="lg:sticky lg:top-24 rounded-surface border border-line p-5 space-y-4">
            <h3 className="text-[1.0625rem] font-semibold">Still have questions?</h3>
            <p className="text-meta text-muted">Our team is available Saturday to Thursday, 9:30 am to 6:30 pm.</p>
            <Button to="/contact" variant="brand" className="w-full">Contact us</Button>
            <Button href="tel:+880255041200" variant="secondary" className="w-full">Call now</Button>
          </div>
        </aside>
      </div>
    </Container>
  )
}
