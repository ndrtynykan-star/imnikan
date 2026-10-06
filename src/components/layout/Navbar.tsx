import { Heart, Menu, Search } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { Logo } from '@/components/ui/Logo'
import { NAV_LINKS } from '@/data/content'
import { useScrolled } from '@/hooks/useScrolled'
import { useUi } from '@/lib/store'

type Props = {
  onOpenMenu: () => void
}

export function Navbar({ onOpenMenu }: Props) {
  const scrolled = useScrolled(30)
  const { setSearchOpen, favorites } = useUi()
  const { pathname } = useLocation()

  // Every route opens on a dark hero, so the bar can start transparent and
  // resolve into navy once the page moves.
  const solid = scrolled || pathname !== '/'

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ease-luxury',
        solid
          ? 'border-b border-white/10 bg-navy/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      ].join(' ')}
    >
      <div className="shell flex h-[76px] items-center justify-between gap-6 lg:h-20">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    [
                      'link-underline text-[11px] uppercase tracking-nav transition-colors duration-300',
                      isActive ? 'text-gold' : 'text-ivory/85 hover:text-gold',
                    ].join(' ')
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex h-11 w-11 items-center justify-center text-ivory/85 transition-colors duration-300 hover:text-gold"
            aria-label="Search properties"
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
          </button>

          <NavLink
            to="/favorites"
            className="relative hidden h-11 w-11 items-center justify-center text-ivory/85 transition-colors duration-300 hover:text-gold sm:flex"
            aria-label={`Saved properties (${favorites.length})`}
          >
            <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
            {favorites.length > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-semibold text-navy">
                {favorites.length}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/contact"
            className="ml-2 hidden items-center gap-2 rounded-full border border-transparent bg-gold px-5 py-2.5 text-[10.5px] font-medium uppercase tracking-label text-navy transition-all duration-400 ease-luxury hover:bg-gold-deep md:inline-flex"
          >
            Talk to an Expert
          </NavLink>

          <button
            type="button"
            onClick={onOpenMenu}
            className="flex h-11 w-11 items-center justify-center text-ivory/85 transition-colors duration-300 hover:text-gold lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-[19px] w-[19px]" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  )
}
