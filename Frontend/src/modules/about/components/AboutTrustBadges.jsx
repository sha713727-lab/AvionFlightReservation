'use client'

import Container from '@/components/ui/Container'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'
import { ABOUT_TRUST_BADGES } from '@/modules/about/constants'

export default function AboutTrustBadges() {
  return (
    <section className="bg-section-alt py-14 lg:py-16" aria-labelledby="about-trust-heading">
      <Container>
        <FadeIn className="mx-auto mb-8 max-w-2xl text-center">
          <h2
            id="about-trust-heading"
            className="font-heading text-xl font-semibold tracking-tight text-primary sm:text-2xl"
          >
            {COPY.about.trustTitle}
          </h2>
        </FadeIn>

        <StaggerContainer className="mx-auto flex max-w-4xl flex-wrap items-stretch justify-center gap-3 sm:gap-4">
          {ABOUT_TRUST_BADGES.map((badge) => {
            const Icon = badge.icon
            return (
              <StaggerItem key={badge.id}>
                <div className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-border bg-card px-5 py-3 shadow-card">
                  <Icon className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                  <span className="text-sm font-medium text-primary">{badge.label}</span>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </Container>
    </section>
  )
}
