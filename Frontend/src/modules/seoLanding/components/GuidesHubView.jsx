'use client'

import Link from 'next/link'
import Button from '@/components/buttons/Button'
import { FadeIn } from '@/components/animations/FadeIn'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SiteBreadcrumbBar from '@/components/layout/SiteBreadcrumbBar'
import PageRelatedLinks from '@/components/links/PageRelatedLinks'
import Container from '@/components/ui/Container'
import { SERVICES_PATH } from '@/constants/routes'
import { getSeoPageH1 } from '@/constants/seoPageMeta'
import CallExpertProvider from '@/modules/call/components/CallExpertProvider'
import { GUIDE_HUB, GUIDE_PAGES } from '@/modules/seoLanding/constants/guidePages'
import { SEO_LANDING_COPY } from '@/modules/seoLanding/constants/seoLandingCopy'

function GuidesHubContent() {
  return (
    <>
      <Navbar />
      <SiteBreadcrumbBar path={GUIDE_HUB.path} />
      <main id="main-content" className="overflow-x-clip bg-background pb-20 pt-8 lg:pt-10">
        <Container className="max-w-3xl">
          <FadeIn>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-text-muted">
              {SEO_LANDING_COPY.guidesHubEyebrow}
            </p>
            <h1 className="mt-4 font-heading text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-tight text-primary">
              {getSeoPageH1(GUIDE_HUB.path)}
            </h1>
            <p className="speakable-summary mt-6 text-base leading-relaxed text-text-secondary sm:text-lg">
              {GUIDE_HUB.intro}
            </p>
          </FadeIn>

          <FadeIn delay={0.08} className="mt-12">
            <h2 className="font-heading text-xl font-semibold text-primary">{SEO_LANDING_COPY.guidesListHeading}</h2>
            <ul className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
              {GUIDE_PAGES.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={guide.path}
                    className="block px-6 py-5 transition-colors hover:bg-section-alt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <span className="font-medium text-primary">{guide.question}</span>
                    <span className="mt-1 block text-sm text-text-secondary line-clamp-2">{guide.directAnswer}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.12} className="mt-10">
            <Button href={SERVICES_PATH} variant="secondary" size="lg">
              {SEO_LANDING_COPY.servicesLinkLabel}
            </Button>
          </FadeIn>
        </Container>
        <PageRelatedLinks path={GUIDE_HUB.path} />
      </main>
      <Footer />
    </>
  )
}

export default function GuidesHubView() {
  return (
    <CallExpertProvider>
      <GuidesHubContent />
    </CallExpertProvider>
  )
}
