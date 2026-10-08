import { cn } from '@/utils/cn'

export default function Chip({ selected, onClick, children }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        'h-10 min-w-12 rounded-control border px-3.5 text-[0.9375rem] transition-colors duration-200',
        selected ? 'border-ink bg-ink text-paper' : 'border-line-strong text-ink hover:border-ink',
      )}
    >
      {children}
    </button>
  )
}
