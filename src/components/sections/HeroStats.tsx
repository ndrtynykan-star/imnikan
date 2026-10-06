import { Building2, CalendarDays, Globe2, Smile } from 'lucide-react'
import { HERO_STATS } from '@/data/content'

const ICONS = {
  building: Building2,
  smile: Smile,
  calendar: CalendarDays,
  globe: Globe2,
} as const

/** Four headline statistics, sitting under the hero search console. */
export function HeroStats() {
  return (
    <ul className="grid grid-cols-2 divide-ink/10 border-t border-ink/10 lg:grid-cols-4 lg:divide-x">
      {HERO_STATS.map((stat) => {
        const Icon = ICONS[stat.icon]
        return (
          <li key={stat.label} className="flex items-center gap-3.5 px-5 py-4 sm:px-8">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/15 text-gold-deep">
              <Icon className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-[1.25rem] text-ink">{stat.value}</span>
              <span className="mt-0.5 block text-[10.5px] uppercase tracking-wide text-muted">
                {stat.label}
              </span>
            </span>
          </li>
        )
      })}
    </ul>
  )
}
