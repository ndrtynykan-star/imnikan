import { HIGH_PRIORITY, photoSrcSet, photoUrl } from '@/lib/images'

type SmartImageProps = {
  /** Unsplash photo id from `PHOTO`. */
  id: string
  alt: string
  className?: string
  /** `sizes` hint for the browser — keep it accurate to avoid over-fetching. */
  sizes?: string
  /** Hero/first-fold images opt out of lazy loading. */
  priority?: boolean
}

/**
 * Responsive, lazily loaded photography. Width/height are intentionally omitted:
 * every usage sits inside an aspect-ratio box, which is what prevents layout shift.
 */
export function SmartImage({ id, alt, className = '', sizes = '100vw', priority = false }: SmartImageProps) {
  return (
    <img
      src={photoUrl(id, 1600)}
      srcSet={photoSrcSet(id)}
      sizes={sizes}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      {...(priority ? HIGH_PRIORITY : {})}
      draggable={false}
    />
  )
}
