import { PHOTO } from '@/lib/images'

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Properties', to: '/properties' },
  { label: 'About', to: '/about' },
  { label: 'Invest', to: '/invest' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
] as const

export const BRAND = {
  name: 'Dubai House',
  tagline: 'Properties for a Brighter Tomorrow',
  description:
    'Connecting people to exceptional properties in one of the world’s most inspiring cities.',
}

export const CONTACT = {
  city: 'Dubai, UAE',
  address: 'Level 42, Emirates Financial Towers, DIFC, Dubai, UAE',
  phone: '+971 4 512 8800',
  phoneHref: 'tel:+97145128800',
  whatsappHref: 'https://wa.me/97145128800',
  email: 'hello@dubaihouse.ae',
  hours: 'Sunday – Thursday, 09:00 – 19:00 GST',
}

/** Eyebrow above the hero headline. */
export const HERO_EYEBROW = ['Live', 'Invest', 'Belong'] as const
export const HERO_TITLE_LINES = ['Discover a', 'Brighter Tomorrow', 'in Dubai'] as const
export const HERO_SCRIPT = 'A Global Address for New Beginnings'
export const HERO_SUBTITLE =
  'Premium properties. Global opportunities. A better way to live, invest, and grow.'

export type Stat = { value: string; label: string; icon: 'building' | 'smile' | 'calendar' | 'globe' }

export const HERO_STATS: Stat[] = [
  { value: '2,500+', label: 'Properties', icon: 'building' },
  { value: '98%', label: 'Client Satisfaction', icon: 'smile' },
  { value: '15+', label: 'Years in Dubai', icon: 'calendar' },
  { value: 'Global', label: 'Investor Network', icon: 'globe' },
]

export type Category = {
  name: string
  description: string
  count: number
  image: string
}

export const CATEGORIES: Category[] = [
  { name: 'Villas', description: 'Refined living spaces', count: 420, image: PHOTO.villaC },
  { name: 'Apartments', description: 'Urban living redefined', count: 860, image: PHOTO.downtown },
  { name: 'Townhouses', description: 'Space for every story', count: 310, image: PHOTO.houseE },
  { name: 'Penthouses', description: 'Elevated experiences', count: 145, image: PHOTO.skylineNight },
  { name: 'Commercial', description: 'Spaces for growth', count: 230, image: PHOTO.tower },
]

export type Location = {
  name: string
  tagline: string
  properties: number
  averagePrice: string
  image: string
}

export const LOCATIONS: Location[] = [
  {
    name: 'Downtown Dubai',
    tagline: 'Burj Khalifa & the boulevard',
    properties: 132,
    averagePrice: 'AED 3.4M',
    image: PHOTO.downtown,
  },
  {
    name: 'Palm Jumeirah',
    tagline: 'Beachfront villas & frond estates',
    properties: 86,
    averagePrice: 'AED 12.5M',
    image: PHOTO.palm,
  },
  {
    name: 'Dubai Marina',
    tagline: 'Yacht berths & waterfront towers',
    properties: 118,
    averagePrice: 'AED 2.9M',
    image: PHOTO.marina,
  },
  {
    name: 'Emirates Hills',
    tagline: 'Gated estates on the fairway',
    properties: 34,
    averagePrice: 'AED 28M',
    image: PHOTO.villaB,
  },
  {
    name: 'Dubai Creek Harbour',
    tagline: 'The new waterfront district',
    properties: 95,
    averagePrice: 'AED 2.4M',
    image: PHOTO.dubaiAerial,
  },
]

export type TrustPoint = { title: string; icon: 'shield' | 'support' | 'growth' }

export const TRUST_POINTS: TrustPoint[] = [
  { title: 'Trusted by\nGlobal Investors', icon: 'shield' },
  { title: 'End-to-End\nSupport', icon: 'support' },
  { title: 'Long-Term\nValue', icon: 'growth' },
]

export type Benefit = { title: string; icon: 'percent' | 'yield' | 'infra' | 'hub' }

export const INVEST_BENEFITS: Benefit[] = [
  { title: '0% Property Tax', icon: 'percent' },
  { title: 'High Rental Yields', icon: 'yield' },
  { title: 'World-Class Infrastructure', icon: 'infra' },
  { title: 'A Global Business Hub', icon: 'hub' },
]

