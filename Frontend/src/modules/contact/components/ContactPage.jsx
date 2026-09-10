'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SiteBreadcrumbBar from '@/components/layout/SiteBreadcrumbBar'
import PageRelatedLinks from '@/components/links/PageRelatedLinks'
import { CONTACT_PATH } from '@/constants/routes'
import CallExpertProvider from '@/modules/call/components/CallExpertProvider'
import ContactPageHero from '@/modules/contact/components/ContactPageHero'
import ContactHighlights from '@/modules/contact/components/ContactHighlights'
import ContactFormSection from '@/modules/contact/components/ContactFormSection'
import ContactSupportSection from '@/modules/contact/components/ContactSupportSection'
import ContactNotice from '@/modules/contact/components/ContactNotice'

export default function ContactPage() {
  return (
    <CallExpertProvider>
      <Navbar />
      <SiteBreadcrumbBar path={CONTACT_PATH} />
      <main id="main-content" className="overflow-x-clip">
        <ContactPageHero />
        <ContactHighlights />
        <ContactFormSection />
        <ContactSupportSection />
        <ContactNotice />
        <PageRelatedLinks path={CONTACT_PATH} />
      </main>
      <Footer />
    </CallExpertProvider>
  )
}
