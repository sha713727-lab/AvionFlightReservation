'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingActions from '@/components/layout/FloatingActions'
import CallExpertProvider from '@/modules/call/components/CallExpertProvider'
import RefundPageHero from '@/modules/refund/components/RefundPageHero'
import RefundHighlights from '@/modules/refund/components/RefundHighlights'
import RefundOverview from '@/modules/refund/components/RefundOverview'
import RefundProcess from '@/modules/refund/components/RefundProcess'
import RefundPageCta from '@/modules/refund/components/RefundPageCta'

export default function RefundPage() {
  return (
    <CallExpertProvider>
      <Navbar overDarkHero />
      <main className="overflow-x-clip">
        <RefundPageHero />
        <RefundHighlights />
        <RefundOverview />
        <RefundProcess />
        <RefundPageCta />
      </main>
      <Footer />
      <FloatingActions />
    </CallExpertProvider>
  )
}
