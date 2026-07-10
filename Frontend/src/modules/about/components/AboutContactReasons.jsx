'use client'

import Container from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'

export default function AboutContactReasons() {
  return (
    <section
      className="bg-background py-20 lg:py-28"
      aria-labelledby="about-contact-reasons-heading"
    >
      <Container>
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
            {COPY.about.contactReasonsEyebrow}
          </p>
          <h2
            id="about-contact-reasons-heading"
            className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-tight text-primary"
          >
            {COPY.about.contactReasonsTitle}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-text-secondary sm:text-lg">
            {COPY.about.contactReasonsDescription}
          </p>
        </FadeIn>
      </Container>
    </section>
  )
}
