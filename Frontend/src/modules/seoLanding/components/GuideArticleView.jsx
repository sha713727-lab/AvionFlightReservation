'use client'

import Link from 'next/link'
import Button from '@/components/buttons/Button'
import AuthorBox from '@/components/geo/AuthorBox'
import SourcesSection from '@/components/geo/SourcesSection'
import { FadeIn } from '@/components/animations/FadeIn'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SiteBreadcrumbBar from '@/components/layout/SiteBreadcrumbBar'
import Container from '@/components/ui/Container'
import { GUIDE_SOURCES_BY_SLUG } from '@/constants/geoPageSources'
import { PHONE_HREF, PHONE_NUMBER } from '@/constants/contact'
import { getSeoPageH1 } from '@/constants/seoPageMeta'
import { CTA_PLACEMENT } from '@/constants/analytics'
import CallExpertProvider, { useCallExpertModal } from '@/modules/call/components/CallExpertProvider'
import { getGuideFaqsBySlug } from '@/modules/seoLanding/constants/guideFaqs'
import { getGuidePageBySlug } from '@/modules/seoLanding/constants/guidePages'
import { SEO_LANDING_COPY } from '@/modules/seoLanding/constants/seoLandingCopy'
import PeopleAlsoAskSection from '@/modules/seoLanding/components/PeopleAlsoAskSection'

function GuideArticleContent({ slug }) {
  const guide = getGuidePageBySlug(slug)
  const callModal = useCallExpertModal()
  const sources = GUIDE_SOURCES_BY_SLUG[slug] || []
  const faqs = getGuideFaqsBySlug(slug)

  if (!guide) {
    return null
  }

  return (
    <>
      <Navbar />
      <SiteBreadcrumbBar path={guide.path} />
      <main id="main-content" className="overflow-x-clip bg-background pb-20 pt-8 lg:pt-10">
        <Container className="max-w-3xl">
          <article>
            <FadeIn>
              <h1 className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-tight text-primary">
                {getSeoPageH1(guide.path)}
              </h1>
              <p className="mt-4 text-base font-medium leading-relaxed text-text sm:text-lg">
                {guide.question}
              </p>
              <AuthorBox />
            </FadeIn>

            <FadeIn delay={0.06} className="mt-6">
              <p className="text-base font-medium leading-relaxed text-primary sm:text-lg">
                {guide.directAnswer}
              </p>
            </FadeIn>

            <FadeIn delay={0.1} className="mt-8 space-y-6 text-sm leading-relaxed text-text-secondary sm:text-base">
              <section aria-labelledby="guide-explanation">
                <h2 id="guide-explanation" className="font-heading text-lg font-semibold text-primary">
                  {SEO_LANDING_COPY.guideExplanationHeading}
                </h2>
                <p className="mt-3">{guide.explanation}</p>
              </section>

              <section aria-labelledby="guide-conditions">
                <h2 id="guide-conditions" className="font-heading text-lg font-semibold text-primary">
                  {SEO_LANDING_COPY.guideConditionsHeading}
                </h2>
                <ul className="mt-3 space-y-2">
                  {guide.conditions.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="guide-expert">
                <h2 id="guide-expert" className="font-heading text-lg font-semibold text-primary">
                  {SEO_LANDING_COPY.guideExpertHeading}
                </h2>
                <p className="mt-3">{guide.expertGuidance}</p>
              </section>
            </FadeIn>

            <FadeIn delay={0.12} className="mt-12">
              <SourcesSection sources={sources} />
            </FadeIn>

            {faqs.length ? (
              <FadeIn delay={0.13} className="mt-12">
                <PeopleAlsoAskSection faqs={faqs} />
              </FadeIn>
            ) : null}
          </article>

          <FadeIn delay={0.14} className="mt-14 rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
            <h2 className="font-heading text-xl font-semibold text-primary">{SEO_LANDING_COPY.ctaTitle}</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-text-secondary">
              {SEO_LANDING_COPY.ctaDescription}
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={PHONE_HREF} variant="primary" size="lg">
                {SEO_LANDING_COPY.ctaPhoneLabel} · {PHONE_NUMBER}
              </Button>
              <Button variant="secondary" size="lg" onClick={() => callModal.open(CTA_PLACEMENT.guide)}>
                {SEO_LANDING_COPY.ctaCallbackLabel}
              </Button>
            </div>
          </FadeIn>

          {guide.relatedQuestions?.length ? (
            <FadeIn delay={0.16} className="mt-12">
              <h2 className="font-heading text-lg font-semibold text-primary">
                {SEO_LANDING_COPY.guideRelatedHeading}
              </h2>
              <ul className="mt-4 flex flex-col gap-2">
                {guide.relatedQuestions.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-accent transition-colors hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeIn>
          ) : null}
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default function GuideArticleView({ slug }) {
  return (
    <CallExpertProvider>
      <GuideArticleContent slug={slug} />
    </CallExpertProvider>
  )
}
