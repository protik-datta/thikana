import { Briefcase, Building2, House, LandPlot, Landmark, ShoppingBag, Store } from 'lucide-react'

export const PROPERTY_TYPES = [
  { value: 'apartment', label: 'Apartments', note: 'Flats in Dhaka and Chattogram, new and resale', icon: Building2 },
  { value: 'house', label: 'Houses', note: 'Standalone family homes with their own plot', icon: House },
  { value: 'villa', label: 'Villas', note: 'Larger detached homes with gardens', icon: Landmark },
  { value: 'land', label: 'Land', note: 'Residential plots with verified papers', icon: LandPlot },
  { value: 'office', label: 'Office', note: 'Floors and suites for growing teams', icon: Briefcase },
  { value: 'commercial', label: 'Commercial', note: 'Buildings, showrooms and warehouses', icon: Store },
  { value: 'retail', label: 'Retail', note: 'Shopfronts on busy roads', icon: ShoppingBag },
]

export const PROPERTY_TYPE_LABELS = Object.fromEntries(
  PROPERTY_TYPES.map(({ value, label }) => [value, label.replace(/s$/, '')]),
)

export const RESIDENTIAL_TYPES = ['apartment', 'house', 'villa']
