'use client'

import dynamic from 'next/dynamic'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingActions from '@/components/layout/FloatingActions'
import HeroSection from '@/components/sections/HeroSection'
import CatalogStatus from '@/components/ui/CatalogStatus'
import CallExpertProvider from '@/modules/call/components/CallExpertProvider'
import { useHomeCatalog } from '@/hooks/useHomeCatalog'
import { CATALOG_UI } from '@/constants/catalogUi'

const DestinationsSection = dynamic(() => import('@/components/sections/DestinationsSection'))
const BrandsSection = dynamic(() => import('@/components/sections/BrandsSection'))
const ServicesSection = dynamic(() => import('@/components/sections/ServicesSection'))
const WhyUsSection = dynamic(() => import('@/components/sections/WhyUsSection'))
const HowItWorksSection = dynamic(() => import('@/components/sections/HowItWorksSection'))
const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection'))
const RedeemCtaSection = dynamic(() => import('@/components/sections/RedeemCtaSection'))

export default function HomePage({
  services,
  destinations,
  faqs,
  catalogError = null,
}) {
  const catalog = useHomeCatalog({
    services,
    destinations,
    faqs,
    catalogError,
  })

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
        <DestinationsSection destinations={catalog.destinations} />
        <BrandsSection />
        <ServicesSection services={catalog.services} />
        <WhyUsSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <FAQSection faqs={catalog.faqs} />
        <RedeemCtaSection />
      </main>
      <Footer />
      <FloatingActions />
    </CallExpertProvider>
  )
}
