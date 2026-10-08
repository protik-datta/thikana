import FilterSection from '@/components/property/filters/FilterSection'
import Checkbox from '@/components/ui/Checkbox'
import Chip from '@/components/ui/Chip'
import Segmented from '@/components/ui/Segmented'
import Select from '@/components/ui/Select'
import {
  AMENITY_FILTERS,
  AREA_STEPS,
  BATHROOM_FILTERS,
  BEDROOM_FILTERS,
  LOCATION_FILTERS,
  PRICE_STEPS,
  STATUS_FILTERS,
  TRANSACTIONS,
} from '@/constants/filters'
import { PROPERTY_TYPES } from '@/constants/propertyTypes'
import { formatPrice } from '@/utils/formatPrice'

const toggle = (list, item) => (list.includes(item) ? list.filter((entry) => entry !== item) : [...list, item])

function stepOptions(steps, current, format) {
  const values = current !== null && !steps.includes(current) ? [...steps, current].sort((a, b) => a - b) : steps
  return values.map((value) => ({ value: String(value), label: format(value) }))
}

function RangeSelects({ minValue, maxValue, steps, format, onChange, minKey, maxKey, disabled }) {
  const handle = (key) => (value) => onChange({ [key]: value === '' ? null : Number(value) })
  return (
    <div className="grid grid-cols-2 gap-3">
      <Select
        label="Min"
        value={minValue === null ? '' : String(minValue)}
        onChange={handle(minKey)}
        options={stepOptions(steps, minValue, format).filter((o) => maxValue === null || Number(o.value) <= maxValue)}
        placeholder="No min"
        disabled={disabled}
      />
      <Select
        label="Max"
        value={maxValue === null ? '' : String(maxValue)}
        onChange={handle(maxKey)}
        options={stepOptions(steps, maxValue, format).filter((o) => minValue === null || Number(o.value) >= minValue)}
        placeholder="No max"
        disabled={disabled}
      />
    </div>
  )
}

export default function FilterPanel({ filters, onChange, showTransaction }) {
  const { transaction } = filters
  const priceFormat = (value) => formatPrice(value, transaction)

  return (
    <div>
      {showTransaction && (
        <FilterSection title="Listing type">
          <Segmented
            label="Listing type"
            options={TRANSACTIONS}
            value={transaction}
            onChange={(value) => onChange({ transaction: value })}
            allowEmpty
            className="w-full"
          />
        </FilterSection>
      )}

      <FilterSection title="Property type">
        <div className="grid grid-cols-2 gap-x-3">
          {PROPERTY_TYPES.map(({ value, label }) => (
            <Checkbox
              key={value}
              label={label}
              checked={filters.types.includes(value)}
              onChange={() => onChange({ types: toggle(filters.types, value) })}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Location">
        <Select
          label="City, area or neighbourhood"
          value={filters.location}
          onChange={(value) => onChange({ location: value })}
          options={LOCATION_FILTERS}
          placeholder="All locations"
        />
      </FilterSection>

      <FilterSection title="Price">
        {transaction ? (
          <RangeSelects
            minKey="minPrice"
            maxKey="maxPrice"
            minValue={filters.minPrice}
            maxValue={filters.maxPrice}
            steps={PRICE_STEPS[transaction]}
            format={priceFormat}
            onChange={onChange}
          />
        ) : (
          <p className="text-meta text-muted">Choose Buy or Rent to filter by price.</p>
        )}
      </FilterSection>

      <FilterSection title="Bedrooms">
        <div className="flex flex-wrap gap-2">
          {BEDROOM_FILTERS.map(({ value, label }) => (
            <Chip key={value} selected={filters.bedrooms === value} onClick={() => onChange({ bedrooms: filters.bedrooms === value ? '' : value })}>
              {label}
            </Chip>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Bathrooms">
        <div className="flex flex-wrap gap-2">
          {BATHROOM_FILTERS.map(({ value, label }) => (
            <Chip key={value} selected={filters.bathrooms === value} onClick={() => onChange({ bathrooms: filters.bathrooms === value ? '' : value })}>
              {label}
            </Chip>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Area (sq ft)">
        <RangeSelects
          minKey="minArea"
          maxKey="maxArea"
          minValue={filters.minArea}
          maxValue={filters.maxArea}
          steps={AREA_STEPS}
          format={(value) => value.toLocaleString('en-US')}
          onChange={onChange}
        />
      </FilterSection>

      <FilterSection title="Amenities">
        <div className="grid grid-cols-2 gap-x-3">
          {AMENITY_FILTERS.map((item) => (
            <Checkbox
              key={item}
              label={item}
              checked={filters.amenities.includes(item)}
              onChange={() => onChange({ amenities: toggle(filters.amenities, item) })}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Status">
        {STATUS_FILTERS.map((item) => (
          <Checkbox
            key={item}
            label={item}
            checked={filters.status.includes(item)}
            onChange={() => onChange({ status: toggle(filters.status, item) })}
          />
        ))}
      </FilterSection>
    </div>
  )
}