export const WHY_DUBAI = [
  {
    title: 'Zero Income Tax',
    body: 'No personal income tax, no capital gains tax and no annual property tax on residential freehold ownership.',
  },
  {
    title: 'Residency by Investment',
    body: 'A AED 2M freehold purchase qualifies the owner for a renewable ten-year UAE Golden Visa.',
  },
  {
    title: 'Currency & Capital',
    body: 'The dirham is pegged to the US dollar, and 100% repatriation of capital and profit is permitted.',
  },
  {
    title: 'Regulated Market',
    body: 'Escrow-protected off-plan purchases and a central registry administered by the Dubai Land Department.',
  },
]

export const MARKET_OVERVIEW = [
  { label: 'Prime residential transactions', value: 'AED 142B', note: 'trailing twelve months' },
  { label: 'Average prime price growth', value: '+11.8%', note: 'year on year' },
  { label: 'International buyer share', value: '64%', note: 'above AED 10M' },
  { label: 'Average gross yield', value: '6.4%', note: 'across the portfolio' },
]

/** Prime Dubai residential value index, base 100 in 2021. */
export const INVESTMENT_GROWTH = [
  { label: '2021', value: 100 },
  { label: '2022', value: 118 },
  { label: '2023', value: 141 },
  { label: '2024', value: 163 },
  { label: '2025', value: 182 },
  { label: '2026', value: 199 },
]

export const DISTRICT_GROWTH = [
  { name: 'Palm Jumeirah', change: 18.4 },
  { name: 'Dubai Harbour', change: 15.9 },
  { name: 'Emirates Hills', change: 12.6 },
  { name: 'Downtown Dubai', change: 9.8 },
  { name: 'Dubai Marina', change: 7.2 },
]

export const YIELD_BANDS = [
  { name: 'Apartments', gross: 7.8, net: 6.2 },
  { name: 'Townhouses', gross: 6.9, net: 5.5 },
  { name: 'Penthouses', gross: 5.8, net: 4.6 },
  { name: 'Villas', gross: 4.9, net: 3.9 },
]

export const INVEST_AREAS = [
  { name: 'Palm Jumeirah', note: 'Land-scarce waterfront with the strongest long-run appreciation in the emirate.' },
  { name: 'Downtown Dubai', note: 'The deepest rental market in Dubai, anchored by the Burj Khalifa district.' },
  { name: 'Dubai Creek Harbour', note: 'Early-cycle masterplan with off-plan entry points and 2028–2030 handover.' },
  { name: 'Emirates Hills', note: 'Dubai’s most exclusive gated community, trading in single-digit plot volumes.' },
]

export type Testimonial = {
  quote: string
  name: string
  role: string
  portrait: string
  rating: number
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Dubai House made our investment journey seamless. Their team was professional, transparent, and truly understood our goals. We couldn’t be happier with our new apartment in Downtown Dubai.',
    name: 'James Carter',
    role: 'Investor from the UK',
    portrait: PHOTO.about,
    rating: 5,
  },
  {
    quote:
      'They found a frond villa that never reached the portals, then handled every permit and handover detail. The whole acquisition took nineteen days from first viewing to title deed.',
    name: 'Marcus Lindqvist',
    role: 'Private Investor, Sweden',
    portrait: PHOTO.lobby,
    rating: 5,
  },
  {
    quote:
      'Their yield modelling was more rigorous than my own analysts’. Two off-plan allocations later, the portfolio is comfortably outperforming our underwriting.',
    name: 'Hessa Al Nuaimi',
    role: 'Family Office Principal',
    portrait: PHOTO.tower,
    rating: 5,
  },
]

export const FOOTER_COLUMNS = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Properties', to: '/properties' },
      { label: 'About Us', to: '/about' },
      { label: 'Invest', to: '/invest' },
      { label: 'Blog', to: '/blog' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Properties',
    links: [
      { label: 'Villas', to: '/properties?type=Villas' },
      { label: 'Apartments', to: '/properties?type=Apartments' },
      { label: 'Townhouses', to: '/properties?type=Townhouses' },
      { label: 'Penthouses', to: '/properties?type=Penthouses' },
      { label: 'Commercial', to: '/properties?type=Commercial' },
    ],
  },
  {
    title: 'Locations',
    links: LOCATIONS.map((location) => ({
      label: location.name,
      to: `/properties?location=${encodeURIComponent(location.name)}`,
    })),
  },
] as const
