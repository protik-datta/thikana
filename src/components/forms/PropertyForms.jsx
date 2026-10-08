import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, Clock, Mail, Phone, User, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useApp } from '@/context/AppContext'
import { modal, fade } from '@/lib/motion'
import { useDialog } from '@/hooks/useDialog'

const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
]

function Backdrop({ onClick }) {
  return (
    <motion.div
      variants={fade}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-50 bg-ink/50"
      onClick={onClick}
      aria-hidden="true"
    />
  )
}

export function InquiryForm({ property, agent, onClose }) {
  const { addInquiry } = useApp()
  const [submitted, setSubmitted] = useState(false)
  const [values, setValues] = useState({ name: '', email: '', phone: '', message: `I am interested in ${property.title}. Please get in touch.` })
  const containerRef = useRef(null)
  const closeRef = useRef(null)

  useDialog({ open: true, onClose, containerRef, initialFocusRef: closeRef })

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    addInquiry({ ...values, propertyId: property.id, propertyTitle: property.title, agentId: agent.id, agentName: agent.name })
    setSubmitted(true)
  }

  return (
    <>
      <Backdrop onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
        <motion.div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Contact agent"
          variants={modal}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full max-w-md rounded-t-[16px] bg-paper p-6 sm:rounded-surface sm:shadow-overlay"
        >
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-[1.25rem] font-semibold">Contact agent</h2>
            <button ref={closeRef} type="button" onClick={onClose} className="rounded-control p-1.5 transition-colors hover:bg-canvas" aria-label="Close">
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          {submitted ? (
            <div className="py-4 text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand-tint">
                <Mail className="size-6 text-brand" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-[1.125rem] font-semibold">Inquiry sent</h3>
              <p className="mt-2 text-body text-muted">
                {agent.name} will be in touch shortly. In the meantime, you can call {agent.phone}.
              </p>
              <Button onClick={onClose} variant="brand" className="mt-6 w-full">Close</Button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <p className="text-meta text-muted">Regarding: <span className="font-medium text-ink">{property.title}</span></p>
              <div>
                <label className="block text-label text-muted">Full name *</label>
                <input required value={values.name} onChange={set('name')} placeholder="Your name"
                  className="mt-1.5 h-11 w-full rounded-control border border-line-strong bg-paper px-3.5 text-[0.9375rem] transition-colors placeholder:text-muted hover:border-ink focus-visible:border-brand focus-visible:outline-none" />
              </div>
              <div>
                <label className="block text-label text-muted">Email *</label>
                <input required type="email" value={values.email} onChange={set('email')} placeholder="you@example.com"
                  className="mt-1.5 h-11 w-full rounded-control border border-line-strong bg-paper px-3.5 text-[0.9375rem] transition-colors placeholder:text-muted hover:border-ink focus-visible:border-brand focus-visible:outline-none" />
              </div>
              <div>
                <label className="block text-label text-muted">Phone</label>
                <input type="tel" value={values.phone} onChange={set('phone')} placeholder="+880 17..."
                  className="mt-1.5 h-11 w-full rounded-control border border-line-strong bg-paper px-3.5 text-[0.9375rem] transition-colors placeholder:text-muted hover:border-ink focus-visible:border-brand focus-visible:outline-none" />
              </div>
              <div>
                <label className="block text-label text-muted">Message *</label>
                <textarea required rows={3} value={values.message} onChange={set('message')}
                  className="mt-1.5 w-full rounded-control border border-line-strong bg-paper px-3.5 py-2.5 text-[0.9375rem] transition-colors hover:border-ink focus-visible:border-brand focus-visible:outline-none" />
              </div>
              <div className="flex gap-3 pt-1">
                <Button type="submit" variant="brand" className="flex-1">Send inquiry</Button>
                <Button type="button" onClick={onClose} variant="secondary">Cancel</Button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </>
  )
}

export function ViewingRequestModal({ property, onClose }) {
  const { addViewing } = useApp()
  const [submitted, setSubmitted] = useState(false)
  const [values, setValues] = useState({ name: '', email: '', phone: '', date: '', time: TIME_SLOTS[0] })
  const containerRef = useRef(null)
  const closeRef = useRef(null)

  useDialog({ open: true, onClose, containerRef, initialFocusRef: closeRef })

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }))

  const minDate = new Date()
  minDate.setDate(minDate.getDate() + 1)
  const minDateStr = minDate.toISOString().split('T')[0]

  const submit = (e) => {
    e.preventDefault()
    addViewing({ ...values, propertyId: property.id, propertyTitle: property.title })
    setSubmitted(true)
  }

  return (
    <>
      <Backdrop onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
        <motion.div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Request a viewing"
          variants={modal}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full max-w-md rounded-t-[16px] bg-paper p-6 sm:rounded-surface sm:shadow-overlay"
        >
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-[1.25rem] font-semibold">Request a viewing</h2>
            <button ref={closeRef} type="button" onClick={onClose} className="rounded-control p-1.5 transition-colors hover:bg-canvas" aria-label="Close">
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          {submitted ? (
            <div className="py-4 text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand-tint">
                <Calendar className="size-6 text-brand" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-[1.125rem] font-semibold">Viewing requested</h3>
              <p className="mt-2 text-body text-muted">
                Your viewing for {property.title} on {values.date} at {values.time} has been submitted. The agent will confirm shortly.
              </p>
              <Button onClick={onClose} variant="brand" className="mt-6 w-full">Done</Button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <p className="text-meta text-muted">Property: <span className="font-medium text-ink">{property.title}</span></p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-label text-muted">
                    <Calendar className="mr-1 inline size-3.5" aria-hidden="true" />
                    Date *
                  </label>
                  <input required type="date" min={minDateStr} value={values.date} onChange={set('date')}
                    className="mt-1.5 h-11 w-full rounded-control border border-line-strong bg-paper px-3.5 text-[0.9375rem] transition-colors hover:border-ink focus-visible:border-brand focus-visible:outline-none" />
                </div>
                <div>
                  <label className="block text-label text-muted">
                    <Clock className="mr-1 inline size-3.5" aria-hidden="true" />
                    Time *
                  </label>
                  <select required value={values.time} onChange={set('time')}
                    className="mt-1.5 h-11 w-full appearance-none rounded-control border border-line-strong bg-paper px-3.5 text-[0.9375rem] transition-colors hover:border-ink focus-visible:border-brand focus-visible:outline-none">
                    {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-label text-muted">
                  <User className="mr-1 inline size-3.5" aria-hidden="true" />
                  Full name *
                </label>
                <input required value={values.name} onChange={set('name')} placeholder="Your name"
                  className="mt-1.5 h-11 w-full rounded-control border border-line-strong bg-paper px-3.5 text-[0.9375rem] transition-colors placeholder:text-muted hover:border-ink focus-visible:border-brand focus-visible:outline-none" />
              </div>
              <div>
                <label className="block text-label text-muted">
                  <Phone className="mr-1 inline size-3.5" aria-hidden="true" />
                  Phone *
                </label>
                <input required type="tel" value={values.phone} onChange={set('phone')} placeholder="+880 17..."
                  className="mt-1.5 h-11 w-full rounded-control border border-line-strong bg-paper px-3.5 text-[0.9375rem] transition-colors placeholder:text-muted hover:border-ink focus-visible:border-brand focus-visible:outline-none" />
              </div>
              <div>
                <label className="block text-label text-muted">
                  <Mail className="mr-1 inline size-3.5" aria-hidden="true" />
                  Email *
                </label>
                <input required type="email" value={values.email} onChange={set('email')} placeholder="you@example.com"
                  className="mt-1.5 h-11 w-full rounded-control border border-line-strong bg-paper px-3.5 text-[0.9375rem] transition-colors placeholder:text-muted hover:border-ink focus-visible:border-brand focus-visible:outline-none" />
              </div>
              <div className="flex gap-3 pt-1">
                <Button type="submit" variant="brand" className="flex-1">Request viewing</Button>
                <Button type="button" onClick={onClose} variant="secondary">Cancel</Button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </>
  )
}
