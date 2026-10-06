import { Heart, Menu, Search } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { Logo } from '@/components/ui/Logo'
import { NAV_LINKS } from '@/data/content'
import { useScrolled } from '@/hooks/useScrolled'
import { useUi } from '@/lib/store'

type Props = {
  onOpenMenu: () => void
}

export function Navbar({ onOpenMenu }: Props) {
  const scrolled = useScrolled(40)
  const { setSearchOpen, favorites } = useUi()

  return (
    <header
      className={[
        'sticky top-0 z-50 -mb-20 h-20 transition-[background-color,backdrop-filter,border-color] duration-500 ease-luxury',
        scrolled
          ? 'border-b border-white/10 bg-ink/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-gradient-to-b from-ink/60 to-transparent',
      ].join(' ')}
    >
      <div className="shell flex h-20 items-center justify-between gap-6">
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
                      isActive ? 'text-champagne' : 'text-cream/85 hover:text-champagne',
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
            className="flex h-11 w-11 items-center justify-center text-cream/85 transition-colors duration-300 hover:text-champagne"
            aria-label="Search properties"
          >
            <Search className="h-[18px] w-[18px]" aria-hidden="true" />
          </button>

          <NavLink
            to="/properties?view=saved"
            className="relative flex h-11 w-11 items-center justify-center text-cream/85 transition-colors duration-300 hover:text-champagne"
            aria-label={`Saved properties (${favorites.length})`}
          >
            <Heart className="h-[18px] w-[18px]" aria-hidden="true" />
            {favorites.length > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-champagne px-1 text-[9px] font-semibold text-ink">
                {favorites.length}
              </span>
            )}
          </NavLink>

          <button
            type="button"
            onClick={onOpenMenu}
            className="flex h-11 w-11 items-center justify-center text-cream/85 transition-colors duration-300 hover:text-champagne"
            aria-label="Open menu"
          >
            <Menu className="h-[19px] w-[19px]" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  )
}
