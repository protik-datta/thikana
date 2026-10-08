import { cn } from '@/utils/cn'

export default function Segmented({ label, options, value, onChange, allowEmpty = false, className }) {
  return (
    <div role="group" aria-label={label} className={cn('inline-flex rounded-control bg-canvas p-1', className)}>
      {options.map((option) => {
        const selected = value === option.value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(allowEmpty && selected ? '' : option.value)}
            className={cn(
              'h-9 min-w-16 flex-1 rounded-[4px] px-4 text-[0.9375rem] font-medium transition-colors duration-200',
              selected ? 'bg-ink text-paper' : 'text-muted hover:text-ink',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
