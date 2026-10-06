import { CinematicCTA } from '@/components/sections/CinematicCTA'
import { Investment } from '@/components/sections/Investment'
import { PageHero } from '@/components/sections/PageHero'
import { Services } from '@/components/sections/Services'
import { PHOTO } from '@/lib/images'

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Advisory Across The Full Lifecycle."
        description="Acquisition, disposal, management and structuring — delivered by one team, under one mandate."
        imageId={PHOTO.tower}
        imageAlt="Dubai commercial towers at dusk"
      />
      <Services />
      <CinematicCTA />
      <Investment />
    </>
  )
}
