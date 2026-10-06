import type { ChangeEvent } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import {
  BEDROOM_OPTIONS,
  EMPTY_FILTERS,
  LOCATION_OPTIONS,
  PRICE_RANGES,
  PROPERTY_TYPES,
  SORT_OPTIONS,
  type FilterState,
} from '@/lib/filters'

type Props = {
  value: FilterState
  onChange: (next: FilterState) => void
  sort?: string
  onSortChange?: (value: string) => void
  resultCount: number
  /** Hides the status pills on the home page's compact discovery strip. */
  compact?: boolean
}

const FIELD =
  'w-full appearance-none border border-white/10 bg-ink px-4 py-3 text-[13px] text-cream transition-colors duration-300 hover:border-white/25 focus:border-champagne focus:outline-none'
const LABEL = 'block text-[10px] uppercase tracking-label text-muted'

const STATUSES = ['For Sale', 'For Rent', 'Off-Plan'] as const

export function PropertyFilters({
  value,
  onChange,
  sort = 'featured',
  onSortChange,
  resultCount,
  compact = false,
}: Props) {
  const set = (key: keyof FilterState) => (event: ChangeEvent<HTMLSelectElement>) =>
    onChange({ ...value, [key]: event.target.value })

  const activeCount = Object.values(value).filter(Boolean).length

  return (
    <div className="border border-white/[0.08] bg-ink-800/60 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="flex items-center gap-2 text-[10px] uppercase tracking-label text-champagne">
          <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
          Refine your search
        </p>
        <div className="flex items-center gap-5">
          {!compact && onSortChange && (
            <label className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-label text-muted">Sort</span>
              <select
                className="appearance-none border-b border-white/15 bg-transparent pb-1 pr-6 text-[12px] text-cream focus:border-champagne focus:outline-none"
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
          )}
          <p className="text-[11px] tabular-nums text-muted">
            <span className="text-cream">{resultCount}</span> {resultCount === 1 ? 'property' : 'properties'}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <div>
          <label className={LABEL} htmlFor="filter-type">
            Property Type
          </label>
          <select id="filter-type" className={`${FIELD} mt-2`} value={value.type} onChange={set('type')}>
            <option value="">Any type</option>
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={LABEL} htmlFor="filter-location">
            Location
          </label>
          <select
            id="filter-location"
            className={`${FIELD} mt-2`}
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
          <label className={LABEL} htmlFor="filter-price">
            Price Range
          </label>
          <select id="filter-price" className={`${FIELD} mt-2`} value={value.price} onChange={set('price')}>
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
          <select
            id="filter-bedrooms"
            className={`${FIELD} mt-2`}
            value={value.bedrooms}
            onChange={set('bedrooms')}
          >
            {BEDROOM_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={LABEL} htmlFor="filter-status">
            Status
          </label>
          <select id="filter-status" className={`${FIELD} mt-2`} value={value.status} onChange={set('status')}>
            <option value="">Any status</option>
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-5">
        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => onChange({ ...value, status: '' })}
            aria-pressed={value.status === ''}
            className={[
              'px-4 py-2 text-[10.5px] uppercase tracking-label transition-all duration-400 ease-luxury',
              value.status === ''
                ? 'bg-champagne text-ink'
                : 'border border-white/15 text-cream/80 hover:border-champagne hover:text-champagne',
            ].join(' ')}
          >
            All
          </button>
          {STATUSES.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => onChange({ ...value, status })}
              aria-pressed={value.status === status}
              className={[
                'px-4 py-2 text-[10.5px] uppercase tracking-label transition-all duration-400 ease-luxury',
                value.status === status
                  ? 'bg-champagne text-ink'
                  : 'border border-white/15 text-cream/80 hover:border-champagne hover:text-champagne',
              ].join(' ')}
            >
              {status}
            </button>
          ))}
        </div>

        {activeCount > 0 && (
          <button
            type="button"
            onClick={() => onChange({ ...EMPTY_FILTERS })}
            className="flex items-center gap-2 text-[10.5px] uppercase tracking-label text-muted transition-colors hover:text-champagne"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
            Clear {activeCount} {activeCount === 1 ? 'filter' : 'filters'}
          </button>
        )}
      </div>
    </div>
  )
}
