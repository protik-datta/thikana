import { Link } from 'react-router-dom'
import { ArrowRight, Bath, BedDouble, BadgeCheck, Camera, Layers, Maximize, MapPin } from 'lucide-react'
import Img from '@/components/ui/Img'
import FavoriteButton from '@/components/property/FavoriteButton'
import CompareButton from '@/components/property/CompareButton'
import { PROPERTY_TYPE_LABELS, RESIDENTIAL_TYPES } from '@/constants/propertyTypes'
import { formatArea } from '@/utils/format'

function Spec({ icon: Icon, children }) {
  return (
    <li className="flex items-center gap-1.5">
      <Icon className="size-4 text-muted" strokeWidth={1.75} aria-hidden="true" />
      {children}
    </li>
  )
}

export default function PropertyCard({ property }) {
  const { id, slug, title, type, transactionType, priceLabel, location, bedrooms, bathrooms, areaSqft, floor, totalFloors, parking, agency, isVerified, status, images } = property
  const isResidential = RESIDENTIAL_TYPES.includes(type)
  const showBathrooms = bathrooms > 0
  const listingLabel = status === 'Ready' ? (transactionType === 'sale' ? 'For sale' : 'For rent') : status

  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded-surface">
        <Img
          src={images[0].src}
          alt={images[0].alt}
          className="size-full transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 rounded-[4px] bg-paper px-2.5 py-1 text-label text-ink">{listingLabel}</span>
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-[4px] bg-ink/80 px-2 py-1 text-label text-paper">
          <Camera className="size-3.5" aria-hidden="true" />
          {images.length}
          <span className="sr-only">photos</span>
        </span>
        <div className="absolute right-2 top-2 flex flex-col gap-0.5">
          <FavoriteButton propertyId={id} size="sm" className="bg-paper/80 backdrop-blur-sm hover:bg-paper" />
          <CompareButton propertyId={id} className="size-8 bg-paper/80 backdrop-blur-sm hover:bg-paper" />
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-[1.375rem] font-semibold tracking-[-0.02em]">{priceLabel}</p>
          <p className="text-meta text-muted">{PROPERTY_TYPE_LABELS[type]}</p>
        </div>

        <h3 className="mt-1.5 text-[1.0625rem] font-medium leading-snug">
          <Link
            to={`/properties/${slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-offset-4"
          >
            {title}
          </Link>
        </h3>

        <p className="mt-1.5 flex items-center gap-1.5 text-meta text-muted">
          <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
          {location}
        </p>

        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-4 text-meta text-ink">
          {isResidential && <Spec icon={BedDouble}>{bedrooms === 0 ? 'Studio' : `${bedrooms} bed`}</Spec>}
          {showBathrooms && <Spec icon={Bath}>{bathrooms} bath</Spec>}
          <Spec icon={Maximize}>{formatArea(areaSqft)}</Spec>
          {totalFloors > 0 && floor > 0 && (
            <Spec icon={Layers}>
              Floor {floor} of {totalFloors}
            </Spec>
          )}
          {parking > 0 && <li className="text-muted">{parking} parking</li>}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4 text-meta">
          <p className="flex min-w-0 items-center gap-1.5 text-muted">
            {isVerified && <BadgeCheck className="size-4 shrink-0 text-brand" aria-label="Verified listing" />}
            <span className="truncate">{agency}</span>
          </p>
          <span className="inline-flex items-center gap-1 font-medium text-ink">
            View details
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  )
}
