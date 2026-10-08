import { cn } from '@/utils/cn'

export default function HeaderIconButton({ label, icon: Icon, onClick, className, ...rest }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        'inline-flex size-10 items-center justify-center rounded-control text-ink transition-colors duration-200 hover:bg-canvas',
        className,
      )}
      {...rest}
    >
      <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
    </button>
  )
}
