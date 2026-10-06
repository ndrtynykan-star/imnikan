import { Building2, Diamond, MapPin } from 'lucide-react'
import { ArrowButton } from '@/components/ui/ArrowButton'
import { Reveal } from '@/components/ui/Reveal'
import { PHOTO, photoSrcSet, photoUrl } from '@/lib/images'

const META = [
  { Icon: MapPin, label: 'Dubai, UAE' },
  { Icon: Building2, label: 'Luxury Homes' },
  { Icon: Diamond, label: 'Investment Opportunities' },
]

export function CinematicCTA() {
  return (
    <section className="relative isolate flex min-h-[620px] flex-col justify-center overflow-hidden py-24 lg:min-h-[700px]">
      <img
        src={photoUrl(PHOTO.cinematic, 2400)}
        srcSet={photoSrcSet(PHOTO.cinematic)}
        sizes="100vw"
        alt="Dubai skyline at night seen from a luxury waterfront residence"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 -z-10 bg-ink/80" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-transparent to-ink"
        aria-hidden="true"
      />

      <div className="shell relative">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Your Dream Home Awaits</p>
            <h2 className="display-lg mt-6 text-cream">
              Your Next Address
              <br />
              Starts Here.
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-cream/70">
              Explore premium properties in Dubai with expert guidance and personalized service.
            </p>
            <div className="mt-10 flex justify-center">
              <ArrowButton to="/contact" variant="gold" size="lg">
                Schedule A Viewing
              </ArrowButton>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <ul className="mx-auto mt-16 grid max-w-3xl gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
            {META.map(({ Icon, label }) => (
              <li key={label} className="flex items-center justify-center gap-3">
                <Icon className="h-[18px] w-[18px] shrink-0 text-champagne" strokeWidth={1.25} aria-hidden="true" />
                <span className="text-[10.5px] uppercase tracking-label text-cream/80">{label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
