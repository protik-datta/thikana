import { useId } from 'react'

export default function FilterSection({ title, children }) {
  const id = useId()

  return (
    <div role="group" aria-labelledby={id} className="border-t border-line py-5 first:border-t-0 first:pt-0">
      <h3 id={id} className="mb-3 text-[0.9375rem] font-semibold">
        {title}
      </h3>
      {children}
    </div>
  )
}
