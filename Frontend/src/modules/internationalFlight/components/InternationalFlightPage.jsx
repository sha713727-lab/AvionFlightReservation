'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SiteBreadcrumbBar from '@/components/layout/SiteBreadcrumbBar'
import PageRelatedLinks from '@/components/links/PageRelatedLinks'
import { INTERNATIONAL_FLIGHT_PATH } from '@/constants/routes'
import CallExpertProvider from '@/modules/call/components/CallExpertProvider'
import InternationalFlightHero from '@/modules/internationalFlight/components/InternationalFlightHero'
import InternationalFlightRegions from '@/modules/internationalFlight/components/InternationalFlightRegions'
import InternationalFlightSteps from '@/modules/internationalFlight/components/InternationalFlightSteps'
import InternationalFlightCta from '@/modules/internationalFlight/components/InternationalFlightCta'

export default function InternationalFlightPage() {
  return (
    <CallExpertProvider>
      <Navbar />
      <SiteBreadcrumbBar path={INTERNATIONAL_FLIGHT_PATH} />
      <main id="main-content" className="overflow-x-clip">
        <InternationalFlightHero />
        <InternationalFlightRegions />
        <InternationalFlightSteps />
        <InternationalFlightCta />
        <PageRelatedLinks path={INTERNATIONAL_FLIGHT_PATH} />
      </main>
      <Footer />
    </CallExpertProvider>
  )
}
