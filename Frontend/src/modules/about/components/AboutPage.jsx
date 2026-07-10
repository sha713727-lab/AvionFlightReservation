'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingActions from '@/components/layout/FloatingActions'
import CallExpertProvider from '@/modules/call/components/CallExpertProvider'
import AboutPageHero from '@/modules/about/components/AboutPageHero'
import AboutHighlights from '@/modules/about/components/AboutHighlights'
import AboutWhoWeAre from '@/modules/about/components/AboutWhoWeAre'
import AboutMission from '@/modules/about/components/AboutMission'
import AboutValues from '@/modules/about/components/AboutValues'
import AboutContactReasons from '@/modules/about/components/AboutContactReasons'
import AboutPageCta from '@/modules/about/components/AboutPageCta'

export default function AboutPage() {
  return (
    <CallExpertProvider>
      <Navbar />
      <main className="overflow-x-clip">
        <AboutPageHero />
        <AboutHighlights />
        <AboutWhoWeAre />
        <AboutMission />
        <AboutValues />
        <AboutContactReasons />
        <AboutPageCta />
      </main>
      <Footer />
      <FloatingActions />
    </CallExpertProvider>
  )
}
