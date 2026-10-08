import { formatDate, formatPropertyId } from '@/utils/format'

export function getSpecRows(property) {
  const { id, transactionType, status, furnishing, features, address, createdAt } = property
  return [
    ['Property ID', formatPropertyId(id)],
    ['Listing', transactionType === 'sale' ? 'For sale' : 'For rent'],
    ['Status', status],
    furnishing !== 'Not applicable' && ['Furnishing', furnishing],
    ['Facing', features.facing],
    ['Ownership', features.ownership],
    ['Utilities', features.utilities],
    ['Address', address],
    ['Listed on', formatDate(createdAt)],
  ].filter(Boolean)
}

export default function PropertySpecs({ property }) {
  return (
    <dl className="border-t border-line">
      {getSpecRows(property).map(([label, value]) => (
        <div key={label} className="grid gap-1 border-b border-line py-3.5 sm:grid-cols-[11rem_1fr] sm:gap-6">
          <dt className="text-meta text-muted">{label}</dt>
          <dd className="text-body">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
