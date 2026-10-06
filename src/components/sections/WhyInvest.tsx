import { ArrowRight, Globe2, Landmark, Percent, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal } from '@/components/ui/Reveal'
import { SmartImage } from '@/components/ui/SmartImage'
import { INVEST_BENEFITS } from '@/data/content'
import { PHOTO } from '@/lib/images'

const ICONS = {
  percent: Percent,
  yield: TrendingUp,
  infra: Landmark,
  hub: Globe2,
} as const

export function WhyInvest() {
  return (
    <section className="bg-warm py-20 lg:py-28">
      <div className="shell grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-20">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Investment</p>
              <h2 className="display-lg mt-4 text-ink">Why Invest in Dubai?</h2>
            </div>
            <Link
              to="/invest"
              className="group inline-flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-label text-muted transition-colors duration-400 ease-luxury hover:text-ink"
            >
              Learn More
              <ArrowRight
                className="h-3.5 w-3.5 text-gold transition-transform duration-400 ease-luxury group-hover:translate-x-1"
                strokeWidth={1.6}
                aria-hidden="true"
              />
            </Link>
          </div>

          <ul className="mt-12 grid gap-px border-t border-ink/10 sm:grid-cols-2">
            {INVEST_BENEFITS.map((benefit) => {
              const Icon = ICONS[benefit.icon]
              return (
                <li
                  key={benefit.title}
                  className="group flex items-start gap-4 border-b border-ink/10 py-7 sm:odd:border-r sm:odd:pr-8 sm:even:pl-8"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/15 text-gold-deep transition-colors duration-400 ease-luxury group-hover:border-gold group-hover:bg-gold/10">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.4} aria-hidden="true" />
                  </span>
                  <span className="pt-2 font-display text-[1.05rem] leading-snug text-ink">
                    {benefit.title}
                  </span>
                </li>
              )
            })}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative h-[380px] overflow-hidden lg:h-[560px]">
            <SmartImage
              id={PHOTO.burj}
              alt="Dubai skyline with the Burj Al Arab and coastline at golden hour"
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
