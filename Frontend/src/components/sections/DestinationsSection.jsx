import { useState, useCallback } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import Container from '@/components/ui/Container'
import LayeredSectionHeading from '@/components/ui/LayeredSectionHeading'
import DestinationTierCard from '@/components/cards/DestinationTierCard'
import CatalogStatus from '@/components/ui/CatalogStatus'
import { COPY } from '@/constants/copy'
import { cn } from '@/utils/cn'

export default function DestinationsSection({ destinations = [] }) {
  const [active, setActive] = useState(0)
  const tierCount = destinations.length

  const goTo = useCallback((index) => {
    setActive(index)
  }, [])

  const next = useCallback(() => {
    if (tierCount === 0) return
    setActive((current) => (current + 1) % tierCount)
  }, [tierCount])

  const prev = useCallback(() => {
    if (tierCount === 0) return
    setActive((current) => (current - 1 + tierCount) % tierCount)
  }, [tierCount])

  if (tierCount === 0) {
    return (
      <section
        id="destinations"
        className="py-24 lg:py-32 bg-section"
        aria-labelledby="destinations-heading"
      >
        <Container>
          <LayeredSectionHeading
            titleId="destinations-heading"
            watermark={COPY.destinations.watermark}
            title={COPY.destinations.title}
            accentTitle={COPY.destinations.accentTitle}
            description={COPY.destinations.description}
          />
          <CatalogStatus state="empty" />
        </Container>
      </section>
    )
  }

  const safeActive = active % tierCount
  const tier = destinations[safeActive]

  return (
    <section
      id="destinations"
      className="py-24 lg:py-32 bg-section"
      aria-labelledby="destinations-heading"
    >
      <Container>
        <LayeredSectionHeading
          titleId="destinations-heading"
          watermark={COPY.destinations.watermark}
          title={COPY.destinations.title}
          accentTitle={COPY.destinations.accentTitle}
          description={COPY.destinations.description}
        />

        <div className="relative mx-auto max-w-4xl px-2 sm:px-0">
          <button
            type="button"
            onClick={prev}
            className="absolute -left-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-primary shadow-sm transition-colors hover:border-accent/30 hover:text-accent sm:-left-16 sm:flex"
            aria-label="Previous reward tier"
          >
            <HiChevronLeft className="h-5 w-5" />
          </button>

          <div className="overflow-hidden">
            <DestinationTierCard {...tier} />
          </div>

          <button
            type="button"
            onClick={next}
            className="absolute -right-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-primary shadow-sm transition-colors hover:border-accent/30 hover:text-accent sm:-right-16 sm:flex"
            aria-label="Next reward tier"
          >
            <HiChevronRight className="h-5 w-5" />
          </button>

          <div className="mt-8 flex justify-center gap-2">
            {destinations.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(index)}
                className="inline-flex h-11 min-w-11 items-center justify-center rounded-full"
                aria-label={`Show ${item.title}`}
                aria-current={index === safeActive ? 'true' : undefined}
              >
                <span
                  className={cn(
                    'h-2.5 w-8 origin-center rounded-full',
                    index === safeActive
                      ? 'bg-accent'
                      : 'w-2.5 bg-border hover:bg-accent/40',
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
