import { Building2, Handshake, MapPin, ShieldCheck } from 'lucide-react'
import { TRUST_ITEMS } from '@/data/content'

const ICONS = {
  shield: ShieldCheck,
  building: Building2,
  pin: MapPin,
  handshake: Handshake,
} as const

/** Gold-icon value strip pinned to the foot of the hero. */
export function TrustStrip() {
  return (
    <div className="relative border-t border-white/10 bg-ink/70 backdrop-blur-md">
      <div className="shell">
        <ul className="grid grid-cols-2 divide-white/[0.08] lg:grid-cols-4 lg:divide-x">
          {TRUST_ITEMS.map((item) => {
            const Icon = ICONS[item.icon]
            const [first, second] = item.title.split('\n')
            return (
              <li
                key={item.title}
                className="group flex items-center gap-4 py-6 lg:justify-center lg:px-6"
              >
                <Icon
                  className="h-6 w-6 shrink-0 text-champagne transition-transform duration-500 ease-luxury group-hover:scale-110"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
                <span className="text-[10.5px] font-medium uppercase leading-[1.5] tracking-label text-cream/90">
                  {first}
                  <br />
                  {second}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
