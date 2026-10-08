import { Bath, BedDouble, Building2, Calendar, Car, Layers, Maximize, Rows3 } from 'lucide-react'
import { PROPERTY_TYPE_LABELS, RESIDENTIAL_TYPES } from '@/constants/propertyTypes'
import { formatArea } from '@/utils/format'

export function getOverviewItems(property) {
  const { type, bedrooms, bathrooms, areaSqft, floor, totalFloors, parking, yearBuilt, status } = property
  const items = []

  if (RESIDENTIAL_TYPES.includes(type)) {
    items.push({ icon: BedDouble, label: 'Bedrooms', value: bedrooms === 0 ? 'Studio' : bedrooms })
  }
  if (bathrooms > 0) items.push({ icon: Bath, label: 'Bathrooms', value: bathrooms })
  items.push({ icon: Maximize, label: 'Area', value: formatArea(areaSqft) })
  if (floor > 0 && totalFloors > 0) items.push({ icon: Layers, label: 'Floor', value: `${floor} of ${totalFloors}` })
  if (floor === 0 && totalFloors > 0) items.push({ icon: Layers, label: 'Floor', value: 'Ground' })
  if (totalFloors > 0 && floor > 0) items.push({ icon: Rows3, label: 'Total floors', value: totalFloors })
  if (type !== 'land') items.push({ icon: Car, label: 'Parking', value: parking > 0 ? `${parking} ${parking === 1 ? 'space' : 'spaces'}` : 'None' })
  if (yearBuilt > 0) items.push({ icon: Calendar, label: status === 'Ready' ? 'Year built' : 'Expected', value: yearBuilt })
  items.push({ icon: Building2, label: 'Property type', value: PROPERTY_TYPE_LABELS[type] })
  return items
}

export default function PropertyOverview({ property }) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 lg:grid-cols-4">
      {getOverviewItems(property).map(({ icon: Icon, label, value }) => (
        <div key={label}>
          <dt className="flex items-center gap-2 text-meta text-muted">
            <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
            {label}
          </dt>
          <dd className="mt-1 text-[1.125rem] font-semibold">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
