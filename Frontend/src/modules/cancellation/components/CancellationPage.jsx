'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingActions from '@/components/layout/FloatingActions'
import CallExpertProvider from '@/modules/call/components/CallExpertProvider'
import CancellationPageHero from '@/modules/cancellation/components/CancellationPageHero'
import CancellationHighlights from '@/modules/cancellation/components/CancellationHighlights'
import CancellationPolicyContent from '@/modules/cancellation/components/CancellationPolicyContent'

export default function CancellationPage() {
  return (
    <CallExpertProvider>
      <Navbar />
      <main id="main-content" className="overflow-x-clip">
        <CancellationPageHero />
        <CancellationHighlights />
        <CancellationPolicyContent />
      </main>
      <Footer />
      <FloatingActions />
    </CallExpertProvider>
  )
}
