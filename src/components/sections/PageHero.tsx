import { HIGH_PRIORITY, photoSrcSet, photoUrl } from '@/lib/images'

type Props = {
  eyebrow: string
  title: string
  description?: string
  imageId: string
  imageAlt: string
  /** Optional decorative script line under the description. */
  script?: string
}

/** Inner-page hero: navy ground, cinematic image, editorial heading stack. */
export function PageHero({ eyebrow, title, description, imageId, imageAlt, script }: Props) {
  return (
    <section className="relative isolate flex min-h-[420px] items-end overflow-hidden bg-navy lg:min-h-[480px]">
      <img
        src={photoUrl(imageId, 1920)}
        srcSet={photoSrcSet(imageId)}
        sizes="100vw"
        alt={imageAlt}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        {...HIGH_PRIORITY}
        decoding="async"
      />
      <div className="absolute inset-0 -z-10 bg-navy/75" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/60 to-navy/30"
        aria-hidden="true"
      />

      <div className="shell relative pb-14 pt-32 lg:pb-16 lg:pt-40">
        <p className="eyebrow text-gold-soft">{eyebrow}</p>
        <h1 className="display-lg mt-4 max-w-3xl text-ivory">{title}</h1>
        {description && (
          <p className="mt-5 max-w-xl text-[13.5px] leading-relaxed text-ivory/70">{description}</p>
        )}
        {script && (
          <p className="mt-5 font-script text-[1.8rem] leading-snug text-gold-soft">{script}</p>
        )}
      </div>
    </section>
  )
}
