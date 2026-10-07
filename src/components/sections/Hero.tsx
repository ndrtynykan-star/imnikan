import { useRef, useState } from 'react'
import { HeroSearch } from '@/components/search/HeroSearch'
import { HeroStats } from '@/components/sections/HeroStats'
import { HIGH_PRIORITY, PHOTO, photoSrcSet, photoUrl } from '@/lib/images'
import { useParallax } from '@/hooks/useParallax'
import { useScrollScrub } from '@/hooks/useScrollScrub'
import { HERO_EYEBROW, HERO_SCRIPT, HERO_SUBTITLE, HERO_TITLE_LINES } from '@/data/content'

const HERO_POSTER = photoUrl(PHOTO.heroSkyline, 1600)

/**
 * The original image hero. Reused three times:
 *  1. as the backdrop that shows while the video buffers (no black flash),
 *  2. as the full experience for `prefers-reduced-motion` users,
 *  3. as the fallback if the video file cannot load.
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

/** Scrolling hint — quiet, non-blocking, disappears with the rest of the copy. */
function ScrollHint({ ready }: { ready: boolean }) {
  return (
    <p
      className="mt-7 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-ivory/70 transition-opacity duration-500"
      style={{ opacity: ready ? undefined : 0 }}
    >
      <span className="h-px w-10 bg-gold/70" aria-hidden="true" />
      Scroll to explore
    </p>
  )
}

/**
 * Cinematic scroll-scrubbed hero.
 *
 * The video is NEVER played, looped or autoplayed — scrolling alone drives
 * `video.currentTime`, in both directions, through the entire clip. The hero
 * wrapper spans 300svh; the visual itself is pinned for that distance, then
 * releases seamlessly into the next section with the clip resting on its final
 * frame. React renders only on load-state transitions; every scroll-driven
 * frame update happens in one rAF loop writing straight to the video element.
 */
export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const readyRef = useRef(false)
  const [revealed, setRevealed] = useState(false)
  const [failed, setFailed] = useState(false)

  const reducedMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  ).current

  useScrollScrub({ sectionRef, videoRef, contentRef, readyRef })

  if (reducedMotion || failed) return <HeroImageScene />

  return (
    <section ref={sectionRef} className="relative h-[300svh]">
      <div className="sticky top-0 flex h-svh flex-col justify-end overflow-hidden isolate">
        <div className="absolute inset-x-0 inset-y-0 -z-10" aria-hidden="true">
          {/* Loading backdrop / fallback — replaced visually by the video reveal. */}
          <img
            src={photoUrl(PHOTO.heroSkyline, 2400)}
            srcSet={photoSrcSet(PHOTO.heroSkyline)}
            sizes="100vw"
            alt=""
            className="h-full w-full object-cover object-center"
            {...HIGH_PRIORITY}
            decoding="async"
          />

          {/*
            Scroll-scrubbed hero clip. The sources are ordered so capable
            browsers take the lighter WebM; both files are web-optimised MP4
            H.264 / VP9 with a keyframe every 2 frames and +faststart, which is
            what keeps random-access seeking instant (see useScrollScrub).
            Deliberately no autoplay / loop / muted-attr-hack beyond the
            required mute: scrubbing must never become playback.
          */}
          <video
            ref={videoRef}
            poster={HERO_POSTER}
            preload="auto"
            muted
            playsInline
            disableRemotePlayback
            tabIndex={-1}
            onCanPlayThrough={() => {
              readyRef.current = true
              setRevealed(true)
            }}
            onError={() => setFailed(true)}
            className={[
              'absolute inset-0 h-full w-full object-cover object-center',
              'transition-opacity duration-700 ease-luxury',
              revealed ? 'opacity-100' : 'opacity-0',
            ].join(' ')}
          >
            <source src="/videos/hero.webm" type="video/webm" />
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Readability scrims — kept subtle so the video stays dominant. */}
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/90 via-navy/45 to-navy/5"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-navy/80 to-transparent"
          aria-hidden="true"
        />

        {/* Minimal premium loading treatment — a whisper, not a spinner. */}
        {!revealed && (
          <div
            role="status"
            aria-label="Preparing the cinematic experience"
            className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-4">
              <span className="h-7 w-7 animate-spin rounded-full border border-gold/25 border-t-gold" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-ivory/70">
                Preparing Experience
              </span>
            </div>
          </div>
        )}

        <div ref={contentRef} className="shell relative pb-10 pt-28 lg:pb-12 lg:pt-32 will-change-transform">
          <HeroCopy />
          <div className="mt-9 max-w-5xl animate-fade-up">
            <HeroSearch />
            <HeroStats />
          </div>
          <ScrollHint ready={revealed} />
        </div>
      </div>
    </section>
  )
}
