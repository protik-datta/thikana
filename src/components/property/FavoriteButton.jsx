import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useApp } from '@/context/AppContext'
import { cn } from '@/utils/cn'

export default function FavoriteButton({ propertyId, className, size = 'md' }) {
  const { isFavorite, toggleFavorite } = useApp()
  const saved = isFavorite(propertyId)

  const sizes = {
    sm: 'size-8',
    md: 'size-10',
  }

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.85 }}
      aria-label={saved ? 'Remove from saved' : 'Save property'}
      aria-pressed={saved}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleFavorite(propertyId)
      }}
      className={cn(
        'inline-flex items-center justify-center rounded-full transition-colors',
        sizes[size],
        saved ? 'text-danger' : 'text-ink/70 hover:text-ink',
        className,
      )}
    >
      <Heart className={cn('size-5', saved && 'fill-current')} strokeWidth={1.75} aria-hidden="true" />
    </motion.button>
  )
}
