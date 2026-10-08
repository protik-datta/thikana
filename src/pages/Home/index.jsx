import Hero from '@/pages/Home/sections/Hero'
import FeaturedProperties from '@/pages/Home/sections/FeaturedProperties'
import Locations from '@/pages/Home/sections/Locations'
import PropertyTypes from '@/pages/Home/sections/PropertyTypes'
import WhyChooseUs from '@/pages/Home/sections/WhyChooseUs'
import FeaturedAgents from '@/pages/Home/sections/FeaturedAgents'
import Guides from '@/pages/Home/sections/Guides'
import CallToAction from '@/pages/Home/sections/CallToAction'
import RecentlyViewed from '@/components/property/RecentlyViewed'
import { usePageMeta } from '@/hooks/usePageMeta'

export default function Home() {
  usePageMeta()

  return (
    <>
      <Hero />
      <FeaturedProperties />
      <Locations />
      <PropertyTypes />
      <WhyChooseUs />
      <FeaturedAgents />
      <Guides />
      <RecentlyViewed />
      <CallToAction />
    </>
  )
}
