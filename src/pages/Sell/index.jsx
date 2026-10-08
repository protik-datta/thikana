import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BadgeCheck, Building2, CheckCircle, ImagePlus, Info } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { Reveal } from '@/components/common/Reveal'
import { usePageMeta } from '@/hooks/usePageMeta'
import { PROPERTY_TYPES } from '@/constants/propertyTypes'
import { LOCATION_FILTERS } from '@/constants/filters'
import { AMENITY_FILTERS } from '@/constants/filters'

const STEPS = ['Property details', 'Description & amenities', 'Your information']

function StepIndicator({ current, total }) {
  return (
    <ol className="flex items-center gap-3" aria-label="Form progress">
      {STEPS.map((label, i) => (
        <li key={label} className="flex items-center gap-3">
          <span
            className={`flex size-7 items-center justify-center rounded-full text-[0.8125rem] font-semibold transition-colors ${
              i < current ? 'bg-brand text-paper' : i === current ? 'bg-ink text-paper' : 'bg-canvas text-muted'
            }`}
            aria-current={i === current ? 'step' : undefined}
          >
            {i < current ? <CheckCircle className="size-4" aria-hidden="true" /> : i + 1}
          </span>
          <span className={`hidden text-meta sm:block ${i === current ? 'font-medium text-ink' : 'text-muted'}`}>{label}</span>
          {i < total - 1 && <div className="h-px w-8 bg-line-strong" />}
        </li>
      ))}
    </ol>
  )
}

function FieldLabel({ children, required }) {
  return (
    <label className="block text-label text-muted">
      {children}
      {required && <span className="ml-1 text-danger" aria-hidden="true">*</span>}
    </label>
  )
}

function Input({ label, required, ...rest }) {
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>
      <input
        required={required}
        {...rest}
        className="mt-1.5 h-11 w-full rounded-control border border-line-strong bg-paper px-3.5 text-[0.9375rem] placeholder:text-muted transition-colors hover:border-ink focus-visible:border-brand focus-visible:outline-none"
      />
    </div>
  )
}

function SelectField({ label, required, options, placeholder, ...rest }) {
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>
      <select
        required={required}
        {...rest}
        className="mt-1.5 h-11 w-full appearance-none rounded-control border border-line-strong bg-paper px-3.5 text-[0.9375rem] transition-colors hover:border-ink focus-visible:border-brand focus-visible:outline-none"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
        ))}
      </select>
    </div>
  )
}

