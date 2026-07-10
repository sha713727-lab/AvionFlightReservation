'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingActions from '@/components/layout/FloatingActions'
import CallExpertProvider from '@/modules/call/components/CallExpertProvider'
import CookiePolicyContent from '@/modules/cookies/components/CookiePolicyContent'

export default function CookiePage() {
  return (
    <CallExpertProvider>
      <Navbar />
      <CookiePolicyContent />
      <Footer />
      <FloatingActions />
    </CallExpertProvider>
  )
}
