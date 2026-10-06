import { Link, useParams } from 'react-router-dom'
import { Bath, BedDouble, Building2, Check, Heart, MapPin, Maximize, Share2 } from 'lucide-react'
import { ContactForm } from '@/components/contact/ContactForm'
import { AgentCard } from '@/components/property/AgentCard'
import { PropertyCard } from '@/components/property/PropertyCard'
import { PropertyGallery } from '@/components/property/PropertyGallery'
import { ArrowButton } from '@/components/ui/ArrowButton'
import { Reveal } from '@/components/ui/Reveal'
import { getPropertyBySlug, similarProperties } from '@/data/properties'
import { formatAED, formatArea } from '@/lib/format'
import { useUi } from '@/lib/store'

function NotFoundProperty() {
  return (
    <section className="bg-navy px-5 pb-24 pt-40 text-center lg:pt-48">
      <p className="eyebrow text-gold-soft">404</p>
      <h1 className="display-md mt-5 text-ivory">This residence is no longer listed.</h1>
      <p className="mx-auto mt-5 max-w-md text-[13.5px] text-ivory/65">
        The property may have been withdrawn or sold. Browse the current portfolio instead.
      </p>
      <div className="mt-9 flex justify-center">
        <ArrowButton to="/properties" variant="gold" pill>
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

  if (!property) return <NotFoundProperty />

  const saved = isFavorite(property.id)
  const similar = similarProperties(property)

  const facts = [
    { Icon: Building2, label: 'Property Type', value: property.category },
    { Icon: BedDouble, label: 'Bedrooms', value: property.bedrooms > 0 ? `${property.bedrooms}` : '—' },
    { Icon: Bath, label: 'Bathrooms', value: `${property.bathrooms}` },
    { Icon: Maximize, label: 'Area', value: formatArea(property.area) },
  ]

  return (
    <>
      <section className="bg-navy pb-12 pt-32 lg:pb-14 lg:pt-40">
        <div className="shell">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[10.5px] uppercase tracking-label text-ivory/50"
          >
            <Link to="/" className="transition-colors hover:text-gold">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link to="/properties" className="transition-colors hover:text-gold">
              Properties
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ivory/80">{property.location}</span>
          </nav>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow text-gold-soft">{property.status}</p>
              <h1 className="display-lg mt-4 max-w-2xl text-ivory">{property.title}</h1>
              <p className="mt-5 flex items-center gap-2 text-[13px] text-ivory/65">
                <MapPin className="h-4 w-4 text-gold" strokeWidth={1.6} aria-hidden="true" />
                {property.location}, Dubai, UAE
              </p>
            </div>

            <div className="shrink-0 lg:text-right">
              <p className="text-[10px] uppercase tracking-label text-ivory/50">Guide price</p>
              <p className="mt-3 font-display text-[1.9rem] leading-none text-gold-soft">
                {property.status === 'For Rent' ? property.priceLabel : formatAED(property.price)}
              </p>

              <div className="mt-6 flex items-center gap-3 lg:justify-end">
                <button
                  type="button"
                  onClick={() => toggleFavorite(property.id)}
                  aria-pressed={saved}
                  className={[
                    'inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[10.5px] uppercase tracking-label transition-all duration-400 ease-luxury',
                    saved
                      ? 'border-gold bg-gold text-navy'
                      : 'border-white/25 text-ivory/85 hover:border-gold hover:text-gold',
                  ].join(' ')}
                >
                  <Heart className={`h-3.5 w-3.5 ${saved ? 'fill-navy' : ''}`} strokeWidth={1.6} aria-hidden="true" />
                  {saved ? 'Saved' : 'Save'}
                </button>
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-ivory/85 transition-colors duration-400 ease-luxury hover:border-gold hover:text-gold"
                  aria-label="Share this property"
                >
                  <Share2 className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-warm pb-20 pt-12 lg:pt-14">
        <div className="shell">
          <Reveal>
            <PropertyGallery
              images={property.gallery}
              title={property.title}
              status={property.status}
            />
          </Reveal>

          <div className="mt-14 grid gap-14 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
            <div>
              <ul className="grid grid-cols-2 gap-px border border-ink/10 bg-ink/10 sm:grid-cols-4">
                {facts.map(({ Icon, label, value }) => (
                  <li key={label} className="bg-ivory px-5 py-6">
                    <Icon className="h-4 w-4 text-gold-deep" strokeWidth={1.4} aria-hidden="true" />
                    <p className="mt-4 text-[9.5px] uppercase tracking-label text-muted">{label}</p>
                    <p className="mt-1.5 text-[13.5px] text-ink">{value}</p>
                  </li>
                ))}
              </ul>

              <h2 className="display-md mt-14 text-ink">About This Residence</h2>
              <p className="mt-6 whitespace-pre-line text-[13.5px] leading-[1.9] text-muted">
                {property.description}
              </p>

              <h2 className="display-md mt-14 text-ink">Features &amp; Amenities</h2>
              <ul className="mt-7 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {property.amenities.map((amenity) => (
                  <li key={amenity} className="flex items-center gap-3 text-[13.5px] text-ink/80">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold-deep">
                      <Check className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
                    </span>
                    {amenity}
                  </li>
                ))}
              </ul>

              <h2 className="display-md mt-14 text-ink">Location</h2>
              <div className="relative mt-6 aspect-[16/9] overflow-hidden border border-ink/10 bg-ivory">
                <div
                  className="absolute inset-0 opacity-70"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(23,33,43,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(23,33,43,0.06) 1px, transparent 1px)',
                    backgroundSize: '46px 46px',
                  }}
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      'radial-gradient(45% 55% at 52% 48%, rgba(198,165,106,0.22) 0%, transparent 70%)',
                  }}
                  aria-hidden="true"
                />
                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                  <MapPin className="h-7 w-7 text-gold-deep" strokeWidth={1.3} aria-hidden="true" />
                  <span className="mt-3 whitespace-nowrap text-[10.5px] uppercase tracking-label text-ink/80">
                    {property.location}
                  </span>
                  <span className="mt-1 text-[10.5px] text-muted">25.2048° N, 55.2708° E</span>
                </div>
              </div>

              <h2 className="display-md mt-16 text-ink" id="enquire">
                Enquire About This Property
              </h2>
              <p className="mt-4 max-w-xl text-[13.5px] leading-relaxed text-muted">
                Reference <span className="text-gold-deep">{property.id.toUpperCase()}</span> when you
                get in touch, or send the brief below and a consultant will respond within one
                business day.
              </p>
              <div className="mt-9">
                <ContactForm />
              </div>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <AgentCard agent={property.agent} reference={property.id.toUpperCase()} />

              <dl className="mt-6 space-y-4 border border-ink/10 bg-ivory p-7 text-[12.5px]">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Reference</dt>
                  <dd className="text-ink">{property.id.toUpperCase()}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Status</dt>
                  <dd className="text-ink">{property.status}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Category</dt>
                  <dd className="text-right text-ink">{property.category}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Community</dt>
                  <dd className="text-right text-ink">{property.location}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20">
        <div className="shell">
          <p className="eyebrow">You May Also Like</p>
          <h2 className="display-md mt-4 text-ink">Similar Properties</h2>

          <div className="mt-11 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {similar.map((item, index) => (
              <Reveal key={item.id} delay={index * 90}>
                <PropertyCard property={item} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
