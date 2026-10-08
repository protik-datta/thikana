import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PRIMARY_NAV } from '@/constants/navigation'
import { cn } from '@/utils/cn'

export default function NavLinks() {
  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {PRIMARY_NAV.map(({ label, to }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                cn(
                  'relative inline-flex h-10 items-center px-3.5 text-[0.9375rem] font-medium transition-colors duration-200',
                  isActive ? 'text-ink' : 'text-muted hover:text-ink',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-x-3.5 -bottom-px h-0.5 bg-brand"
                      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
