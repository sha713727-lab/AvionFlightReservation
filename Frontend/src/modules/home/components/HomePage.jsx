'use client'

import dynamic from 'next/dynamic'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import CatalogStatus from '@/components/ui/CatalogStatus'
import CallExpertProvider from '@/modules/call/components/CallExpertProvider'
import { useHomeCatalog } from '@/hooks/useHomeCatalog'
import { CATALOG_UI } from '@/constants/catalogUi'

const HomeFeeTransparency = dynamic(() => import('@/components/sections/HomeFeeTransparency'))
const HomeAvionResources = dynamic(() => import('@/components/sections/HomeAvionResources'))
const HomeServiceLinks = dynamic(() => import('@/components/sections/HomeServiceLinks'))
const HomeLatestBlogPosts = dynamic(() => import('@/components/sections/HomeLatestBlogPosts'))
const WhyUsSection = dynamic(() => import('@/components/sections/WhyUsSection'))
const HowItWorksSection = dynamic(() => import('@/components/sections/HowItWorksSection'))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection'))
const RedeemCtaSection = dynamic(() => import('@/components/sections/RedeemCtaSection'))

export default function HomePage({ faqs, catalogError = null }) {
  const catalog = useHomeCatalog({ faqs, catalogError })

  return (
    <CallExpertProvider>
      <Navbar />
      <main id="main-content" className="overflow-x-clip">
        <HeroSection />
        {catalog.isHydrating ? (
          <div className="border-b border-border bg-section-alt">
            <CatalogStatus state="loading" message={CATALOG_UI.loading} />
          </div>
        ) : null}
        {catalog.catalogError && !catalog.isHydrating ? (
          <div className="border-b border-border bg-section-alt">
            <CatalogStatus state="error" message={catalog.catalogError} />
          </div>
        ) : null}
        <HowItWorksSection />
        <HomeFeeTransparency />
        <HomeAvionResources />
        <HomeServiceLinks />
        <WhyUsSection />
        <HomeLatestBlogPosts />
        <FAQSection faqs={catalog.faqs} />
        <RedeemCtaSection />
      </main>
      <Footer />
    </CallExpertProvider>
  )
}
