import { HeroSearch } from '@/components/search/HeroSearch'
import { HeroStats } from '@/components/sections/HeroStats'
import { HIGH_PRIORITY, PHOTO, photoSrcSet, photoUrl } from '@/lib/images'
import { useParallax } from '@/hooks/useParallax'
import { HERO_EYEBROW, HERO_SCRIPT, HERO_SUBTITLE, HERO_TITLE_LINES } from '@/data/content'

export function Hero() {
  const parallaxRef = useParallax<HTMLDivElement>(0.12)

  return (
    <section className="relative isolate flex min-h-[700px] flex-col justify-end overflow-hidden lg:min-h-[min(860px,94svh)]">
      <div ref={parallaxRef} className="absolute inset-x-0 -top-20 bottom-0 -z-10" aria-hidden="true">
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

      {/* Readability scrims — heavier on the left where the copy sits. */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/95 via-navy/55 to-navy/10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-navy/85 to-transparent"
        aria-hidden="true"
      />

      <div className="shell relative pb-10 pt-28 lg:pb-12 lg:pt-32">
        <div className="max-w-3xl">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2 animate-fade-in">
            {HERO_EYEBROW.map((word, index) => (
              <span key={word} className="flex items-center gap-3">
                {index > 0 && <span className="h-3 w-px bg-gold/60" aria-hidden="true" />}
                <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-gold-soft">
                  {word}
                </span>
              </span>
            ))}
          </p>

          <h1 className="display-xl mt-6 text-ivory animate-fade-up">
            {HERO_TITLE_LINES.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-4 font-script text-[1.8rem] leading-tight text-gold-soft animate-fade-up sm:text-[2.1rem]">
            {HERO_SCRIPT}
          </p>

          <p className="mt-5 max-w-lg text-[14px] leading-relaxed text-ivory/80 animate-fade-up">
            {HERO_SUBTITLE}
          </p>
        </div>

        <div className="mt-9 max-w-5xl animate-fade-up">
          <HeroSearch />
          <HeroStats />
        </div>
      </div>
    </section>
  )
}
