import { useEffect, useRef } from 'react'
import Img from '@/components/ui/Img'
import { cn } from '@/utils/cn'

export default function GalleryThumbnails({ images, index, onSelect, tone = 'light', className }) {
  const refs = useRef([])

  useEffect(() => {
    refs.current[index]?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
  }, [index])

  if (images.length < 2) return null

  return (
    <ul className={cn('flex gap-2 overflow-x-auto pb-1', className)}>
      {images.map((image, position) => {
        const active = position === index
        return (
          <li key={image.src} className="shrink-0">
            <button
              ref={(node) => {
                refs.current[position] = node
              }}
              type="button"
              onClick={() => onSelect(position)}
              aria-label={`Show photo ${position + 1} of ${images.length}`}
              aria-current={active}
              className={cn(
                'block h-16 w-24 overflow-hidden rounded-control outline-offset-2 transition-opacity duration-200 sm:h-[4.5rem] sm:w-28',
                active ? 'opacity-100 ring-2 ring-brand ring-offset-2' : 'opacity-60 hover:opacity-100',
                tone === 'dark' && active && 'ring-paper ring-offset-black',
              )}
            >
              <Img src={image.src} alt="" className="size-full" />
            </button>
          </li>
        )
      })}
    </ul>
  )
}
