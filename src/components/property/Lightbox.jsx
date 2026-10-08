import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import GalleryThumbnails from '@/components/property/GalleryThumbnails'
import GalleryViewer from '@/components/property/GalleryViewer'
import { useDialog } from '@/hooks/useDialog'
import { fade } from '@/lib/motion'

export default function Lightbox({ images, title, index, direction, onStep, onSelect, onClose }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)

  useDialog({ open: true, onClose, containerRef: panelRef, initialFocusRef: closeRef })

  const onKeyDown = (event) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.stopPropagation()
    onStep(event.key === 'ArrowRight' ? 1 : -1)
  }

  const multiple = images.length > 1

  return createPortal(
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${title}, photo gallery`}
      onKeyDown={onKeyDown}
      variants={fade}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-[80] flex flex-col bg-black/95 text-paper"
    >
      <div className="flex h-14 shrink-0 items-center justify-between px-4 sm:px-6">
        <p className="text-meta text-paper/80" aria-live="polite">
          {index + 1} / {images.length}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="inline-flex size-10 items-center justify-center rounded-control transition-colors hover:bg-paper/10"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      <div className="relative min-h-0 flex-1">
        <GalleryViewer images={images} index={index} direction={direction} onStep={onStep} objectFit="contain" className="absolute inset-0" />
        {multiple && (
          <>
            <button
              type="button"
              onClick={() => onStep(-1)}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/10 transition-colors hover:bg-paper/20 sm:inline-flex"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onStep(1)}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/10 transition-colors hover:bg-paper/20 sm:inline-flex"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      <GalleryThumbnails images={images} index={index} onSelect={onSelect} tone="dark" className="shrink-0 justify-center px-4 py-4" />
    </motion.div>,
    document.body,
  )
}
