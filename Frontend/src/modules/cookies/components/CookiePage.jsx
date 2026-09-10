'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SiteBreadcrumbBar from '@/components/layout/SiteBreadcrumbBar'
import PageRelatedLinks from '@/components/links/PageRelatedLinks'
import { COOKIE_POLICY_PATH } from '@/constants/routes'
import CallExpertProvider from '@/modules/call/components/CallExpertProvider'
import CookiePolicyContent from '@/modules/cookies/components/CookiePolicyContent'

export default function CookiePage() {
  return (
    <CallExpertProvider>
      <Navbar />
      <SiteBreadcrumbBar path={COOKIE_POLICY_PATH} />
      <CookiePolicyContent />
      <PageRelatedLinks path={COOKIE_POLICY_PATH} />
      <Footer />
    </CallExpertProvider>
  )
}
