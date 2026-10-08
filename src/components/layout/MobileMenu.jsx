import { useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Phone, X } from 'lucide-react'
import Logo from '@/components/layout/Logo'
import { BRAND } from '@/constants/brand'
import { PRIMARY_NAV, SECONDARY_NAV } from '@/constants/navigation'
import { useDialog } from '@/hooks/useDialog'
import { drawerLeft, fade, stagger, reveal } from '@/lib/motion'
import { cn } from '@/utils/cn'

function MenuPanel({ onClose }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)

  useDialog({ open: true, onClose, containerRef: panelRef, initialFocusRef: closeRef })

  return (
    <motion.aside
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Main menu"
      variants={drawerLeft}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-y-0 left-0 z-60 flex w-[min(88vw,24rem)] flex-col bg-paper shadow-overlay"
    >
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
        <Logo />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="-mr-2 inline-flex size-10 items-center justify-center rounded-control transition-colors hover:bg-canvas"
        >
          <X className="size-5" strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>

      <motion.div
        variants={stagger(0.04, 0.12)}
        initial="hidden"
        animate="visible"
        className="flex-1 overflow-y-auto overscroll-contain px-5 py-6"
      >
        <nav aria-label="Primary mobile">
          <ul>
            {PRIMARY_NAV.map(({ label, to }) => (
              <motion.li key={to} variants={reveal} className="border-b border-line">
                <NavLink
                  to={to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'flex h-14 items-center text-[1.375rem] font-medium tracking-[-0.015em]',
                      isActive ? 'text-brand' : 'text-ink',
                    )
                  }
                >
                  {label}
                </NavLink>
              </motion.li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Secondary mobile" className="mt-8">
          <ul className="space-y-1">
            {SECONDARY_NAV.map(({ label, to }) => (
              <motion.li key={to} variants={reveal}>
                <Link to={to} onClick={onClose} className="flex h-11 items-center text-body text-muted transition-colors hover:text-ink">
                  {label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
      </motion.div>

      <div className="shrink-0 border-t border-line bg-canvas px-5 py-5">
        <p className="text-label text-muted">Talk to our team</p>
        <a href={BRAND.phoneHref} className="mt-1 inline-flex items-center gap-2 text-[1.0625rem] font-semibold">
          <Phone className="size-4" aria-hidden="true" />
          {BRAND.phone}
        </a>
        <p className="mt-1 text-meta text-muted">{BRAND.hours}</p>
      </div>
    </motion.aside>
  )
}

export default function MobileMenu({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            variants={fade}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 z-50 bg-black/45"
          />
          <MenuPanel key="panel" onClose={onClose} />
        </>
      )}
    </AnimatePresence>
  )
}
