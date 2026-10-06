import { MapPin } from 'lucide-react'
import { ArrowButton } from '@/components/ui/ArrowButton'
import { PropertyCard } from '@/components/property/PropertyCard'
import { Reveal } from '@/components/ui/Reveal'
import { FEATURED_PROPERTIES } from '@/data/properties'

/** The ivory counterpart to the dark hero — the reference's strongest contrast beat. */
export function FeaturedProperties() {
  return (
    <section className="bg-cream py-20 text-graphite lg:py-28">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col gap-8 border-b border-graphite/10 pb-9 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow-dark">Featured Properties</p>
              <h2 className="display-lg mt-5 max-w-xl text-graphite">
                Premium Properties
                <br />
                In Dubai
              </h2>
            </div>

            <p className="flex items-center gap-2 text-[11px] uppercase tracking-label text-graphite/60">
              <MapPin className="h-4 w-4 text-gold" aria-hidden="true" />
              Dubai, UAE
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {FEATURED_PROPERTIES.map((property, index) => (
            <Reveal key={property.id} delay={index * 110}>
              <PropertyCard property={property} variant="featured" className="h-full" />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-14 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm leading-relaxed text-graphite/65">
              Every listing is inspected and priced against closed transaction data before it reaches
              you.
            </p>
            <ArrowButton to="/properties" variant="solid" size="lg">
              Browse All Properties
            </ArrowButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
