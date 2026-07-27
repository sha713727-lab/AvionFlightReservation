'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingActions from '@/components/layout/FloatingActions'
import CallExpertProvider from '@/modules/call/components/CallExpertProvider'
import InternationalFlightHero from '@/modules/internationalFlight/components/InternationalFlightHero'
import InternationalFlightRegions from '@/modules/internationalFlight/components/InternationalFlightRegions'
import InternationalFlightSteps from '@/modules/internationalFlight/components/InternationalFlightSteps'
import InternationalFlightCta from '@/modules/internationalFlight/components/InternationalFlightCta'

export default function InternationalFlightPage() {
  return (
    <CallExpertProvider>
      <Navbar overDarkHero />
      <main id="main-content" className="overflow-x-clip">
        <InternationalFlightHero />
        <InternationalFlightRegions />
        <InternationalFlightSteps />
        <InternationalFlightCta />
      </main>
      <Footer />
      <FloatingActions />
    </CallExpertProvider>
  )
}
