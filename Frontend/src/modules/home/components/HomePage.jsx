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
import RewardsSection from '@/components/sections/RewardsSection'
import DestinationsSection from '@/components/sections/DestinationsSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import RedeemCtaSection from '@/components/sections/RedeemCtaSection'
import FAQSection from '@/components/sections/FAQSection'
import CatalogStatus from '@/components/ui/CatalogStatus'
import CallExpertProvider from '@/modules/call/components/CallExpertProvider'

export default function HomePage({
  services,
  destinations,
  faqs,
  catalogError = null,
}) {
  return (
    <CallExpertProvider>
      <Navbar />
      <main id="main-content" className="overflow-x-clip">
        <HeroSection />
        {catalogError ? (
          <div className="border-b border-border bg-section-alt">
            <CatalogStatus state="error" message={catalogError} />
          </div>
        ) : null}
        <DestinationsSection destinations={destinations} />
        <div className="bg-background">
          <BrandsSection />
          <WaveDivider />
        </div>
        <ServicesSection services={services} />
        <WaveDivider flip />
        <WhyUsSection />
        <HowItWorksSection />
        <RewardsSection />
        <TestimonialsSection />
        <RedeemCtaSection />
        <FAQSection faqs={faqs} />
      </main>
      <Footer />
      <FloatingActions />
    </CallExpertProvider>
  )
}
