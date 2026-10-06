import { PHOTO } from '@/lib/images'

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Properties', to: '/properties' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
] as const

export const CONTACT = {
  city: 'Dubai, United Arab Emirates',
  address: 'Level 42, Boulevard Plaza Tower 1, Downtown Dubai, UAE',
  phone: '+971 4 000 0000',
  phoneHref: 'tel:+97140000000',
  email: 'hello@dubaielitehomes.com',
  hours: 'Sunday – Thursday, 09:00 – 19:00 GST',
}

export type TrustItem = { title: string; icon: 'shield' | 'building' | 'pin' | 'handshake' }

export const TRUST_ITEMS: TrustItem[] = [
  { title: 'Trusted\nExperts', icon: 'shield' },
  { title: 'Premium\nProperties', icon: 'building' },
  { title: 'Prime\nLocations', icon: 'pin' },
  { title: 'Personalized\nGuidance', icon: 'handshake' },
]

export type Service = {
  number: string
  title: string
  description: string
  icon: 'key' | 'tag' | 'building' | 'chart' | 'layers' | 'globe'
}

export const SERVICES: Service[] = [
  {
    number: '01',
    title: 'Buying',
    description:
      'Off-market access, disciplined negotiation and full due diligence across every freehold community.',
    icon: 'key',
  },
  {
    number: '02',
    title: 'Selling',
    description:
      'Editorial photography, targeted private placement and pricing analysis grounded in real transaction data.',
    icon: 'tag',
  },
  {
    number: '03',
    title: 'Property Management',
    description:
      'Tenant sourcing, rent collection and maintenance oversight with quarterly reporting on every asset.',
    icon: 'building',
  },
  {
    number: '04',
    title: 'Investment Consulting',
    description:
      'Yield modelling, exit planning and Golden Visa structuring for private and institutional clients.',
    icon: 'chart',
  },
  {
    number: '05',
    title: 'Off-Plan Properties',
    description:
      'Developer allocations, escrow verification and payment plans negotiated on your behalf.',
    icon: 'layers',
  },
  {
    number: '06',
    title: 'Relocation Services',
    description:
      'Schools, healthcare, banking and residency coordination for families arriving in the UAE.',
    icon: 'globe',
  },
]

export type Location = {
  name: string
  tagline: string
  properties: number
  averagePrice: string
  image: string
}

export const LOCATIONS: Location[] = [
  { name: 'Palm Jumeirah', tagline: 'Beachfront villas & frond estates', properties: 86, averagePrice: 'AED 12.5M', image: PHOTO.palm },
  { name: 'Downtown Dubai', tagline: 'Burj Khalifa & the boulevard', properties: 132, averagePrice: 'AED 3.4M', image: PHOTO.downtown },
  { name: 'Dubai Marina', tagline: 'Yacht berths & waterfront towers', properties: 118, averagePrice: 'AED 2.9M', image: PHOTO.marina },
  { name: 'Emirates Hills', tagline: 'Gated estates on the fairway', properties: 34, averagePrice: 'AED 28M', image: PHOTO.villaB },
  { name: 'Jumeirah', tagline: 'Coastal villas & the bay islands', properties: 71, averagePrice: 'AED 18M', image: PHOTO.houseA },
  { name: 'Dubai Hills Estate', tagline: 'Golf living & family villas', properties: 95, averagePrice: 'AED 4.2M', image: PHOTO.houseE },
  { name: 'Business Bay', tagline: 'The canal & executive living', properties: 147, averagePrice: 'AED 2.1M', image: PHOTO.tower },
  { name: 'Bluewaters Island', tagline: 'Ain Dubai & the open sea', properties: 42, averagePrice: 'AED 6.7M', image: PHOTO.skylineNight },
]

export type Stat = { value: number; suffix?: string; prefix?: string; label: string; decimals?: number }

export const STATS: Stat[] = [
  { value: 10, suffix: '+', label: 'Years Experience' },
  { value: 500, suffix: '+', label: 'Properties Sold' },
  { value: 2.5, suffix: 'B+', prefix: 'AED ', label: 'Property Value', decimals: 1 },
  { value: 20, suffix: '+', label: 'Prime Locations' },
]

/** Quarterly index of prime Dubai residential values, base 100 in 2021. */
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
  { name: 'Jumeirah Bay', change: 15.1 },
  { name: 'Emirates Hills', change: 12.6 },
  { name: 'Downtown Dubai', change: 9.8 },
  { name: 'Dubai Marina', change: 7.2 },
]

export type Testimonial = {
  quote: string
  name: string
  role: string
  location: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'They found a frond villa that never reached the portals, then handled every permit and handover detail. The whole acquisition took nineteen days.',
    name: 'Marcus Lindqvist',
    role: 'Private Investor',
    location: 'Palm Jumeirah',
  },
  {
    quote:
      'We were relocating from London with two children. Schools, tenancy and banking were arranged before we landed — genuinely nothing was left to chance.',
    name: 'Priya & Daniel Rao',
    role: 'Homeowners',
    location: 'Dubai Hills Estate',
  },
  {
    quote:
      'Their yield modelling was more rigorous than my own analysts’. Two off-plan allocations later, the portfolio is outperforming our underwriting.',
    name: 'Hessa Al Nuaimi',
    role: 'Family Office Principal',
    location: 'Downtown Dubai',
  },
]

export const SIDEBAR_FEATURES = [
  { title: 'Modern & Responsive Design', icon: 'monitor' },
  { title: 'SEO Optimized', icon: 'chart' },
  { title: 'Fast & Secure', icon: 'shield' },
  { title: 'Ongoing Support', icon: 'headset' },
] as const

export const FOOTER_COLUMNS = [
  {
    title: 'Explore',
    links: [
      { label: 'Properties', to: '/properties' },
      { label: 'Locations', to: '/properties?view=locations' },
      { label: 'New Developments', to: '/properties?status=Off-Plan' },
      { label: 'Investment', to: '/services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Services', to: '/services' },
      { label: 'Our Team', to: '/about' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Property Guide', to: '/about' },
      { label: 'Dubai Market', to: '/services' },
      { label: 'Investment Guide', to: '/services' },
      { label: 'FAQ', to: '/contact' },
    ],
  },
] as const
