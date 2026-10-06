import type { ReactNode } from 'react'
import { useReveal } from '@/hooks/useReveal'

type RevealProps = {
  children: ReactNode
  /** Stagger in milliseconds. */
  delay?: number
  className?: string
}

/** Fade-up wrapper used for every section reveal. */
export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>(delay)

  return (
    <div ref={ref} data-visible={visible} className={`reveal ${className}`}>
      {children}
    </div>
  )
}
