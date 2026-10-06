import { About } from '@/components/sections/About'
import { FinalCTA } from '@/components/sections/FinalCTA'
import { PageHero } from '@/components/sections/PageHero'
import { StatsGrid } from '@/components/sections/StatsGrid'
import { Testimonials } from '@/components/sections/Testimonials'
import { Reveal } from '@/components/ui/Reveal'
import { STATS } from '@/data/content'
import { PHOTO } from '@/lib/images'

const PRINCIPLES = [
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
    body: 'The advisor who takes your brief stays with you through handover, leasing and eventual resale.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Dubai Elite Homes"
        title="A Private Advisory For Dubai’s Prime Market."
        description="Founded in 2016, we act for a small number of private clients, family offices and international investors across Dubai’s most established communities."
        imageId={PHOTO.interiorC}
        imageAlt="Luxury Dubai interior with city views"
      />

      <About />

      <section className="bg-ink py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow">How We Work</p>
              <h2 className="display-lg mt-5 text-cream">Three Principles.</h2>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-px border-t border-white/[0.08] sm:grid-cols-3">
            {PRINCIPLES.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 100}>
                <div className="h-full border-b border-white/[0.08] py-9 sm:border-r sm:pr-8">
                  <p className="font-display text-sm tabular-nums text-champagne/70">
                    0{index + 1}
                  </p>
                  <h3 className="mt-5 font-display text-[1.4rem] text-cream">{principle.title}</h3>
                  <p className="mt-3.5 text-[13px] leading-relaxed text-muted">{principle.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16">
            <StatsGrid stats={STATS} />
          </Reveal>
        </div>
      </section>

      <Testimonials />
      <FinalCTA />
    </>
  )
}
