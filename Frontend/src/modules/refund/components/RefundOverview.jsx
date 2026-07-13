'use client'

import Container from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { REFUND_OVERVIEW_CARDS } from '@/modules/refund/constants'

export default function RefundOverview() {
  return (
    <section className="bg-background py-16 lg:py-20" aria-label="Refund overview">
      <Container>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {REFUND_OVERVIEW_CARDS.map((card, index) => {
            const Icon = card.icon

            return (
              <FadeIn key={card.id} delay={index * 0.08}>
                <article className="flex h-full flex-col border-t-4 border-accent bg-section px-6 py-8 shadow-card transition-transform duration-300 hover:-translate-y-1.5">
                  <span className="mb-5 inline-flex h-11 w-11 items-center justify-center bg-accent text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h2 className="font-heading text-xl font-semibold tracking-tight text-primary">
                    {card.title}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                    {card.description}
                  </p>
                </article>
              </FadeIn>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
