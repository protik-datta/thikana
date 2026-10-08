import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'

export default function HeaderIconLink({ to, label, icon: Icon, badge, className }) {
  return (
    <Link
      to={to}
      aria-label={badge ? `${label} (${badge})` : label}
      className={cn(
        'relative inline-flex size-10 items-center justify-center rounded-control text-ink transition-colors duration-200 hover:bg-canvas',
        className,
      )}
    >
      <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
      {badge > 0 && (
        <span
          aria-hidden="true"
          className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-brand text-[0.625rem] font-bold text-paper"
        >
          {badge > 9 ? '9+' : badge}
        </span>
      )}
    </Link>
  )
}
