'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SiteBreadcrumbBar from '@/components/layout/SiteBreadcrumbBar'
import Container from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { getSeoPageH1 } from '@/constants/seoPageMeta'
import { TOOL_AVION_POINTS_CALCULATOR_PATH } from '@/constants/routes'
import CallExpertProvider from '@/modules/call/components/CallExpertProvider'
import AvionPointsCalculator from '@/modules/tools/components/AvionPointsCalculator'
import { CALCULATOR_PAGE_COPY } from '@/modules/tools/constants'

export default function CalculatorPage() {
  const h1 = getSeoPageH1(TOOL_AVION_POINTS_CALCULATOR_PATH)

  return (
    <CallExpertProvider>
      <Navbar />
      <SiteBreadcrumbBar path={TOOL_AVION_POINTS_CALCULATOR_PATH} />
      <main id="main-content" className="overflow-x-clip pb-16 pt-8">
        <Container>
          <FadeIn>
            <p className="text-sm font-medium uppercase tracking-wide text-accent">
              {CALCULATOR_PAGE_COPY.eyebrow}
            </p>
            <h1 className="mt-2 font-heading text-3xl font-bold text-primary md:text-4xl">{h1}</h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-secondary">
              {CALCULATOR_PAGE_COPY.intro}
            </p>
          </FadeIn>
          <FadeIn delay={0.08} className="mt-10">
            <AvionPointsCalculator />
          </FadeIn>
        </Container>
      </main>
      <Footer />
    </CallExpertProvider>
  )
}
