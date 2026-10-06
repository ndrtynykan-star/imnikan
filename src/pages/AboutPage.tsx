import { ArrowButton } from '@/components/ui/ArrowButton'
import { PageHero } from '@/components/sections/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SmartImage } from '@/components/ui/SmartImage'
import { TestimonialSlider } from '@/components/sections/TestimonialSlider'
import { FinalCTA } from '@/components/sections/FinalCTA'
import { HERO_STATS } from '@/data/content'
import { PHOTO } from '@/lib/images'

const VALUES = [
  {
    title: 'Discretion',
    body: 'Most of what we transact never appears on a portal. Off-market briefs stay private, permanently.',
  },
  {
    title: 'Evidence',
    body: 'Every valuation is built from closed transactions, service charges and rental performance — not asking prices.',
  },
  {
    title: 'Continuity',
    body: 'The consultant who takes your brief stays with you through handover, leasing and eventual resale.',
  },
]

const TEAM = [
  { name: 'Layla Al Mansoori', role: 'Founder & Managing Partner', image: PHOTO.interiorC },
  { name: 'Rashid Bin Humaid', role: 'Head of Waterfront Portfolio', image: PHOTO.lobby },
  { name: 'Sofia Petrova', role: 'Director of Investment', image: PHOTO.tower },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Dubai House"
        title="More Than Properties. A Better Future."
        description="Founded in 2011, Dubai House advises a small number of private clients, family offices and international investors across Dubai’s most established communities."
        script="A Global Address for New Beginnings"
        imageId={PHOTO.interiorA}
        imageAlt="Luxury Dubai interior with city views"
      />

      {/* Story — asymmetric */}
      <section className="bg-warm py-20 lg:py-28">
        <div className="shell grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-20">
          <Reveal>
            <div className="relative h-[380px] overflow-hidden lg:h-[520px]">
              <SmartImage
                id={PHOTO.about}
                alt="Dubai residential community with a pool at dusk"
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p className="eyebrow">Our Story</p>
            <h2 className="display-lg mt-4 text-ink">
              Built around the client, not the transaction.
            </h2>
            <div className="mt-7 space-y-5 text-[13.5px] leading-[1.9] text-muted">
              <p>
                Dubai House began as a two-person advisory working out of a DIFC office with a single
                conviction: that buying property in Dubai should feel as considered as the asset
                itself. Fifteen years and 2,500 transactions later, that conviction has not changed.
              </p>
              <p>
                We work with a deliberately limited number of clients each year. That constraint is
                the point — it is what allows us to hold an off-market brief for eighteen months, to
                model a yield properly, and to say no when a deal does not serve the client.
              </p>
              <p>
                Today our clients span four continents, and the majority arrive through referral.
              </p>
            </div>

            <div className="mt-9">
              <ArrowButton to="/contact" variant="gold" pill>
                Talk to an Expert
              </ArrowButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-navy py-20 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow text-gold-soft">Our Mission</p>
            <blockquote className="display-md mt-5 text-ivory">
              To connect people to exceptional properties — and to the future those properties make
              possible.
            </blockquote>
            <p className="mt-7 max-w-lg text-[13.5px] leading-relaxed text-ivory/65">
              We measure our work not in transactions closed but in clients still with us a decade
              later. That is why every engagement begins with the same question: what are you building
              this for?
            </p>
          </Reveal>

          <Reveal delay={120}>
            <ul className="grid grid-cols-2 gap-px border border-white/15 bg-white/10">
              {HERO_STATS.map((stat) => (
                <li key={stat.label} className="bg-navy px-5 py-7">
                  <p className="font-display text-[1.6rem] leading-none text-gold-soft">{stat.value}</p>
                  <p className="mt-3 text-[10.5px] uppercase tracking-label text-ivory/60">
                    {stat.label}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-ivory py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeading eyebrow="How We Work" title="Three Principles." />
          </Reveal>

          <div className="mt-12 grid gap-px border-t border-ink/10 sm:grid-cols-3">
            {VALUES.map((value, index) => (
              <Reveal key={value.title} delay={index * 90}>
                <div className="h-full border-b border-ink/10 py-9 sm:border-r sm:pr-8">
                  <p className="font-display text-[12px] tabular-nums text-gold-deep">0{index + 1}</p>
                  <h3 className="mt-5 font-display text-[1.35rem] text-ink">{value.title}</h3>
                  <p className="mt-3.5 text-[13px] leading-relaxed text-muted">{value.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Global investor network */}
      <section className="bg-warm py-20 lg:py-28">
        <div className="shell grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
          <Reveal>
            <p className="eyebrow">Experience</p>
            <h2 className="display-lg mt-4 text-ink">A Global Investor Network.</h2>
            <p className="mt-6 max-w-lg text-[13.5px] leading-relaxed text-muted">
              Our clients are based across the UK, India, Russia, the Gulf and South-East Asia. That
              network is the asset that cannot be replicated — it is how off-market stock reaches us
              before it reaches the market, and how a disposal finds a buyer in days rather than
              months.
            </p>

            <ul className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {[
                { value: '4', label: 'Continents represented' },
                { value: '68%', label: 'Clients arrive by referral' },
                { value: '19 days', label: 'Median cash acquisition' },
                { value: 'AED 2.5B+', label: 'Transacted to date' },
              ].map((item) => (
                <li key={item.label} className="border-t border-ink/10 pt-5">
                  <p className="font-display text-[1.5rem] text-ink">{item.value}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-label text-muted">{item.label}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative h-[380px] overflow-hidden lg:h-[540px]">
              <SmartImage
                id={PHOTO.palm}
                alt="Palm Jumeirah aerial view at golden hour"
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Team */}
      <section className="bg-ivory py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="The Team"
              title="Senior people, on every mandate."
              description="You will not be handed to a junior after the first meeting."
            />
          </Reveal>

          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member, index) => (
              <Reveal key={member.name} delay={index * 90}>
                <div className="group">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <SmartImage
                      id={member.image}
                      alt={`Portrait of ${member.name}`}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="h-full w-full object-cover transition-transform duration-[900ms] ease-luxury group-hover:scale-[1.05]"
                    />
                  </div>
                  <h3 className="mt-5 font-display text-[1.2rem] text-ink">{member.name}</h3>
                  <p className="mt-1.5 text-[11px] uppercase tracking-label text-muted">
                    {member.role}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TestimonialSlider />
      <FinalCTA />
    </>
  )
}
