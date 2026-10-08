import { useId } from 'react'
import { ChevronDown } from 'lucide-react'

export default function Select({ label, value, onChange, options, placeholder, className, disabled = false }) {
  const id = useId()
  const groups = options.reduce((acc, option) => {
    const key = option.group ?? ''
    const existing = acc.find(([name]) => name === key)
    if (existing) existing[1].push(option)
    else acc.push([key, [option]])
    return acc
  }, [])

  const renderOption = (option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  )

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-label text-muted">
        {label}
      </label>
      <div className="relative mt-1.5">
        <select
          id={id}
          disabled={disabled}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-11 w-full appearance-none rounded-control border border-line-strong bg-paper pl-3.5 pr-10 text-[0.9375rem] text-ink transition-colors hover:border-ink focus-visible:border-brand focus-visible:outline-offset-0"
        >
          <option value="">{placeholder}</option>
          {groups.map(([group, items]) =>
            group ? (
              <optgroup key={group} label={group}>
                {items.map(renderOption)}
              </optgroup>
            ) : (
              items.map(renderOption)
            ),
          )}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
