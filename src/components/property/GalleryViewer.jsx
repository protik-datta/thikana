import { AnimatePresence, motion } from 'framer-motion'
import Img from '@/components/ui/Img'
import { DURATION, EASE } from '@/lib/motion'

const SWIPE_DISTANCE = 60

const slide = {
  enter: (direction) => ({ opacity: 0, x: direction * 36 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.32, ease: EASE } },
  exit: (direction) => ({ opacity: 0, x: direction * -36, transition: { duration: DURATION.fast, ease: EASE } }),
}

export default function GalleryViewer({ images, index, direction, onStep, objectFit = 'cover', eager = false, className }) {
  const image = images[index]
  const canSwipe = images.length > 1

  const handleDragEnd = (_, { offset }) => {
    if (offset.x < -SWIPE_DISTANCE) onStep(1)
    else if (offset.x > SWIPE_DISTANCE) onStep(-1)
  }

  return (
    <div className={`relative overflow-hidden ${className ?? ''}`}>
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={image.src}
          custom={direction}
          variants={slide}
          initial="enter"
          animate="center"
          exit="exit"
          drag={canSwipe ? 'x' : false}
          dragSnapToOrigin
          dragElastic={0.18}
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 touch-pan-y"
        >
          <Img
            src={image.src}
            alt={image.alt}
            eager={eager && index === 0}
            draggable={false}
            className={`size-full ${objectFit === 'contain' ? 'object-contain' : 'object-cover'}`}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
