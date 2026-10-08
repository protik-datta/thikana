import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import Button from '@/components/ui/Button'
import Segmented from '@/components/ui/Segmented'
import Select from '@/components/ui/Select'
import { TRANSACTIONS } from '@/constants/filters'
import { PROPERTY_TYPES } from '@/constants/propertyTypes'
import { BEDROOM_OPTIONS, PRICE_OPTIONS, SEARCH_LOCATIONS } from '@/constants/searchOptions'

const INITIAL = { location: '', type: '', price: '', bedrooms: '' }

export default function HeroSearch() {
  const navigate = useNavigate()
  const [transaction, setTransaction] = useState('sale')
  const [values, setValues] = useState(INITIAL)

  const update = (key) => (value) => setValues((current) => ({ ...current, [key]: value }))

  const changeTransaction = (value) => {
    setTransaction(value)
    setValues((current) => ({ ...current, price: '' }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const params = new URLSearchParams({ transaction })
    if (values.location) params.set('location', values.location)
    if (values.type) params.set('type', values.type)
    if (values.bedrooms) params.set('bedrooms', values.bedrooms)
    if (values.price) {
      const [min, max] = values.price.split('-')
      if (min) params.set('minPrice', min)
      if (max) params.set('maxPrice', max)
    }
    navigate(`/properties?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Search properties"
      className="rounded-surface border border-line bg-paper p-4 shadow-overlay sm:p-5"
    >
      <Segmented label="Listing type" options={TRANSACTIONS} value={transaction} onChange={changeTransaction} />

      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-[1.2fr_1fr_1fr_0.9fr_auto] lg:items-end">
        <Select
          label="Location"
          className="col-span-2 sm:col-span-1"
          value={values.location}
          onChange={update('location')}
          options={SEARCH_LOCATIONS}
          placeholder="All areas"
        />
        <Select
          label="Property type"
          value={values.type}
          onChange={update('type')}
          options={PROPERTY_TYPES.map(({ value, label }) => ({ value, label }))}
          placeholder="Any type"
        />
        <Select label="Price" value={values.price} onChange={update('price')} options={PRICE_OPTIONS[transaction]} placeholder="Any price" />
        <Select
          label="Bedrooms"
          className="col-span-2 sm:col-span-1"
          value={values.bedrooms}
          onChange={update('bedrooms')}
          options={BEDROOM_OPTIONS}
          placeholder="Any"
        />
        <Button type="submit" variant="brand" className="h-11 w-full col-span-2 lg:col-span-1 lg:w-auto">
          <Search className="size-4" aria-hidden="true" />
          Search properties
        </Button>
      </div>
    </form>
  )
}
