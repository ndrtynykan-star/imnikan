import { PHOTO } from '@/lib/images'

export const BLOG_CATEGORIES = [
  'Dubai Market',
  'Investment',
  'Lifestyle',
  'Property Guide',
  'New Developments',
] as const
export type BlogCategory = (typeof BLOG_CATEGORIES)[number]

export type Post = {
  slug: string
  title: string
  category: BlogCategory
  date: string
  readMinutes: number
  image: string
  excerpt: string
  body: string[]
  author: string
}

export const POSTS: Post[] = [
  {
    slug: 'dubai-prime-market-outlook-2026',
    title: 'Dubai’s Prime Market: The 2026 Outlook',
    category: 'Dubai Market',
    date: '12 September 2026',
    readMinutes: 6,
    image: PHOTO.heroSkyline,
    excerpt:
      'Transaction volumes in prime communities have more than doubled since 2021. We look at what is driving the next phase of the cycle.',
    body: [
      'Dubai’s prime residential market has moved through three distinct phases since 2021: a liquidity-driven recovery, a reflation of established communities, and the current period of selective, quality-led appreciation.',
      'What distinguishes this cycle is the composition of demand. International buyers now account for the majority of transactions above AED 10 million, and a meaningful share are end users rather than investors — a structural shift that has insulated pricing from the volatility seen in other global cities.',
      'Supply remains the constraint that matters. Within Palm Jumeirah, Emirates Hills and the DIFC catchment, genuinely trophy stock is measured in dozens of units rather than hundreds. Where supply cannot respond, price discovery tends to be orderly.',
      'Our view for the remainder of 2026 is for continued, moderate appreciation in established communities, with the strongest performance in waterfront villas and branded residences, and a flatter trajectory in the mid-market apartment segment.',
    ],
    author: 'Dubai House Research',
  },
  {
    slug: 'rental-yields-by-community',
    title: 'Rental Yields: Where the Numbers Actually Work',
    category: 'Investment',
    date: '28 August 2026',
    readMinutes: 7,
    image: PHOTO.marina,
    excerpt:
      'Gross yields range from under 5% in trophy villas to above 8% in well-located apartments. We break down the communities by return.',
    body: [
      'Headline yields in Dubai are frequently quoted at a community level, which hides as much as it reveals. Averages across a district can span four percentage points, depending on the building, the floor plate and the quality of the fit-out.',
      'Apartment assets in Business Bay, Dubai Marina and Jumeirah Village Circle continue to offer the most reliable gross returns, typically between 7% and 9% when the unit is correctly furnished and professionally managed.',
      'Villas in Palm Jumeirah and Emirates Hills trade at lower headline yields, generally in the 4% to 5% range, but compensate through capital appreciation and lower vacancy over a full cycle.',
      'The variable that most consistently separates a good return from a great one is not the community — it is management. Professional short-let operation, disciplined pricing and a maintained fit-out typically add 150 to 250 basis points of net yield.',
    ],
    author: 'Sofia Petrova',
  },
  {
    slug: 'golden-visa-property-route',
    title: 'The Golden Visa Property Route, Explained',
    category: 'Property Guide',
    date: '14 August 2026',
    readMinutes: 5,
    image: PHOTO.lobby,
    excerpt:
      'A AED 2 million freehold purchase qualifies you for a renewable ten-year residency. Here is how the process works end to end.',
    body: [
      'The UAE Golden Visa is available to property owners who hold freehold residential or commercial real estate with a value of at least AED 2 million, whether purchased outright or through an approved off-plan project.',
      'Ownership must be evidenced by a title deed, or by an attested off-plan contract from an approved developer together with proof that a minimum 20% of the purchase price has been paid.',
      'The application is submitted through the Dubai Land Department’s platform, with medical fitness testing and Emirates ID enrolment completed locally. In practice, most of our clients are issued the residence within four to six weeks.',
      'The visa is renewable and does not require a sponsor or an employer, which is precisely why it has become the default structuring choice for our international buyers.',
    ],
    author: 'Layla Al Mansoori',
  },
  {
    slug: 'living-on-palm-jumeirah',
    title: 'What Living on Palm Jumeirah Is Really Like',
    category: 'Lifestyle',
    date: '2 August 2026',
    readMinutes: 4,
    image: PHOTO.palm,
    excerpt:
      'From frond orientation to beach access and school runs, a practical guide to choosing the right side of the island.',
    body: [
      'The Palm rewards orientation. Fronds on the west side benefit from afternoon shade and calmer water, while east-facing fronds catch the morning sun and the Dubai Marina skyline.',
      'Practically, the island is quieter than its reputation suggests. Traffic funnels through the trunk at peak times, so an increasing number of residents treat the island as a self-contained base with its own beach clubs, restaurants and medical facilities.',
      'Families should note that the nearest international schools sit on the mainland, which puts a school run at between fifteen and thirty minutes depending on frond position and time of day.',
      'For buyers, the single most important diligence item is the beach. Widths vary substantially between fronds, and a villa’s private frontage is not always apparent from the plot size alone.',
    ],
    author: 'Rashid Bin Humaid',
  },
  {
    slug: 'creek-harbour-masterplan-progress',
    title: 'Creek Harbour: The Masterplan Takes Shape',
    category: 'New Developments',
    date: '21 July 2026',
    readMinutes: 6,
    image: PHOTO.dubaiAerial,
    excerpt:
      'With the first residential phases handed over, Dubai Creek Harbour is maturing into a genuine alternative to the established waterfront.',
    body: [
      'Dubai Creek Harbour has moved past the marketing phase. Two residential districts are now occupied, the promenade retail has opened, and the marina is operational with permanent berths allocated.',
      'For buyers, the proposition has changed accordingly. Early-phase buyers bought a masterplan; today’s buyers are purchasing into a functioning district with visible amenity and a rental market that can be measured rather than forecast.',
      'Off-plan inventory remains available across the remaining towers, generally on 40:60 or 50:50 payment plans with handover windows between 2028 and 2030.',
      'We would caution against assuming a uniform price trajectory across the district. Buildings with direct creek frontage and unblocked views are likely to diverge materially from those set back behind the podium.',
    ],
    author: 'Dubai House Research',
  },
  {
    slug: 'buying-off-plan-safely',
    title: 'Buying Off-Plan Without Taking Unnecessary Risk',
    category: 'Property Guide',
    date: '9 July 2026',
    readMinutes: 6,
    image: PHOTO.houseD,
    excerpt:
      'Escrow accounts, developer track record and payment-plan structure are the three questions that matter most. Here is how to ask them.',
    body: [
      'Off-plan purchases in Dubai are protected by the escrow law, which requires each project to hold a dedicated account supervised by the Real Estate Regulatory Agency. Verifying that an escrow account exists is the first diligence step, and it takes minutes.',
      'The second is developer track record. A developer’s previous handovers — not its renderings — are the reliable indicator of delivery quality and schedule discipline.',
      'Payment-plan structure deserves the closest attention. A plan weighted toward completion reduces your exposure but raises the entry cost; a stretched post-handover plan improves cash flow but assumes the delivery timeline holds.',
      'Finally, model the exit. Off-plan assets often have a defined window in which resale is restricted, and your underwriting should assume the unit cannot be sold until that window closes.',
    ],
    author: 'Sofia Petrova',
  },
]

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((post) => post.slug === slug)
}

export function relatedPosts(post: Post, count = 3): Post[] {
  const sameCategory = POSTS.filter((item) => item.slug !== post.slug && item.category === post.category)
  const remainder = POSTS.filter((item) => item.slug !== post.slug && item.category !== post.category)
  return [...sameCategory, ...remainder].slice(0, count)
}
