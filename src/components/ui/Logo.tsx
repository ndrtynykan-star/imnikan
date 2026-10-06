import { Link } from 'react-router-dom'

type Props = {
  /** `light` sits on dark navy / photography, `dark` on ivory sections. */
  tone?: 'light' | 'dark'
  className?: string
  showTagline?: boolean
}

/** Minimal architectural mark — three vertical bars rising like a skyline. */
export function BarsMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 26 30" className={className} aria-hidden="true" focusable="false">
      <rect x="1" y="12" width="3.4" height="18" fill="currentColor" opacity="0.6" />
      <rect x="7.2" y="5" width="3.4" height="25" fill="currentColor" />
      <rect x="13.4" y="9" width="3.4" height="21" fill="currentColor" opacity="0.8" />
      <rect x="19.6" y="1" width="3.4" height="29" fill="currentColor" />
    </svg>
  )
}

export function Logo({ tone = 'light', className = '', showTagline = true }: Props) {
  const primary = tone === 'light' ? 'text-ivory' : 'text-ink'
  const secondary = tone === 'light' ? 'text-ivory/55' : 'text-muted'
  const mark = tone === 'light' ? 'text-gold' : 'text-gold-deep'

  return (
    <Link
      to="/"
      className={`group flex items-center gap-3 ${className}`}
      aria-label="Dubai House — home"
    >
      <BarsMark className={`h-8 w-6 shrink-0 ${mark} transition-transform duration-500 ease-luxury group-hover:scale-y-105`} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[17px] tracking-[0.2em] sm:text-[19px] ${primary}`}
        >
          DUBAI HOUSE
        </span>
        {showTagline && (
          <span className={`mt-1.5 text-[7px] uppercase tracking-[0.28em] sm:text-[8px] ${secondary}`}>
            Properties for a Brighter Tomorrow
          </span>
        )}
      </span>
    </Link>
  )
}
