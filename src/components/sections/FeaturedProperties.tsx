import { PropertyCard } from '@/components/property/PropertyCard'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FEATURED_PROPERTIES } from '@/data/properties'

export function FeaturedProperties() {
  return (
    <section className="bg-ivory py-20 lg:py-28">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="Featured Properties"
            title="Featured Properties"
            description="Exclusive homes, exceptional opportunities — a selection from the current portfolio."
            action={{ label: 'View All', to: '/properties' }}
          />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {FEATURED_PROPERTIES.slice(0, 3).map((property, index) => (
            <Reveal key={property.id} delay={index * 90}>
              <PropertyCard property={property} className="h-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
