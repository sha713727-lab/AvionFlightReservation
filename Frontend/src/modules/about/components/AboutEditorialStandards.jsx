'use client'

import Container from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { ABOUT_EDITORIAL_STANDARDS } from '@/modules/about/constants'

export default function AboutEditorialStandards() {
  return (
    <section
      className="bg-background py-16 lg:py-20"
      aria-labelledby="about-editorial-heading"
    >
      <Container>
        <FadeIn className="mx-auto max-w-3xl">
          <h2
            id="about-editorial-heading"
            className="font-heading text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-tight text-primary"
          >
            {ABOUT_EDITORIAL_STANDARDS.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
            {ABOUT_EDITORIAL_STANDARDS.intro}
          </p>
          <ul className="mt-8 space-y-5">
            {ABOUT_EDITORIAL_STANDARDS.items.map((item) => (
              <li key={item.id}>
                <h3 className="text-base font-semibold text-primary">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-text-secondary sm:text-base">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </FadeIn>
      </Container>
    </section>
  )
}
