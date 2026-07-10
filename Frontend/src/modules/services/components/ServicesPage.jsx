'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingActions from '@/components/layout/FloatingActions'
import CallExpertProvider from '@/modules/call/components/CallExpertProvider'
import ServicesPageHero from '@/modules/services/components/ServicesPageHero'
import ServicesCategoryGrid from '@/modules/services/components/ServicesCategoryGrid'
import ServicesCatalog from '@/modules/services/components/ServicesCatalog'
import ServicesPageCta from '@/modules/services/components/ServicesPageCta'

export default function ServicesPage({ services }) {
  return (
    <CallExpertProvider>
      <Navbar />
      <main className="overflow-x-clip">
        <ServicesPageHero />
        <ServicesCategoryGrid />
        <ServicesCatalog services={services} />
        <ServicesPageCta />
      </main>
      <Footer />
      <FloatingActions />
    </CallExpertProvider>
  )
}
