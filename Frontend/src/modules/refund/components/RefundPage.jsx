'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SiteBreadcrumbBar from '@/components/layout/SiteBreadcrumbBar'
import PageRelatedLinks from '@/components/links/PageRelatedLinks'
import { REFUND_POLICY_PATH } from '@/constants/routes'
import CallExpertProvider from '@/modules/call/components/CallExpertProvider'
import RefundPageHero from '@/modules/refund/components/RefundPageHero'
import RefundHighlights from '@/modules/refund/components/RefundHighlights'
import RefundOverview from '@/modules/refund/components/RefundOverview'
import RefundProcess from '@/modules/refund/components/RefundProcess'
import RefundPageCta from '@/modules/refund/components/RefundPageCta'

export default function RefundPage() {
  return (
    <CallExpertProvider>
      <Navbar />
      <SiteBreadcrumbBar path={REFUND_POLICY_PATH} />
      <main id="main-content" className="overflow-x-clip">
        <RefundPageHero />
        <RefundHighlights />
        <RefundOverview />
        <RefundProcess />
        <RefundPageCta />
        <PageRelatedLinks path={REFUND_POLICY_PATH} />
      </main>
      <Footer />
    </CallExpertProvider>
  )
}
