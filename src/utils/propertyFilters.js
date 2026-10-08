import { AMENITY_FILTERS, DEFAULT_SORT, LOCATION_FILTERS, SORT_OPTIONS, STATUS_FILTERS } from '@/constants/filters'
import { PROPERTY_TYPES, PROPERTY_TYPE_LABELS, RESIDENTIAL_TYPES } from '@/constants/propertyTypes'
import { formatPrice } from '@/utils/formatPrice'

const TYPE_VALUES = PROPERTY_TYPES.map((type) => type.value)
const SORT_VALUES = SORT_OPTIONS.map((option) => option.value)

export const EMPTY_FILTERS = {
  transaction: '',
  q: '',
  location: '',
  types: [],
  minPrice: null,
  maxPrice: null,
  bedrooms: '',
  bathrooms: '',
  minArea: null,
  maxArea: null,
  amenities: [],
  status: [],
  sort: DEFAULT_SORT,
}

const toNumber = (value) => {
  const parsed = Number(value)
  return value !== null && value !== '' && Number.isFinite(parsed) && parsed >= 0 ? parsed : null
}

const toList = (value, allowed) =>
  (value ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter((item) => allowed.includes(item))

export function parseFilters(params, fixedTransaction) {
  const transactionParam = params.get('transaction')
  const bedrooms = params.get('bedrooms') ?? ''
  const bathrooms = params.get('bathrooms') ?? ''
  const location = params.get('location') ?? ''
  const sort = params.get('sort') ?? ''

  return {
    transaction: fixedTransaction ?? (['sale', 'rent'].includes(transactionParam) ? transactionParam : ''),
    q: (params.get('q') ?? '').trim(),
    location: LOCATION_FILTERS.some((item) => item.value === location) ? location : '',
    types: toList(params.get('type'), TYPE_VALUES),
    minPrice: toNumber(params.get('minPrice')),
    maxPrice: toNumber(params.get('maxPrice')),
    bedrooms: ['studio', '1', '2', '3', '4', '5'].includes(bedrooms) ? bedrooms : '',
    bathrooms: ['1', '2', '3', '4'].includes(bathrooms) ? bathrooms : '',
    minArea: toNumber(params.get('minArea')),
    maxArea: toNumber(params.get('maxArea')),
    amenities: toList(params.get('amenities'), AMENITY_FILTERS),
    status: toList(params.get('status'), STATUS_FILTERS),
    sort: SORT_VALUES.includes(sort) ? sort : DEFAULT_SORT,
  }
}

export function filtersToParams(filters, fixedTransaction) {
  const params = new URLSearchParams()
  const set = (key, value) => {
    if (value !== '' && value !== null && value !== undefined) params.set(key, String(value))
  }

  if (!fixedTransaction) set('transaction', filters.transaction)
  set('q', filters.q)
  set('location', filters.location)
  if (filters.types.length) params.set('type', filters.types.join(','))
  set('minPrice', filters.minPrice)
  set('maxPrice', filters.maxPrice)
  set('bedrooms', filters.bedrooms)
  set('bathrooms', filters.bathrooms)
  set('minArea', filters.minArea)
  set('maxArea', filters.maxArea)
  if (filters.amenities.length) params.set('amenities', filters.amenities.join(','))
  if (filters.status.length) params.set('status', filters.status.join(','))
  if (filters.sort !== DEFAULT_SORT) params.set('sort', filters.sort)
  return params
}

export function searchProperties(properties, query) {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (tokens.length === 0) return properties

  return properties.filter((property) => {
    const haystack = [
      property.title,
      property.location,
      property.area,
      property.address,
      property.city,
      PROPERTY_TYPE_LABELS[property.type],
      property.type,
      property.agency,
      ...property.amenities,
    ]
      .join(' ')
      .toLowerCase()
    return tokens.every((token) => haystack.includes(token))
  })
}

function matchesLocation(property, slug) {
  const entry = LOCATION_FILTERS.find((item) => item.value === slug)
  if (!entry) return true
  return entry.city ? property.city === entry.city : entry.areas.includes(property.area)
}

function matchesBedrooms(property, value) {
  if (!RESIDENTIAL_TYPES.includes(property.type)) return false
  if (value === 'studio') return property.bedrooms === 0
  if (value === '5') return property.bedrooms >= 5
  return property.bedrooms === Number(value)
}

export function applyFilters(properties, filters) {
  const { transaction, q, location, types, minPrice, maxPrice, bedrooms, bathrooms, minArea, maxArea, amenities, status } = filters

  return searchProperties(properties, q).filter((property) => {
    if (transaction && property.transactionType !== transaction) return false
    if (location && !matchesLocation(property, location)) return false
    if (types.length && !types.includes(property.type)) return false
    if (minPrice !== null && property.price < minPrice) return false
    if (maxPrice !== null && property.price > maxPrice) return false
    if (bedrooms && !matchesBedrooms(property, bedrooms)) return false
    if (bathrooms && property.bathrooms < Number(bathrooms)) return false
    if (minArea !== null && property.areaSqft < minArea) return false
    if (maxArea !== null && property.areaSqft > maxArea) return false
    if (amenities.length && !amenities.every((item) => property.amenities.includes(item))) return false
    if (status.length && !status.includes(property.status)) return false
    return true
  })
}

const byTransaction = (a, b) => (a.transactionType === b.transactionType ? 0 : a.transactionType === 'sale' ? -1 : 1)
const byNewest = (a, b) => b.createdAt.localeCompare(a.createdAt)

const COMPARATORS = {
  recommended: (a, b) =>
    Number(b.isFeatured) - Number(a.isFeatured) || b.rating - a.rating || byNewest(a, b),
  newest: byNewest,
  'price-asc': (a, b) => byTransaction(a, b) || a.price - b.price,
  'price-desc': (a, b) => byTransaction(a, b) || b.price - a.price,
  largest: (a, b) => b.areaSqft - a.areaSqft,
  popular: (a, b) => b.reviewCount - a.reviewCount || b.rating - a.rating,
}

export const sortProperties = (properties, sort) => [...properties].sort(COMPARATORS[sort] ?? COMPARATORS.recommended)

const priceText = (amount, transaction) => formatPrice(amount, transaction).replace(' / month', '')

export function getActiveChips(filters, fixedTransaction) {
  const chips = []
  const { transaction, q, location, types, minPrice, maxPrice, bedrooms, bathrooms, minArea, maxArea, amenities, status } = filters

  if (q) chips.push({ id: 'q', label: `Search: ${q}`, patch: { q: '' } })
  if (!fixedTransaction && transaction) {
    chips.push({
      id: 'transaction',
      label: transaction === 'sale' ? 'For sale' : 'For rent',
      patch: { transaction: '', minPrice: null, maxPrice: null },
    })
  }
  if (location) {
    chips.push({ id: 'location', label: LOCATION_FILTERS.find((item) => item.value === location).label, patch: { location: '' } })
  }
  for (const type of types) {
    chips.push({ id: `type-${type}`, label: PROPERTY_TYPE_LABELS[type], patch: { types: types.filter((item) => item !== type) } })
  }
  if (minPrice !== null || maxPrice !== null) {
    const suffix = transaction === 'rent' ? ' / month' : ''
    const label =
      minPrice !== null && maxPrice !== null
        ? `${priceText(minPrice, transaction)} to ${priceText(maxPrice, transaction)}${suffix}`
        : minPrice !== null
          ? `From ${priceText(minPrice, transaction)}${suffix}`
          : `Up to ${priceText(maxPrice, transaction)}${suffix}`
    chips.push({ id: 'price', label, patch: { minPrice: null, maxPrice: null } })
  }
  if (bedrooms) {
    chips.push({
      id: 'bedrooms',
      label: bedrooms === 'studio' ? 'Studio' : bedrooms === '5' ? '5+ bedrooms' : `${bedrooms} ${bedrooms === '1' ? 'bedroom' : 'bedrooms'}`,
      patch: { bedrooms: '' },
    })
  }
  if (bathrooms) chips.push({ id: 'bathrooms', label: `${bathrooms}+ bathrooms`, patch: { bathrooms: '' } })
  if (minArea !== null || maxArea !== null) {
    const fmt = (n) => n.toLocaleString('en-US')
    const label =
      minArea !== null && maxArea !== null
        ? `${fmt(minArea)} to ${fmt(maxArea)} sq ft`
        : minArea !== null
          ? `${fmt(minArea)}+ sq ft`
          : `Up to ${fmt(maxArea)} sq ft`
    chips.push({ id: 'area', label, patch: { minArea: null, maxArea: null } })
  }
  for (const item of amenities) {
    chips.push({ id: `amenity-${item}`, label: item, patch: { amenities: amenities.filter((a) => a !== item) } })
  }
  for (const item of status) {
    chips.push({ id: `status-${item}`, label: item, patch: { status: status.filter((s) => s !== item) } })
  }
  return chips
}
