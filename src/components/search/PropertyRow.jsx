import { Link } from 'react-router-dom'
import Img from '@/components/ui/Img'

export default function PropertyRow({ property, onNavigate }) {
  return (
    <Link
      to={`/properties/${property.slug}`}
      onClick={onNavigate}
      className="group flex items-center gap-4 rounded-control p-2 transition-colors hover:bg-canvas"
    >
      <Img src={property.images[0].src} alt="" className="size-14 shrink-0 rounded-control" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[0.9375rem] font-medium">{property.title}</span>
        <span className="block truncate text-meta text-muted">{property.location}</span>
      </span>
      <span className="shrink-0 text-meta font-semibold">{property.priceLabel}</span>
    </Link>
  )
}
