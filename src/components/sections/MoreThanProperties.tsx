import { HeartHandshake, LineChart, ShieldCheck } from 'lucide-react'
import { ArrowButton } from '@/components/ui/ArrowButton'
import { Reveal } from '@/components/ui/Reveal'
import { SmartImage } from '@/components/ui/SmartImage'
import { TRUST_POINTS } from '@/data/content'
import { PHOTO } from '@/lib/images'

const ICONS = {
  shield: ShieldCheck,
  support: HeartHandshake,
  growth: LineChart,
} as const

/**
 * The reference's asymmetric editorial band: a large residence frame, the navy
 * statement panel, and a tall architectural image carrying the script quote.
 */
export function MoreThanProperties() {
  return (
    <section className="bg-warm">
      <div className="grid lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <div className="relative h-72 overflow-hidden lg:h-full lg:min-h-[560px]">
            <SmartImage
              id={PHOTO.villaD}
              alt="Contemporary Dubai villa with a landscaped terrace at dusk"
              sizes="(min-width: 1024px) 34vw, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>

        <div className="flex items-center bg-navy px-5 py-14 sm:px-10 lg:col-span-5 lg:px-14 lg:py-20">
          <Reveal>
            <p className="eyebrow text-gold-soft">Who We Are</p>
            <h2 className="display-md mt-5 text-ivory">
              More Than Properties
              <br />
              A Better Future
            </h2>
            <p className="mt-6 max-w-md text-[13.5px] leading-relaxed text-ivory/65">
              At Dubai House, we connect global investors with exceptional real estate opportunities
              in one of the world’s most dynamic cities.
            </p>

            <div className="mt-9">
              <ArrowButton to="/about" variant="gold" pill>
                Our Story
              </ArrowButton>
            </div>

            <ul className="mt-12 grid gap-8 sm:grid-cols-3">
              {TRUST_POINTS.map((point) => {
                const Icon = ICONS[point.icon]
                return (
                  <li key={point.title}>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold">
                      <Icon className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" />
                    </span>
                    <p className="mt-4 whitespace-pre-line text-[11px] uppercase leading-relaxed tracking-wide text-ivory/75">
                      {point.title}
                    </p>
                  </li>
                )
              })}
            </ul>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-3" delay={120}>
          <div className="relative h-80 overflow-hidden lg:h-full lg:min-h-[560px]">
            <SmartImage
              id={PHOTO.cinematic}
              alt="Architectural detail of a luxury Dubai residence"
              sizes="(min-width: 1024px) 26vw, 100vw"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-navy/45" aria-hidden="true" />
            <div className="absolute inset-x-6 bottom-8 border border-dashed border-ivory/45 p-6 lg:inset-x-7">
              <p className="font-script text-[1.7rem] leading-snug text-ivory">
                Where opportunity meets extraordinary living.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
