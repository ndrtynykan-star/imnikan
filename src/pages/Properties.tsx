import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PropertyFilters } from '@/components/property/PropertyFilters'
import { PropertyGrid } from '@/components/property/PropertyGrid'
import { PageHero } from '@/components/sections/PageHero'
import { ArrowButton } from '@/components/ui/ArrowButton'
import { Reveal } from '@/components/ui/Reveal'
import { PROPERTIES } from '@/data/properties'
import { PHOTO } from '@/lib/images'
import {
  EMPTY_FILTERS,
  filterProperties,
  filtersToSearchParams,
  searchParamsToFilters,
  type FilterState,
} from '@/lib/filters'

const PAGE_SIZE = 6

export default function Properties() {
  const [params, setParams] = useSearchParams()

  const fromUrl = useMemo(() => searchParamsToFilters(params), [params])
  const [filters, setFilters] = useState<FilterState>(fromUrl)
  const [sort, setSort] = useState('featured')
  const [visible, setVisible] = useState(PAGE_SIZE)

  // Keep local state in step with the URL (hero search, footer links).
  useEffect(() => {
    setFilters(fromUrl)
  }, [fromUrl])

  // Any filter change returns the grid to the first page.
  useEffect(() => {
    setVisible(PAGE_SIZE)
  }, [filters, sort])

  const results = useMemo(() => filterProperties(PROPERTIES, filters, sort), [filters, sort])
  const shown = results.slice(0, visible)

  const handleFilters = (next: FilterState) => {
    setFilters(next)
    setParams(filtersToSearchParams(next))
  }

  return (
    <>
      <PageHero
        eyebrow="The Portfolio"
        title="Properties Across Dubai."
        description="Curated residences across Dubai’s prime freehold communities — filter by community, configuration, budget and area."
        imageId={PHOTO.downtown}
        imageAlt="Downtown Dubai towers at golden hour"
      />

      <section className="bg-warm py-14 lg:py-20">
        <div className="shell">
          <Reveal>
            <PropertyFilters
              value={filters}
              onChange={handleFilters}
              sort={sort}
              onSortChange={setSort}
              resultCount={results.length}
            />
          </Reveal>

          <div className="mt-11">
            <PropertyGrid properties={shown} />
          </div>

          {shown.length < results.length && (
            <div className="mt-14 flex flex-col items-center gap-5">
              <p className="text-[11px] uppercase tracking-label text-muted">
                Showing {shown.length} of {results.length} properties
              </p>
              <ArrowButton
                variant="navy"
                size="lg"
                onClick={() => setVisible((current) => current + PAGE_SIZE)}
              >
                Load More
              </ArrowButton>
            </div>
          )}

          {results.length > 0 && shown.length >= results.length && results.length > PAGE_SIZE && (
            <p className="mt-14 text-center text-[11px] uppercase tracking-label text-muted">
              Showing all {results.length} properties
            </p>
          )}

          {results.length === 0 && (
            <div className="mt-10 flex justify-center">
              <ArrowButton variant="outline" onClick={() => handleFilters({ ...EMPTY_FILTERS })}>
                Reset Search
              </ArrowButton>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
