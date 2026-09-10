'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SiteBreadcrumbBar from '@/components/layout/SiteBreadcrumbBar'
import PageRelatedLinks from '@/components/links/PageRelatedLinks'
import CatalogStatus from '@/components/ui/CatalogStatus'
import { SERVICES_PATH } from '@/constants/routes'
import CallExpertProvider from '@/modules/call/components/CallExpertProvider'
import ServicesPageHero from '@/modules/services/components/ServicesPageHero'
import ServicesCategoryGrid from '@/modules/services/components/ServicesCategoryGrid'
import ServicesCatalog from '@/modules/services/components/ServicesCatalog'
import ServicesPageCta from '@/modules/services/components/ServicesPageCta'

export default function ServicesPage({ services, catalogError = null }) {
  return (
    <CallExpertProvider>
      <Navbar />
      <SiteBreadcrumbBar path={SERVICES_PATH} />
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
        <PageRelatedLinks path={SERVICES_PATH} />
      </main>
      <Footer />
    </CallExpertProvider>
  )
}
