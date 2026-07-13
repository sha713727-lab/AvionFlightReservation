'use client'

import Container from '@/components/ui/Container'
import CatalogStatus from '@/components/ui/CatalogStatus'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'
import { useCallExpertModal } from '@/modules/call/components/CallExpertProvider'

export default function DestinationsTierStrip({ destinations = [] }) {
  const callModal = useCallExpertModal()

  return (
    <section
      className="border-y border-border/70 bg-section py-16 lg:py-20"
      aria-labelledby="destinations-tiers-heading"
    >
      <Container>
        <FadeIn className="mb-10 text-center lg:mb-12">
          <h2
            id="destinations-tiers-heading"
            className="font-heading text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-tight text-primary"
          >
            {COPY.destinations.redeemFromLabel}
          </h2>
        </FadeIn>

        {destinations.length === 0 ? (
          <CatalogStatus state="empty" />
        ) : (
          <StaggerContainer className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
            {destinations.map((tier) => (
              <StaggerItem key={tier.id}>
                <button
                  type="button"
                  onClick={callModal.open}
                  className="flex h-full w-full flex-col items-center rounded-2xl border border-border bg-card px-3 py-5 text-center shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.03] hover:border-accent/30 hover:shadow-card-hover active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <span className="text-lg font-semibold tracking-tight text-accent sm:text-xl">
                    {tier.points.toLocaleString()}
                  </span>
                  <span className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-text-muted">
                    {COPY.destinations.pointsLabel}
                  </span>
                  <span className="mt-3 text-xs font-medium leading-snug text-primary sm:text-sm">
                    {tier.title}
                  </span>
                </button>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </Container>
    </section>
  )
}
