import { Link } from 'react-router-dom'
import { BadgeCheck, Star, User } from 'lucide-react'
import Img from '@/components/ui/Img'

export default function AgentCard({ agent }) {
  const { slug, name, photo, role, agency, location, rating, reviewCount, verified, experience } = agent

  return (
    <article className="group relative">
      <div className="aspect-[4/5] overflow-hidden rounded-surface">
        <Img
          src={photo}
          alt={`Portrait of ${name}`}
          fallbackIcon={User}
          className="size-full transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
        />
      </div>
      <h3 className="mt-4 flex items-center gap-1.5 text-[1.0625rem] font-semibold">
        <Link to={`/agents/${slug}`} className="after:absolute after:inset-0 after:content-['']">
          {name}
        </Link>
        {verified && <BadgeCheck className="size-4 text-brand" aria-label="Verified agent" />}
      </h3>
      <p className="text-meta text-muted">
        {role}, {agency}
      </p>
      <p className="mt-2 text-meta">{location}</p>
      <p className="mt-1 flex items-center gap-1.5 text-meta text-muted">
        <Star className="size-3.5 fill-ink text-ink" aria-hidden="true" />
        <span className="font-medium text-ink">{rating.toFixed(1)}</span>
        {reviewCount} reviews, {experience} years
      </p>
    </article>
  )
}
