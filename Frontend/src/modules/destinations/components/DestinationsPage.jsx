'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingActions from '@/components/layout/FloatingActions'
import CallExpertProvider from '@/modules/call/components/CallExpertProvider'
import DestinationsPageHero from '@/modules/destinations/components/DestinationsPageHero'
import DestinationsTierStrip from '@/modules/destinations/components/DestinationsTierStrip'
import DestinationsGallery from '@/modules/destinations/components/DestinationsGallery'
import DestinationsPageCta from '@/modules/destinations/components/DestinationsPageCta'

export default function DestinationsPage() {
  return (
    <CallExpertProvider>
      <Navbar overDarkHero />
      <main className="overflow-x-clip">
        <DestinationsPageHero />
        <DestinationsTierStrip />
        <DestinationsGallery />
        <DestinationsPageCta />
      </main>
      <Footer />
      <FloatingActions />
    </CallExpertProvider>
  )
}
