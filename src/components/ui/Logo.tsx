import { Link } from 'react-router-dom'

type Props = {
  /** `light` sits on the dark hero, `dark` on cream sections. */
  tone?: 'light' | 'dark'
  className?: string
}

function SkylineMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <path
        d="M20 2.5c1.9 3.4 2.6 7.4 2.6 11.4v23.6h-5.2V13.9c0-4 .7-8 2.6-11.4Z"
        fill="currentColor"
        opacity="0.95"
      />
      <path d="M11 15.2h4.6v22.3H11z" fill="currentColor" opacity="0.55" />
      <path d="M24.4 20.5H29v17H24.4z" fill="currentColor" opacity="0.55" />
      <path d="M4.2 26.4h4.4v11.1H4.2z" fill="currentColor" opacity="0.35" />
      <path d="M31.4 24h4.4v13.5h-4.4z" fill="currentColor" opacity="0.35" />
      <path d="M2 37.9h36v1.4H2z" fill="currentColor" opacity="0.8" />
    </svg>
  )
}

export function Logo({ tone = 'light', className = '' }: Props) {
  const primary = tone === 'light' ? 'text-cream' : 'text-graphite'
  const secondary = tone === 'light' ? 'text-muted' : 'text-graphite/60'
  const mark = tone === 'light' ? 'text-champagne' : 'text-gold'

  return (
    <Link
      to="/"
      className={`group flex items-center gap-3 ${className}`}
      aria-label="Dubai Elite Homes — home"
    >
      <SkylineMark
        className={`h-9 w-9 shrink-0 ${mark} transition-transform duration-500 ease-luxury group-hover:scale-105`}
      />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[15px] tracking-[0.13em] sm:text-[17px] ${primary}`}>
          DUBAI ELITE HOMES
        </span>
        <span className={`mt-1 text-[7.5px] uppercase tracking-[0.24em] sm:text-[8.5px] ${secondary}`}>
          Real Estate • Investment • Lifestyle
        </span>
      </span>
    </Link>
  )
}

export { SkylineMark }
