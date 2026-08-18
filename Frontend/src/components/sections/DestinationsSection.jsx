import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import Container from '@/components/ui/Container'
import LayeredSectionHeading from '@/components/ui/LayeredSectionHeading'
import DestinationTierCard from '@/components/cards/DestinationTierCard'
import CatalogStatus from '@/components/ui/CatalogStatus'
import { COPY } from '@/constants/copy'
import { EASE } from '@/components/animations/motionPresets'
import { cn } from '@/utils/cn'

const AUTO_INTERVAL_MS = 3500
const TRANSITION = { duration: 0.28, ease: EASE }

export default function DestinationsSection({ destinations = [] }) {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)
  const tierCount = destinations.length

  const goTo = useCallback(
    (index) => {
      setDirection(index > active ? 1 : -1)
      setActive(index)
    },
    [active],
  )

  const next = useCallback(() => {
    if (tierCount === 0) return
    setDirection(1)
    setActive((current) => (current + 1) % tierCount)
  }, [tierCount])

  const prev = useCallback(() => {
    if (tierCount === 0) return
    setDirection(-1)
    setActive((current) => (current - 1 + tierCount) % tierCount)
  }, [tierCount])

  useEffect(() => {
    if (paused || tierCount === 0) return undefined
    const timer = setInterval(next, AUTO_INTERVAL_MS)
    return () => clearInterval(timer)
  }, [next, paused, tierCount])

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
  const slideOffset = direction * 80

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

        <div
          className="relative mx-auto max-w-4xl px-2 sm:px-0"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button
            type="button"
            onClick={prev}
            className="absolute -left-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-primary shadow-sm transition-colors hover:border-accent/30 hover:text-accent sm:-left-16 sm:flex"
            aria-label="Previous reward tier"
          >
            <HiChevronLeft className="h-5 w-5" />
          </button>

          <div className="overflow-hidden">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={tier.id}
                custom={direction}
                initial={{ opacity: 0, x: slideOffset }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -slideOffset }}
                transition={TRANSITION}
              >
                <DestinationTierCard {...tier} />
              </motion.div>
            </AnimatePresence>
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
                    'h-2.5 w-8 origin-center rounded-full transition-transform duration-200',
                    index === safeActive
                      ? 'scale-x-100 bg-accent'
                      : 'scale-x-[0.31] bg-border hover:bg-accent/40',
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
