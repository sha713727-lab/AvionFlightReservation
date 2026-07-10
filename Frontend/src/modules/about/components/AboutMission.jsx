'use client'

import Container from '@/components/ui/Container'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'
import { ABOUT_MISSION_POINTS } from '@/modules/about/constants'

export default function AboutMission() {
  return (
    <section
      className="bg-primary py-20 lg:py-28"
      aria-labelledby="about-mission-heading"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-white/50">
              {COPY.about.missionEyebrow}
            </p>
            <h2
              id="about-mission-heading"
              className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-tight text-white"
            >
              {COPY.about.missionTitle}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/65 sm:text-lg">
              {COPY.about.missionDescription}
            </p>
          </FadeIn>
        </div>

        <StaggerContainer className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3 md:gap-6 lg:mt-16">
          {ABOUT_MISSION_POINTS.map((point) => {
            const Icon = point.icon

            return (
              <StaggerItem key={point.id}>
                <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-left transition-colors duration-300 hover:border-accent/40 hover:bg-white/[0.07]">
                  <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/20 text-secondary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <p className="text-base font-medium leading-relaxed text-white">{point.title}</p>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </Container>
    </section>
  )
}
