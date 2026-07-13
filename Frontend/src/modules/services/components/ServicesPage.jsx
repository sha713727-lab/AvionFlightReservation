'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingActions from '@/components/layout/FloatingActions'
import CatalogStatus from '@/components/ui/CatalogStatus'
import CallExpertProvider from '@/modules/call/components/CallExpertProvider'
import ServicesPageHero from '@/modules/services/components/ServicesPageHero'
import ServicesCategoryGrid from '@/modules/services/components/ServicesCategoryGrid'
import ServicesCatalog from '@/modules/services/components/ServicesCatalog'
import ServicesPageCta from '@/modules/services/components/ServicesPageCta'

export default function ServicesPage({ services, catalogError = null }) {
  return (
    <CallExpertProvider>
      <Navbar />
      <main id="main-content" className="overflow-x-clip">
        <ServicesPageHero />
        {catalogError ? (
          <div className="border-b border-border bg-section-alt">
            <CatalogStatus state="error" message={catalogError} />
          </div>
        ) : null}
        <ServicesCategoryGrid />
        <ServicesCatalog services={services} />
        <ServicesPageCta />
      </main>
      <Footer />
      <FloatingActions />
    </CallExpertProvider>
  )
}
