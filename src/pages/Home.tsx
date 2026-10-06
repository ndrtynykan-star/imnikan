import { ExploreCategories } from '@/components/sections/ExploreCategories'
import { FeaturedProperties } from '@/components/sections/FeaturedProperties'
import { FinalCTA } from '@/components/sections/FinalCTA'
import { Hero } from '@/components/sections/Hero'
import { MoreThanProperties } from '@/components/sections/MoreThanProperties'
import { PrimeLocations } from '@/components/sections/PrimeLocations'
import { TestimonialSlider } from '@/components/sections/TestimonialSlider'
import { WhyInvest } from '@/components/sections/WhyInvest'

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <MoreThanProperties />
      <ExploreCategories />
      <WhyInvest />
      <PrimeLocations />
      <TestimonialSlider />
      <FinalCTA />
    </>
  )
}
