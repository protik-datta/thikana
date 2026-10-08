import { PROPERTIES } from '@/data/properties'

export const getFeaturedProperties = (limit = 6) => PROPERTIES.filter((p) => p.isFeatured).slice(0, limit)

export const getNewProperties = (limit = 6) =>
  PROPERTIES.filter((p) => p.isNew)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit)

export const getPremiumProperties = (limit = 6) =>
  PROPERTIES.filter((p) => p.transactionType === 'sale')
    .sort((a, b) => b.price - a.price)
    .slice(0, limit)

export const getPropertyBySlug = (slug) => PROPERTIES.find((p) => p.slug === slug)

export function getRelatedProperties(property, limit = 3) {
  const others = PROPERTIES.filter((p) => p.id !== property.id)
  const sameArea = others.filter((p) => p.area === property.area && p.transactionType === property.transactionType)
  const sameKind = others.filter((p) => p.type === property.type && p.transactionType === property.transactionType)
  const sameTransaction = others.filter((p) => p.transactionType === property.transactionType)
  const unique = new Map()
  for (const candidate of [...sameArea, ...sameKind, ...sameTransaction]) unique.set(candidate.id, candidate)
  return [...unique.values()].slice(0, limit)
}
