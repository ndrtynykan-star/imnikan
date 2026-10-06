import { useState } from 'react'
import type { FormEvent } from 'react'
import { ChevronDown, MapPin, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { CATEGORIES, LOCATIONS } from '@/data/content'
import { SEARCH_TABS, filtersToSearchParams, tabToFilters, type SearchTab } from '@/lib/filters'

const FIELD_LABEL = 'block text-[10px] font-medium uppercase tracking-label text-muted'
const FIELD_VALUE =
  'w-full appearance-none bg-transparent pr-8 text-[14px] font-medium text-ink focus:outline-none'

/** Hero search console: tabs, two fields and the circular search button. */
export function HeroSearch() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<SearchTab>('Buy')
  const [location, setLocation] = useState('')
  const [type, setType] = useState('')

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const params = filtersToSearchParams({
      type,
      location,
      price: '',
      bedrooms: '',
      status: '',
      ...tabToFilters(tab),
    })
    navigate(`/properties?${params.toString()}`)
  }

  return (
    <div className="bg-ivory shadow-panel">
      {/* Tabs */}
      <div role="tablist" aria-label="Search by listing type" className="flex flex-wrap gap-x-7 border-b border-ink/10 px-5 sm:px-8">
        {SEARCH_TABS.map((item) => {
          const active = item === tab
          return (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(item)}
              className={[
                'relative py-4 text-[11px] font-medium uppercase tracking-nav transition-colors duration-400 ease-luxury',
                active ? 'text-ink' : 'text-muted hover:text-ink',
              ].join(' ')}
            >
              {item}
              <span
                className={[
                  'absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gold transition-transform duration-400 ease-luxury',
                  active ? 'scale-x-100' : 'scale-x-0',
                ].join(' ')}
                aria-hidden="true"
              />
            </button>
          )
        })}
      </div>

      <form onSubmit={submit} className="grid gap-px sm:grid-cols-[1.2fr_1fr_auto]">
        <div className="relative px-5 py-5 sm:px-8">
          <label className={FIELD_LABEL} htmlFor="hero-location">
            Location
          </label>
          <div className="mt-2 flex items-center gap-2.5">
            <MapPin className="h-4 w-4 shrink-0 text-gold-deep" strokeWidth={1.6} aria-hidden="true" />
            <select
              id="hero-location"
              className={FIELD_VALUE}
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            >
              <option value="">Dubai, UAE</option>
              {LOCATIONS.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none -ml-6 h-4 w-4 text-muted" strokeWidth={1.5} aria-hidden="true" />
          </div>
        </div>

        <div className="relative border-ink/10 px-5 py-5 sm:border-l sm:px-8">
          <label className={FIELD_LABEL} htmlFor="hero-type">
            Property Type
          </label>
          <div className="mt-2 flex items-center gap-2.5">
            <select
              id="hero-type"
              className={FIELD_VALUE}
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              <option value="">Any</option>
              {CATEGORIES.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none -ml-6 h-4 w-4 text-muted" strokeWidth={1.5} aria-hidden="true" />
          </div>
        </div>

        <div className="flex items-center justify-end px-5 pb-5 sm:py-4 sm:pl-2 sm:pr-4">
          <button
            type="submit"
            aria-label="Search properties"
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy text-ivory transition-all duration-400 ease-luxury hover:bg-navy-dark hover:shadow-card"
          >
            <Search className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  )
}
