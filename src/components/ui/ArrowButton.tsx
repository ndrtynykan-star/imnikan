import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

type Variant = 'gold' | 'navy' | 'outline' | 'outline-light'

const VARIANTS: Record<Variant, string> = {
  gold: 'bg-gold text-navy hover:bg-gold-deep border border-transparent',
  navy: 'bg-navy text-ivory hover:bg-navy-dark border border-transparent',
  outline: 'border border-ink/25 text-ink hover:border-ink hover:bg-ink/[0.04]',
  'outline-light': 'border border-ivory/35 text-ivory hover:border-gold hover:text-gold',
}

type Props = {
  children: ReactNode
  to?: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: Variant
  size?: 'md' | 'lg'
  /** Pill shape — reserved for the major CTAs, as in the reference. */
  pill?: boolean
  className?: string
  ariaLabel?: string
}

const SIZES = {
  md: 'px-6 py-3 text-[10.5px]',
  lg: 'px-7 py-3.5 text-[11px]',
}

/** The site's single CTA primitive — label, arrow, and the arrow nudge on hover. */
export function ArrowButton({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'gold',
  size = 'md',
  pill = false,
  className = '',
  ariaLabel,
}: Props) {
  const classes = [
    'group inline-flex items-center justify-center gap-2.5 rounded-xs uppercase tracking-label font-medium',
    'transition-all duration-400 ease-luxury',
    pill ? 'rounded-full' : '',
    SIZES[size],
    VARIANTS[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const inner = (
    <>
      <span>{children}</span>
      <ArrowRight
        className="h-3.5 w-3.5 shrink-0 transition-transform duration-400 ease-luxury group-hover:translate-x-1"
        strokeWidth={1.6}
        aria-hidden="true"
      />
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel}>
        {inner}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {inner}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel}>
      {inner}
    </button>
  )
}
