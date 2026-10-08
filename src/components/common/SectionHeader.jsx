import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/common/Reveal'

export default function SectionHeader({ title, description, linkTo, linkLabel, headingId }) {
  return (
    <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-xl">
        <h2 id={headingId} className="text-section">
          {title}
        </h2>
        {description && <p className="mt-2 text-body text-muted">{description}</p>}
      </div>
      {linkTo && (
        <Link
          to={linkTo}
          className="group inline-flex shrink-0 items-center gap-1.5 text-[0.9375rem] font-medium text-ink underline decoration-line-strong underline-offset-[6px] transition-colors hover:decoration-ink"
        >
          {linkLabel}
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      )}
    </Reveal>
  )
}
