import { Bath, BedDouble, Heart, MapPin, Maximize } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Property } from '@/data/properties'
import { formatArea } from '@/lib/format'
import { SmartImage } from '@/components/ui/SmartImage'
import { useUi } from '@/lib/store'

type Props = {
  property: Property
  /** `featured` is the compact reference card; `grid` adds the specification row. */
  variant?: 'featured' | 'grid'
  className?: string
  priority?: boolean
}

export function PropertyCard({ property, variant = 'featured', className = '', priority = false }: Props) {
  const { isFavorite, toggleFavorite } = useUi()
  const saved = isFavorite(property.id)

  return (
    <article
      className={[
        'group relative flex flex-col border border-white/[0.08] bg-ink-800 transition-all duration-500 ease-luxury',
        'hover:-translate-y-1.5 hover:border-champagne/40 hover:shadow-lift',
        className,
      ].join(' ')}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <SmartImage
          id={property.image}
          alt={`${property.title} — ${property.category} in ${property.location}, Dubai`}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-luxury group-hover:scale-[1.06]"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-800 via-ink-800/25 to-transparent"
          aria-hidden="true"
        />

        <span className="absolute left-4 top-4 bg-champagne px-3 py-1.5 text-[9.5px] font-semibold uppercase tracking-label text-ink">
          {property.status}
        </span>

        <button
          type="button"
          onClick={() => toggleFavorite(property.id)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${property.title} from saved` : `Save ${property.title}`}
          className={[
            'absolute right-4 top-4 flex h-10 w-10 items-center justify-center border backdrop-blur-sm transition-all duration-400 ease-luxury',
            saved
              ? 'border-champagne bg-champagne/20 text-champagne'
              : 'border-white/25 bg-ink/40 text-cream/85 hover:border-champagne hover:text-champagne',
          ].join(' ')}
        >
          <Heart className={`h-4 w-4 ${saved ? 'fill-champagne' : ''}`} aria-hidden="true" />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-[1.35rem] leading-tight text-cream transition-colors duration-400 ease-luxury group-hover:text-champagne">
          {property.cardTitle ?? property.category}
        </h3>

        <p className="mt-2.5 flex items-center gap-1.5 text-xs text-muted">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-champagne" aria-hidden="true" />
          {property.location}
        </p>

        {variant === 'grid' && (
          <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-white/[0.08] py-4 text-[11px] text-muted">
            <li className="flex items-center gap-1.5">
              <BedDouble className="h-3.5 w-3.5 text-champagne/80" aria-hidden="true" />
              {property.bedrooms} Bed
            </li>
            <li className="flex items-center gap-1.5">
              <Bath className="h-3.5 w-3.5 text-champagne/80" aria-hidden="true" />
              {property.bathrooms} Bath
            </li>
            <li className="flex items-center gap-1.5">
              <Maximize className="h-3.5 w-3.5 text-champagne/80" aria-hidden="true" />
              {formatArea(property.area)}
            </li>
          </ul>
        )}

        <p className="mt-5 text-[13.5px] font-medium tracking-wide text-cream/95">
          {property.priceLabel}
        </p>

        <Link
          to={`/properties/${property.slug}`}
          className="mt-6 inline-flex items-center gap-2 border border-champagne/35 px-5 py-3 text-[10.5px] font-medium uppercase tracking-label text-cream transition-all duration-400 ease-luxury hover:border-champagne hover:bg-champagne/10 hover:text-champagne"
        >
          View Property
          <span
            className="transition-transform duration-400 ease-luxury group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
          <span className="sr-only">— {property.title}</span>
        </Link>
      </div>
    </article>
  )
}
