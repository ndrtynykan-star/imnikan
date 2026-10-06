import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Bath,
  BedDouble,
  Building2,
  Check,
  Heart,
  Mail,
  MapPin,
  Maximize,
  Phone,
  Share2,
} from 'lucide-react'
import { ArrowButton } from '@/components/ui/ArrowButton'
import { ContactForm } from '@/components/contact/ContactForm'
import { PropertyCard } from '@/components/property/PropertyCard'
import { Reveal } from '@/components/ui/Reveal'
import { SmartImage } from '@/components/ui/SmartImage'
import { formatAED, formatArea } from '@/lib/format'
import { getPropertyBySlug, similarProperties } from '@/data/properties'
import { useUi } from '@/lib/store'
import { useReveal } from '@/hooks/useReveal'

function NotFoundProperty() {
  return (
    <section className="bg-ink px-5 pb-24 pt-40 text-center lg:pt-48">
      <p className="eyebrow">404</p>
      <h1 className="display-md mt-5 text-cream">This residence is no longer listed.</h1>
      <p className="mx-auto mt-5 max-w-md text-sm text-muted">
        The property may have been withdrawn or sold. Browse the current portfolio instead.
      </p>
      <div className="mt-9 flex justify-center">
        <ArrowButton to="/properties" variant="gold">
          Back to Properties
        </ArrowButton>
      </div>
    </section>
  )
}

