import { useState } from 'react'
import { ArrowButton } from '@/components/ui/ArrowButton'
import { Reveal } from '@/components/ui/Reveal'
import { SmartImage } from '@/components/ui/SmartImage'
import { LOCATIONS } from '@/data/content'
import { photoSrcSet, photoUrl } from '@/lib/images'

/** Dark navy location explorer — selecting a community swaps the backdrop. */
export function PrimeLocations() {
  const [active, setActive] = useState(0)
  const current = LOCATIONS[active]

  return (
    <section className="relative isolate overflow-hidden bg-navy">
      {LOCATIONS.map((location, index) => (
        <img
          key={location.name}
          src={photoUrl(location.image, 1920)}
          srcSet={photoSrcSet(location.image)}
          sizes="100vw"
          alt=""
          aria-hidden="true"
          className={[
            'absolute inset-0 -z-10 h-full w-full object-cover transition-opacity duration-700 ease-luxury',
            index === active ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
        />
      ))}
      <div className="absolute inset-0 -z-10 bg-navy/80" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-navy/40"
        aria-hidden="true"
      />

      <div className="shell grid gap-14 py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:py-28">
        <Reveal>
          <p className="eyebrow text-gold-soft">Prime Locations</p>
          <h2 className="display-lg mt-4 text-ivory">
            Iconic Places.
            <br />
            Extraordinary Living.
          </h2>
          <p className="mt-6 max-w-md text-[13.5px] leading-relaxed text-ivory/65">
            From the heart of Downtown to the serenity of Palm Jumeirah, explore Dubai’s most
            sought-after locations.
          </p>

          <div className="mt-10">
            <ArrowButton to="/properties" variant="gold" pill>
              Explore Locations
            </ArrowButton>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div role="tablist" aria-label="Prime locations" className="border-t border-white/15">
            {LOCATIONS.map((location, index) => {
              const isActive = index === active
              return (
                <button
                  key={location.name}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(index)}
                  className={[
                    'group flex w-full items-center gap-5 border-b border-white/15 px-4 py-4 text-left transition-colors duration-400 ease-luxury sm:px-5',
                    isActive ? 'bg-white/[0.07]' : 'hover:bg-white/[0.04]',
                  ].join(' ')}
                >
                  <span className="relative h-14 w-20 shrink-0 overflow-hidden">
                    <SmartImage
                      id={location.image}
                      alt=""
                      sizes="80px"
                      className="h-full w-full object-cover"
                    />
                  </span>

                  <span className="flex-1">
                    <span
                      className={[
                        'block font-display text-[1.15rem] transition-colors duration-400 ease-luxury',
                        isActive ? 'text-gold-soft' : 'text-ivory group-hover:text-gold-soft',
                      ].join(' ')}
                    >
                      {location.name}
                    </span>
                    <span className="mt-1 block text-[11px] text-ivory/55">{location.tagline}</span>
                  </span>

                  <span className="hidden shrink-0 text-right sm:block">
                    <span className="block font-display text-[1.05rem] text-ivory/85">
                      {location.averagePrice}
                    </span>
                    <span className="mt-1 block text-[10px] uppercase tracking-label text-ivory/45">
                      {location.properties} listings
                    </span>
                  </span>

                  <span
                    className={[
                      'h-2 w-2 shrink-0 rounded-full transition-colors duration-400 ease-luxury',
                      isActive ? 'bg-gold' : 'bg-white/25',
                    ].join(' ')}
                    aria-hidden="true"
                  />
                </button>
              )
            })}
          </div>

          <div className="mt-6 border border-dashed border-ivory/30 p-6">
            <p className="font-script text-[1.6rem] leading-snug text-ivory">
              {current.tagline}
            </p>
            <p className="mt-2 text-[11px] uppercase tracking-label text-ivory/55">
              Average price {current.averagePrice}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
