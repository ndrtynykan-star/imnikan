import { About } from '@/components/sections/About'
import { CinematicCTA } from '@/components/sections/CinematicCTA'
import { FeaturedProperties } from '@/components/sections/FeaturedProperties'
import { FinalCTA } from '@/components/sections/FinalCTA'
import { Hero } from '@/components/sections/Hero'
import { Investment } from '@/components/sections/Investment'
import { Locations } from '@/components/sections/Locations'
import { PropertyDiscovery } from '@/components/sections/PropertyDiscovery'
import { Services } from '@/components/sections/Services'
import { Testimonials } from '@/components/sections/Testimonials'

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <PropertyDiscovery />
      <CinematicCTA />
      <Services />
      <Locations />
      <Investment />
      <About />
      <Testimonials />
      <FinalCTA />
    </>
  )
}
