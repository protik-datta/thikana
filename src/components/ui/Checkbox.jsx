import { Check } from 'lucide-react'
import { useId } from 'react'

export default function Checkbox({ label, checked, onChange }) {
  const id = useId()

  return (
    <div className="relative">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="peer absolute left-0 top-1/2 size-5 -translate-y-1/2 cursor-pointer appearance-none rounded-[4px] border border-line-strong bg-paper transition-colors checked:border-brand checked:bg-brand"
      />
      <Check
        className="pointer-events-none absolute left-[3px] top-1/2 size-3.5 -translate-y-1/2 text-paper opacity-0 peer-checked:opacity-100"
        strokeWidth={3}
        aria-hidden="true"
      />
      <label htmlFor={id} className="block cursor-pointer py-2 pl-8 text-[0.9375rem] leading-snug">
        {label}
      </label>
    </div>
  )
}
