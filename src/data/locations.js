import { IMAGES, photo } from '@/data/images'

export const LOCATIONS = [
  {
    slug: 'gulshan',
    name: 'Gulshan',
    city: 'Dhaka',
    listingCount: 124,
    summary: 'Embassies, lakeside avenues and the city\u2019s busiest business address.',
    image: photo(IMAGES.towers[0], 1400),
  },
  {
    slug: 'banani',
    name: 'Banani',
    city: 'Dhaka',
    listingCount: 86,
    summary: 'Quiet residential lanes next to restaurants and offices.',
    image: photo(IMAGES.exteriors[2], 1000),
  },
  {
    slug: 'dhanmondi',
    name: 'Dhanmondi',
    city: 'Dhaka',
    listingCount: 97,
    summary: 'Established neighbourhood around the lake, close to schools.',
    image: photo(IMAGES.towers[1], 1000),
  },
  {
    slug: 'bashundhara-ra',
    name: 'Bashundhara R/A',
    city: 'Dhaka',
    listingCount: 143,
    summary: 'Planned blocks with wide roads and newer apartment buildings.',
    image: photo(IMAGES.towers[2], 1000),
  },
  {
    slug: 'uttara',
    name: 'Uttara',
    city: 'Dhaka',
    listingCount: 112,
    summary: 'Sector-based family living with metro access to the city.',
    image: photo(IMAGES.exteriors[4], 1000),
  },
  {
    slug: 'purbachal',
    name: 'Purbachal',
    city: 'Dhaka',
    listingCount: 58,
    summary: 'The new town on the eastern edge, with plots and new homes.',
    image: photo(IMAGES.land[0], 1400),
  },
]
