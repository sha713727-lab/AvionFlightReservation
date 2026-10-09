'use client'

import Container from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { ABOUT_WHAT_IS } from '@/modules/about/constants'

export default function AboutWhatIs() {
  return (
    <section className="bg-section-alt py-16 lg:py-20" aria-labelledby="about-what-is-heading">
      <Container>
        <FadeIn className="mx-auto max-w-3xl">
          <h2
            id="about-what-is-heading"
            className="font-heading text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-tight text-primary"
          >
            {ABOUT_WHAT_IS.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
            {ABOUT_WHAT_IS.body}
          </p>
        </FadeIn>
      </Container>
    </section>
  )
}
