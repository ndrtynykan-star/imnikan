import { ArrowRight, Bath, BedDouble, Heart, MapPin, Maximize } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Property } from '@/data/properties'
import { formatAED, formatArea } from '@/lib/format'
import { SmartImage } from '@/components/ui/SmartImage'
import { useUi } from '@/lib/store'

type Props = {
  property: Property
  className?: string
  priority?: boolean
  sizes?: string
}

/** Editorial property card: gold status badge, specification row, price + arrow. */
export function PropertyCard({
  property,
  className = '',
  priority = false,
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
}: Props) {
  const { isFavorite, toggleFavorite } = useUi()
  const saved = isFavorite(property.id)

  return (
    <article
      className={[
        'group relative flex flex-col border border-ink/10 bg-warm transition-[transform,box-shadow,border-color] duration-400 ease-luxury',
        'hover:-translate-y-1.5 hover:border-gold/45 hover:shadow-card',
        className,
      ].join(' ')}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <SmartImage
          id={property.image}
          alt={`${property.title} — ${property.category} in ${property.location}, Dubai`}
          sizes={sizes}
          priority={priority}
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-luxury group-hover:scale-[1.06]"
        />

        <span className="absolute left-0 top-5 bg-gold px-3.5 py-1.5 text-[9.5px] font-semibold uppercase tracking-label text-navy">
          {property.status}
        </span>

        <button
          type="button"
          onClick={() => toggleFavorite(property.id)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${property.title} from saved` : `Save ${property.title}`}
          className={[
            'absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-400 ease-luxury',
            saved
              ? 'bg-gold text-navy'
              : 'bg-navy/35 text-ivory hover:bg-navy/60 hover:text-gold',
          ].join(' ')}
        >
          <Heart className={`h-4 w-4 ${saved ? 'fill-navy' : ''}`} strokeWidth={1.6} aria-hidden="true" />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-[1.3rem] leading-snug text-ink">
          <Link
            to={`/properties/${property.slug}`}
            className="transition-colors duration-400 ease-luxury hover:text-gold-deep"
          >
            {property.title}
          </Link>
        </h3>

        <p className="mt-2 flex items-center gap-1.5 text-[12px] text-muted">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-gold-deep" strokeWidth={1.6} aria-hidden="true" />
          {property.location}, Dubai
        </p>

        <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-ink/10 py-3.5 text-[11.5px] text-muted">
          {property.bedrooms > 0 && (
            <li className="flex items-center gap-1.5">
              <BedDouble className="h-3.5 w-3.5 text-gold-deep" strokeWidth={1.5} aria-hidden="true" />
              {property.bedrooms} Beds
            </li>
          )}
          <li className="flex items-center gap-1.5">
            <Bath className="h-3.5 w-3.5 text-gold-deep" strokeWidth={1.5} aria-hidden="true" />
            {property.bathrooms} Baths
          </li>
          <li className="flex items-center gap-1.5">
            <Maximize className="h-3.5 w-3.5 text-gold-deep" strokeWidth={1.5} aria-hidden="true" />
            {formatArea(property.area)}
          </li>
        </ul>

        <div className="mt-auto flex items-center justify-between gap-4 pt-5">
          <p className="font-display text-[1.02rem] text-ink">
            {property.status === 'For Rent' ? property.priceLabel : formatAED(property.price)}
          </p>
          <Link
            to={`/properties/${property.slug}`}
            aria-label={`View ${property.title}`}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-400 ease-luxury group-hover:border-gold group-hover:bg-gold group-hover:text-navy"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  )
}
