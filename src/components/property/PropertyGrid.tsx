import type { Property } from '@/data/properties'
import { PropertyCard } from '@/components/property/PropertyCard'
import { Reveal } from '@/components/ui/Reveal'

type Props = {
  properties: Property[]
  variant?: 'featured' | 'grid'
  columns?: 2 | 3
  emptyMessage?: string
}

export function PropertyGrid({
  properties,
  variant = 'grid',
  columns = 3,
  emptyMessage = 'No properties match those filters yet.',
}: Props) {
  if (properties.length === 0) {
    return (
      <div className="border border-dashed border-white/15 px-8 py-20 text-center">
        <p className="font-display text-xl text-cream">{emptyMessage}</p>
        <p className="mt-3 text-sm text-muted">
          Try widening the price range or clearing the status filter.
        </p>
      </div>
    )
  }

  return (
    <div
      className={[
        'grid gap-6 sm:gap-7',
        columns === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2',
      ].join(' ')}
    >
      {properties.map((property, index) => (
        <Reveal key={property.id} delay={Math.min(index, 5) * 80}>
          <PropertyCard property={property} variant={variant} className="h-full" />
        </Reveal>
      ))}
    </div>
  )
}
