import { useRef, useState, useSyncExternalStore } from 'react'
import { HeroSearch } from '@/components/search/HeroSearch'
import { HeroStats } from '@/components/sections/HeroStats'
import { HIGH_PRIORITY, PHOTO, photoSrcSet, photoUrl } from '@/lib/images'
import { useParallax } from '@/hooks/useParallax'
import { useVideoScrub } from '@/hooks/useVideoScrub'
import { HERO_EYEBROW, HERO_SCRIPT, HERO_SUBTITLE, HERO_TITLE_LINES } from '@/data/content'

/**
 * The original image hero — kept as the fallback if the hero video fails to load.
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

/** Quiet scrolling affordance for the pinned video flight. */
function ScrollHint() {
  return (
    <p className="mt-7 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-ivory/70">
      <span className="h-px w-10 bg-gold/70" aria-hidden="true" />
      Scroll to fly through Dubai
    </p>
  )
}

/** True at lg+ — where the full hero (copy, search, stats) fits one pinned screen. */
const LG_QUERY = '(min-width: 1024px)'
function useIsLarge() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(LG_QUERY)
      mq.addEventListener('change', cb)
      return () => mq.removeEventListener('change', cb)
    },
    () => window.matchMedia(LG_QUERY).matches,
  )
}

function HeroSearchBlock({ className = '' }: { className?: string }) {
  return (
    <div className={`max-w-5xl animate-fade-up ${className}`}>
      <HeroSearch />
      <HeroStats />
    </div>
  )
}

const HERO_VIDEO = '/videos/hero.mp4'
const HERO_POSTER = '/videos/hero-poster.jpg'

/**
 * Pinned cinematic hero — the supplied 3D fly-through video fills the viewport
 * and its timeline is driven by scroll (forwards and backwards). The wrapper
 * spans 300svh; the video stays sticky and releases into the next section on
 * its final frame. Reduced-motion users get the static poster frame; a video
 * load failure falls back to the original image hero.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [failed, setFailed] = useState(false)
  const isLarge = useIsLarge()

  const reducedMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  ).current

  useVideoScrub(sectionRef, videoRef, !reducedMotion && !failed)

  if (failed) return <HeroImageScene />

  return (
    <>
    <section ref={sectionRef} className={`relative ${reducedMotion ? '' : 'h-[300svh]'}`}>
      <div className="sticky top-0 flex h-svh w-full flex-col justify-end overflow-hidden isolate">
        <div className="absolute inset-0 -z-10 bg-navy" aria-hidden="true">
          {reducedMotion ? (
            <img src={HERO_POSTER} alt="" className="h-full w-full object-cover object-center" />
          ) : (
            <video
              ref={videoRef}
              src={HERO_VIDEO}
              poster={HERO_POSTER}
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              tabIndex={-1}
              onError={() => setFailed(true)}
              className="h-full w-full object-cover object-center"
            />
          )}
        </div>

        {/* Light readability scrims — the video stays visually dominant. */}
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/60 via-navy/15 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-navy/60 to-transparent"
          aria-hidden="true"
        />

        <div className="shell relative z-10 pb-10 pt-28 lg:pb-12 lg:pt-32">
          <HeroCopy />
          {isLarge && <HeroSearchBlock className="mt-9" />}
          {!reducedMotion && <ScrollHint />}
        </div>
      </div>
    </section>
    {/* Small screens: the search module can't share one pinned screen with the
        headline, so it follows directly after the video flight. */}
    {!isLarge && (
      <div className="bg-navy">
        <div className="shell pb-10 pt-8">
          <HeroSearchBlock />
        </div>
      </div>
    )}
    </>
  )
}
