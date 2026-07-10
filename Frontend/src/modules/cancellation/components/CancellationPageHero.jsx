'use client'

import Container from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'

export default function CancellationPageHero() {
  return (
    <section
      className="relative overflow-hidden bg-background pt-32 pb-14 lg:pt-40 lg:pb-16"
      aria-labelledby="cancellation-page-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(37,99,235,0.10),_transparent_55%)]"
        aria-hidden
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-text-muted">
              {COPY.cancellation.pageEyebrow}
            </p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1
              id="cancellation-page-heading"
              className="font-heading text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.08] tracking-tight text-primary"
            >
              {COPY.cancellation.pageTitle}
            </h1>
          </FadeIn>

          <FadeIn delay={0.14}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
              {COPY.cancellation.pageDescription}
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mt-6 text-sm text-text-muted">
              <time dateTime={COPY.cancellation.lastUpdatedIso}>
                {COPY.cancellation.lastUpdatedLabel}: {COPY.cancellation.lastUpdatedDate}
              </time>
            </p>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
