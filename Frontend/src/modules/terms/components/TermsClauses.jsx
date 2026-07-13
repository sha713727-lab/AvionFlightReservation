'use client'

import Container from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'
import { TERMS_CLAUSES } from '@/modules/terms/constants'

export default function TermsClauses() {
  return (
    <section
      className="bg-section-alt py-16 lg:py-24"
      aria-labelledby="terms-clauses-heading"
    >
      <Container>
        <FadeIn className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
            {COPY.terms.clausesEyebrow}
          </p>
          <h2
            id="terms-clauses-heading"
            className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-tight text-primary"
          >
            {COPY.terms.clausesTitle}
          </h2>
        </FadeIn>

        <div className="mx-auto max-w-4xl space-y-5">
          {TERMS_CLAUSES.map((clause, index) => (
            <FadeIn key={clause.id} delay={index * 0.04}>
              <article
                id={clause.id}
                className="scroll-mt-28 grid grid-cols-1 gap-5 rounded-3xl border border-border bg-card p-6 shadow-card sm:grid-cols-[88px_minmax(0,1fr)] sm:gap-8 sm:p-8 lg:scroll-mt-32"
              >
                <div className="flex items-start">
                  <span className="font-heading text-4xl font-semibold tracking-tight text-accent/25 sm:text-5xl">
                    {clause.number}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading text-xl font-semibold tracking-tight text-primary sm:text-2xl">
                    {clause.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-text-secondary">
                    {clause.description}
                  </p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  )
}
