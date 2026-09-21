'use client'

import Button from '@/components/buttons/Button'
import { FadeIn } from '@/components/animations/FadeIn'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SiteBreadcrumbBar from '@/components/layout/SiteBreadcrumbBar'
import Container from '@/components/ui/Container'
import { PHONE_HREF, PHONE_NUMBER } from '@/constants/contact'
import { getSeoPageH1 } from '@/constants/seoPageMeta'
import { CTA_PLACEMENT } from '@/constants/analytics'
import CallExpertProvider, { useCallExpertModal } from '@/modules/call/components/CallExpertProvider'
import ServiceLandingBody from '@/modules/seoLanding/components/ServiceLandingBody'
import { getServicePageBySlug } from '@/modules/seoLanding/constants/servicePages'
import { SEO_LANDING_COPY } from '@/modules/seoLanding/constants/seoLandingCopy'

function ServiceLandingContent({ slug }) {
  const page = getServicePageBySlug(slug)
  const callModal = useCallExpertModal()

  if (!page) {
    return null
  }

  return (
    <>
      <Navbar />
      <SiteBreadcrumbBar path={page.path} />
      <main id="main-content" className="overflow-x-clip bg-background pb-20 pt-8 lg:pt-10">
        <Container className="max-w-3xl">
          <FadeIn>
            <h1 className="font-heading text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-tight text-primary">
              {getSeoPageH1(page.path)}
            </h1>
          </FadeIn>

          <FadeIn delay={0.06} className="mt-10">
            <ServiceLandingBody page={page} />
          </FadeIn>

          <FadeIn delay={0.1} className="mt-14 rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
            <h2 className="font-heading text-xl font-semibold text-primary">{SEO_LANDING_COPY.ctaTitle}</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-text-secondary">
              {SEO_LANDING_COPY.ctaDescription}
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={PHONE_HREF} variant="primary" size="lg">
                {SEO_LANDING_COPY.ctaPhoneLabel} · {PHONE_NUMBER}
              </Button>
              <Button variant="secondary" size="lg" onClick={() => callModal.open(CTA_PLACEMENT.pageCta)}>
                {SEO_LANDING_COPY.ctaCallbackLabel}
              </Button>
            </div>
          </FadeIn>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default function ServiceLandingView({ slug }) {
  return (
    <CallExpertProvider>
      <ServiceLandingContent slug={slug} />
    </CallExpertProvider>
  )
}
