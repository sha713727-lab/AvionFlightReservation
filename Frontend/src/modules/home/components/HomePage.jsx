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
import CallExpertProvider from '@/modules/call/components/CallExpertProvider'

export default function HomePage() {
  return (
    <CallExpertProvider>
      <Navbar />
      <main className="overflow-x-clip">
        <HeroSection />
        <DestinationsSection />
        <div className="bg-background">
          <BrandsSection />
          <WaveDivider />
        </div>
        <ServicesSection />
        <WaveDivider flip />
        <WhyUsSection />
        <HowItWorksSection />
        <RewardsSection />
        <TestimonialsSection />
        <RedeemCtaSection />
        <FAQSection />
      </main>
      <Footer />
      <FloatingActions />
    </CallExpertProvider>
  )
}
