import { useEffect } from 'react'
import { ArrowRight, Instagram, Linkedin, X, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CONTACT, NAV_LINKS } from '@/data/content'

type Props = {
  open: boolean
  onClose: () => void
}

const SECONDARY_LINKS = [
  { label: 'Off-Plan Projects', to: '/properties?status=Off-Plan' },
  { label: 'For Rent', to: '/properties?status=For+Rent' },
  { label: 'Saved Properties', to: '/properties?view=saved' },
]

/** Full-screen editorial menu — used by the hamburger at every breakpoint. */
export function MenuOverlay({ open, onClose }: Props) {
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
        'fixed inset-0 z-[70] transition-opacity duration-500 ease-luxury',
        open ? 'opacity-100' : 'pointer-events-none opacity-0',
      ].join(' ')}
      aria-hidden={!open}
    >
      <div className="absolute inset-0 bg-ink" />
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            'radial-gradient(60% 60% at 80% 0%, rgba(216,180,119,0.9) 0%, transparent 70%)',
        }}
      />

      <div
        className={[
          'relative flex h-full flex-col transition-transform duration-500 ease-luxury',
          open ? 'translate-y-0' : '-translate-y-3',
        ].join(' ')}
      >
        <div className="shell flex h-20 shrink-0 items-center justify-between">
          <span className="text-[10px] uppercase tracking-label text-muted">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center text-cream transition-colors hover:text-champagne"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="shell flex-1 overflow-y-auto pb-14">
          <div className="grid gap-12 pt-6 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
            <nav aria-label="Menu">
              <ul className="space-y-1">
                {NAV_LINKS.map((link, index) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      onClick={onClose}
                      className="group flex items-baseline gap-5 py-2.5"
                      style={{ transitionDelay: `${index * 40}ms` }}
                    >
                      <span className="w-6 shrink-0 text-[10px] tabular-nums text-champagne/60">
                        0{index + 1}
                      </span>
                      <span className="font-display text-[2rem] leading-tight text-cream transition-colors duration-400 ease-luxury group-hover:text-champagne sm:text-[2.6rem]">
                        {link.label}
                      </span>
                      <ArrowRight
                        className="h-4 w-4 -translate-x-2 self-center text-champagne opacity-0 transition-all duration-400 ease-luxury group-hover:translate-x-0 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-10 border-t border-white/10 pt-6">
                <ul className="flex flex-wrap gap-x-7 gap-y-3">
                  {SECONDARY_LINKS.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        onClick={onClose}
                        className="text-[11px] uppercase tracking-label text-muted transition-colors hover:text-champagne"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <div className="flex flex-col justify-between gap-10 lg:border-l lg:border-white/10 lg:pl-14">
              <div className="space-y-6">
                <div>
                  <p className="eyebrow">Private Office</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{CONTACT.address}</p>
                </div>
                <div>
                  <p className="eyebrow">Speak With An Advisor</p>
                  <a
                    href={CONTACT.phoneHref}
                    className="mt-3 block font-display text-xl text-cream transition-colors hover:text-champagne"
                  >
                    {CONTACT.phone}
                  </a>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="mt-1 block text-sm text-muted transition-colors hover:text-champagne"
                  >
                    {CONTACT.email}
                  </a>
                </div>
                <div>
                  <p className="eyebrow">Hours</p>
                  <p className="mt-3 text-sm text-muted">{CONTACT.hours}</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                {[
                  { Icon: Instagram, label: 'Instagram' },
                  { Icon: Linkedin, label: 'LinkedIn' },
                  { Icon: Youtube, label: 'YouTube' },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center border border-white/15 text-cream/80 transition-colors duration-300 hover:border-champagne hover:text-champagne"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
