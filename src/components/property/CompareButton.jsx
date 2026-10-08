import { GitCompareArrows } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { cn } from '@/utils/cn'

export default function CompareButton({ propertyId, className }) {
  const { isComparing, addCompare, removeCompare } = useApp()
  const active = isComparing(propertyId)

  return (
    <button
      type="button"
      aria-label={active ? 'Remove from comparison' : 'Add to comparison'}
      aria-pressed={active}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        active ? removeCompare(propertyId) : addCompare(propertyId)
      }}
      className={cn(
        'inline-flex size-10 items-center justify-center rounded-full transition-colors',
        active ? 'text-brand' : 'text-ink/70 hover:text-ink',
        className,
      )}
    >
      <GitCompareArrows className="size-5" strokeWidth={1.75} aria-hidden="true" />
    </button>
  )
}
