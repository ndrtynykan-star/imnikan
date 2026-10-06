import { useMemo } from 'react'
import { Heart } from 'lucide-react'
import { PropertyGrid } from '@/components/property/PropertyGrid'
import { PageHero } from '@/components/sections/PageHero'
import { ArrowButton } from '@/components/ui/ArrowButton'
import { PROPERTIES } from '@/data/properties'
import { PHOTO } from '@/lib/images'
import { useUi } from '@/lib/store'

export default function Favorites() {
  const { favorites } = useUi()

  const saved = useMemo(
    () => PROPERTIES.filter((property) => favorites.includes(property.id)),
    [favorites],
  )

  return (
    <>
      <PageHero
        eyebrow="Shortlist"
        title="Your Saved Properties."
        description="The residences you have shortlisted. Saved on this device and ready to share with your consultant."
        imageId={PHOTO.marina}
        imageAlt="Dubai Marina waterfront towers at dusk"
      />

      <section className="bg-warm py-14 lg:py-20">
        <div className="shell">
          {saved.length === 0 ? (
            <div className="border border-dashed border-ink/20 bg-ivory px-8 py-20 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 text-gold-deep">
                <Heart className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <p className="mt-6 font-display text-xl text-ink">Nothing saved yet.</p>
              <p className="mx-auto mt-3 max-w-sm text-[13px] leading-relaxed text-muted">
                Tap the heart on any property card to shortlist it, then come back here to compare.
              </p>
              <div className="mt-9 flex justify-center">
                <ArrowButton to="/properties" variant="gold" pill>
                  Browse Properties
                </ArrowButton>
              </div>
            </div>
          ) : (
            <>
              <p className="mb-8 text-[11px] uppercase tracking-label text-muted">
                {saved.length} {saved.length === 1 ? 'property' : 'properties'} saved
              </p>
              <PropertyGrid properties={saved} />
            </>
          )}
        </div>
      </section>
    </>
  )
}
