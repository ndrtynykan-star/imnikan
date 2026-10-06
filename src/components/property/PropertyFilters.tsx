import type { ChangeEvent } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import {
  AREA_RANGES,
  BATHROOM_OPTIONS,
  BEDROOM_OPTIONS,
  EMPTY_FILTERS,
  LOCATION_OPTIONS,
  PRICE_RANGES,
  PROPERTY_CATEGORIES,
  SORT_OPTIONS,
  type FilterState,
} from '@/lib/filters'

type Props = {
  value: FilterState
  onChange: (next: FilterState) => void
  sort: string
  onSortChange: (value: string) => void
  resultCount: number
}

const FIELD =
  'mt-2 w-full appearance-none border border-ink/15 bg-warm px-4 py-3 text-[13px] text-ink transition-colors duration-300 hover:border-ink/30 focus:border-gold focus:outline-none'
const LABEL = 'block text-[10px] font-medium uppercase tracking-label text-muted'

const STATUS_TABS = [
  { label: 'All', value: '' },
  { label: 'Buy', value: 'For Sale' },
  { label: 'Rent', value: 'For Rent' },
  { label: 'Off-Plan', value: 'Off-Plan' },
] as const

export function PropertyFilters({ value, onChange, sort, onSortChange, resultCount }: Props) {
  const set = (key: keyof FilterState) => (event: ChangeEvent<HTMLSelectElement>) =>
    onChange({ ...value, [key]: event.target.value })

  const activeCount = Object.values(value).filter(Boolean).length

  return (
    <div className="border border-ink/10 bg-ivory p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-label text-gold-deep">
          <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
          Refine your search
        </p>
        <div className="flex flex-wrap items-center gap-5">
          <label className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-label text-muted">Sort By</span>
            <select
              className="appearance-none border-b border-ink/20 bg-transparent pb-1 pr-6 text-[12.5px] text-ink focus:border-gold focus:outline-none"
              value={sort}
              onChange={(event) => onSortChange(event.target.value)}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <p className="text-[11.5px] tabular-nums text-muted">
            <span className="font-medium text-ink">{resultCount}</span>{' '}
            {resultCount === 1 ? 'property' : 'properties'}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2.5">
        {STATUS_TABS.map((tab) => {
          const active = value.status === tab.value
          return (
            <button
              key={tab.label}
              type="button"
              onClick={() => onChange({ ...value, status: tab.value })}
              aria-pressed={active}
              className={[
                'rounded-full px-5 py-2.5 text-[10.5px] font-medium uppercase tracking-label transition-all duration-400 ease-luxury',
                active
                  ? 'bg-navy text-ivory'
                  : 'border border-ink/15 text-ink/70 hover:border-gold hover:text-gold-deep',
              ].join(' ')}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <div>
          <label className={LABEL} htmlFor="filter-location">
            Location
          </label>
          <select
            id="filter-location"
            className={FIELD}
            value={value.location}
            onChange={set('location')}
          >
            <option value="">Any location</option>
            {LOCATION_OPTIONS.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={LABEL} htmlFor="filter-type">
            Property Type
          </label>
          <select id="filter-type" className={FIELD} value={value.type} onChange={set('type')}>
            <option value="">Any type</option>
            {PROPERTY_CATEGORIES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={LABEL} htmlFor="filter-price">
            Price Range
          </label>
          <select id="filter-price" className={FIELD} value={value.price} onChange={set('price')}>
            {PRICE_RANGES.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={LABEL} htmlFor="filter-bedrooms">
            Bedrooms
          </label>
          <select id="filter-bedrooms" className={FIELD} value={value.bedrooms} onChange={set('bedrooms')}>
            {BEDROOM_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={LABEL} htmlFor="filter-bathrooms">
            Bathrooms
          </label>
          <select
            id="filter-bathrooms"
            className={FIELD}
            value={value.bathrooms}
            onChange={set('bathrooms')}
          >
            {BATHROOM_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={LABEL} htmlFor="filter-area">
            Area
          </label>
          <select id="filter-area" className={FIELD} value={value.area} onChange={set('area')}>
            {AREA_RANGES.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {activeCount > 0 && (
        <div className="mt-6 flex justify-end border-t border-ink/10 pt-5">
          <button
            type="button"
            onClick={() => onChange({ ...EMPTY_FILTERS })}
            className="flex items-center gap-2 text-[10.5px] uppercase tracking-label text-muted transition-colors hover:text-gold-deep"
          >
            <X className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
            Clear {activeCount} {activeCount === 1 ? 'filter' : 'filters'}
          </button>
        </div>
      )}
    </div>
  )
}
