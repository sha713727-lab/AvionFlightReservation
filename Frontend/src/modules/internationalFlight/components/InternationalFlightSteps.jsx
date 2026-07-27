'use client'

import Container from '@/components/ui/Container'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'
import { INTERNATIONAL_FLIGHT_STEPS } from '@/modules/internationalFlight/constants'

export default function InternationalFlightSteps() {
  return (
    <section
      className="border-t border-white/10 bg-primary py-16 lg:py-24"
      aria-labelledby="international-steps-heading"
    >
      <Container>
        <FadeIn className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <h2
            id="international-steps-heading"
            className="font-heading text-[clamp(1.85rem,4vw,2.75rem)] font-semibold tracking-tight text-white"
          >
            {COPY.internationalFlight.stepsTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            {COPY.internationalFlight.stepsDescription}
          </p>
        </FadeIn>

        <StaggerContainer className="grid gap-10 sm:grid-cols-3 sm:gap-8">
          {INTERNATIONAL_FLIGHT_STEPS.map((step) => (
            <StaggerItem key={step.id}>
              <article className="text-center sm:text-left">
                <p
                  className="font-heading text-4xl font-semibold tracking-tight text-secondary lg:text-5xl"
                  aria-hidden
                >
                  {step.number}
                </p>
                <h3 className="mt-4 font-heading text-xl font-semibold tracking-tight text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65 lg:text-base">
                  {step.description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}
