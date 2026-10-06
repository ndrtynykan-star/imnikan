import type { Property } from '@/data/properties'
import { PropertyCard } from '@/components/property/PropertyCard'
import { Reveal } from '@/components/ui/Reveal'

type Props = {
  properties: Property[]
  emptyMessage?: string
}

/** Three columns on desktop, two on tablet, one on mobile. */
export function PropertyGrid({
  properties,
  emptyMessage = 'No properties match those filters yet.',
}: Props) {
  if (properties.length === 0) {
    return (
      <div className="border border-dashed border-ink/20 bg-warm px-8 py-20 text-center">
        <p className="font-display text-xl text-ink">{emptyMessage}</p>
        <p className="mt-3 text-[13px] text-muted">
          Try widening the price or area range, or clearing the community filter.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
      {properties.map((property, index) => (
        <Reveal key={property.id} delay={Math.min(index, 5) * 70}>
          <PropertyCard property={property} className="h-full" />
        </Reveal>
      ))}
    </div>
  )
}
