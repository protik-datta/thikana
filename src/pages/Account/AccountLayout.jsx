import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Building2, Calendar, ChevronRight, Heart, Settings, User } from 'lucide-react'
import Container from '@/components/ui/Container'
import Img from '@/components/ui/Img'
import { useApp } from '@/context/AppContext'

const NAV = [
  { to: '/account', label: 'Profile', icon: User, end: true },
  { to: '/account/inquiries', label: 'Inquiries', icon: Building2 },
  { to: '/account/viewings', label: 'Viewings', icon: Calendar },
  { to: '/favorites', label: 'Saved properties', icon: Heart },
]

export default function AccountLayout() {
  const { account } = useApp()

  return (
    <Container className="py-8 sm:py-12">
      <div className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
        <aside>
          <div className="flex items-center gap-4 pb-6 border-b border-line">
            <div className="flex size-12 items-center justify-center rounded-full bg-brand text-paper text-[1.125rem] font-semibold shrink-0">
              {account.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="font-semibold truncate">{account.name}</p>
              <p className="text-meta text-muted truncate">{account.email}</p>
            </div>
          </div>
          <nav aria-label="Account navigation" className="mt-4">
            <ul className="space-y-1">
              {NAV.map(({ to, label, icon: Icon, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-control px-3 py-2.5 text-[0.9375rem] font-medium transition-colors ${
                        isActive ? 'bg-canvas text-ink' : 'text-muted hover:bg-canvas hover:text-ink'
                      }`
                    }
                  >
                    <Icon className="size-4 shrink-0" aria-hidden="true" />
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main>
          <Outlet />
        </main>
      </div>
    </Container>
  )
}
