import { useState } from 'react'
import { CheckCircle, Mail, MapPin, Phone } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { Reveal } from '@/components/common/Reveal'
import { usePageMeta } from '@/hooks/usePageMeta'
import { BRAND } from '@/constants/brand'

export default function Contact() {
  usePageMeta({
    title: 'Contact us',
    description: 'Speak to our team about buying, renting or selling property in Dhaka and Chattogram.',
  })

  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <Container className="py-8 sm:py-12">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
        <div>
          <Reveal>
            <h1 className="text-page">Contact us</h1>
            <p className="mt-2 max-w-xl text-body text-muted">
              Use this form for general inquiries. For a specific property, use the contact agent form on the listing page.
            </p>
          </Reveal>

          {submitted ? (
            <div className="mt-10 rounded-surface border border-line p-8 text-center">
              <CheckCircle className="mx-auto size-12 text-brand" aria-hidden="true" />
              <h2 className="mt-4 text-[1.25rem] font-semibold">Message received</h2>
              <p className="mt-2 text-body text-muted">
                Thank you, {form.name}. We will get back to you within one business day.
              </p>
              <Button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }) }} variant="secondary" className="mt-6">
                Send another message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-label text-muted">Full name *</label>
                  <input required value={form.name} onChange={set('name')} placeholder="Your name"
                    className="mt-1.5 h-11 w-full rounded-control border border-line-strong bg-paper px-3.5 text-[0.9375rem] placeholder:text-muted transition-colors hover:border-ink focus-visible:border-brand focus-visible:outline-none" />
                </div>
                <div>
                  <label className="block text-label text-muted">Email *</label>
                  <input required type="email" value={form.email} onChange={set('email')} placeholder="you@example.com"
                    className="mt-1.5 h-11 w-full rounded-control border border-line-strong bg-paper px-3.5 text-[0.9375rem] placeholder:text-muted transition-colors hover:border-ink focus-visible:border-brand focus-visible:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-label text-muted">Phone</label>
                <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+880 17..."
                  className="mt-1.5 h-11 w-full rounded-control border border-line-strong bg-paper px-3.5 text-[0.9375rem] placeholder:text-muted transition-colors hover:border-ink focus-visible:border-brand focus-visible:outline-none" />
              </div>
              <div>
                <label className="block text-label text-muted">Subject</label>
                <select value={form.subject} onChange={set('subject')}
                  className="mt-1.5 h-11 w-full appearance-none rounded-control border border-line-strong bg-paper px-3.5 text-[0.9375rem] transition-colors hover:border-ink focus-visible:border-brand focus-visible:outline-none">
                  <option value="">Select a subject</option>
                  <option>Buying a property</option>
                  <option>Renting a property</option>
                  <option>Selling a property</option>
                  <option>Listing inquiry</option>
                  <option>General question</option>
                </select>
              </div>
              <div>
                <label className="block text-label text-muted">Message *</label>
                <textarea required rows={5} value={form.message} onChange={set('message')} placeholder="How can we help?"
                  className="mt-1.5 w-full rounded-control border border-line-strong bg-paper px-3.5 py-2.5 text-[0.9375rem] placeholder:text-muted transition-colors hover:border-ink focus-visible:border-brand focus-visible:outline-none" />
              </div>
              <Button type="submit" variant="brand">Send message</Button>
            </form>
          )}
        </div>

        {/* Contact info */}
        <aside>
          <div className="lg:sticky lg:top-24 space-y-8">
            <div>
              <h2 className="text-[1.125rem] font-semibold">Get in touch</h2>
              <ul className="mt-4 space-y-4 text-[0.9375rem]">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden="true" />
                  <span className="text-muted">{BRAND.address}</span>
                </li>
                <li>
                  <a href={BRAND.phoneHref} className="flex items-center gap-3 text-ink transition-colors hover:text-brand">
                    <Phone className="size-4 shrink-0 text-muted" aria-hidden="true" />
                    {BRAND.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${BRAND.email}`} className="flex items-center gap-3 text-ink transition-colors hover:text-brand">
                    <Mail className="size-4 shrink-0 text-muted" aria-hidden="true" />
                    {BRAND.email}
                  </a>
                </li>
              </ul>
            </div>
            <div className="border-t border-line pt-6">
              <p className="text-meta font-medium">Office hours</p>
              <p className="mt-1 text-meta text-muted">{BRAND.hours}</p>
            </div>
            <div className="border-t border-line pt-6">
              <p className="text-meta font-medium">For property inquiries</p>
              <p className="mt-1 text-meta text-muted">Use the Contact agent button on any property listing page to reach the listing agent directly.</p>
            </div>
          </div>
        </aside>
      </div>
    </Container>
  )
}
