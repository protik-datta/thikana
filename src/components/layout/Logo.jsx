import { Link } from 'react-router-dom'
import { BRAND } from '@/constants/brand'
import { cn } from '@/utils/cn'

export function LogoMark({ className }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={cn('size-8 shrink-0', className)}>
      <rect width="32" height="32" rx="7" fill="currentColor" />
      <g className="stroke-paper" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 24V14.5L16 8l8 6.5V24" />
        <path d="M13.5 24v-5a2.5 2.5 0 0 1 5 0v5" />
      </g>
    </svg>
  )
}

export default function Logo({ className, inverted = false }) {
  return (
    <Link
      to="/"
      aria-label={`${BRAND.fullName} home`}
      className={cn('inline-flex items-center gap-2.5', inverted ? 'text-paper' : 'text-ink', className)}
    >
      <LogoMark className={inverted ? 'text-paper [&_g]:stroke-ink' : 'text-brand'} />
      <span className="text-[1.25rem] font-semibold leading-none tracking-[-0.02em]">
        {BRAND.name}
        <span className={cn('ml-1.5 hidden font-normal xs:inline', inverted ? 'text-paper/60' : 'text-muted')}>{BRAND.descriptor}</span>
      </span>
    </Link>
  )
}
