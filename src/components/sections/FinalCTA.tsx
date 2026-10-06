import { ArrowButton } from '@/components/ui/ArrowButton'
import { Reveal } from '@/components/ui/Reveal'
import { SmartImage } from '@/components/ui/SmartImage'
import { PHOTO } from '@/lib/images'

export function FinalCTA() {
  return (
    <section className="bg-warm">
      <div className="shell py-20 lg:py-28">
        <Reveal>
          <div className="grid items-center gap-12 border border-ink/10 bg-ivory p-8 sm:p-12 lg:grid-cols-2 lg:gap-16 lg:p-14">
            <div>
              <p className="eyebrow">Let’s Build Your Tomorrow</p>
              <h2 className="display-lg mt-4 text-ink">Ready to Find Your Place in Dubai?</h2>
              <p className="mt-6 max-w-md text-[13.5px] leading-relaxed text-muted">
                Get expert advice, personalised property recommendations, and exclusive access to
                off-market opportunities.
              </p>
              <div className="mt-9">
                <ArrowButton to="/contact" variant="gold" pill size="lg">
                  Talk to an Expert
                </ArrowButton>
              </div>
            </div>

            <div className="relative h-[260px] overflow-hidden lg:h-[340px]">
              <SmartImage
                id={PHOTO.skylineNight}
                alt="Panoramic Dubai skyline illuminated at night"
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-navy/45" aria-hidden="true" />
              <p className="absolute inset-x-7 bottom-7 text-[11px] uppercase leading-[1.9] tracking-[0.28em] text-ivory">
                Invest Today
                <br />
                A Brighter
                <br />
                Tomorrow Awaits
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
