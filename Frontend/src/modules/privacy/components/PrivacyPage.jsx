'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SiteBreadcrumbBar from '@/components/layout/SiteBreadcrumbBar'
import PageRelatedLinks from '@/components/links/PageRelatedLinks'
import { PRIVACY_POLICY_PATH } from '@/constants/routes'
import CallExpertProvider from '@/modules/call/components/CallExpertProvider'
import PrivacyPageHero from '@/modules/privacy/components/PrivacyPageHero'
import PrivacyHighlights from '@/modules/privacy/components/PrivacyHighlights'
import PrivacyPolicyContent from '@/modules/privacy/components/PrivacyPolicyContent'

export default function PrivacyPage() {
  return (
    <CallExpertProvider>
      <Navbar />
      <SiteBreadcrumbBar path={PRIVACY_POLICY_PATH} />
      <main id="main-content" className="overflow-x-clip">
        <PrivacyPageHero />
        <PrivacyHighlights />
        <PrivacyPolicyContent />
        <PageRelatedLinks path={PRIVACY_POLICY_PATH} />
      </main>
      <Footer />
    </CallExpertProvider>
  )
}
