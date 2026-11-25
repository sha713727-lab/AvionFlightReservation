'use client'

import dynamic from 'next/dynamic'
import CatalogStatus from '@/components/ui/CatalogStatus'
import { useHomeCatalog } from '@/hooks/useHomeCatalog'
import { CATALOG_UI } from '@/constants/catalogUi'

const ServicesSection = dynamic(() => import('@/components/sections/ServicesSection'))
const HomeServiceLinks = dynamic(() => import('@/components/sections/HomeServiceLinks'))
const RewardsSection = dynamic(() => import('@/components/sections/RewardsSection'))
const HomeCategorySections = dynamic(() => import('@/components/sections/HomeCategorySections'))
const HowItWorksSection = dynamic(() => import('@/components/sections/HowItWorksSection'))
const HomeFeeTransparency = dynamic(() => import('@/components/sections/HomeFeeTransparency'))
const WhyUsSection = dynamic(() => import('@/components/sections/WhyUsSection'))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection'))
const HomeLatestBlogPosts = dynamic(() => import('@/components/sections/HomeLatestBlogPosts'))
const RedeemCtaSection = dynamic(() => import('@/components/sections/RedeemCtaSection'))

/**
 * Below-fold homepage body — separate client chunk from hero/nav so first paint stays lean.
 */
export default function HomeBodyClient({ services, faqs, catalogError = null }) {
  const catalog = useHomeCatalog({
    services,
    faqs,
    catalogError,
  })

  return (
    <>
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
      <ServicesSection services={catalog.services} />
      <HomeServiceLinks />
      <RewardsSection />
      <HomeCategorySections />
      <HowItWorksSection />
      <HomeFeeTransparency />
      <WhyUsSection />
      <FAQSection faqs={catalog.faqs} />
      <HomeLatestBlogPosts />
      <RedeemCtaSection />
    </>
  )
}
