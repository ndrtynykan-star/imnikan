import { ArrowButton } from '@/components/ui/ArrowButton'
import { Reveal } from '@/components/ui/Reveal'
import { SmartImage } from '@/components/ui/SmartImage'
import { PHOTO } from '@/lib/images'

const POINTS = [
  'Local market knowledge built over a decade of prime Dubai transactions.',
  'Access to off-market villas, penthouses and developer allocations.',
  'A single advisor from first viewing to title deed and beyond.',
]

export function About() {
  return (
    <section className="bg-cream py-20 text-graphite lg:py-28">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <SmartImage
                  id={PHOTO.about}
                  alt="Contemporary luxury villa architecture in Dubai"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="absolute -bottom-6 -right-4 hidden w-52 border border-champagne/30 bg-ink p-6 sm:block lg:-right-8">
                <p className="font-display text-[2.4rem] leading-none text-champagne">500+</p>
                <p className="mt-2.5 text-[10px] uppercase leading-relaxed tracking-label text-cream/70">
                  Properties transacted for private clients
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="lg:pt-6">
              <p className="eyebrow-dark">About Dubai Elite Homes</p>
              <h2 className="display-lg mt-5 text-graphite">
                We Don&rsquo;t Just
                <br />
                Find Homes.
                <br />
                We Find
                <br />
                Opportunities.
              </h2>

              <p className="mt-7 max-w-lg text-sm leading-relaxed text-graphite/70">
                Dubai Elite Homes was founded on a simple premise: the best acquisitions are never
                advertised. We combine deep community-level knowledge with institutional underwriting,
                so our clients see the right property before the market does — and know exactly what it
                is worth.
              </p>

              <ul className="mt-9 space-y-4 border-t border-graphite/10 pt-8">
                {POINTS.map((point) => (
                  <li key={point} className="flex gap-4 text-[13.5px] leading-relaxed text-graphite/75">
                    <span className="mt-2.5 h-px w-6 shrink-0 bg-gold" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap gap-4">
                <ArrowButton to="/about" variant="solid">
                  Our Story
                </ArrowButton>
                <ArrowButton to="/contact" variant="outline" className="!border-graphite/25 !text-graphite hover:!border-gold hover:!bg-gold/10">
                  Book A Consultation
                </ArrowButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
