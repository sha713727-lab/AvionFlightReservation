'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingActions from '@/components/layout/FloatingActions'
import CallExpertProvider from '@/modules/call/components/CallExpertProvider'
import ContactPageHero from '@/modules/contact/components/ContactPageHero'
import ContactHighlights from '@/modules/contact/components/ContactHighlights'
import ContactSupportSection from '@/modules/contact/components/ContactSupportSection'
import ContactNotice from '@/modules/contact/components/ContactNotice'

export default function ContactPage() {
  return (
    <CallExpertProvider>
      <Navbar />
      <main className="overflow-x-clip">
        <ContactPageHero />
        <ContactHighlights />
        <ContactSupportSection />
        <ContactNotice />
      </main>
      <Footer />
      <FloatingActions />
    </CallExpertProvider>
  )
}
