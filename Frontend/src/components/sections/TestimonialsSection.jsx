'use client'

import Container from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import TestimonialCard from '@/components/cards/TestimonialCard'
import { PLACEHOLDER_REVIEWS } from '@/data/testimonials'
import { COPY } from '@/constants/copy'

/**
 * Homepage customer reviews section.
 * PLACEHOLDER: swap PLACEHOLDER_REVIEWS with real, permissioned reviews before publish.
 */
export default function TestimonialsSection() {
  return (
    <section
      id="reviews"
      className="testimonials bg-background py-20 lg:py-28"
      aria-labelledby="reviews-heading"
    >
      {/* PLACEHOLDER SECTION: replace review cards with real customer testimonials */}
      <Container>
        <FadeIn className="mx-auto mb-10 max-w-3xl text-center lg:mb-14">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
            {COPY.testimonials.eyebrow}
          </p>
          <h2
            id="reviews-heading"
            className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-tight text-primary"
          >
            {COPY.testimonials.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
            {COPY.testimonials.description}
          </p>
        </FadeIn>

        <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 lg:gap-6">
          {PLACEHOLDER_REVIEWS.map((review) => (
            <li key={review.id}>
              {/* PLACEHOLDER CARD: replace fields for {review.id} with a real review */}
              <TestimonialCard
                name={review.name}
                rating={review.rating}
                text={review.text}
                dateIso={review.dateIso}
                dateLabel={review.dateLabel}
                verified={review.verified}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
