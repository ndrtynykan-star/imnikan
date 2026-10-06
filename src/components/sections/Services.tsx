import {
  ArrowUpRight,
  Building2,
  ChartNoAxesCombined,
  Globe2,
  KeyRound,
  Layers,
  Tag,
} from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { SERVICES } from '@/data/content'

const ICONS = {
  key: KeyRound,
  tag: Tag,
  building: Building2,
  chart: ChartNoAxesCombined,
  layers: Layers,
  globe: Globe2,
} as const

export function Services() {
  return (
    <section className="bg-ink-800 py-20 lg:py-28">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow">Our Services</p>
              <h2 className="display-lg mt-5 max-w-xl text-cream">
                Expertise Beyond
                <br />
                Real Estate.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              One advisory across acquisition, disposal, management and structuring — so nothing is
              handed off to a third party.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-px border-t border-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = ICONS[service.icon]
            return (
              <Reveal key={service.number} delay={(index % 3) * 90}>
                <a
                  href="#contact"
                  className="group flex h-full flex-col border-b border-white/[0.08] py-9 pr-6 transition-colors duration-500 ease-luxury sm:border-r"
                >
                  <div className="flex items-start justify-between gap-4">
                    <Icon
                      className="h-6 w-6 text-champagne transition-transform duration-500 ease-luxury group-hover:-translate-y-0.5"
                      strokeWidth={1.25}
                      aria-hidden="true"
                    />
                    <span className="font-display text-sm tabular-nums text-muted/70">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="mt-7 font-display text-[1.35rem] text-cream transition-colors duration-400 ease-luxury group-hover:text-champagne">
                    {service.title}
                  </h3>

                  <p className="mt-3 flex-1 text-[13px] leading-relaxed text-muted">
                    {service.description}
                  </p>

                  <span className="mt-6 flex items-center gap-2 text-[10.5px] uppercase tracking-label text-champagne/80 transition-colors duration-400 group-hover:text-champagne">
                    Enquire
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform duration-400 ease-luxury group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
