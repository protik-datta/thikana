import { useState } from 'react'
import { House } from 'lucide-react'
import { cn } from '@/utils/cn'

export default function Img({ src, alt, className, eager = false, fallbackIcon: FallbackIcon = House, ...rest }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div role="img" aria-label={alt} className={cn('flex items-center justify-center bg-canvas text-line-strong', className)}>
        <FallbackIcon className="size-8" strokeWidth={1.25} aria-hidden="true" />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      decoding="async"
      onError={() => setFailed(true)}
      className={cn('bg-canvas object-cover', className)}
      {...rest}
    />
  )
}
