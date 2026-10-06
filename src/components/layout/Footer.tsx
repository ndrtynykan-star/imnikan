import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Logo } from '@/components/ui/Logo'
import { Newsletter } from '@/components/layout/Newsletter'
import { BRAND, CONTACT, FOOTER_COLUMNS } from '@/data/content'

const SOCIALS = [
  { Icon: Instagram, label: 'Instagram' },
  { Icon: Linkedin, label: 'LinkedIn' },
  { Icon: Youtube, label: 'YouTube' },
  { Icon: Facebook, label: 'Facebook' },
]

export function Footer() {
  return (
    <footer className="bg-navy text-ivory">
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_2.1fr] lg:gap-16">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm font-display text-[1.05rem] italic leading-relaxed text-gold-soft">
              {BRAND.tagline}
            </p>
            <p className="mt-5 max-w-sm text-[13px] leading-relaxed text-ivory/60">
              {BRAND.description}
            </p>

            <div className="mt-8 flex items-center gap-3">
              {SOCIALS.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-ivory/75 transition-colors duration-300 hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {FOOTER_COLUMNS.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h3 className="text-[10px] uppercase tracking-label text-gold">{column.title}</h3>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.label}`}>
                      <Link
                        to={link.to}
                        className="text-[13px] text-ivory/65 transition-colors duration-300 hover:text-gold"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <Newsletter />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11.5px] text-ivory/50">© 2026 Dubai House. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-6">
            <li>
              <a href="#" className="text-[11.5px] text-ivory/50 transition-colors hover:text-gold">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-[11.5px] text-ivory/50 transition-colors hover:text-gold">
                Terms &amp; Conditions
              </a>
            </li>
            <li>
              <a href={CONTACT.phoneHref} className="text-[11.5px] text-ivory/50 transition-colors hover:text-gold">
                {CONTACT.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
