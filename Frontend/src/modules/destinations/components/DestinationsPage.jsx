'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingActions from '@/components/layout/FloatingActions'
import CatalogStatus from '@/components/ui/CatalogStatus'
import CallExpertProvider from '@/modules/call/components/CallExpertProvider'
import DestinationsPageHero from '@/modules/destinations/components/DestinationsPageHero'
import DestinationsTierStrip from '@/modules/destinations/components/DestinationsTierStrip'
import DestinationsGallery from '@/modules/destinations/components/DestinationsGallery'
import DestinationsPageCta from '@/modules/destinations/components/DestinationsPageCta'
import { getDestinationCityNames } from '@/modules/destinations/constants'

export default function DestinationsPage({ destinations = [], catalogError = null }) {
  const cityNames = getDestinationCityNames(destinations)

  return (
    <CallExpertProvider>
      <Navbar overDarkHero />
      <main id="main-content" className="overflow-x-clip">
        <DestinationsPageHero cityNames={cityNames} />
        {catalogError ? (
          <div className="border-b border-border bg-section-alt">
            <CatalogStatus state="error" message={catalogError} />
          </div>
        ) : null}
        <DestinationsTierStrip destinations={destinations} />
        <DestinationsGallery destinations={destinations} />
        <DestinationsPageCta />
      </main>
      <Footer />
      <FloatingActions />
    </CallExpertProvider>
  )
}
