import { useEffect, useRef, useState } from 'react'

/** Counts a statistic up when it first enters the viewport. */
export function useCountUp(target: number, duration = 1600) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || started.current) return
        started.current = true
        observer.disconnect()

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (reduce) {
          setValue(target)
          return
        }

        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          // easeOutExpo — fast start, soft landing.
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
          setValue(target * eased)
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [duration, target])

  return { ref, value }
}
