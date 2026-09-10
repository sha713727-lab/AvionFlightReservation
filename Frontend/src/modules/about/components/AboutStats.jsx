'use client'

import Container from '@/components/ui/Container'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'
import { ABOUT_STATS } from '@/modules/about/constants'

export default function AboutStats() {
  return (
    <section className="border-y border-border bg-primary py-14 lg:py-16" aria-labelledby="about-stats-heading">
      <Container>
        <FadeIn className="mb-10 text-center">
          <h2 id="about-stats-heading" className="sr-only">
            {COPY.about.statsTitle}
          </h2>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/70">
            {COPY.about.statsEyebrow}
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {ABOUT_STATS.map((stat) => (
            <StaggerItem key={stat.id}>
              <div className="text-center">
                <p className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-tight text-white">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm leading-snug text-white/75">{stat.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}
