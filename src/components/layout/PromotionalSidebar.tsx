import {
  ArrowRight,
  Gift,
  Headset,
  LineChart,
  Monitor,
  ShieldCheck,
} from 'lucide-react'
import { DevVortexMark } from '@/components/layout/DevVortexMark'
import { SIDEBAR_FEATURES } from '@/data/content'

const ICONS = {
  monitor: Monitor,
  chart: LineChart,
  shield: ShieldCheck,
  headset: Headset,
} as const

type Props = {
  /**
   * `rail` — fixed right-hand panel on desktop (the reference layout).
   * `inline` — the same content as a normal page section for tablet/mobile.
   */
  variant: 'rail' | 'inline'
}

function SidebarBody() {
  return (
    <>
      <div className="flex items-center gap-3">
        <DevVortexMark className="h-11 w-11 shrink-0" />
        <div className="leading-none">
          <p className="font-sans text-[15px] font-semibold tracking-[0.08em] text-paper">DEV VORTEX</p>
          <p className="mt-1.5 text-[8.5px] uppercase tracking-[0.26em] text-muted">
            Web Design Studio
          </p>
        </div>
      </div>

      <div className="mt-7 h-px w-full bg-gradient-to-r from-champagne/70 via-champagne/25 to-transparent" />

      <h2 className="mt-7 font-sans text-[19px] font-semibold uppercase leading-[1.25] tracking-[0.02em] text-paper">
        Want a website that grows your business?
      </h2>

      <p className="mt-4 text-[12.5px] leading-relaxed text-muted">
        We design modern, SEO-optimized websites that turn visitors into loyal customers.
      </p>

      <ul className="mt-8 space-y-px">
        {SIDEBAR_FEATURES.map((feature) => {
          const Icon = ICONS[feature.icon]
          return (
            <li
              key={feature.title}
              className="group flex items-center gap-3 border-b border-white/[0.07] py-3.5 last:border-b-0"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-champagne/25 text-champagne transition-colors duration-400 ease-luxury group-hover:border-champagne/70 group-hover:text-gold-soft">
                <Icon className="h-[15px] w-[15px]" aria-hidden="true" />
              </span>
              <span className="text-[10.5px] font-medium uppercase leading-snug tracking-[0.13em] text-cream/85">
                {feature.title}
              </span>
            </li>
          )
        })}
      </ul>

      <a
        href="#contact"
        className="group mt-8 block border border-champagne/35 bg-champagne/[0.04] p-5 transition-all duration-500 ease-luxury hover:border-champagne/80 hover:bg-champagne/[0.09]"
      >
        <Gift className="h-5 w-5 text-champagne" aria-hidden="true" />
        <span className="mt-4 flex items-center gap-2 font-sans text-[15px] font-semibold uppercase leading-tight tracking-[0.04em] text-paper">
          Get Your Free Quote
          <ArrowRight
            className="h-4 w-4 text-champagne transition-transform duration-400 ease-luxury group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
        <span className="mt-2.5 block text-[12px] leading-relaxed text-muted">
          Let&rsquo;s create a powerful website for your business.
        </span>
      </a>

      <p className="mt-auto pt-10 font-script text-[26px] leading-[1.25] text-champagne">
        Let&rsquo;s build
        <br />
        something amazing
        <br />
        together!
      </p>
    </>
  )
}

export function PromotionalSidebar({ variant }: Props) {
  if (variant === 'rail') {
    return (
      <aside
        aria-label="DevVortex web design studio"
        className="fixed inset-y-0 right-0 z-30 hidden w-72 flex-col overflow-y-auto border-l border-champagne/15 bg-ink px-7 py-8 lg:flex xl:w-80 xl:px-8"
      >
        <SidebarBody />
      </aside>
    )
  }

  return (
    <aside
      aria-label="DevVortex web design studio"
      className="border-t border-champagne/15 bg-ink-800 px-5 py-12 sm:px-8 lg:hidden"
    >
      <div className="mx-auto flex max-w-xl flex-col">
        <SidebarBody />
      </div>
    </aside>
  )
}
