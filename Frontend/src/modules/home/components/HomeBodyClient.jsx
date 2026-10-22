'use client'

import dynamic from 'next/dynamic'
import CatalogStatus from '@/components/ui/CatalogStatus'
import { useHomeCatalog } from '@/hooks/useHomeCatalog'
import { CATALOG_UI } from '@/constants/catalogUi'

const HowItWorksSection = dynamic(() => import('@/components/sections/HowItWorksSection'))
const HomeFeeTransparency = dynamic(() => import('@/components/sections/HomeFeeTransparency'))
const HomeAvionResources = dynamic(() => import('@/components/sections/HomeAvionResources'))
const ServicesSection = dynamic(() => import('@/components/sections/ServicesSection'))
const HomeServiceLinks = dynamic(() => import('@/components/sections/HomeServiceLinks'))
const WhyUsSection = dynamic(() => import('@/components/sections/WhyUsSection'))
const HomeLatestBlogPosts = dynamic(() => import('@/components/sections/HomeLatestBlogPosts'))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection'))
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
      <HowItWorksSection />
      <HomeFeeTransparency />
      <HomeAvionResources />
      <ServicesSection services={catalog.services} />
      <HomeServiceLinks />
      <WhyUsSection />
      <HomeLatestBlogPosts />
      <FAQSection faqs={catalog.faqs} />
      <RedeemCtaSection />
    </>
  )
}
