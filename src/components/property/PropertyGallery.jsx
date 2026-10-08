import { useCallback, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import GalleryThumbnails from '@/components/property/GalleryThumbnails'
import GalleryViewer from '@/components/property/GalleryViewer'
import Lightbox from '@/components/property/Lightbox'
import { useGalleryIndex } from '@/hooks/useGalleryIndex'

function ArrowButton({ direction, onClick }) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'prev' ? 'Previous photo' : 'Next photo'}
      className={`absolute top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-ink shadow-raised transition-colors hover:bg-canvas sm:inline-flex ${direction === 'prev' ? 'left-4' : 'right-4'}`}
    >
      <Icon className="size-5" aria-hidden="true" />
    </button>
  )
}

export default function PropertyGallery({ images, title }) {
  const { index, direction, go, select } = useGalleryIndex(images.length)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const multiple = images.length > 1

  const closeLightbox = useCallback(() => setLightboxOpen(false), [])

  const onKeyDown = (event) => {
    if (!multiple) return
    if (event.key === 'ArrowRight') go(1)
    if (event.key === 'ArrowLeft') go(-1)
  }

  return (
    <section aria-roledescription="carousel" aria-label={`${title}, photos`} onKeyDown={onKeyDown}>
      <div className="relative">
        <GalleryViewer
          eager
          images={images}
          index={index}
          direction={direction}
          onStep={go}
          className="aspect-[4/3] rounded-surface bg-canvas sm:aspect-[16/10]"
        />

        {multiple && <ArrowButton direction="prev" onClick={() => go(-1)} />}
        {multiple && <ArrowButton direction="next" onClick={() => go(1)} />}

        <p
          aria-live="polite"
          className="absolute bottom-4 left-4 rounded-[4px] bg-ink/80 px-2.5 py-1 text-label text-paper"
        >
          {index + 1} / {images.length}
        </p>
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="absolute bottom-4 right-4 inline-flex h-9 items-center gap-2 rounded-[4px] bg-paper px-3 text-label font-medium text-ink shadow-raised transition-colors hover:bg-canvas"
        >
          <Maximize2 className="size-4" aria-hidden="true" />
          Full screen
        </button>
      </div>

      <GalleryThumbnails images={images} index={index} onSelect={select} className="mt-3" />

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={images}
            title={title}
            index={index}
            direction={direction}
            onStep={go}
            onSelect={select}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
