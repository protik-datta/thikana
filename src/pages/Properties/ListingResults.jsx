import { useState } from 'react'
import { SearchX } from 'lucide-react'
import EmptyState from '@/components/common/EmptyState'
import PropertyGrid from '@/components/property/PropertyGrid'
import Button from '@/components/ui/Button'

const PAGE_SIZE = 12

export default function ListingResults({ properties, onReset, hasFilters, browseTo }) {
  const [visible, setVisible] = useState(PAGE_SIZE)

  if (properties.length === 0) {
    return (
      <EmptyState
        icon={SearchX}
        title="No properties match these filters"
        message="Try widening the price range, removing an amenity, or searching a nearby area."
        actions={[
          hasFilters ? { label: 'Clear all filters', onClick: onReset, variant: 'brand' } : { label: 'Browse all properties', to: browseTo, variant: 'brand' },
        ]}
      />
    )
  }

  const shown = properties.slice(0, visible)
  const remaining = properties.length - shown.length

  return (
    <>
      <PropertyGrid properties={shown} columns="compact" />
      {remaining > 0 && (
        <div className="mt-14 flex flex-col items-center gap-2">
          <p className="text-meta text-muted">
            Showing {shown.length} of {properties.length}
          </p>
          <Button variant="secondary" size="lg" onClick={() => setVisible((count) => count + PAGE_SIZE)}>
            Show more properties
          </Button>
        </div>
      )}
    </>
  )
}
