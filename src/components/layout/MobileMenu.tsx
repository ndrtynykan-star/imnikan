import { useEffect } from 'react'
import { ArrowRight, Facebook, Instagram, Linkedin, X, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BarsMark } from '@/components/ui/Logo'
import { CONTACT, NAV_LINKS } from '@/data/content'

type Props = {
  open: boolean
  onClose: () => void
}

const SOCIALS = [
  { Icon: Instagram, label: 'Instagram' },
  { Icon: Linkedin, label: 'LinkedIn' },
  { Icon: Youtube, label: 'YouTube' },
  { Icon: Facebook, label: 'Facebook' },
]

/** Full-screen navy menu — the mobile composition of the navigation. */
export function MobileMenu({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <div
      className={[
        'fixed inset-0 z-[70] bg-navy transition-opacity duration-500 ease-luxury lg:hidden',
        open ? 'opacity-100' : 'pointer-events-none opacity-0',
      ].join(' ')}
      aria-hidden={!open}
    >
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: 'radial-gradient(60% 55% at 85% 0%, rgba(198,165,106,1) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div
        className={[
          'relative flex h-full flex-col transition-transform duration-500 ease-luxury',
          open ? 'translate-y-0' : '-translate-y-4',
        ].join(' ')}
      >
        <div className="shell flex h-[76px] shrink-0 items-center justify-between">
          <Link to="/" onClick={onClose} className="flex items-center gap-3" aria-label="Dubai House — home">
            <BarsMark className="h-7 w-5 text-gold" />
            <span className="font-display text-[15px] tracking-[0.2em] text-ivory">DUBAI HOUSE</span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center text-ivory transition-colors hover:text-gold"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Menu" className="shell flex-1 overflow-y-auto pb-10 pt-6">
          <ul className="border-t border-white/10">
            {NAV_LINKS.map((link, index) => (
              <li key={link.to} className="border-b border-white/10">
                <Link
                  to={link.to}
                  onClick={onClose}
                  className="group flex items-center justify-between py-4"
                  style={{ transitionDelay: `${index * 40}ms` }}
                >
                  <span className="font-display text-[1.7rem] leading-tight text-ivory transition-colors duration-400 ease-luxury group-hover:text-gold">
                    {link.label}
                  </span>
                  <ArrowRight
                    className="h-4 w-4 text-gold transition-transform duration-400 ease-luxury group-hover:translate-x-1"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>

          <Link
            to="/favorites"
            onClick={onClose}
            className="mt-8 block text-[10.5px] uppercase tracking-label text-gold"
          >
            Saved Properties
          </Link>

          <div className="mt-8 space-y-4 border-t border-white/10 pt-7">
            <a href={CONTACT.phoneHref} className="block font-display text-xl text-ivory">
              {CONTACT.phone}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="block text-sm text-ivory/65">
              {CONTACT.email}
            </a>
            <p className="text-sm text-ivory/65">{CONTACT.address}</p>
          </div>

          <div className="mt-8 flex items-center gap-3">
            {SOCIALS.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-ivory/80 transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              </a>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}
