import { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import FilterPanel from '@/components/property/filters/FilterPanel'
import Button from '@/components/ui/Button'
import { useDialog } from '@/hooks/useDialog'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { drawerBottom, drawerRight, fade } from '@/lib/motion'
import { cn } from '@/utils/cn'

function DrawerPanel({ filters, onChange, onReset, onClose, resultCount, showTransaction, sideVariant }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)

  useDialog({ open: true, onClose, containerRef: panelRef, initialFocusRef: closeRef })

  return (
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Filter properties"
      variants={sideVariant ? drawerRight : drawerBottom}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn(
        'fixed z-[60] flex flex-col bg-paper shadow-overlay',
        sideVariant ? 'inset-y-0 right-0 w-[26rem] max-w-full' : 'inset-x-0 bottom-0 max-h-[92dvh] rounded-t-[14px]',
      )}
    >
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-line px-5">
        <h2 className="text-[1.0625rem] font-semibold">Filters</h2>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close filters"
          className="-mr-2 inline-flex size-10 items-center justify-center rounded-control transition-colors hover:bg-canvas"
        >
          <X className="size-5" strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5">
        <FilterPanel filters={filters} onChange={onChange} showTransaction={showTransaction} />
      </div>

      <div className="flex shrink-0 items-center gap-3 border-t border-line bg-paper px-5 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <Button variant="ghost" onClick={onReset}>
          Clear all
        </Button>
        <Button variant="brand" onClick={onClose} className="flex-1">
          Show {resultCount} {resultCount === 1 ? 'property' : 'properties'}
        </Button>
      </div>
    </motion.div>
  )
}

export default function FilterDrawer({ open, ...props }) {
  const sideVariant = useMediaQuery('(min-width: 768px)')

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            variants={fade}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={props.onClose}
            aria-hidden="true"
            className="fixed inset-0 z-50 bg-black/45"
          />
          <DrawerPanel key="panel" sideVariant={sideVariant} {...props} />
        </>
      )}
    </AnimatePresence>
  )
}
