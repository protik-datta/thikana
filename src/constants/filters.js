export const TRANSACTIONS = [
  { value: 'sale', label: 'Buy' },
  { value: 'rent', label: 'Rent' },
]

export const LOCATION_FILTERS = [
  { value: 'dhaka', label: 'All of Dhaka', group: 'Cities', city: 'Dhaka' },
  { value: 'chattogram', label: 'All of Chattogram', group: 'Cities', city: 'Chattogram' },
  { value: 'gulshan', label: 'Gulshan', group: 'Areas', areas: ['Gulshan 1', 'Gulshan 2'] },
  { value: 'gulshan-1', label: 'Gulshan 1', group: 'Areas', areas: ['Gulshan 1'] },
  { value: 'gulshan-2', label: 'Gulshan 2', group: 'Areas', areas: ['Gulshan 2'] },
  { value: 'banani', label: 'Banani', group: 'Areas', areas: ['Banani'] },
  { value: 'baridhara', label: 'Baridhara', group: 'Areas', areas: ['Baridhara'] },
  { value: 'bashundhara-ra', label: 'Bashundhara R/A', group: 'Areas', areas: ['Bashundhara R/A'] },
  { value: 'dhanmondi', label: 'Dhanmondi', group: 'Areas', areas: ['Dhanmondi'] },
  { value: 'uttara', label: 'Uttara', group: 'Areas', areas: ['Uttara'] },
  { value: 'mirpur', label: 'Mirpur', group: 'Areas', areas: ['Mirpur'] },
  { value: 'mohammadpur', label: 'Mohammadpur', group: 'Areas', areas: ['Mohammadpur'] },
  { value: 'badda', label: 'Badda', group: 'Areas', areas: ['Badda'] },
  { value: 'purbachal', label: 'Purbachal', group: 'Areas', areas: ['Purbachal'] },
  { value: 'khulshi', label: 'Khulshi', group: 'Areas', areas: ['Khulshi'] },
  { value: 'gec-circle', label: 'GEC Circle', group: 'Areas', areas: ['GEC Circle'] },
  { value: 'nasirabad', label: 'Nasirabad', group: 'Areas', areas: ['Nasirabad'] },
]

export const BEDROOM_FILTERS = [
  { value: 'studio', label: 'Studio' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5+' },
]

export const BATHROOM_FILTERS = [
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
]

export const AMENITY_FILTERS = [
  'Parking',
  'Balcony',
  'Lift',
  'Generator',
  'Security',
  'Gym',
  'Swimming Pool',
  'Rooftop',
  'Furnished',
]

export const STATUS_FILTERS = ['Ready', 'Under Construction', 'Upcoming']

export const PRICE_STEPS = {
  sale: [2000000, 3000000, 5000000, 7500000, 10000000, 15000000, 20000000, 30000000, 50000000, 100000000],
  rent: [15000, 20000, 25000, 30000, 40000, 50000, 75000, 100000, 150000, 250000],
}

export const AREA_STEPS = [500, 750, 1000, 1500, 2000, 3000, 5000]

export const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'largest', label: 'Largest' },
  { value: 'popular', label: 'Most popular' },
]

export const DEFAULT_SORT = 'recommended'
