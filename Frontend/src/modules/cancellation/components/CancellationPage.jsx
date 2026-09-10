'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SiteBreadcrumbBar from '@/components/layout/SiteBreadcrumbBar'
import PageRelatedLinks from '@/components/links/PageRelatedLinks'
import { CANCELLATION_POLICY_PATH } from '@/constants/routes'
import CallExpertProvider from '@/modules/call/components/CallExpertProvider'
import CancellationPageHero from '@/modules/cancellation/components/CancellationPageHero'
import CancellationHighlights from '@/modules/cancellation/components/CancellationHighlights'
import CancellationPolicyContent from '@/modules/cancellation/components/CancellationPolicyContent'

export default function CancellationPage() {
  return (
    <CallExpertProvider>
      <Navbar />
      <SiteBreadcrumbBar path={CANCELLATION_POLICY_PATH} />
      <main id="main-content" className="overflow-x-clip">
        <CancellationPageHero />
        <CancellationHighlights />
        <CancellationPolicyContent />
        <PageRelatedLinks path={CANCELLATION_POLICY_PATH} />
      </main>
      <Footer />
    </CallExpertProvider>
  )
}
