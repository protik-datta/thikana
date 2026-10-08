import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { toast as toastVariant } from '@/lib/motion'

function Toast({ id, message, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(id), 3200)
    return () => clearTimeout(timer)
  }, [id, onDismiss])

  return (
    <motion.div
      layout
      variants={toastVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      role="status"
      aria-live="polite"
      className="pointer-events-auto flex max-w-sm items-center gap-3 rounded-control bg-ink px-4 py-3 text-[0.9375rem] text-paper shadow-overlay"
    >
      <span className="flex-1">{message}</span>
      <button type="button" onClick={() => onDismiss(id)} className="shrink-0 rounded-sm p-0.5 transition-colors hover:bg-paper/15" aria-label="Dismiss">
        <X className="size-4" aria-hidden="true" />
      </button>
    </motion.div>
  )
}

export default function ToastContainer() {
  const { toasts, dismissToast } = useApp()

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <Toast key={t.id} id={t.id} message={t.message} onDismiss={dismissToast} />
        ))}
      </AnimatePresence>
    </div>
  )
}
