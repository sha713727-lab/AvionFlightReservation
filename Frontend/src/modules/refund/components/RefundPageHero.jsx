'use client'

import Container from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'

export default function RefundPageHero() {
  return (
    <section
      className="relative overflow-hidden bg-primary pt-32 pb-16 lg:pt-40 lg:pb-20"
      aria-labelledby="refund-page-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.28),_transparent_45%)]"
        aria-hidden
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          <FadeIn>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-white/50">
              {COPY.refund.pageEyebrow}
            </p>
            <h1
              id="refund-page-heading"
              className="font-heading text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.08] tracking-tight text-white"
            >
              {COPY.refund.pageTitle}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              {COPY.refund.pageDescription}
            </p>
            <p className="mt-6 text-sm text-white/45">
              <time dateTime={COPY.refund.lastUpdatedIso}>
                {COPY.refund.lastUpdatedLabel}: {COPY.refund.lastUpdatedDate}
              </time>
            </p>
          </FadeIn>

          <FadeIn delay={0.12}>
            <aside className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                {COPY.refund.overviewLabel}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/75">
                {COPY.refund.noteText}
              </p>
            </aside>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
