import { Check } from 'lucide-react'
import { AMENITY_ICONS } from '@/constants/amenities'

export default function AmenityList({ amenities }) {
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
      {amenities.map((name) => {
        const Icon = AMENITY_ICONS[name] ?? Check
        return (
          <li key={name} className="flex items-center gap-3 text-body">
            <Icon className="size-5 text-brand" strokeWidth={1.5} aria-hidden="true" />
            {name}
          </li>
        )
      })}
    </ul>
  )
}
