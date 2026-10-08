import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { GitCompareArrows, X } from 'lucide-react'
import Img from '@/components/ui/Img'
import { useApp } from '@/context/AppContext'
import { PROPERTIES } from '@/data/properties'
import { fade } from '@/lib/motion'

export default function CompareBar() {
  const { compareIds, removeCompare, clearCompare } = useApp()

  const properties = compareIds
    .map((id) => PROPERTIES.find((p) => p.id === id))
    .filter(Boolean)

  if (properties.length === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        variants={fade}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-line bg-paper/95 shadow-[0_-4px_24px_rgb(0_0_0/0.08)] backdrop-blur-sm"
        role="region"
        aria-label="Property comparison"
      >
        <div className="mx-auto flex max-w-[1280px] items-center gap-4 px-5 py-3 sm:px-8">
          <div className="flex items-center gap-1.5 text-meta font-medium">
            <GitCompareArrows className="size-4 text-brand" aria-hidden="true" />
            Comparing {properties.length} of 3
          </div>

          <div className="flex flex-1 items-center gap-3 overflow-x-auto">
            {properties.map((property) => (
              <div key={property.id} className="relative flex shrink-0 items-center gap-2 rounded-control border border-line pr-2 pl-1 py-1">
                <Img src={property.images[0].src} alt={property.images[0].alt} className="size-8 rounded-[3px] object-cover" />
                <span className="hidden max-w-[120px] truncate text-meta sm:block">{property.title}</span>
                <button
                  type="button"
                  onClick={() => removeCompare(property.id)}
                  className="shrink-0 p-0.5 text-muted transition-colors hover:text-ink"
                  aria-label={`Remove ${property.title} from comparison`}
                >
                  <X className="size-3.5" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={clearCompare}
              className="text-meta text-muted underline-offset-4 hover:underline hidden sm:block"
            >
              Clear
            </button>
            <Link
              to="/compare"
              className="inline-flex h-9 items-center gap-1.5 rounded-control bg-brand px-4 text-[0.875rem] font-medium text-paper transition-colors hover:bg-brand-deep"
            >
              <GitCompareArrows className="size-4" aria-hidden="true" />
              Compare
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
