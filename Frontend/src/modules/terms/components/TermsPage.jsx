'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SiteBreadcrumbBar from '@/components/layout/SiteBreadcrumbBar'
import PageRelatedLinks from '@/components/links/PageRelatedLinks'
import { TERMS_PATH } from '@/constants/routes'
import CallExpertProvider from '@/modules/call/components/CallExpertProvider'
import TermsPageHero from '@/modules/terms/components/TermsPageHero'
import TermsHighlights from '@/modules/terms/components/TermsHighlights'
import TermsBrandIntro from '@/modules/terms/components/TermsBrandIntro'
import TermsClauses from '@/modules/terms/components/TermsClauses'
import TermsPageCta from '@/modules/terms/components/TermsPageCta'

export default function TermsPage() {
  return (
    <CallExpertProvider>
      <Navbar />
      <SiteBreadcrumbBar path={TERMS_PATH} />
      <main id="main-content" className="overflow-x-clip">
        <TermsPageHero />
        <TermsHighlights />
        <TermsBrandIntro />
        <TermsClauses />
        <TermsPageCta />
        <PageRelatedLinks path={TERMS_PATH} />
      </main>
      <Footer />
    </CallExpertProvider>
  )
}
