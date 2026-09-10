'use client'

import Container from '@/components/ui/Container'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'
import { ABOUT_TEAM } from '@/modules/about/constants'

export default function AboutTeam() {
  return (
    <section className="bg-section py-20 lg:py-28" aria-labelledby="about-team-heading">
      <Container>
        <FadeIn className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
            {COPY.about.teamEyebrow}
          </p>
          <h2
            id="about-team-heading"
            className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-tight text-primary"
          >
            {COPY.about.teamTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
            {COPY.about.teamDescription}
          </p>
        </FadeIn>

        <StaggerContainer className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ABOUT_TEAM.map((member) => (
            <StaggerItem key={member.id}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card">
                <div
                  className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-section-alt to-accent/10"
                  role="img"
                  aria-label={`${member.name} photo placeholder`}
                >
                  <span className="font-heading text-4xl font-semibold tracking-tight text-accent/40">
                    {member.initials}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold tracking-tight text-primary">{member.name}</h3>
                  <p className="mt-1 text-sm font-medium text-accent">{member.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{member.bio}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}
