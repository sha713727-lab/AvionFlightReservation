'use client'

import Container from '@/components/ui/Container'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'
import { ABOUT_WHY_CHOOSE } from '@/modules/about/constants'

export default function AboutWhyChoose() {
  return (
    <section className="bg-background py-20 lg:py-28" aria-labelledby="about-why-choose-heading">
      <Container>
        <FadeIn className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
            {COPY.about.whyChooseEyebrow}
          </p>
          <h2
            id="about-why-choose-heading"
            className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-tight text-primary"
          >
            {COPY.about.whyChooseTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
            {COPY.about.whyChooseDescription}
          </p>
        </FadeIn>

        <StaggerContainer className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2">
          {ABOUT_WHY_CHOOSE.map((item) => {
            const Icon = item.icon
            return (
              <StaggerItem key={item.id}>
                <article className="flex h-full gap-4 rounded-2xl border border-border bg-card p-6 shadow-card sm:p-7">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-primary">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.description}</p>
                  </div>
                </article>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </Container>
    </section>
  )
}
