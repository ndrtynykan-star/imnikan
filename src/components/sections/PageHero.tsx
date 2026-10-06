import { HIGH_PRIORITY, photoSrcSet, photoUrl } from '@/lib/images'

type Props = {
  eyebrow: string
  title: string
  description?: string
  imageId: string
  imageAlt: string
}

/** Compact dark banner used at the top of every inner page. */
export function PageHero({ eyebrow, title, description, imageId, imageAlt }: Props) {
  return (
    <section className="relative isolate -mt-20 flex min-h-[440px] items-end overflow-hidden pb-14 pt-36 lg:min-h-[520px] lg:pb-20">
      <img
        src={photoUrl(imageId, 2000)}
        srcSet={photoSrcSet(imageId)}
        sizes="100vw"
        alt={imageAlt}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        {...HIGH_PRIORITY}
        decoding="async"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/75 to-ink/50" aria-hidden="true" />

      <div className="shell relative">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display-lg mt-5 max-w-3xl text-cream">{title}</h1>
        {description && (
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-cream/70">{description}</p>
        )}
      </div>
    </section>
  )
}
