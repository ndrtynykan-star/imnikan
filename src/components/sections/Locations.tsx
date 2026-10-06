import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal } from '@/components/ui/Reveal'
import { LOCATIONS } from '@/data/content'
import { SmartImage } from '@/components/ui/SmartImage'

export function Locations() {
  return (
    <section className="bg-ink py-20 lg:py-28">
      <div className="shell">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">Communities</p>
            <h2 className="display-lg mt-5 text-cream">
              Explore Dubai&rsquo;s
              <br />
              Most Exclusive
              <br />
              Addresses.
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {LOCATIONS.map((location, index) => (
            <Reveal key={location.name} delay={(index % 4) * 80}>
              <Link
                to={`/properties?location=${encodeURIComponent(location.name)}`}
                className="group relative block aspect-[4/5] overflow-hidden border border-white/[0.08] transition-colors duration-500 ease-luxury hover:border-champagne/45"
              >
                <SmartImage
                  id={location.image}
                  alt={`Architecture in ${location.name}, Dubai`}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-[1100ms] ease-luxury group-hover:scale-[1.09]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/5 transition-opacity duration-500 ease-luxury group-hover:from-ink group-hover:via-ink/55"
                  aria-hidden="true"
                />

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[9.5px] uppercase tracking-label text-champagne/80">
                    {location.properties} listings
                  </p>
                  <h3 className="mt-2 font-display text-[1.25rem] leading-tight text-cream transition-colors duration-400 ease-luxury group-hover:text-champagne">
                    {location.name}
                  </h3>
                  <p className="mt-2 max-h-0 overflow-hidden text-[12px] leading-relaxed text-muted opacity-0 transition-all duration-500 ease-luxury group-hover:max-h-16 group-hover:opacity-100">
                    {location.tagline}
                  </p>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[11px] tracking-wide text-cream/70">
                      Avg. {location.averagePrice}
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 translate-y-2 text-champagne opacity-0 transition-all duration-500 ease-luxury group-hover:translate-y-0 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
