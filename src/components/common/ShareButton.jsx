import { useEffect, useState } from 'react'
import { Check, Share2 } from 'lucide-react'

export default function ShareButton({ title }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return undefined
    const timer = setTimeout(() => setCopied(false), 2200)
    return () => clearTimeout(timer)
  }, [copied])

  const share = async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title, url })
        return
      }
      await navigator.clipboard.writeText(url)
      setCopied(true)
    } catch {
      /* dismissed share sheet or blocked clipboard: nothing to recover */
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex h-10 items-center gap-2 rounded-control border border-line-strong px-3.5 text-[0.9375rem] font-medium transition-colors hover:border-ink"
    >
      {copied ? <Check className="size-4 text-success" aria-hidden="true" /> : <Share2 className="size-4" aria-hidden="true" />}
      <span aria-live="polite">{copied ? 'Link copied' : 'Share'}</span>
    </button>
  )
}
