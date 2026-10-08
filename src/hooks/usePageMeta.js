import { useEffect } from 'react'
import { BRAND } from '@/constants/brand'

export function usePageMeta({ title, description } = {}) {
  useEffect(() => {
    document.title = title ? `${title} | ${BRAND.fullName}` : `${BRAND.fullName} | ${BRAND.tagline.replace(/\.$/, '')}`

    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', description ?? BRAND.defaultDescription)
  }, [title, description])
}
