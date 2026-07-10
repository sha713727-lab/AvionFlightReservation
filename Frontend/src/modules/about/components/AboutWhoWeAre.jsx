'use client'

import Container from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'

export default function AboutWhoWeAre() {
  return (
    <section
      className="bg-background py-20 lg:py-28"
      aria-labelledby="about-who-we-are-heading"
    >
      <Container>
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <FadeIn>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
              {COPY.about.whoWeAreEyebrow}
            </p>
            <h2
              id="about-who-we-are-heading"
              className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-tight text-primary"
            >
              {COPY.about.whoWeAreTitle}
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="space-y-5">
            {COPY.about.whoWeAreParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-text-secondary sm:text-lg">
                {paragraph}
              </p>
            ))}

            <aside className="rounded-2xl border border-accent/20 bg-accent/5 p-6 sm:p-7">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                {COPY.about.transparencyLabel}
              </p>
              <p className="text-sm leading-relaxed text-text sm:text-base">
                {COPY.about.transparencyText}
              </p>
            </aside>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
