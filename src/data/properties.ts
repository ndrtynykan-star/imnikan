import { PHOTO } from '@/lib/images'

export const PROPERTY_STATUSES = ['For Sale', 'For Rent', 'Off-Plan'] as const
export type PropertyStatus = (typeof PROPERTY_STATUSES)[number]

/** Search tabs on the hero map to a status and, for Commercial, a category. */
export const PROPERTY_CATEGORIES = [
  'Villas',
  'Apartments',
  'Townhouses',
  'Penthouses',
  'Commercial',
] as const
export type PropertyCategory = (typeof PROPERTY_CATEGORIES)[number]

export type Agent = {
  name: string
  role: string
  phone: string
  email: string
}

export type Property = {
  id: string
  slug: string
  title: string
  category: PropertyCategory
  location: string
  status: PropertyStatus
  price: number
  priceLabel: string
  bedrooms: number
  bathrooms: number
  area: number
  image: string
  gallery: string[]
  summary: string
  description: string
  amenities: string[]
  agent: Agent
  /** Ordering hook for the "Newest" sort. */
  listed: number
  featured?: boolean
}

const AGENTS: Agent[] = [
  {
    name: 'Layla Al Mansoori',
    role: 'Senior Property Consultant',
    phone: '+971 50 118 4470',
    email: 'layla@dubaihouse.ae',
  },
  {
    name: 'Rashid Bin Humaid',
    role: 'Head of Waterfront Portfolio',
    phone: '+971 50 664 2091',
    email: 'rashid@dubaihouse.ae',
  },
  {
    name: 'Sofia Petrova',
    role: 'Investment & Off-Plan Specialist',
    phone: '+971 55 903 7788',
    email: 'sofia@dubaihouse.ae',
  },
]

