'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingActions from '@/components/layout/FloatingActions'
import CallExpertProvider from '@/modules/call/components/CallExpertProvider'
import PrivacyPageHero from '@/modules/privacy/components/PrivacyPageHero'
import PrivacyHighlights from '@/modules/privacy/components/PrivacyHighlights'
import PrivacyPolicyContent from '@/modules/privacy/components/PrivacyPolicyContent'

export default function PrivacyPage() {
  return (
    <CallExpertProvider>
      <Navbar />
      <main className="overflow-x-clip">
        <PrivacyPageHero />
        <PrivacyHighlights />
        <PrivacyPolicyContent />
      </main>
      <Footer />
      <FloatingActions />
    </CallExpertProvider>
  )
}
