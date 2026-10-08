import { useState } from 'react'
import { BadgeCheck, Info } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useApp } from '@/context/AppContext'
import { usePageMeta } from '@/hooks/usePageMeta'
import { PROPERTIES } from '@/data/properties'

export default function AccountProfile() {
  usePageMeta({ title: 'Your account' })

  const { account, updateAccount, favorites } = useApp()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(account)
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const save = (e) => {
    e.preventDefault()
    updateAccount(form)
    setEditing(false)
  }

  const savedProps = PROPERTIES.filter((p) => favorites.includes(p.id))

  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-[1.5rem] font-semibold">Your profile</h1>
          {!editing && (
            <Button onClick={() => setEditing(true)} variant="secondary" size="sm">Edit</Button>
          )}
        </div>

        <div className="mt-4 rounded-surface border border-line-strong/50 bg-canvas px-4 py-3">
          <p className="flex items-start gap-2 text-meta text-muted">
            <Info className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
            This is a demo account. Changes are saved locally in your browser only.
          </p>
        </div>

        {editing ? (
          <form onSubmit={save} className="mt-6 space-y-4">
            <div>
              <label className="block text-label text-muted">Full name</label>
              <input value={form.name} onChange={set('name')} className="mt-1.5 h-11 w-full rounded-control border border-line-strong bg-paper px-3.5 text-[0.9375rem] transition-colors hover:border-ink focus-visible:border-brand focus-visible:outline-none" />
            </div>
            <div>
              <label className="block text-label text-muted">Email</label>
              <input type="email" value={form.email} onChange={set('email')} className="mt-1.5 h-11 w-full rounded-control border border-line-strong bg-paper px-3.5 text-[0.9375rem] transition-colors hover:border-ink focus-visible:border-brand focus-visible:outline-none" />
            </div>
            <div>
              <label className="block text-label text-muted">Phone</label>
              <input type="tel" value={form.phone} onChange={set('phone')} className="mt-1.5 h-11 w-full rounded-control border border-line-strong bg-paper px-3.5 text-[0.9375rem] transition-colors hover:border-ink focus-visible:border-brand focus-visible:outline-none" />
            </div>
            <div className="flex gap-3">
              <Button type="submit" variant="brand">Save changes</Button>
              <Button type="button" onClick={() => { setEditing(false); setForm(account) }} variant="secondary">Cancel</Button>
            </div>
          </form>
        ) : (
          <dl className="mt-6 space-y-4">
            {[
              { label: 'Full name', value: account.name },
              { label: 'Email', value: account.email },
              { label: 'Phone', value: account.phone },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5 border-b border-line pb-4">
                <dt className="text-label text-muted">{label}</dt>
                <dd className="text-[0.9375rem] font-medium">{value || '—'}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      {/* Stats */}
      <div className="border-t border-line pt-8">
        <h2 className="text-[1.125rem] font-semibold">Activity</h2>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {[
            { label: 'Saved', value: favorites.length, to: '/favorites' },
            { label: 'Inquiries', value: 0, to: '/account/inquiries' },
            { label: 'Viewings', value: 0, to: '/account/viewings' },
          ].map(({ label, value, to }) => (
            <a key={label} href={to} className="group rounded-surface border border-line p-4 text-center transition-colors hover:border-ink">
              <p className="text-[1.75rem] font-semibold tracking-tight">{value}</p>
              <p className="mt-1 text-meta text-muted">{label}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
