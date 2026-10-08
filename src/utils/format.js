export const formatArea = (sqft) => `${sqft.toLocaleString('en-US')} sq ft`

export const formatPropertyId = (id) => `TK-${id.replace('p-', '').padStart(4, '0')}`

export const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
