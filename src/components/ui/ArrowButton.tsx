import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

type Variant = 'gold' | 'outline' | 'solid' | 'ghost'

const VARIANTS: Record<Variant, string> = {
  // Gold surfaces take ink text rather than white: white on #D8B477 fails
  // contrast, and dark-on-champagne reads more like an engraved plaque.
  gold: 'bg-champagne text-ink hover:bg-gold-soft border border-transparent',
  outline: 'border border-champagne/45 text-cream hover:border-champagne hover:bg-champagne/10',
  solid: 'bg-ink text-cream border border-ink hover:bg-ink-800',
  ghost: 'border border-transparent text-cream hover:text-champagne',
}

type Props = {
  children: ReactNode
  to?: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: Variant
  className?: string
  size?: 'md' | 'lg'
  ariaLabel?: string
}

const SIZES = {
  md: 'px-6 py-3 text-[11px]',
  lg: 'px-8 py-4 text-[11.5px]',
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
  className = '',
  ariaLabel,
}: Props) {
  const classes = [
    'group inline-flex items-center justify-center gap-3 uppercase tracking-label font-medium',
    'transition-all duration-400 ease-luxury',
    SIZES[size],
    VARIANTS[variant],
    className,
  ].join(' ')

  const inner = (
    <>
      <span>{children}</span>
      <ArrowRight
        className="h-3.5 w-3.5 shrink-0 transition-transform duration-400 ease-luxury group-hover:translate-x-1"
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
