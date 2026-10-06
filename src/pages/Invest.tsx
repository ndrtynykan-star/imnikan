import { Reveal } from '@/components/ui/Reveal'
import { ArrowButton } from '@/components/ui/ArrowButton'
import { PageHero } from '@/components/sections/PageHero'
import { PropertyCard } from '@/components/property/PropertyCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PHOTO } from '@/lib/images'
import {
  DISTRICT_GROWTH,
  INVESTMENT_GROWTH,
  INVEST_AREAS,
  MARKET_OVERVIEW,
  WHY_DUBAI,
  YIELD_BANDS,
} from '@/data/content'
import { PROPERTIES } from '@/data/properties'

const offPlan = PROPERTIES.filter((property) => property.status === 'Off-Plan')

export default function Invest() {
  return (
    <>
      <PageHero
        eyebrow="Invest in Dubai"
        title="Where global opportunity meets exceptional real estate."
        description="Zero income tax, a regulated freehold market and residency by investment — Dubai remains the most compelling property market in the region."
        imageId={PHOTO.dubaiAerial}
        imageAlt="Aerial view of the Dubai coastline and skyline"
      />

      {/* Why Dubai */}
      <section className="bg-ivory py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeading eyebrow="The Case" title="Why Dubai" />
          </Reveal>

          <div className="mt-12 grid gap-px border-t border-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_DUBAI.map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>
                <div className="h-full border-b border-ink/10 py-8 sm:border-r sm:pr-7">
                  <p className="font-display text-[12px] tabular-nums text-gold-deep">
                    0{index + 1}
                  </p>
                  <h3 className="mt-5 font-display text-[1.25rem] text-ink">{item.title}</h3>
                  <p className="mt-3.5 text-[13px] leading-relaxed text-muted">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Market overview */}
      <section className="bg-warm py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Market Overview"
              title="The Numbers Behind the Market"
              description="Trailing data across the Dubai House portfolio and the wider prime market."
            />
          </Reveal>

          <div className="mt-12 grid gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {MARKET_OVERVIEW.map((item, index) => (
              <Reveal key={item.label} delay={index * 70}>
                <div className="h-full bg-ivory px-6 py-8">
                  <p className="font-display text-[1.9rem] leading-none text-ink">{item.value}</p>
                  <p className="mt-4 text-[12px] leading-snug text-ink/75">{item.label}</p>
                  <p className="mt-2 text-[10.5px] uppercase tracking-label text-muted">
                    {item.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Capital appreciation */}
      <section className="bg-ivory py-20 lg:py-28">
        <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="Capital Appreciation"
              title="A Five-Year Repricing"
              description="Prime Dubai residential values, indexed to 100 in 2021. The market has nearly doubled without the volatility seen elsewhere."
            />

            <div className="mt-12 flex h-56 items-end gap-4" role="img" aria-label="Prime Dubai residential value index rising from 100 in 2021 to 199 in 2026">
              {INVESTMENT_GROWTH.map((point, index) => {
                const height = (point.value / 200) * 100
                return (
                  <div key={point.label} className="flex flex-1 flex-col items-center gap-3">
                    <span className="text-[11px] tabular-nums text-muted">{point.value}</span>
                    <span
                      className={[
                        'w-full transition-[height] duration-700 ease-luxury',
                        index === INVESTMENT_GROWTH.length - 1 ? 'bg-gold' : 'bg-navy/15',
                      ].join(' ')}
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-[10px] uppercase tracking-label text-muted">
                      {point.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h3 className="font-display text-[1.3rem] text-ink">Prime areas by price growth</h3>
            <ul className="mt-8 space-y-6">
              {DISTRICT_GROWTH.map((district) => (
                <li key={district.name}>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-[13px] text-ink/80">{district.name}</span>
                    <span className="font-display text-[13px] tabular-nums text-gold-deep">
                      +{district.change}%
                    </span>
                  </div>
                  <span className="mt-2.5 block h-[3px] w-full bg-ink/10">
                    <span
                      className="block h-full bg-gold-deep"
                      style={{ width: `${(district.change / 20) * 100}%` }}
                    />
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-9 text-[12px] leading-relaxed text-muted">
              Source: Dubai House Research, compiled from Dubai Land Department transaction records
              and portfolio performance. Past performance is not a guide to future returns.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Rental yield */}
      <section className="bg-navy py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeading
              tone="light"
              eyebrow="Rental Yield"
              title="Income, Measured Honest"
              description="Gross and net yields across the portfolio after service charges, management and vacancy."
            />
          </Reveal>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <Reveal>
              <ul className="space-y-8">
                {YIELD_BANDS.map((band) => (
                  <li key={band.name}>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-[13px] text-ivory/80">{band.name}</span>
                      <span className="text-[12px] tabular-nums text-ivory/55">
                        {band.gross}% gross · {band.net}% net
                      </span>
                    </div>
                    <span className="mt-3 block h-[5px] w-full bg-white/10">
                      <span
                        className="block h-full bg-gold"
                        style={{ width: `${(band.gross / 10) * 100}%` }}
                      />
                    </span>
                    <span className="-mt-[5px] block h-[5px] w-full">
                      <span
                        className="block h-full bg-gold-soft/50"
                        style={{ width: `${(band.net / 10) * 100}%` }}
                      />
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <div className="border border-white/15 p-8">
                <h3 className="font-display text-[1.25rem] text-ivory">What moves the net figure</h3>
                <ul className="mt-6 space-y-5 text-[13px] leading-relaxed text-ivory/65">
                  <li>
                    <span className="text-gold">Service charges</span> — typically AED 18 to AED 45
                    per square foot in the prime apartment segment.
                  </li>
                  <li>
                    <span className="text-gold">Management</span> — professional short-let operation
                    typically adds 150 to 250 basis points of net yield.
                  </li>
                  <li>
                    <span className="text-gold">Vacancy</span> — prime communities have sustained
                    sub-8% vacancy across the past three years.
                  </li>
                </ul>
                <div className="mt-8">
                  <ArrowButton to="/contact" variant="gold" pill>
                    Request a Yield Model
                  </ArrowButton>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Prime investment areas */}
      <section className="bg-warm py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeading eyebrow="Prime Investment Areas" title="Where We Underwrite" />
          </Reveal>

          <div className="mt-12 grid gap-px border-t border-ink/10 sm:grid-cols-2">
            {INVEST_AREAS.map((area, index) => (
              <Reveal key={area.name} delay={index * 70}>
                <div className="h-full border-b border-ink/10 py-8 sm:odd:border-r sm:odd:pr-8 sm:even:pl-8">
                  <h3 className="font-display text-[1.3rem] text-ink">{area.name}</h3>
                  <p className="mt-3.5 max-w-md text-[13px] leading-relaxed text-muted">
                    {area.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Off-plan opportunities */}
      <section className="bg-ivory py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Off-Plan Opportunities"
              title="Enter Earlier in the Cycle"
              description="Escrow-protected allocations with staggered payment plans and 2028–2030 handover windows."
              action={{ label: 'View All', to: '/properties?status=Off-Plan' }}
            />
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {offPlan.map((property, index) => (
              <Reveal key={property.id} delay={index * 90}>
                <PropertyCard property={property} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="bg-warm pb-20 lg:pb-28">
        <div className="shell">
          <Reveal>
            <div className="grid items-center gap-10 border border-ink/10 bg-navy p-9 sm:p-12 lg:grid-cols-[1.3fr_1fr] lg:p-14">
              <div>
                <p className="eyebrow text-gold-soft">Investor Consultation</p>
                <h2 className="display-md mt-4 text-ivory">
                  Speak with an investment specialist.
                </h2>
                <p className="mt-5 max-w-md text-[13.5px] leading-relaxed text-ivory/65">
                  We model yield, exit timing and Golden Visa structuring for private clients and
                  family offices. The first consultation is complimentary.
                </p>
                <div className="mt-8">
                  <ArrowButton to="/contact" variant="gold" pill size="lg">
                    Book a Consultation
                  </ArrowButton>
                </div>
              </div>

              <ul className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  { value: '48h', label: 'Typical response to a brief' },
                  { value: 'AED 2M+', label: 'Golden Visa threshold' },
                  { value: '64%', label: 'International buyer share' },
                ].map((item) => (
                  <li key={item.label} className="border-t border-white/15 pt-5">
                    <p className="font-display text-[1.5rem] text-gold-soft">{item.value}</p>
                    <p className="mt-2 text-[11px] leading-snug text-ivory/60">{item.label}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
