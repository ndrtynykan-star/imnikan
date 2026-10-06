import { useEffect, useMemo, useState } from 'react'
import { Heart } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { PropertyFilters } from '@/components/property/PropertyFilters'
import { PropertyGrid } from '@/components/property/PropertyGrid'
import { PageHero } from '@/components/sections/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { PROPERTIES } from '@/data/properties'
import { PHOTO } from '@/lib/images'
import { EMPTY_FILTERS, filterProperties, searchParamsToFilters, type FilterState } from '@/lib/filters'
import { useUi } from '@/lib/store'

export default function Properties() {
  const [params, setParams] = useSearchParams()
  const { favorites } = useUi()

  const fromUrl = useMemo(() => searchParamsToFilters(params), [params])
  const [filters, setFilters] = useState<FilterState>(fromUrl)
  const [sort, setSort] = useState<string>('featured')

  // Keep local state in step with the URL (search overlay, footer links, cards).
  useEffect(() => {
    setFilters(fromUrl)
  }, [fromUrl])

  const savedOnly = params.get('view') === 'saved'

  const results = useMemo(() => {
    const source = savedOnly ? PROPERTIES.filter((p) => favorites.includes(p.id)) : PROPERTIES
    return filterProperties(source, filters, sort)
  }, [favorites, filters, savedOnly, sort])

  return (
    <>
      <PageHero
        eyebrow={savedOnly ? 'Saved Properties' : 'The Portfolio'}
        title={savedOnly ? 'Your Saved Properties.' : 'Properties Across Dubai.'}
        description={
          savedOnly
            ? 'The residences you have shortlisted. Saved on this device and ready to send your advisor.'
            : 'Twelve curated residences across Dubai’s prime freehold communities — filter by type, community, budget and configuration.'
        }
        imageId={PHOTO.heroSkyline}
        imageAlt="Dubai skyline at sunset"
      />

      <section className="bg-ink py-14 lg:py-20">
        <div className="shell">
          {savedOnly && favorites.length === 0 && (
            <div className="mb-10 flex items-center gap-3 border border-champagne/25 bg-champagne/[0.04] px-6 py-5">
              <Heart className="h-4 w-4 shrink-0 text-champagne" aria-hidden="true" />
              <p className="text-[13px] leading-relaxed text-cream/80">
                Nothing saved yet — tap the heart on any property card to shortlist it.
              </p>
            </div>
          )}

          <Reveal>
            <PropertyFilters
              value={filters}
              onChange={setFilters}
              sort={sort}
              onSortChange={setSort}
              resultCount={results.length}
            />
          </Reveal>

          <div className="mt-11">
            <PropertyGrid
              properties={results}
              variant="grid"
              emptyMessage={savedOnly ? 'No saved properties match those filters.' : undefined}
            />
          </div>

          {!savedOnly && (
            <p className="mt-12 text-center text-[11px] uppercase tracking-label text-muted">
              Looking for something specific?{' '}
              <button
                type="button"
                onClick={() => setParams(new URLSearchParams())}
                className="text-champagne underline-offset-4 hover:underline"
              >
                Reset the search
              </button>
            </p>
          )}
        </div>
      </section>
    </>
  )
}
