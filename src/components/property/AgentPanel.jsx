import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { BadgeCheck, Calendar, Mail, Phone, Star, User } from 'lucide-react'
import Button from '@/components/ui/Button'
import Img from '@/components/ui/Img'
import FavoriteButton from '@/components/property/FavoriteButton'
import { InquiryForm, ViewingRequestModal } from '@/components/forms/PropertyForms'

export default function AgentPanel({ agent, property }) {
  const { slug, name, photo, role, agency, experience, rating, reviewCount, verified, phone } = agent
  const [showInquiry, setShowInquiry] = useState(false)
  const [showViewing, setShowViewing] = useState(false)

  return (
    <div>
      <div className="flex items-center gap-4">
        <Img src={photo} alt={`Portrait of ${name}`} fallbackIcon={User} className="size-16 shrink-0 rounded-full" />
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-[1.0625rem] font-semibold">
            <Link to={`/agents/${slug}`} className="truncate underline-offset-4 hover:underline">
              {name}
            </Link>
            {verified && <BadgeCheck className="size-4 shrink-0 text-brand" aria-label="Verified agent" />}
          </p>
          <p className="text-meta text-muted">
            {role}, {agency}
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 text-meta text-muted">
            <Star className="size-3.5 fill-ink text-ink" aria-hidden="true" />
            <span className="font-medium text-ink">{rating.toFixed(1)}</span>
            {reviewCount} reviews, {experience} years
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        <Button href={`tel:${phone.replace(/\s/g, '')}`} variant="brand" className="w-full">
          <Phone className="size-4" aria-hidden="true" />
          Call {phone}
        </Button>
        <Button onClick={() => setShowInquiry(true)} variant="secondary" className="w-full">
          <Mail className="size-4" aria-hidden="true" />
          Send inquiry
        </Button>
        <Button onClick={() => setShowViewing(true)} variant="ghost" className="w-full">
          <Calendar className="size-4" aria-hidden="true" />
          Request viewing
        </Button>
      </div>

      {property && (
        <div className="mt-4 flex items-center gap-2 border-t border-line pt-4">
          <FavoriteButton propertyId={property.id} />
          <span className="text-meta text-muted">Save this property</span>
        </div>
      )}

      <AnimatePresence>
        {showInquiry && (
          <InquiryForm property={property} agent={agent} onClose={() => setShowInquiry(false)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showViewing && (
          <ViewingRequestModal property={property} onClose={() => setShowViewing(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}
