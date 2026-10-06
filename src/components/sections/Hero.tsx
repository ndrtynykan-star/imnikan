import { ArrowButton } from '@/components/ui/ArrowButton'
import { TrustStrip } from '@/components/sections/TrustStrip'
import { HIGH_PRIORITY, PHOTO, photoSrcSet, photoUrl } from '@/lib/images'
import { useParallax } from '@/hooks/useParallax'

export function Hero() {
  const parallaxRef = useParallax<HTMLDivElement>(0.14)

  return (
    <section className="relative isolate -mt-20 flex min-h-[680px] flex-col justify-end overflow-hidden lg:min-h-[840px]">
      <div ref={parallaxRef} className="absolute inset-x-0 -top-24 bottom-0 -z-10" aria-hidden="true">
        <img
          src={photoUrl(PHOTO.heroSkyline, 2400)}
          srcSet={photoSrcSet(PHOTO.heroSkyline)}
          sizes="100vw"
          alt=""
          className="h-full w-full object-cover object-center will-change-transform"
          style={{ transform: 'translate3d(0, var(--parallax, 0), 0) scale(1.08)' }}
          {...HIGH_PRIORITY}
          decoding="async"
        />
      </div>

      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/70 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/25 to-ink/55"
        aria-hidden="true"
      />

      <div className="shell relative pb-14 pt-40 lg:pb-20 lg:pt-52">
        <div className="max-w-3xl">
          <p className="eyebrow animate-fade-in">Dubai Luxury Real Estate</p>

          <h1 className="display-xl mt-6 text-cream animate-fade-up">
            Find Your
            <br />
            Place In
            <br />
            <span className="text-champagne">Dubai.</span>
          </h1>

          <p className="mt-7 max-w-md font-sans text-sm leading-relaxed text-cream/75 sm:text-[15px] animate-fade-up">
            Exceptional properties.
            <br />
            Expert guidance.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 animate-fade-up">
            <ArrowButton to="/properties" variant="gold" size="lg" className="w-full sm:w-auto">
              View Properties
            </ArrowButton>
            <ArrowButton to="/properties?view=locations" variant="outline" size="lg" className="w-full sm:w-auto">
              Explore Dubai
            </ArrowButton>
          </div>
        </div>
      </div>

      <TrustStrip />
    </section>
  )
}
