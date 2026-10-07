import { useEffect, type RefObject } from 'react'

/**
 * Maps the scroll progress through `sectionRef` (0 → 1 while its sticky child is
 * pinned) onto `videoRef`'s timeline. All per-frame work lives in a single
 * requestAnimationFrame loop working off refs — scroll events never touch the
 * video directly. The displayed time eases toward the target, and a new seek is
 * only issued once the previous one has finished, so the decoder is never
 * flooded. The loop idles itself once the frame has settled, freezing the
 * picture the moment scrolling stops.
 *
 * Requires an all-keyframe encode (see AGENTS.md) so seeks in either direction
 * resolve instantly.
 */
export function useVideoScrub(
  sectionRef: RefObject<HTMLElement>,
  videoRef: RefObject<HTMLVideoElement>,
  enabled: boolean,
) {
  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!enabled || !section || !video) return

    video.pause()

    let raf = 0
    let current = 0

    const progress = () => {
      const rect = section.getBoundingClientRect()
      const range = rect.height - window.innerHeight
      if (range <= 0) return 0
      return Math.min(1, Math.max(0, -rect.top / range))
    }

    const tick = () => {
      raf = 0
      const duration = video.duration
      if (!Number.isFinite(duration) || duration <= 0) return

      // Stop a hair before the end so the final frame stays painted.
      const target = progress() * (duration - 0.001)
      const delta = target - current
      current = Math.abs(delta) < 1 / 240 ? target : current + delta * 0.2

      if (!video.seeking && Math.abs(video.currentTime - current) > 1 / 120) {
        video.currentTime = current
      }

      if (current !== target || video.seeking) raf = requestAnimationFrame(tick)
    }

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }

    // Start in sync with wherever the page is (e.g. a refresh mid-hero).
    const sync = () => {
      current = progress() * Math.max(0, video.duration - 0.001)
      video.currentTime = current
      schedule()
    }

    if (video.readyState >= 1) sync()
    video.addEventListener('loadedmetadata', sync)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      cancelAnimationFrame(raf)
      video.removeEventListener('loadedmetadata', sync)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [sectionRef, videoRef, enabled])
}
