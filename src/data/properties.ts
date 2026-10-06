import { PHOTO } from '@/lib/images'

export const PROPERTY_STATUSES = ['For Sale', 'For Rent', 'Off-Plan'] as const
export type PropertyStatus = (typeof PROPERTY_STATUSES)[number]

export const PROPERTY_TYPES = [
  'Luxury Villas',
  'Penthouses',
  'Apartments',
  'Waterfront Residences',
  'Off-Plan Projects',
  'Luxury Townhouses',
] as const
export type PropertyType = (typeof PROPERTY_TYPES)[number]

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
  category: PropertyType
  /** Card headline when it differs from the category (e.g. "Downtown Apartments"). */
  cardTitle?: string
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
  featured?: boolean
}

const AGENTS: Agent[] = [
  {
    name: 'Layla Al Mansoori',
    role: 'Senior Private Client Advisor',
    phone: '+971 50 118 4470',
    email: 'layla@dubaielitehomes.com',
  },
  {
    name: 'Rashid Bin Humaid',
    role: 'Head of Waterfront Portfolio',
    phone: '+971 50 664 2091',
    email: 'rashid@dubaielitehomes.com',
  },
  {
    name: 'Sofia Petrova',
    role: 'Investment & Off-Plan Specialist',
    phone: '+971 55 903 7788',
    email: 'sofia@dubaielitehomes.com',
  },
]