export default function PropertyDetail() {
  const { slug } = useParams<{ slug: string }>()
  const property = slug ? getPropertyBySlug(slug) : undefined
  const { isFavorite, toggleFavorite } = useUi()
  const [activeImage, setActiveImage] = useState(0)
  const { ref: bodyRef, visible } = useReveal<HTMLDivElement>()

  useEffect(() => {
    setActiveImage(0)
  }, [slug])

  if (!property) return <NotFoundProperty />

  const saved = isFavorite(property.id)
  const similar = similarProperties(property)

  const facts = [
    { Icon: Building2, label: 'Type', value: property.category },
    { Icon: BedDouble, label: 'Bedrooms', value: `${property.bedrooms}` },
    { Icon: Bath, label: 'Bathrooms', value: `${property.bathrooms}` },
    { Icon: Maximize, label: 'Area', value: formatArea(property.area) },
  ]

  return (
    <>
      <div className="shell pt-32 lg:pt-36">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-label text-muted">
          <Link to="/" className="transition-colors hover:text-champagne">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link to="/properties" className="transition-colors hover:text-champagne">
            Properties
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-cream/80">{property.location}</span>
        </nav>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">{property.status}</p>
            <h1 className="display-lg mt-5 max-w-2xl text-cream">{property.title}</h1>
            <p className="mt-5 flex items-center gap-2 text-sm text-muted">
              <MapPin className="h-4 w-4 text-champagne" aria-hidden="true" />
              {property.location}, Dubai, UAE
            </p>
          </div>

          <div className="shrink-0 lg:text-right">
            <p className="text-[10px] uppercase tracking-label text-muted">Guide price</p>
            <p className="mt-3 font-display text-[1.9rem] leading-none text-champagne">
              {property.status === 'For Rent' ? property.priceLabel : formatAED(property.price)}
            </p>
            {property.status === 'For Sale' && (
              <p className="mt-2 text-[12px] text-muted">{property.priceLabel}</p>
            )}

            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => toggleFavorite(property.id)}
                aria-pressed={saved}
                className={[
                  'inline-flex items-center gap-2 border px-4 py-3 text-[10.5px] uppercase tracking-label transition-all duration-400 ease-luxury',
                  saved
                    ? 'border-champagne bg-champagne/15 text-champagne'
                    : 'border-white/20 text-cream/85 hover:border-champagne hover:text-champagne',
                ].join(' ')}
              >
                <Heart className={`h-3.5 w-3.5 ${saved ? 'fill-champagne' : ''}`} aria-hidden="true" />
                {saved ? 'Saved' : 'Save'}
              </button>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center border border-white/20 text-cream/85 transition-colors duration-400 ease-luxury hover:border-champagne hover:text-champagne"
                aria-label="Share this property"
              >
                <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="shell mt-10 lg:mt-14">
        <Reveal>
          <div className="relative aspect-[16/10] overflow-hidden border border-white/[0.08] lg:aspect-[16/9]">
            <SmartImage
              id={property.gallery[activeImage]}
              alt={`${property.title}, ${property.location} — view ${activeImage + 1}`}
              sizes="(min-width: 1024px) 70vw, 100vw"
              priority
              className="h-full w-full object-cover"
            />
            <span className="absolute left-5 top-5 bg-champagne px-3.5 py-2 text-[9.5px] font-semibold uppercase tracking-label text-ink">
              {property.status}
            </span>
          </div>
        </Reveal>

        <div className="mt-4 grid grid-cols-4 gap-3">
          {property.gallery.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveImage(index)}
              aria-label={`Show image ${index + 1}`}
              aria-pressed={index === activeImage}
              className={[
                'relative aspect-[4/3] overflow-hidden border transition-all duration-400 ease-luxury',
                index === activeImage
                  ? 'border-champagne opacity-100'
                  : 'border-white/10 opacity-60 hover:opacity-100',
              ].join(' ')}
            >
              <SmartImage
                id={image}
                alt=""
                sizes="25vw"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </section>

      <div ref={bodyRef} data-visible={visible} className="reveal shell mt-14 grid gap-14 pb-20 lg:mt-20 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
        <div>
          <ul className="grid grid-cols-2 gap-px border border-white/[0.08] sm:grid-cols-4">
            {facts.map(({ Icon, label, value }) => (
              <li key={label} className="bg-ink-800 px-5 py-6">
                <Icon className="h-4 w-4 text-champagne" strokeWidth={1.4} aria-hidden="true" />
                <p className="mt-4 text-[9.5px] uppercase tracking-label text-muted">{label}</p>
                <p className="mt-1.5 text-[13.5px] text-cream">{value}</p>
              </li>
            ))}
          </ul>

          <h2 className="display-md mt-14 text-cream">About this residence</h2>
          <p className="mt-6 whitespace-pre-line text-sm leading-[1.9] text-muted">
            {property.description}
          </p>

          <h2 className="display-md mt-14 text-cream">Amenities</h2>
          <ul className="mt-6 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
            {property.amenities.map((amenity) => (
              <li key={amenity} className="flex items-center gap-3 text-[13.5px] text-cream/80">
                <Check className="h-3.5 w-3.5 shrink-0 text-champagne" aria-hidden="true" />
                {amenity}
              </li>
            ))}
          </ul>

          <h2 className="display-md mt-14 text-cream">Location</h2>
          <div className="relative mt-6 aspect-[16/9] overflow-hidden border border-white/[0.08] bg-ink-800">
            <div
              className="absolute inset-0 opacity-[0.5]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(248,247,243,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(248,247,243,0.06) 1px, transparent 1px)',
                backgroundSize: '46px 46px',
              }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'radial-gradient(45% 55% at 52% 48%, rgba(216,180,119,0.14) 0%, transparent 70%)',
              }}
              aria-hidden="true"
            />
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              <MapPin className="h-7 w-7 text-champagne" strokeWidth={1.3} aria-hidden="true" />
              <span className="mt-3 whitespace-nowrap text-[10.5px] uppercase tracking-label text-cream/85">
                {property.location}
              </span>
              <span className="mt-1 text-[10.5px] text-muted">25.2048° N, 55.2708° E</span>
            </div>
            <p className="absolute bottom-4 left-5 text-[10px] uppercase tracking-label text-muted/70">
              Interactive map available on request
            </p>
          </div>

          <h2 className="display-md mt-16 text-cream">Enquire about this property</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            Reference <span className="text-champagne">{property.id.toUpperCase()}</span> when you get
            in touch. Viewings can be arranged within 24 hours, including video walkthroughs.
          </p>
          <div className="mt-9">
            <ContactForm />
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="border border-white/[0.08] bg-ink-800 p-7">
            <p className="text-[10px] uppercase tracking-label text-champagne">Your advisor</p>

            <div className="mt-6 flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center border border-champagne/40 font-display text-lg text-champagne">
                {property.agent.name
                  .split(' ')
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join('')}
              </span>
              <div>
                <p className="font-display text-lg text-cream">{property.agent.name}</p>
                <p className="mt-1 text-[11px] uppercase tracking-label text-muted">
                  {property.agent.role}
                </p>
              </div>
            </div>

            <div className="mt-7 space-y-3 border-t border-white/[0.08] pt-6 text-[12.5px]">
              <a
                href={`tel:${property.agent.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-3 text-cream/85 transition-colors hover:text-champagne"
              >
                <Phone className="h-3.5 w-3.5 text-champagne" aria-hidden="true" />
                {property.agent.phone}
              </a>
              <a
                href={`mailto:${property.agent.email}`}
                className="flex items-center gap-3 text-cream/85 transition-colors hover:text-champagne"
              >
                <Mail className="h-3.5 w-3.5 text-champagne" aria-hidden="true" />
                {property.agent.email}
              </a>
            </div>

            <div className="mt-8 space-y-3">
              <ArrowButton href="#contact" variant="gold" className="w-full">
                Schedule A Viewing
              </ArrowButton>
              <ArrowButton
                href={`tel:${property.agent.phone.replace(/\s/g, '')}`}
                variant="outline"
                className="w-full"
              >
                Call The Advisor
              </ArrowButton>
            </div>
          </div>

          <dl className="mt-6 space-y-4 border border-white/[0.08] p-7 text-[12.5px]">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Reference</dt>
              <dd className="text-cream">{property.id.toUpperCase()}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Status</dt>
              <dd className="text-cream">{property.status}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Category</dt>
              <dd className="text-right text-cream">{property.category}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Community</dt>
              <dd className="text-right text-cream">{property.location}</dd>
            </div>
          </dl>
        </aside>
      </div>

      <section className="border-t border-white/[0.08] bg-ink-800 py-20">
        <div className="shell">
          <p className="eyebrow">You may also like</p>
          <h2 className="display-md mt-5 text-cream">Similar Properties</h2>

          <div className="mt-11 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((item, index) => (
              <Reveal key={item.id} delay={index * 90}>
                <PropertyCard property={item} variant="featured" className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
