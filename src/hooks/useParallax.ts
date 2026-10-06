import { useEffect, useRef } from 'react'

/**
 * Sets a `--parallax` custom property on the element while it is in view.
 * Uses a single rAF-throttled scroll listener and respects reduced-motion.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(strength = 0.16) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0

    const update = () => {
      frame = 0
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      if (rect.bottom < 0 || rect.top > window.innerHeight) return
      const offset = Math.min(Math.max(-rect.top, 0), rect.height)
      el.style.setProperty('--parallax', `${offset * strength}px`)
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [strength])

  return ref
}
