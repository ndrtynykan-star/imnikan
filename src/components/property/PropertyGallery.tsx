import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SmartImage } from '@/components/ui/SmartImage'

type Props = {
  images: string[]
  title: string
  status: string
}

/** Primary gallery: one hero frame plus a thumbnail rail with prev/next controls. */
export function PropertyGallery({ images, title, status }: Props) {
  const [active, setActive] = useState(0)
  const total = images.length

  const go = (delta: number) => setActive((current) => (current + delta + total) % total)

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden bg-navy-dark">
        {images.map((image, index) => (
          <SmartImage
            key={`${image}-${index}`}
            id={image}
            alt={`${title} — view ${index + 1} of ${total}`}
            sizes="(min-width: 1024px) 70vw, 100vw"
            priority={index === 0}
            className={[
              'absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-luxury',
              index === active ? 'opacity-100' : 'opacity-0',
            ].join(' ')}
          />
        ))}

        <span className="absolute left-0 top-6 bg-gold px-4 py-2 text-[9.5px] font-semibold uppercase tracking-label text-navy">
          {status}
        </span>

        <div className="absolute bottom-5 right-5 flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous image"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-warm/90 text-ink transition-colors duration-400 ease-luxury hover:bg-gold hover:text-navy"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next image"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-warm/90 text-ink transition-colors duration-400 ease-luxury hover:bg-gold hover:text-navy"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
          </button>
        </div>

        <span className="absolute bottom-6 left-6 text-[11px] tabular-nums tracking-wide text-ivory/85">
          {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={`thumb-${image}-${index}`}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show image ${index + 1}`}
            aria-pressed={index === active}
            className={[
              'relative aspect-[4/3] overflow-hidden border transition-all duration-400 ease-luxury',
              index === active ? 'border-gold opacity-100' : 'border-ink/10 opacity-60 hover:opacity-100',
            ].join(' ')}
          >
            <SmartImage id={image} alt="" sizes="25vw" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
