import type { Property } from '@/data/properties'
import { PROPERTIES, PROPERTY_STATUSES, PROPERTY_TYPES } from '@/data/properties'

export type FilterState = {
  type: string
  location: string
  price: string
  bedrooms: string
  status: string
}

export const EMPTY_FILTERS: FilterState = {
  type: '',
  location: '',
  price: '',
  bedrooms: '',
  status: '',
}

export const PRICE_RANGES = [
  { label: 'Any price', value: '' },
  { label: 'Under AED 2M', value: '0-2000000' },
  { label: 'AED 2M – 5M', value: '2000000-5000000' },
  { label: 'AED 5M – 10M', value: '5000000-10000000' },
  { label: 'AED 10M – 20M', value: '10000000-20000000' },
  { label: 'AED 20M+', value: '20000000-100000000' },
] as const

export const BEDROOM_OPTIONS = [
  { label: 'Any bedrooms', value: '' },
  { label: '1+', value: '1' },
  { label: '2+', value: '2' },
  { label: '3+', value: '3' },
  { label: '4+', value: '4' },
  { label: '5+', value: '5' },
] as const

export const SORT_OPTIONS = [
  { label: 'Featured first', value: 'featured' },
  { label: 'Price · high to low', value: 'price-desc' },
  { label: 'Price · low to high', value: 'price-asc' },
  { label: 'Largest first', value: 'area-desc' },
] as const

/** Derived from the portfolio so the filter never offers an empty result. */
export const LOCATION_OPTIONS: string[] = Array.from(
  new Set(PROPERTIES.map((property) => property.location)),
).sort()

export { PROPERTY_STATUSES, PROPERTY_TYPES }

export function filterProperties(
  properties: Property[],
  filters: FilterState,
  sort = 'featured',
): Property[] {
  const [min, max] = filters.price
    ? filters.price.split('-').map(Number)
    : [0, Number.MAX_SAFE_INTEGER]

  const result = properties.filter((property) => {
    if (filters.type && property.category !== filters.type) return false
    if (filters.location && property.location !== filters.location) return false
    if (filters.status && property.status !== filters.status) return false
    if (filters.bedrooms && property.bedrooms < Number(filters.bedrooms)) return false
    if (filters.price && (property.price < min || property.price > max)) return false
    return true
  })

  switch (sort) {
    case 'price-desc':
      return [...result].sort((a, b) => b.price - a.price)
    case 'price-asc':
      return [...result].sort((a, b) => a.price - b.price)
    case 'area-desc':
      return [...result].sort((a, b) => b.area - a.area)
    default:
      return [...result].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
  }
}

export function searchParamsToFilters(params: URLSearchParams): FilterState {
  const min = params.get('min')
  const max = params.get('max')

  let price = ''
  if (min || max) price = `${Number(min ?? 0)}-${Number(max ?? 100_000_000)}`

  return {
    type: params.get('type') ?? '',
    location: params.get('location') ?? '',
    price: params.get('price') ?? price,
    bedrooms: params.get('bedrooms') ?? '',
    status: params.get('status') ?? '',
  }
}
