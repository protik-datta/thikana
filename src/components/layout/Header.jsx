import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Heart, Menu, Search, User } from 'lucide-react'
import Logo from '@/components/layout/Logo'
import NavLinks from '@/components/layout/NavLinks'
import HeaderIconButton from '@/components/layout/HeaderIconButton'
import HeaderIconLink from '@/components/layout/HeaderIconLink'
import MobileMenu from '@/components/layout/MobileMenu'
import SearchOverlay from '@/components/search/SearchOverlay'
import { useScrolled } from '@/hooks/useScrolled'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useApp } from '@/context/AppContext'
import { cn } from '@/utils/cn'

export default function Header() {
  const { favorites } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const scrolled = useScrolled()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const { pathname } = useLocation()

  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const closeSearch = useCallback(() => setSearchOpen(false), [])

  useEffect(() => {
    closeMenu()
    closeSearch()
  }, [pathname, closeMenu, closeSearch])

  useEffect(() => {
    if (isDesktop) closeMenu()
  }, [isDesktop, closeMenu])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b bg-paper/95 transition-[border-color,box-shadow] duration-300',
        scrolled ? 'border-line shadow-[0_1px_0_rgb(17_17_16/0.02),0_6px_20px_rgb(17_17_16/0.05)]' : 'border-transparent',
      )}
    >
      <div className="mx-auto grid h-16 w-full max-w-[1280px] grid-cols-[1fr_auto_1fr] items-center px-3 sm:px-6 lg:flex lg:px-10">
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
            className="inline-flex size-10 items-center justify-center rounded-control transition-colors hover:bg-canvas"
          >
            <Menu className="size-5" strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>

        <Logo className="justify-self-center lg:mr-8 lg:justify-self-auto" />

        <NavLinks />

        <div className="flex items-center justify-end gap-0.5 lg:ml-auto">
          <HeaderIconButton
            label="Search properties"
            icon={Search}
            onClick={() => setSearchOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={searchOpen}
          />
          <HeaderIconLink to="/favorites" label="Saved properties" icon={Heart} badge={favorites.length} />
          <Link
            to="/account"
            className="ml-1 hidden h-10 items-center gap-2 rounded-control border border-line-strong px-3.5 text-[0.9375rem] font-medium transition-colors duration-200 hover:border-ink lg:inline-flex"
          >
            <User className="size-4" strokeWidth={1.75} aria-hidden="true" />
            Account
          </Link>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
      <SearchOverlay open={searchOpen} onClose={closeSearch} />
    </header>
  )
}
