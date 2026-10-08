import { useEffect } from 'react'
import { Phone } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function StickyContactBar({ priceLabel, phone }) {
  useEffect(() => {
    document.body.classList.add('has-sticky-cta')
    return () => document.body.classList.remove('has-sticky-cta')
  }, [])

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] lg:hidden">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <p className="text-[1.125rem] font-semibold tracking-[-0.015em]">{priceLabel}</p>
        <Button href={`tel:${phone.replace(/\s/g, '')}`} variant="brand">
          <Phone className="size-4" aria-hidden="true" />
          Call agent
        </Button>
      </div>
    </div>
  )
}
