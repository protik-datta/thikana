import Button from '@/components/ui/Button'

export default function EmptyState({ icon: Icon, title, message, actions = [] }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center py-16 text-center sm:py-24">
      {Icon && <Icon className="size-10 text-subtle" strokeWidth={1.25} aria-hidden="true" />}
      <h2 className="mt-5 text-[1.375rem] font-semibold tracking-[-0.015em]">{title}</h2>
      <p className="mt-2 text-body text-muted">{message}</p>
      {actions.length > 0 && (
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {actions.map(({ label, to, onClick, variant = 'secondary' }) => (
            <Button key={label} to={to} onClick={onClick} variant={variant}>
              {label}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
