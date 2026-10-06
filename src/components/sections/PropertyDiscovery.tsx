import { useMemo, useState } from 'react'
import { PropertyFilters } from '@/components/property/PropertyFilters'
import { PropertyGrid } from '@/components/property/PropertyGrid'
import { Reveal } from '@/components/ui/Reveal'
import { PROPERTIES } from '@/data/properties'
import { EMPTY_FILTERS, filterProperties, type FilterState } from '@/lib/filters'

/** Live filtering over the portfolio — the "working platform" section. */
export function PropertyDiscovery() {
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS)

  const results = useMemo(() => filterProperties(PROPERTIES, filters).slice(0, 6), [filters])

  return (
    <section className="bg-ink py-20 lg:py-28">
      <div className="shell">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">The Portfolio</p>
            <h2 className="display-lg mt-5 text-cream">
              Discover Properties
              <br />
              Across Dubai.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              Filter by type, community, budget and configuration — the collection updates as you
              refine it.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-11">
          <PropertyFilters value={filters} onChange={setFilters} resultCount={results.length} compact />
        </Reveal>

        <div className="mt-11">
          <PropertyGrid
            properties={results}
            variant="grid"
            emptyMessage="No properties match those filters yet."
          />
        </div>
      </div>
    </section>
  )
}
