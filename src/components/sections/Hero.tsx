import { useRef, useState } from 'react'
import { HeroSearch } from '@/components/search/HeroSearch'
import { HeroStats } from '@/components/sections/HeroStats'
import { HeroScene } from '@/components/three/HeroScene'
import { HIGH_PRIORITY, PHOTO, photoSrcSet, photoUrl } from '@/lib/images'
import { useParallax } from '@/hooks/useParallax'
import { HERO_EYEBROW, HERO_SCRIPT, HERO_SUBTITLE, HERO_TITLE_LINES } from '@/data/content'

/**
 * The original image hero — kept as the WebGL fallback if the browser cannot
 * create a 3D context (and as the plain backdrop while the scene compiles).
 */
function HeroImageScene() {
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
        <HeroCopy />
      </div>
    </section>
  )
}

function HeroCopy() {
  return (
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
  )
}

/** Quiet scrolling affordance for the pinned 3D flight. */
function ScrollHint() {
  return (
    <p className="mt-7 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-ivory/70">
      <span className="h-px w-10 bg-gold/70" aria-hidden="true" />
      Scroll to fly through Dubai
    </p>
  )
}

/**
 * Pinned 3D hero — a full-screen WebGL corridor the camera flies through as the
 * user scrolls (reversed just the same). The wrapper spans 300svh; the canvas
 * stays sticky at the top of the viewport, then releases into the next section.
 */
export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [failed, setFailed] = useState(false)

  const reducedMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  ).current

  if (failed) return <HeroImageScene />

  return (
    <section ref={sectionRef} className="relative h-[300svh]">
      <div className="sticky top-0 flex h-svh flex-col justify-end overflow-hidden isolate">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          {/* Backdrop while WebGL initialises; also the non-WebGL fallback. */}
          <img
            src={photoUrl(PHOTO.heroSkyline, 2400)}
            srcSet={photoSrcSet(PHOTO.heroSkyline)}
            sizes="100vw"
            alt=""
            className="h-full w-full object-cover object-center"
            {...HIGH_PRIORITY}
            decoding="async"
          />
          <HeroScene
            sectionRef={sectionRef}
            contentRef={contentRef}
            staticFrame={reducedMotion}
            onFailed={() => setFailed(true)}
          />
        </div>

        {/* Readability scrims — kept light so the 3D scene stays dominant. */}
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/80 via-navy/35 to-navy/5"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-navy/75 to-transparent"
          aria-hidden="true"
        />

        <div
          ref={contentRef}
          className="shell relative z-10 pb-10 pt-28 lg:pb-12 lg:pt-32 will-change-transform"
        >
          <HeroCopy />
          <div className="mt-9 max-w-5xl animate-fade-up">
            <HeroSearch />
            <HeroStats />
          </div>
          <ScrollHint />
        </div>
      </div>
    </section>
  )
}
