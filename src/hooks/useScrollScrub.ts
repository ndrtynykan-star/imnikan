import { useEffect, useRef } from 'react'

/**
 * Scroll-driven video scrubbing engine (frame-synchronised, zero React re-renders).
 *
 * How it works:
 *  - A single passive `scroll` listener only sets a dirty flag — it never touches
 *    `video.currentTime` (that would flood the decoder with seeks).
 *  - One `requestAnimationFrame` loop (active only while the hero intersects the
 *    viewport) reads the section's bounding rect once per frame, computes the
 *    scroll progress (0 → 1 across the whole section) and eases an internal
 *    `current` time toward the mapped target time:
 *        current += (target - current) * (1 - exp(-k * dt))
 *    The exponential form is frame-rate independent, so the smoothing feel is
 *    identical on 60 Hz, 120 Hz and throttled mobile displays. The video is
 *    never played — it stays paused and is scrubbed via `currentTime` only.
 *  - `currentTime` is written only when the eased time has drifted more than
 *    ~half a frame from the last applied seek, so we never queue redundant
 *    seeks while the video is still catching up to a fast scroll.
 *
 * Encoding notes (why this can be smooth): the hero files are re-encoded with a
 * keyframe every 2 frames (`-g 2 -keyint_min 2 -sc_threshold 0`) and
 * `+faststart`, so every scroll position decodes from a nearby keyframe and
 * random-access seeking is effectively instant. Avoid long-GOP footage
 * (1 keyframe per 5-10 s): scrubbing it decodes from the previous keyframe and
 * visibly stutters.
 */
type Options = {
  /** Full-height wrapper the progress is measured against. */
  sectionRef: React.RefObject<HTMLElement | null>
  /** The paused <video> element being scrubbed. */
  videoRef: React.RefObject<HTMLVideoElement | null>
  /** Hero copy that gently fades out as the user scrolls in. */
  contentRef: React.RefObject<HTMLElement | null>
  /** Scrubbing is gated until the video can play through without re-buffering. */
  readyRef: React.RefObject<boolean>
}

/** Half a frame at 24fps — below this the difference is invisible, so we skip the seek. */
const SEEK_EPSILON = 0.02
/** Exponential smoothing rate. Higher = tighter coupling to the scroll. */
const SMOOTHING = 12
/** Progress over which the hero copy fades out (0 = immediate, 0.3 = gentle). */
const COPY_FADE_END = 0.3

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

export function useScrollScrub({ sectionRef, videoRef, contentRef, readyRef }: Options) {
  const appliedRef = useRef(-1)
  const easedRef = useRef(0)
  const rafRef = useRef(0)
  const runningRef = useRef(false)
  const lastTickRef = useRef(0)
  const dirtyRef = useRef(true)

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    const content = contentRef.current
    if (!section || !video || !content) return

    const applyFrame = (progress: number) => {
      const duration = video.duration
      if (!Number.isFinite(duration) || duration <= 0) return

      const target = progress * duration
      const now = performance.now()
      const dt = Math.min((now - lastTickRef.current) / 1000, 0.1)
      lastTickRef.current = now

      // Frame-rate independent exponential ease toward the scroll-mapped time.
      const eased = easedRef.current + (target - easedRef.current) * (1 - Math.exp(-SMOOTHING * dt))
      easedRef.current = eased

      // Scrub, never play: only seek when the eased time moved past half a frame.
      if (Math.abs(eased - appliedRef.current) > SEEK_EPSILON) {
        appliedRef.current = eased
        video.currentTime = clamp(eased, 0, duration)
      }

      // Copy gently lifts away over the first slice of the experience.
      const fade = clamp(progress / COPY_FADE_END, 0, 1)
      content.style.opacity = String(1 - fade)
      content.style.transform = `translate3d(0, ${-42 * fade}px, 0)`
      content.style.pointerEvents = fade > 0.92 ? 'none' : ''
    }

    const tick = () => {
      rafRef.current = 0
      const rect = section.getBoundingClientRect()
      const scrollable = Math.max(rect.height - window.innerHeight, 1)
      const progress = clamp(-rect.top / scrollable, 0, 1)

      if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
        // Fully out of view: park the loop until the observer wakes us again.
        runningRef.current = false
        return
      }

      if (dirtyRef.current) dirtyRef.current = false
      if (readyRef.current) applyFrame(progress)

      // Keep one loop alive for the whole time the hero is on screen.
      rafRef.current = window.requestAnimationFrame(tick)
    }

    const wake = () => {
      dirtyRef.current = true
      if (!runningRef.current) {
        runningRef.current = true
        lastTickRef.current = performance.now()
      }
      if (!rafRef.current) rafRef.current = window.requestAnimationFrame(tick)
    }

    const onScroll = () => wake()
    const onResize = () => wake()

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) wake()
      },
      { rootMargin: '10% 0px 10% 0px' },
    )
    observer.observe(section)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    // Enter with the video parked on its first frame.
    wake()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
      // Reset the id too: under StrictMode the effect remounts immediately, and
      // a stale cancelled id would make the next wake() skip scheduling forever.
      rafRef.current = 0
      runningRef.current = false
    }
  }, [sectionRef, videoRef, contentRef, readyRef])
}
