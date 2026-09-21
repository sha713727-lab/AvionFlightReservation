'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SiteBreadcrumbBar from '@/components/layout/SiteBreadcrumbBar'
import PageRelatedLinks from '@/components/links/PageRelatedLinks'
import SourcesSection from '@/components/geo/SourcesSection'
import Container from '@/components/ui/Container'
import { ABOUT_PAGE_SOURCES } from '@/constants/geoPageSources'
import { ABOUT_PATH } from '@/constants/routes'
import CallExpertProvider from '@/modules/call/components/CallExpertProvider'
import AboutPageHero from '@/modules/about/components/AboutPageHero'
import AboutHighlights from '@/modules/about/components/AboutHighlights'
import AboutWhoWeAre from '@/modules/about/components/AboutWhoWeAre'
import AboutWhyChoose from '@/modules/about/components/AboutWhyChoose'
import AboutMission from '@/modules/about/components/AboutMission'
import AboutValues from '@/modules/about/components/AboutValues'
import AboutTrustBadges from '@/modules/about/components/AboutTrustBadges'
import AboutContactReasons from '@/modules/about/components/AboutContactReasons'
import AboutPageCta from '@/modules/about/components/AboutPageCta'

export default function AboutPage() {
  return (
    <CallExpertProvider>
      <Navbar />
      <SiteBreadcrumbBar path={ABOUT_PATH} />
      <main id="main-content" className="overflow-x-clip">
        <AboutPageHero />
        <AboutHighlights />
        <AboutWhoWeAre />
        <AboutWhyChoose />
        <AboutMission />
        <AboutValues />
        <AboutTrustBadges />
        <AboutContactReasons />
        <Container className="max-w-3xl py-10">
          <SourcesSection sources={ABOUT_PAGE_SOURCES} />
        </Container>
        <AboutPageCta />
        <PageRelatedLinks path={ABOUT_PATH} heading="Related pages" />
      </main>
      <Footer />
    </CallExpertProvider>
  )
}
