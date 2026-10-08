import { AGENTS } from '@/data/agents'
import { IMAGES, buildGallery } from '@/data/images'
import { formatPrice } from '@/utils/formatPrice'

const AREAS = {
  'Gulshan 1': { city: 'Dhaka', postcode: '1212' },
  'Gulshan 2': { city: 'Dhaka', postcode: '1212' },
  Banani: { city: 'Dhaka', postcode: '1213' },
  Baridhara: { city: 'Dhaka', postcode: '1212' },
  'Bashundhara R/A': { city: 'Dhaka', postcode: '1229' },
  Dhanmondi: { city: 'Dhaka', postcode: '1205' },
  Uttara: { city: 'Dhaka', postcode: '1230' },
  Mirpur: { city: 'Dhaka', postcode: '1216' },
  Mohammadpur: { city: 'Dhaka', postcode: '1207' },
  Badda: { city: 'Dhaka', postcode: '1212' },
  Purbachal: { city: 'Dhaka', postcode: '1461' },
  Khulshi: { city: 'Chattogram', postcode: '4202' },
  'GEC Circle': { city: 'Chattogram', postcode: '4000' },
  Nasirabad: { city: 'Chattogram', postcode: '4000' },
}

const UTILITIES = {
  apartment: 'Gas, water and generator backup',
  house: 'Gas, water and sewer connected',
  villa: 'Gas, water and generator backup',
  land: 'Electricity and water at boundary',
  office: 'Central cooling, generator and fibre',
  commercial: 'Three-phase power, generator and water',
  retail: 'Three-phase power and water',
}

const NEW_SINCE = '2026-09-06'

const pick = (list, index) => list[index % list.length]

function buildImages(title, type, index) {
  if (type === 'land') return buildGallery(title, IMAGES.land)
  if (['office', 'commercial', 'retail'].includes(type)) {
    return buildGallery(title, [pick(IMAGES.commercial, index), pick(IMAGES.commercial, index + 1)])
  }
  const lead = type === 'apartment' ? pick(IMAGES.towers, index) : pick(IMAGES.exteriors, index)
  return buildGallery(title, [lead, pick(IMAGES.interiors, index), pick(IMAGES.interiors, index + 2), pick(IMAGES.interiors, index + 4)])
}

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function buildProperty(seed, index) {
  const { n, title, type, tx, price, area, place = area, addr, d, ag, date, face, own, am = [], f = false, ...specs } = seed
  const { city, postcode } = AREAS[area]
  const agent = AGENTS.find((a) => a.id === ag)
  const isRent = tx === 'rent'

  return {
    id: `p-${String(n).padStart(3, '0')}`,
    slug: slugify(title),
    title,
    type,
    transactionType: tx,
    price,
    priceLabel: formatPrice(price, tx),
    location: `${place}, ${city}`,
    city,
    area,
    address: `${addr}, ${city} ${postcode}`,
    bedrooms: specs.bd ?? 0,
    bathrooms: specs.ba ?? 0,
    areaSqft: specs.sqft,
    floor: specs.fl ?? 0,
    totalFloors: specs.tf ?? 0,
    yearBuilt: specs.yr ?? 0,
    parking: specs.pk ?? 0,
    furnishing: specs.fur ?? (type === 'land' ? 'Not applicable' : 'Unfurnished'),
    status: specs.st ?? 'Ready',
    description: d,
    amenities: am,
    features: {
      facing: face,
      ownership: own ?? (isRent ? 'Leasehold, 12 month minimum' : 'Freehold'),
      utilities: UTILITIES[type],
    },
    images: buildImages(title, type, index),
    agentId: ag,
    agency: agent.agency,
    rating: agent.rating,
    reviewCount: 3 + ((n * 7) % 14),
    isFeatured: f,
    isVerified: true,
    isNew: date >= NEW_SINCE,
    createdAt: date,
  }
}
