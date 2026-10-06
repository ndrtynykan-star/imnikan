import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CONTACT, FOOTER_COLUMNS } from '@/data/content'
import { Logo } from '@/components/ui/Logo'

const SOCIALS = [
  { Icon: Instagram, label: 'Instagram' },
  { Icon: Facebook, label: 'Facebook' },
  { Icon: Linkedin, label: 'LinkedIn' },
  { Icon: Youtube, label: 'YouTube' },
]

export function Footer() {
  return (
    <footer id="contact" className="border-t border-white/10 bg-ink">
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr] lg:gap-20">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              A private advisory for luxury residential acquisitions, disposals and investment across
              Dubai’s prime freehold communities.
            </p>
            <div className="mt-8 flex items-center gap-3">
              {SOCIALS.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center border border-white/10 text-cream/75 transition-colors duration-300 hover:border-champagne hover:text-champagne"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <h3 className="text-[10px] font-sans uppercase tracking-label text-champagne">
                  {column.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.label}`}>
                      <Link
                        to={link.to}
                        className="text-sm text-muted transition-colors duration-300 hover:text-cream"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="text-[10px] font-sans uppercase tracking-label text-champagne">Contact</h3>
              <ul className="mt-5 space-y-3 text-sm text-muted">
                <li>{CONTACT.city}</li>
                <li>
                  <a href={CONTACT.phoneHref} className="transition-colors hover:text-cream">
                    {CONTACT.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-cream">
                    {CONTACT.email}
                  </a>
                </li>
                <li className="text-muted/70">{CONTACT.hours}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">© 2026 Dubai Elite Homes. All Rights Reserved.</p>
          <ul className="flex flex-wrap items-center gap-6">
            <li>
              <a href="#" className="text-xs text-muted transition-colors hover:text-cream">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-xs text-muted transition-colors hover:text-cream">
                Terms &amp; Conditions
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