export default function Sell() {
  usePageMeta({
    title: 'List your property',
    description: 'Submit your property for review and listing with Thikana Estates.',
  })

  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    transactionType: 'sale', type: '', location: '', price: '', bedrooms: '', bathrooms: '',
    areaSqft: '', floor: '', description: '', amenities: [], ownerName: '', ownerPhone: '', ownerEmail: '',
  })

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
  const toggleAmenity = (amenity) => setForm((f) => ({
    ...f,
    amenities: f.amenities.includes(amenity) ? f.amenities.filter((a) => a !== amenity) : [...f.amenities, amenity],
  }))

  const next = (e) => {
    e.preventDefault()
    if (step < STEPS.length - 1) setStep(step + 1)
    else setSubmitted(true)
  }

  if (submitted) {
    return (
      <Container className="py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-lg text-center"
        >
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-tint">
            <BadgeCheck className="size-8 text-brand" aria-hidden="true" />
          </div>
          <h1 className="mt-6 text-section">Submission received</h1>
          <p className="mt-3 text-body text-muted">
            Thank you, {form.ownerName || 'there'}. Your property has been submitted for review. Our team will be in touch within one business day to confirm the listing details and arrange a verification visit.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/properties" variant="brand">Browse listings</Button>
            <Button onClick={() => { setSubmitted(false); setStep(0); setForm({ transactionType: 'sale', type: '', location: '', price: '', bedrooms: '', bathrooms: '', areaSqft: '', floor: '', description: '', amenities: [], ownerName: '', ownerPhone: '', ownerEmail: '' }) }} variant="secondary">
              List another property
            </Button>
          </div>
        </motion.div>
      </Container>
    )
  }

  const areaOptions = LOCATION_FILTERS.filter((f) => f.group === 'Areas')

  return (
    <Container className="py-8 sm:py-12">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <div className="flex items-start gap-3">
            <Building2 className="mt-1 size-7 shrink-0 text-brand" aria-hidden="true" />
            <div>
              <h1 className="text-page">List your property</h1>
              <p className="mt-1 text-body text-muted">Submit your property for review. We verify every listing before it goes live.</p>
            </div>
          </div>
        </Reveal>

        <div className="mt-6 rounded-surface border border-brand-tint bg-brand-tint/50 px-4 py-3">
          <p className="flex items-start gap-2 text-meta text-brand">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            This is a demo submission. No property will actually be listed.
          </p>
        </div>

        <div className="mt-8">
          <StepIndicator current={step} total={STEPS.length} />
        </div>

        <form onSubmit={next} className="mt-8">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                <h2 className="text-[1.25rem] font-semibold">{STEPS[0]}</h2>

                <div className="grid grid-cols-2 gap-4">
                  <SelectField label="Transaction" required value={form.transactionType} onChange={set('transactionType')} placeholder="Select type" options={[{ value: 'sale', label: 'For sale' }, { value: 'rent', label: 'For rent' }]} />
                  <SelectField label="Property type" required value={form.type} onChange={set('type')} placeholder="Select type" options={PROPERTY_TYPES.map((t) => ({ value: t.value, label: t.label }))} />
                </div>
                <SelectField label="Location" required value={form.location} onChange={set('location')} placeholder="Select area" options={areaOptions.map((a) => ({ value: a.value, label: a.label }))} />
                <Input label="Asking price (৳)" required type="number" value={form.price} onChange={set('price')} placeholder={form.transactionType === 'rent' ? 'e.g. 45000' : 'e.g. 15000000'} />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Bedrooms" type="number" min="0" value={form.bedrooms} onChange={set('bedrooms')} placeholder="3" />
                  <Input label="Bathrooms" type="number" min="0" value={form.bathrooms} onChange={set('bathrooms')} placeholder="2" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Area (sq ft)" type="number" value={form.areaSqft} onChange={set('areaSqft')} placeholder="1400" />
                  <Input label="Floor" type="number" min="0" value={form.floor} onChange={set('floor')} placeholder="4" />
                </div>

                <div className="rounded-surface border-2 border-dashed border-line p-8 text-center">
                  <ImagePlus className="mx-auto size-8 text-subtle" aria-hidden="true" />
                  <p className="mt-2 text-[0.9375rem] font-medium">Add photos</p>
                  <p className="mt-1 text-meta text-muted">Photo uploads are not active in this demo.</p>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                <h2 className="text-[1.25rem] font-semibold">{STEPS[1]}</h2>
                <div>
                  <FieldLabel required>Description</FieldLabel>
                  <textarea
                    required
                    rows={5}
                    value={form.description}
                    onChange={set('description')}
                    placeholder="Describe the property — layout, views, nearby landmarks, condition..."
                    className="mt-1.5 w-full rounded-control border border-line-strong bg-paper px-3.5 py-2.5 text-[0.9375rem] placeholder:text-muted transition-colors hover:border-ink focus-visible:border-brand focus-visible:outline-none"
                  />
                </div>
                <div>
                  <FieldLabel>Amenities</FieldLabel>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {AMENITY_FILTERS.map((amenity) => (
                      <label key={amenity} className="flex cursor-pointer items-center gap-2.5 rounded-control border border-line px-3 py-2.5 text-[0.9375rem] transition-colors has-[:checked]:border-brand has-[:checked]:bg-brand-tint">
                        <input
                          type="checkbox"
                          checked={form.amenities.includes(amenity)}
                          onChange={() => toggleAmenity(amenity)}
                          className="size-4 accent-brand"
                        />
                        {amenity}
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                <h2 className="text-[1.25rem] font-semibold">{STEPS[2]}</h2>
                <p className="text-meta text-muted">Your contact details are only shared with our listing team. They will not appear publicly.</p>
                <Input label="Full name" required value={form.ownerName} onChange={set('ownerName')} placeholder="Your name" />
                <Input label="Phone" required type="tel" value={form.ownerPhone} onChange={set('ownerPhone')} placeholder="+880 17..." />
                <Input label="Email" required type="email" value={form.ownerEmail} onChange={set('ownerEmail')} placeholder="you@example.com" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 flex gap-3">
            {step > 0 && (
              <Button type="button" onClick={() => setStep(step - 1)} variant="secondary">Back</Button>
            )}
            <Button type="submit" variant="brand" className="flex-1">
              {step < STEPS.length - 1 ? 'Continue' : 'Submit listing'}
            </Button>
          </div>
        </form>
      </div>
    </Container>
  )
}
