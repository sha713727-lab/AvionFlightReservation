'use client'

import Container from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'

export default function TermsPageHero() {
  return (
    <section
      className="relative overflow-hidden bg-section-alt pt-32 pb-16 lg:pt-40 lg:pb-20"
      aria-labelledby="terms-page-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[linear-gradient(180deg,rgba(37,99,235,0.08),transparent)]"
        aria-hidden
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-left sm:text-center">
          <FadeIn>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-text-muted">
              {COPY.terms.pageEyebrow}
            </p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1
              id="terms-page-heading"
              className="font-heading text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.08] tracking-tight text-primary"
            >
              {COPY.terms.pageTitle}
            </h1>
          </FadeIn>

          <FadeIn delay={0.14}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary sm:mx-auto sm:text-lg">
              {COPY.terms.pageDescription}
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mt-6 text-sm text-text-muted">
              <time dateTime={COPY.terms.lastUpdatedIso}>
                {COPY.terms.lastUpdatedLabel}: {COPY.terms.lastUpdatedDate}
              </time>
            </p>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