export const PROPERTIES: Property[] = [
  {
    id: 'deh-01',
    slug: 'palm-jumeirah-signature-villa',
    title: 'Signature Beachfront Villa',
    category: 'Luxury Villas',
    location: 'Palm Jumeirah',
    status: 'For Sale',
    price: 12_500_000,
    priceLabel: 'From AED 12,500,000',
    bedrooms: 5,
    bathrooms: 6,
    area: 8_200,
    image: PHOTO.villaA,
    gallery: [PHOTO.villaA, PHOTO.interiorA, PHOTO.interiorB, PHOTO.palm],
    summary: 'A private beachfront villa on the Palm’s western frond.',
    description:
      'Set on a quiet western frond with 42 metres of private beach, this villa opens through full-height glazing onto an infinity terrace facing the Burj Al Arab. Interiors are finished in honed limestone and brushed oak, with a lower level given over to a spa, cinema and climate-controlled garage for four cars.',
    amenities: ['Private beach', 'Infinity pool', 'Spa & sauna', 'Cinema room', '4-car garage', 'Staff quarters', 'Smart home system', 'Landscaped garden'],
    agent: AGENTS[0],
    featured: true,
  },
  {
    id: 'deh-02',
    slug: 'burj-vista-sky-residence',
    title: 'Sky Residence Above the Boulevard',
    category: 'Apartments',
    cardTitle: 'Downtown Apartments',
    location: 'Downtown Dubai',
    status: 'For Sale',
    price: 2_000_000,
    priceLabel: 'From AED 2,000,000',
    bedrooms: 2,
    bathrooms: 3,
    area: 1_450,
    image: PHOTO.downtown,
    gallery: [PHOTO.downtown, PHOTO.interiorC, PHOTO.interiorD, PHOTO.burj],
    summary: 'Corner residence with uninterrupted Burj Khalifa views.',
    description:
      'A corner two-bedroom on the 41st floor, framed by the Dubai Fountain and Burj Khalifa. Floor-to-ceiling glazing wraps the living space, and the building offers a 25-metre lap pool, residents’ lounge and direct access to the boulevard retail promenade.',
    amenities: ['Burj Khalifa views', 'Concierge', 'Lap pool', 'Residents’ gym', 'Podium parking', 'Direct mall access'],
    agent: AGENTS[2],
    featured: true,
  },
  {
    id: 'deh-03',
    slug: 'marina-waterfront-penthouse',
    title: 'Marina Waterfront Penthouse',
    category: 'Waterfront Residences',
    location: 'Dubai Marina',
    status: 'For Sale',
    price: 3_500_000,
    priceLabel: 'From AED 3,500,000',
    bedrooms: 3,
    bathrooms: 4,
    area: 2_380,
    image: PHOTO.marina,
    gallery: [PHOTO.marina, PHOTO.interiorE, PHOTO.interiorF, PHOTO.burj],
    summary: 'Duplex penthouse over the yacht berths.',
    description:
      'A duplex penthouse with a 60-square-metre roof terrace positioned directly above the marina berths. Interiors pair a pale stone palette with dark joinery, and the primary suite occupies the entire upper level with a private plunge pool.',
    amenities: ['Roof terrace', 'Plunge pool', 'Marina views', 'Private lift lobby', 'Two parking bays', 'Concierge'],
    agent: AGENTS[1],
    featured: true,
  },
  {
    id: 'deh-04',
    slug: 'emirates-hills-estate',
    title: 'Emirates Hills Estate',
    category: 'Luxury Villas',
    location: 'Emirates Hills',
    status: 'For Sale',
    price: 28_000_000,
    priceLabel: 'From AED 28,000,000',
    bedrooms: 7,
    bathrooms: 8,
    area: 12_400,
    image: PHOTO.villaB,
    gallery: [PHOTO.villaB, PHOTO.interiorG, PHOTO.interiorH, PHOTO.lobby],
    summary: 'A landmark estate fronting the Montgomerie golf course.',
    description:
      'One of the last remaining double plots on the Montgomerie’s signature ninth. The estate is arranged around a colonnaded courtyard with a 30-metre pool, guest wing, and a lower floor containing a wellness suite, wine room and six-car gallery.',
    amenities: ['Golf course frontage', '30m pool', 'Guest wing', 'Wine room', 'Wellness suite', 'Six-car gallery', 'Elevator', 'Security post'],
    agent: AGENTS[0],
  },
  {
    id: 'deh-05',
    slug: 'bluewaters-island-duplex',
    title: 'Bluewaters Island Duplex',
    category: 'Penthouses',
    location: 'Bluewaters Island',
    status: 'For Sale',
    price: 6_750_000,
    priceLabel: 'From AED 6,750,000',
    bedrooms: 4,
    bathrooms: 5,
    area: 3_100,
    image: PHOTO.skylineNight,
    gallery: [PHOTO.skylineNight, PHOTO.interiorB, PHOTO.interiorD, PHOTO.marina],
    summary: 'Four-bedroom duplex facing Ain Dubai and the open sea.',
    description:
      'Positioned on the island’s seaward edge, this duplex takes in Ain Dubai to one side and open water to the other. A sculptural staircase links the reception level to a private suite floor with its own terrace and outdoor shower.',
    amenities: ['Sea views', 'Two terraces', 'Private suite floor', 'Residents’ beach club', 'Valet parking', 'Concierge'],
    agent: AGENTS[1],
  },
  {
    id: 'deh-06',
    slug: 'dubai-hills-grove-townhouse',
    title: 'Grove Townhouse',
    category: 'Luxury Townhouses',
    location: 'Dubai Hills Estate',
    status: 'For Sale',
    price: 4_200_000,
    priceLabel: 'From AED 4,200,000',
    bedrooms: 4,
    bathrooms: 4,
    area: 2_900,
    image: PHOTO.houseE,
    gallery: [PHOTO.houseE, PHOTO.interiorF, PHOTO.interiorA, PHOTO.houseB],
    summary: 'Corner townhouse overlooking the eighteenth fairway.',
    description:
      'A corner unit with a mature garden and views across the eighteenth fairway of Dubai Hills Golf Club. The interior has been reconfigured to open the kitchen into a double-height garden room, with a guest suite on the ground floor.',
    amenities: ['Golf course views', 'Corner plot', 'Double-height garden room', 'Maid’s room', 'Two parking bays', 'Community pool'],
    agent: AGENTS[2],
  },
  {
    id: 'deh-07',
    slug: 'jumeirah-bay-water-villa',
    title: 'Jumeirah Bay Water Villa',
    category: 'Waterfront Residences',
    location: 'Jumeirah Bay Island',
    status: 'For Sale',
    price: 19_500_000,
    priceLabel: 'From AED 19,500,000',
    bedrooms: 5,
    bathrooms: 6,
    area: 7_600,
    image: PHOTO.villaC,
    gallery: [PHOTO.villaC, PHOTO.interiorH, PHOTO.interiorC, PHOTO.heroSkyline],
    summary: 'A villa with its own berth on Jumeirah Bay Island.',
    description:
      'One of a limited collection of water villas on Jumeirah Bay Island, with a private 18-metre berth and direct access to the Bulgari Yacht Club. The principal rooms face west across the water toward the Burj Al Arab skyline.',
    amenities: ['Private berth', 'Yacht club access', 'West-facing terrace', 'Lap pool', 'Wine cellar', 'Staff apartment'],
    agent: AGENTS[1],
  },
  {
    id: 'deh-08',
    slug: 'business-bay-executive-suite',
    title: 'Executive Canal Suite',
    category: 'Apartments',
    location: 'Business Bay',
    status: 'For Rent',
    price: 145_000,
    priceLabel: 'AED 145,000 / year',
    bedrooms: 1,
    bathrooms: 2,
    area: 880,
    image: PHOTO.tower,
    gallery: [PHOTO.tower, PHOTO.interiorD, PHOTO.interiorF],
    summary: 'Fully furnished suite on the Dubai Water Canal.',
    description:
      'A furnished one-bedroom suite on the canal promenade, a short walk from the Downtown boundary. The building offers a rooftop infinity pool, residents’ library and 24-hour concierge — ideal for an executive relocation.',
    amenities: ['Fully furnished', 'Canal views', 'Rooftop pool', '24h concierge', 'Bills inclusive option', 'Gym'],
    agent: AGENTS[2],
  },
  {
    id: 'deh-09',
    slug: 'palm-jumeirah-off-plan-residences',
    title: 'Palm Crescent Residences',
    category: 'Off-Plan Projects',
    location: 'Palm Jumeirah',
    status: 'Off-Plan',
    price: 5_900_000,
    priceLabel: 'From AED 5,900,000',
    bedrooms: 3,
    bathrooms: 4,
    area: 2_600,
    image: PHOTO.heroVilla,
    gallery: [PHOTO.heroVilla, PHOTO.interiorA, PHOTO.palm],
    summary: 'Handover Q4 2027 — 40% paid, 60% on completion.',
    description:
      'A new crescent-facing collection with a staggered payment plan and expected handover in Q4 2027. Purchasers receive a complimentary three-year furnishing package and access to the beach club.',
    amenities: ['Payment plan', 'Beach club access', 'Furnishing package', 'Handover Q4 2027', 'Escrow protected'],
    agent: AGENTS[2],
  },
  {
    id: 'deh-10',
    slug: 'jumeirah-golf-estates-villa',
    title: 'Fairway Garden Villa',
    category: 'Luxury Villas',
    location: 'Jumeirah Golf Estates',
    status: 'For Sale',
    price: 9_800_000,
    priceLabel: 'From AED 9,800,000',
    bedrooms: 5,
    bathrooms: 6,
    area: 6_800,
    image: PHOTO.villaD,
    gallery: [PHOTO.villaD, PHOTO.interiorG, PHOTO.houseC],
    summary: 'Garden villa on the Earth course.',
    description:
      'A low-slung contemporary villa on a mature plot overlooking the Earth course. Wide sliding walls open the reception rooms to a shaded terrace and a 20-metre pool framed by palms.',
    amenities: ['Golf course views', '20m pool', 'Shaded terrace', 'Home office', 'Two-bed guest annex', 'Triple garage'],
    agent: AGENTS[0],
  },
  {
    id: 'deh-11',
    slug: 'downtown-boulevard-apartment',
    title: 'Boulevard Garden Apartment',
    category: 'Apartments',
    location: 'Downtown Dubai',
    status: 'For Rent',
    price: 185_000,
    priceLabel: 'AED 185,000 / year',
    bedrooms: 2,
    bathrooms: 3,
    area: 1_320,
    image: PHOTO.houseA,
    gallery: [PHOTO.houseA, PHOTO.interiorE, PHOTO.downtown],
    summary: 'Two-bedroom with a private terrace on the boulevard.',
    description:
      'A two-bedroom apartment with a rare private garden terrace set back from the boulevard’s quieter eastern flank. Chiller-free, with two covered parking bays and access to the tower’s residents’ spa.',
    amenities: ['Private terrace', 'Residents’ spa', 'Two parking bays', 'Chiller free', 'Concierge', 'Pet friendly'],
    agent: AGENTS[2],
  },
  {
    id: 'deh-12',
    slug: 'dubai-creek-harbour-skyline',
    title: 'Creek Harbour Skyline',
    category: 'Off-Plan Projects',
    location: 'Dubai Creek Harbour',
    status: 'Off-Plan',
    price: 2_400_000,
    priceLabel: 'From AED 2,400,000',
    bedrooms: 2,
    bathrooms: 3,
    area: 1_180,
    image: PHOTO.dubaiAerial,
    gallery: [PHOTO.dubaiAerial, PHOTO.interiorB, PHOTO.houseD],
    summary: 'Creek-facing tower with a 2030 handover window.',
    description:
      'A creek-facing tower within the new harbour district, designed around a landscaped podium. Two-bedroom layouts face the water, with the Creek Tower and Ras Al Khor flamingo reserve beyond.',
    amenities: ['Creek views', 'Podium gardens', 'Payment plan', 'Handover 2030', 'Escrow protected'],
    agent: AGENTS[2],
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
