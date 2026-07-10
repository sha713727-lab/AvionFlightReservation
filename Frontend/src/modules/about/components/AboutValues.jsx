'use client'

import Container from '@/components/ui/Container'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'
import { ABOUT_VALUES } from '@/modules/about/constants'

export default function AboutValues() {
  return (
    <section
      className="bg-section-alt py-20 lg:py-28"
      aria-labelledby="about-values-heading"
    >
      <Container>
        <FadeIn className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
            {COPY.about.valuesEyebrow}
          </p>
          <h2
            id="about-values-heading"
            className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-tight text-primary"
          >
            {COPY.about.valuesTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
            {COPY.about.valuesDescription}
          </p>
        </FadeIn>

        <StaggerContainer className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {ABOUT_VALUES.map((value, index) => (
            <StaggerItem key={value.id}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-card">
                <span className="mb-5 font-heading text-sm font-semibold tracking-[0.18em] text-accent">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mb-3 text-xl font-semibold tracking-tight text-primary">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">{value.description}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}
