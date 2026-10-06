import type { Property } from '@/data/properties'
import { PROPERTIES, PROPERTY_CATEGORIES, PROPERTY_STATUSES } from '@/data/properties'

export type FilterState = {
  type: string
  location: string
  price: string
  bedrooms: string
  bathrooms: string
  area: string
  status: string
}

export const EMPTY_FILTERS: FilterState = {
  type: '',
  location: '',
  price: '',
  bedrooms: '',
  bathrooms: '',
  area: '',
  status: '',
}

export const PRICE_RANGES = [
  { label: 'Any price', value: '' },
  { label: 'Under AED 2M', value: '0-2000000' },
  { label: 'AED 2M – 5M', value: '2000000-5000000' },
  { label: 'AED 5M – 10M', value: '5000000-10000000' },
  { label: 'AED 10M – 20M', value: '10000000-20000000' },
  { label: 'AED 20M+', value: '20000000-500000000' },
] as const

export const BEDROOM_OPTIONS = [
  { label: 'Any bedrooms', value: '' },
  { label: '1+', value: '1' },
  { label: '2+', value: '2' },
  { label: '3+', value: '3' },
  { label: '4+', value: '4' },
  { label: '5+', value: '5' },
] as const

export const BATHROOM_OPTIONS = [
  { label: 'Any bathrooms', value: '' },
  { label: '1+', value: '1' },
  { label: '2+', value: '2' },
  { label: '3+', value: '3' },
  { label: '4+', value: '4' },
  { label: '5+', value: '5' },
] as const

export const AREA_RANGES = [
  { label: 'Any area', value: '' },
  { label: 'Under 1,500 sqft', value: '0-1500' },
  { label: '1,500 – 3,000 sqft', value: '1500-3000' },
  { label: '3,000 – 6,000 sqft', value: '3000-6000' },
  { label: '6,000 sqft+', value: '6000-100000' },
] as const

export const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Newest', value: 'newest' },
  { label: 'Price Low to High', value: 'price-asc' },
  { label: 'Price High to Low', value: 'price-desc' },
] as const

/** Derived from the portfolio so the filter never offers an empty result. */
export const LOCATION_OPTIONS: string[] = Array.from(
  new Set(PROPERTIES.map((property) => property.location)),
).sort()

export { PROPERTY_CATEGORIES, PROPERTY_STATUSES }

/** Hero search tabs — a tab maps to a status, and Commercial to a category. */
export const SEARCH_TABS = ['Buy', 'Rent', 'Off-Plan', 'Commercial'] as const
export type SearchTab = (typeof SEARCH_TABS)[number]

export function tabToFilters(tab: SearchTab): Partial<FilterState> {
  switch (tab) {
    case 'Rent':
      return { status: 'For Rent' }
    case 'Off-Plan':
      return { status: 'Off-Plan' }
    case 'Commercial':
      return { type: 'Commercial', status: '' }
    default:
      return { status: 'For Sale' }
  }
}

function parseRange(value: string): [number, number] {
  if (!value) return [0, Number.MAX_SAFE_INTEGER]
  const [min, max] = value.split('-').map(Number)
  return [min, max]
}

export function filterProperties(
  properties: Property[],
  filters: FilterState,
  sort = 'featured',
): Property[] {
  const [minPrice, maxPrice] = parseRange(filters.price)
  const [minArea, maxArea] = parseRange(filters.area)

  const result = properties.filter((property) => {
    if (filters.type && property.category !== filters.type) return false
    if (filters.location && property.location !== filters.location) return false
    if (filters.status && property.status !== filters.status) return false
    if (filters.bedrooms && property.bedrooms < Number(filters.bedrooms)) return false
    if (filters.bathrooms && property.bathrooms < Number(filters.bathrooms)) return false
    if (filters.price && (property.price < minPrice || property.price > maxPrice)) return false
    if (filters.area && (property.area < minArea || property.area > maxArea)) return false
    return true
  })

  switch (sort) {
    case 'price-desc':
      return [...result].sort((a, b) => b.price - a.price)
    case 'price-asc':
      return [...result].sort((a, b) => a.price - b.price)
    case 'newest':
      return [...result].sort((a, b) => b.listed - a.listed)
    default:
      return [...result].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
  }
}

export function searchParamsToFilters(params: URLSearchParams): FilterState {
  return {
    type: params.get('type') ?? '',
    location: params.get('location') ?? '',
    price: params.get('price') ?? '',
    bedrooms: params.get('bedrooms') ?? '',
    bathrooms: params.get('bathrooms') ?? '',
    area: params.get('area') ?? '',
    status: params.get('status') ?? '',
  }
}

export function filtersToSearchParams(filters: Partial<FilterState>): URLSearchParams {
  const params = new URLSearchParams()
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, value)
  })
  return params
}
