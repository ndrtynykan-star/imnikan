import { useEffect, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Search, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ArrowButton } from '@/components/ui/ArrowButton'
import { BEDROOM_OPTIONS, PRICE_RANGES, filtersToSearchParams } from '@/lib/filters'
import { CATEGORIES, LOCATIONS } from '@/data/content'
import { useUi } from '@/lib/store'

const FIELD =
  'w-full appearance-none border-b border-ink/20 bg-transparent py-3 text-[14px] text-ink transition-colors duration-300 hover:border-ink/40 focus:border-gold focus:outline-none'
const LABEL = 'block text-[10px] uppercase tracking-label text-muted'

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useUi()
  const navigate = useNavigate()
  const [form, setForm] = useState({ location: '', type: '', price: '', bedrooms: '' })

  useEffect(() => {
    if (!searchOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSearchOpen(false)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [searchOpen, setSearchOpen])

  const update =
    (key: keyof typeof form) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((current) => ({ ...current, [key]: event.target.value }))

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const params = filtersToSearchParams({
      type: form.type,
      location: form.location,
      price: form.price,
      bedrooms: form.bedrooms,
      status: '',
    })
    setSearchOpen(false)
    navigate(`/properties?${params.toString()}`)
  }

  return (
    <div
      className={[
        'fixed inset-0 z-[80] transition-opacity duration-500 ease-luxury',
        searchOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
      ].join(' ')}
      role="dialog"
      aria-modal="true"
      aria-label="Search properties"
      aria-hidden={!searchOpen}
    >
      <button
        type="button"
        className="absolute inset-0 h-full w-full cursor-default bg-navy/70 backdrop-blur-md"
        onClick={() => setSearchOpen(false)}
        aria-label="Close search"
        tabIndex={searchOpen ? 0 : -1}
      />

      <div
        className={[
          'relative mx-auto mt-[8vh] w-[92%] max-w-3xl bg-warm p-6 shadow-panel transition-transform duration-500 ease-luxury sm:p-9',
          searchOpen ? 'translate-y-0' : '-translate-y-4',
        ].join(' ')}
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="eyebrow">Property Search</p>
            <h2 className="mt-3 font-display text-2xl text-ink sm:text-3xl">Find your place in Dubai</h2>
          </div>
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            className="flex h-10 w-10 shrink-0 items-center justify-center text-muted transition-colors hover:text-gold"
            aria-label="Close search"
          >
            <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={submit} className="mt-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className={LABEL} htmlFor="search-location">
                Location
              </label>
              <select
                id="search-location"
                className={`${FIELD} mt-2`}
                value={form.location}
                onChange={update('location')}
              >
                <option value="">Any location</option>
                {LOCATIONS.map((location) => (
                  <option key={location.name} value={location.name}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={LABEL} htmlFor="search-type">
                Property Type
              </label>
              <select id="search-type" className={`${FIELD} mt-2`} value={form.type} onChange={update('type')}>
                <option value="">Any type</option>
                {CATEGORIES.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={LABEL} htmlFor="search-price">
                Price Range
              </label>
              <select id="search-price" className={`${FIELD} mt-2`} value={form.price} onChange={update('price')}>
                {PRICE_RANGES.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={LABEL} htmlFor="search-bedrooms">
                Bedrooms
              </label>
              <select
                id="search-bedrooms"
                className={`${FIELD} mt-2`}
                value={form.bedrooms}
                onChange={update('bedrooms')}
              >
                {BEDROOM_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
            <p className="flex items-center gap-2 text-[10.5px] uppercase tracking-label text-muted">
              <Search className="h-3.5 w-3.5 text-gold" strokeWidth={1.6} aria-hidden="true" />
              {LOCATIONS.length} prime communities
            </p>
            <ArrowButton type="submit" size="lg" variant="gold" pill>
              Search Properties
            </ArrowButton>
          </div>
        </form>
      </div>
    </div>
  )
}
