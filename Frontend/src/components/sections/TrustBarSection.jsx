'use client'

import Container from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'
import { PLACEHOLDER_AGGREGATE_RATING } from '@/data/testimonials'

/**
 * Homepage trust bar.
 * PLACEHOLDER: replace travelers / rating / airlines figures with real metrics before publish.
 */
export default function TrustBarSection() {
  const { travelersLabel, ratingValue, airlinesLabel } = PLACEHOLDER_AGGREGATE_RATING

  const items = [
    {
      id: 'travelers',
      // PLACEHOLDER: replace travelers count
      label: COPY.trustBar.trustedBy.replace('{count}', travelersLabel),
    },
    {
      id: 'rating',
      // PLACEHOLDER: replace rating value
      label: COPY.trustBar.rating.replace('{rating}', ratingValue),
    },
    {
      id: 'support',
      label: COPY.trustBar.support,
    },
    {
      id: 'airlines',
      // PLACEHOLDER: replace airlines count
      label: COPY.trustBar.airlines.replace('{count}', airlinesLabel),
    },
  ]

  return (
    <section
      id="trust-bar"
      className="border-y border-border bg-section-alt py-8 lg:py-10"
      aria-label={COPY.trustBar.ariaLabel}
    >
      {/* PLACEHOLDER TRUST BAR: update COPY/data values with real trust metrics */}
      <Container>
        <FadeIn>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {items.map((item, index) => (
              <li
                key={item.id}
                className={
                  index < items.length - 1
                    ? 'flex items-center justify-center border-border px-4 text-center sm:border-r lg:border-r'
                    : 'flex items-center justify-center px-4 text-center'
                }
              >
                <p className="text-sm font-semibold tracking-tight text-primary sm:text-base">
                  {item.label}
                </p>
              </li>
            ))}
          </ul>
        </FadeIn>
      </Container>
    </section>
  )
}
