'use client'

import Container from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { ABOUT_SCOPE } from '@/modules/about/constants'

export default function AboutScope() {
  return (
    <section className="bg-background py-16 lg:py-20" aria-labelledby="about-scope-heading">
      <Container>
        <FadeIn className="mx-auto max-w-3xl">
          <h2
            id="about-scope-heading"
            className="font-heading text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-tight text-primary"
          >
            {ABOUT_SCOPE.heading}
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="font-heading text-lg font-semibold text-primary">What we provide</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-text-secondary sm:text-base">
                {ABOUT_SCOPE.provided.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-lg font-semibold text-primary">What we do not provide</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-text-secondary sm:text-base">
                {ABOUT_SCOPE.notProvided.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
