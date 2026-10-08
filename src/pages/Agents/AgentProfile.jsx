import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { BadgeCheck, ChevronRight, Mail, MapPin, Phone, Star, User } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Img from '@/components/ui/Img'
import EntityNotFound from '@/components/common/EntityNotFound'
import PropertyGrid from '@/components/property/PropertyGrid'
import { Reveal } from '@/components/common/Reveal'
import { InquiryForm } from '@/components/forms/PropertyForms'
import { usePageMeta } from '@/hooks/usePageMeta'
import { getAgentBySlug } from '@/utils/agentSelectors'
import { PROPERTIES } from '@/data/properties'

function StarRating({ rating }) {
  return (
    <span className="inline-flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`size-4 ${i < Math.round(rating) ? 'fill-ink text-ink' : 'text-line-strong'}`}
          aria-hidden="true"
        />
      ))}
    </span>
  )
}

function AgentView({ agent }) {
  const { name, photo, role, agency, experience, location, phone, email, rating, reviewCount, verified, specialties, bio } = agent
  const [showInquiry, setShowInquiry] = useState(false)

  const agentProperties = PROPERTIES.filter((p) => p.agentId === agent.id).slice(0, 6)

  usePageMeta({
    title: `${name} — ${role}`,
    description: bio,
  })

  return (
    <>
      <Container className="py-8 sm:py-12">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-meta text-muted">
          <Link to="/" className="transition-colors hover:text-ink">Home</Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <Link to="/agents" className="transition-colors hover:text-ink">Agents</Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <span aria-current="page" className="text-ink">{name}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-14">
          {/* Sidebar */}
          <aside>
            <div className="lg:sticky lg:top-24">
              <div className="aspect-[3/4] overflow-hidden rounded-surface bg-canvas">
                <Img src={photo} alt={`Portrait of ${name}`} fallbackIcon={User} className="size-full object-cover" eager />
              </div>
              <div className="mt-6 space-y-4">
                <Button onClick={() => setShowInquiry(true)} variant="brand" className="w-full">
                  <Mail className="size-4" aria-hidden="true" />
                  Send message
                </Button>
                <Button href={`tel:${phone.replace(/\s/g, '')}`} variant="secondary" className="w-full">
                  <Phone className="size-4" aria-hidden="true" />
                  {phone}
                </Button>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div>
            <Reveal>
              <div className="flex flex-wrap items-start gap-3">
                <h1 className="text-page">{name}</h1>
                {verified && (
                  <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-control bg-brand-tint px-3 py-1 text-label text-brand">
                    <BadgeCheck className="size-4" aria-hidden="true" />
                    Verified agent
                  </span>
                )}
              </div>
              <p className="mt-2 text-body text-muted">{role}, {agency}</p>

              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-meta">
                <span className="flex items-center gap-2">
                  <StarRating rating={rating} />
                  <span className="font-semibold text-ink">{rating.toFixed(1)}</span>
                  <span className="text-muted">({reviewCount} reviews)</span>
                </span>
                <span className="flex items-center gap-1.5 text-muted">
                  <MapPin className="size-4" aria-hidden="true" />
                  {location}
                </span>
                <span className="text-muted">{experience} years experience</span>
              </div>
            </Reveal>

            <div className="mt-8 border-t border-line pt-8">
              <h2 className="text-[1.25rem] font-semibold">About</h2>
              <p className="mt-3 max-w-2xl text-body text-ink/90">{bio}</p>
            </div>

            <div className="mt-8 border-t border-line pt-8">
              <h2 className="text-[1.25rem] font-semibold">Specialties</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {specialties.map((s) => (
                  <li key={s} className="rounded-control border border-line-strong px-3 py-1.5 text-meta">
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {agentProperties.length > 0 && (
              <div className="mt-10 border-t border-line pt-8">
                <h2 className="text-[1.25rem] font-semibold">Current listings</h2>
                <PropertyGrid properties={agentProperties} columns="compact" className="mt-6" />
              </div>
            )}
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {showInquiry && (
          <InquiryForm
            property={{ id: 'general', title: `General inquiry to ${name}` }}
            agent={agent}
            onClose={() => setShowInquiry(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default function AgentProfile() {
  const { slug } = useParams()
  const agent = getAgentBySlug(slug)

  if (!agent) {
    return (
      <EntityNotFound
        title="Agent not found"
        message="This agent may no longer be active. Browse our current team."
        actionTo="/agents"
        actionLabel="View all agents"
      />
    )
  }

  return <AgentView agent={agent} />
}
