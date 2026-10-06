import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

type Props = {
  eyebrow?: string
  title: ReactNode
  description?: string
  /** Right-hand "View All" style link. */
  action?: { label: string; to: string }
  tone?: 'dark' | 'light'
  className?: string
}

/** Shared editorial heading block: eyebrow, serif title, optional action link. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  tone = 'dark',
  className = '',
}: Props) {
  const onDark = tone === 'light'
  const titleColor = onDark ? 'text-ivory' : 'text-ink'
  const descColor = onDark ? 'text-ivory/65' : 'text-muted'

  return (
    <div className={`flex flex-col gap-8 md:flex-row md:items-end md:justify-between ${className}`}>
      <div className="max-w-2xl">
        {eyebrow && <p className={`eyebrow ${onDark ? 'text-gold-soft' : ''}`}>{eyebrow}</p>}
        <h2 className={`display-lg mt-4 ${titleColor}`}>{title}</h2>
        {description && (
          <p className={`mt-5 max-w-xl text-[13.5px] leading-relaxed ${descColor}`}>{description}</p>
        )}
      </div>

      {action && (
        <Link
          to={action.to}
          className={`group inline-flex shrink-0 items-center gap-2 text-[10.5px] font-semibold uppercase tracking-label transition-colors duration-400 ease-luxury ${
            onDark ? 'text-ivory/80 hover:text-gold' : 'text-muted hover:text-ink'
          }`}
        >
          {action.label}
          <ArrowRight
            className="h-3.5 w-3.5 text-gold transition-transform duration-400 ease-luxury group-hover:translate-x-1"
            strokeWidth={1.6}
            aria-hidden="true"
          />
        </Link>
      )}
    </div>
  )
}
