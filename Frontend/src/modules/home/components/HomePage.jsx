'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingActions from '@/components/layout/FloatingActions'
import HeroSection from '@/components/sections/HeroSection'
import BrandsSection from '@/components/sections/BrandsSection'
import WaveDivider from '@/components/ui/WaveDivider'
import ServicesSection from '@/components/sections/ServicesSection'
import WhyUsSection from '@/components/sections/WhyUsSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import DestinationsSection from '@/components/sections/DestinationsSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import RedeemCtaSection from '@/components/sections/RedeemCtaSection'
import FAQSection from '@/components/sections/FAQSection'
import CatalogStatus from '@/components/ui/CatalogStatus'
import CallExpertProvider from '@/modules/call/components/CallExpertProvider'
import { useHomeCatalog } from '@/hooks/useHomeCatalog'
import { CATALOG_UI } from '@/constants/catalogUi'

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
        <div className="bg-background">
          <BrandsSection />
          <WaveDivider />
        </div>
        <ServicesSection services={catalog.services} />
        <WaveDivider flip />
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