export const PROPERTIES: Property[] = [
  {
    id: 'dh-01',
    slug: 'palm-jumeirah-villa',
    title: 'Palm Jumeirah Villa',
    category: 'Villas',
    location: 'Palm Jumeirah',
    status: 'For Sale',
    price: 28_000_000,
    priceLabel: 'AED 28,000,000',
    bedrooms: 5,
    bathrooms: 6,
    area: 7_800,
    image: PHOTO.villaA,
    gallery: [PHOTO.villaA, PHOTO.interiorA, PHOTO.interiorB, PHOTO.palm],
    summary: 'A beachfront signature villa on the western frond.',
    description:
      'Set on a quiet western frond with 38 metres of private beach, this villa opens through full-height glazing onto an infinity terrace facing the Burj Al Arab. Interiors are finished in honed limestone and brushed oak, with a lower level given over to a spa, cinema and climate-controlled garage for four cars.',
    amenities: ['Private Pool', 'Sea View', 'Smart Home', 'Parking', 'Gym', 'Garden', 'Concierge', '24/7 Security'],
    agent: AGENTS[0],
    listed: 20260301,
    featured: true,
  },
  {
    id: 'dh-02',
    slug: 'downtown-luxury-apartment',
    title: 'Downtown Luxury Apartment',
    category: 'Apartments',
    location: 'Downtown Dubai',
    status: 'For Sale',
    price: 6_800_000,
    priceLabel: 'AED 6,800,000',
    bedrooms: 3,
    bathrooms: 4,
    area: 2_150,
    image: PHOTO.downtown,
    gallery: [PHOTO.downtown, PHOTO.interiorC, PHOTO.interiorD, PHOTO.burj],
    summary: 'Corner residence with uninterrupted Burj Khalifa views.',
    description:
      'A corner three-bedroom on the 41st floor, framed by the Dubai Fountain and Burj Khalifa. Floor-to-ceiling glazing wraps the living space, and the building offers a 25-metre lap pool, residents’ lounge and direct access to the boulevard retail promenade.',
    amenities: ['Gym', 'Concierge', 'Parking', 'Smart Home', '24/7 Security', 'Sea View'],
    agent: AGENTS[2],
    listed: 20260214,
    featured: true,
  },
  {
    id: 'dh-03',
    slug: 'waterfront-residence-dubai-harbour',
    title: 'Waterfront Residence',
    category: 'Penthouses',
    location: 'Dubai Harbour',
    status: 'For Sale',
    price: 12_500_000,
    priceLabel: 'AED 12,500,000',
    bedrooms: 4,
    bathrooms: 5,
    area: 3_900,
    image: PHOTO.marina,
    gallery: [PHOTO.marina, PHOTO.interiorE, PHOTO.interiorF, PHOTO.skylineNight],
    summary: 'A duplex penthouse above the marina berths.',
    description:
      'A duplex penthouse with a 60-square-metre roof terrace positioned directly above the yacht berths. Interiors pair a pale stone palette with dark joinery, and the primary suite occupies the entire upper level with a private plunge pool.',
    amenities: ['Private Pool', 'Sea View', 'Concierge', 'Parking', 'Gym', 'Smart Home', '24/7 Security'],
    agent: AGENTS[1],
    listed: 20260222,
    featured: true,
  },
  {
    id: 'dh-04',
    slug: 'emirates-hills-estate',
    title: 'Emirates Hills Estate',
    category: 'Villas',
    location: 'Emirates Hills',
    status: 'For Sale',
    price: 42_000_000,
    priceLabel: 'AED 42,000,000',
    bedrooms: 7,
    bathrooms: 8,
    area: 12_400,
    image: PHOTO.villaB,
    gallery: [PHOTO.villaB, PHOTO.interiorG, PHOTO.interiorH, PHOTO.lobby],
    summary: 'A landmark estate fronting the Montgomerie golf course.',
    description:
      'One of the last remaining double plots on the Montgomerie’s signature ninth. The estate is arranged around a colonnaded courtyard with a 30-metre pool, guest wing, and a lower floor containing a wellness suite, wine room and six-car gallery.',
    amenities: ['Private Pool', 'Garden', 'Smart Home', 'Parking', 'Gym', '24/7 Security', 'Concierge'],
    agent: AGENTS[0],
    listed: 20251118,
  },
  {
    id: 'dh-05',
    slug: 'dubai-creek-harbour-skyline',
    title: 'Creek Harbour Skyline',
    category: 'Apartments',
    location: 'Dubai Creek Harbour',
    status: 'Off-Plan',
    price: 2_400_000,
    priceLabel: 'From AED 2,400,000',
    bedrooms: 2,
    bathrooms: 3,
    area: 1_180,
    image: PHOTO.dubaiAerial,
    gallery: [PHOTO.dubaiAerial, PHOTO.interiorB, PHOTO.houseD],
    summary: 'Creek-facing tower with a 2029 handover window.',
    description:
      'A creek-facing tower within the new harbour district, designed around a landscaped podium. Two-bedroom layouts face the water, with the Creek Tower and Ras Al Khor flamingo reserve beyond. Escrow protected with a staggered payment plan.',
    amenities: ['Sea View', 'Gym', 'Parking', 'Smart Home', '24/7 Security', 'Concierge'],
    agent: AGENTS[2],
    listed: 20260405,
  },
  {
    id: 'dh-06',
    slug: 'dubai-hills-grove-townhouse',
    title: 'Grove Townhouse',
    category: 'Townhouses',
    location: 'Dubai Hills Estate',
    status: 'For Sale',
    price: 4_200_000,
    priceLabel: 'AED 4,200,000',
    bedrooms: 4,
    bathrooms: 4,
    area: 2_900,
    image: PHOTO.houseE,
    gallery: [PHOTO.houseE, PHOTO.interiorF, PHOTO.interiorA, PHOTO.houseB],
    summary: 'Corner townhouse overlooking the eighteenth fairway.',
    description:
      'A corner unit with a mature garden and views across the eighteenth fairway of Dubai Hills Golf Club. The interior has been reconfigured to open the kitchen into a double-height garden room, with a guest suite on the ground floor.',
    amenities: ['Garden', 'Parking', 'Smart Home', '24/7 Security', 'Gym', 'Private Pool'],
    agent: AGENTS[2],
    listed: 20260112,
  },
  {
    id: 'dh-07',
    slug: 'marina-waterfront-penthouse',
    title: 'Marina Waterfront Penthouse',
    category: 'Penthouses',
    location: 'Dubai Marina',
    status: 'For Sale',
    price: 9_900_000,
    priceLabel: 'AED 9,900,000',
    bedrooms: 4,
    bathrooms: 5,
    area: 3_450,
    image: PHOTO.skylineNight,
    gallery: [PHOTO.skylineNight, PHOTO.interiorD, PHOTO.interiorE, PHOTO.marina],
    summary: 'Full-floor penthouse over the yacht marina.',
    description:
      'A full-floor penthouse with wraparound terraces taking in the marina, Ain Dubai and the open sea. A private lift lobby opens directly into the reception hall, and the principal suite has its own dressing room, spa bath and morning terrace.',
    amenities: ['Sea View', 'Private Pool', 'Concierge', 'Parking', 'Gym', 'Smart Home', '24/7 Security'],
    agent: AGENTS[1],
    listed: 20260318,
  },
  {
    id: 'dh-08',
    slug: 'difc-sky-office-floor',
    title: 'DIFC Sky Office Floor',
    category: 'Commercial',
    location: 'DIFC',
    status: 'For Rent',
    price: 1_450_000,
    priceLabel: 'AED 1,450,000 / year',
    bedrooms: 0,
    bathrooms: 4,
    area: 6_400,
    image: PHOTO.tower,
    gallery: [PHOTO.tower, PHOTO.lobby, PHOTO.interiorC],
    summary: 'Grade-A fitted floor plate in the financial district.',
    description:
      'A fully fitted half-floor in a Landmark DIFC tower, delivered with 92 workstations, four meeting rooms and a double-height reception. The building sits directly above the Gate Avenue retail podium with dedicated executive parking.',
    amenities: ['Parking', '24/7 Security', 'Concierge', 'Smart Home', 'Gym'],
    agent: AGENTS[2],
    listed: 20260208,
  },
  {
    id: 'dh-09',
    slug: 'palm-crescent-residences',
    title: 'Palm Crescent Residences',
    category: 'Apartments',
    location: 'Palm Jumeirah',
    status: 'Off-Plan',
    price: 5_900_000,
    priceLabel: 'From AED 5,900,000',
    bedrooms: 3,
    bathrooms: 4,
    area: 2_600,
    image: PHOTO.heroVilla,
    gallery: [PHOTO.heroVilla, PHOTO.interiorA, PHOTO.palm],
    summary: 'Handover Q4 2028 — 40% paid, 60% on completion.',
    description:
      'A new crescent-facing collection with a staggered payment plan and expected handover in Q4 2028. Purchasers receive a complimentary three-year furnishing package and access to the beach club.',
    amenities: ['Sea View', 'Private Pool', 'Concierge', 'Gym', 'Parking', 'Smart Home'],
    agent: AGENTS[2],
    listed: 20260420,
  },
  {
    id: 'dh-10',
    slug: 'emirates-hills-garden-townhouse',
    title: 'Fairway Garden Townhouse',
    category: 'Townhouses',
    location: 'Emirates Hills',
    status: 'For Sale',
    price: 7_400_000,
    priceLabel: 'AED 7,400,000',
    bedrooms: 3,
    bathrooms: 4,
    area: 2_480,
    image: PHOTO.houseA,
    gallery: [PHOTO.houseA, PHOTO.interiorG, PHOTO.houseC],
    summary: 'Gated townhouse with a private walled garden.',
    description:
      'A rare townhouse within the Emirates Hills gated community, fronting a private walled garden with mature planting. Reception rooms run the full depth of the plan, with a garden-facing kitchen and a first-floor terrace over the fairway.',
    amenities: ['Garden', 'Parking', 'Private Pool', '24/7 Security', 'Smart Home'],
    agent: AGENTS[0],
    listed: 20251220,
  },
  {
    id: 'dh-11',
    slug: 'downtown-boulevard-apartment-rent',
    title: 'Boulevard Garden Apartment',
    category: 'Apartments',
    location: 'Downtown Dubai',
    status: 'For Rent',
    price: 185_000,
    priceLabel: 'AED 185,000 / year',
    bedrooms: 2,
    bathrooms: 3,
    area: 1_320,
    image: PHOTO.houseB,
    gallery: [PHOTO.houseB, PHOTO.interiorE, PHOTO.downtown],
    summary: 'Two-bedroom with a private terrace on the boulevard.',
    description:
      'A two-bedroom apartment with a rare private garden terrace set back from the boulevard’s quieter eastern flank. Chiller-free, with two covered parking bays and access to the tower’s residents’ spa.',
    amenities: ['Garden', 'Gym', 'Parking', 'Concierge', '24/7 Security', 'Smart Home'],
    agent: AGENTS[2],
    listed: 20260305,
  },
  {
    id: 'dh-12',
    slug: 'marina-corporate-suite',
    title: 'Marina Corporate Suite',
    category: 'Commercial',
    location: 'Dubai Marina',
    status: 'For Rent',
    price: 680_000,
    priceLabel: 'AED 680,000 / year',
    bedrooms: 0,
    bathrooms: 2,
    area: 2_900,
    image: PHOTO.lobby,
    gallery: [PHOTO.lobby, PHOTO.tower, PHOTO.interiorF],
    summary: 'Fitted office suite with marina frontage.',
    description:
      'A bright, fully fitted office suite on the marina promenade, arranged as open plan with two glass meeting rooms and a breakout kitchen. Valet parking and a dedicated concierge desk are included in the service charge.',
    amenities: ['Parking', 'Concierge', '24/7 Security', 'Gym', 'Smart Home'],
    agent: AGENTS[1],
    listed: 20260128,
  },
]

export const FEATURED_PROPERTIES = PROPERTIES.filter((property) => property.featured)

export function getPropertyBySlug(slug: string): Property | undefined {
  return PROPERTIES.find((property) => property.slug === slug)
}

export function similarProperties(property: Property, count = 3): Property[] {
  const sameCategory = PROPERTIES.filter(
    (candidate) => candidate.id !== property.id && candidate.category === property.category,
  )
  const remainder = PROPERTIES.filter(
    (candidate) => candidate.id !== property.id && candidate.category !== property.category,
  )
  return [...sameCategory, ...remainder].slice(0, count)
}
