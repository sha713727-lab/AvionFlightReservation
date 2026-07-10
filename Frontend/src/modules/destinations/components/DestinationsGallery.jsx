'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import CatalogStatus from '@/components/ui/CatalogStatus'
import { FadeIn } from '@/components/animations/FadeIn'
import { EASE, SPRING } from '@/components/animations/motionPresets'
import { COPY } from '@/constants/copy'
import {
  ALL_DESTINATIONS_FILTER,
  getFlattenedDestinations,
} from '@/modules/destinations/constants'
import DestinationPlaceCard from '@/modules/destinations/components/DestinationPlaceCard'
import { cn } from '@/utils/cn'

export default function DestinationsGallery({ destinations = [] }) {
  const [activeFilter, setActiveFilter] = useState(ALL_DESTINATIONS_FILTER)
  const allPlaces = useMemo(() => getFlattenedDestinations(destinations), [destinations])

  const filters = useMemo(
    () => [
      { id: ALL_DESTINATIONS_FILTER, label: COPY.destinations.filterAll },
      ...destinations.map((tier) => ({
        id: tier.id,
        label: tier.title,
      })),
    ],
    [destinations],
  )

  const places = useMemo(() => {
    if (activeFilter === ALL_DESTINATIONS_FILTER) {
      return allPlaces
    }

    return allPlaces.filter((place) => place.tierId === activeFilter)
  }, [activeFilter, allPlaces])

  return (
    <section
      id="destination-gallery"
      className="scroll-mt-24 bg-background py-20 lg:py-28"
      aria-labelledby="destinations-gallery-heading"
    >
      <Container>
        <FadeIn className="mx-auto mb-10 max-w-3xl text-center lg:mb-14">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
            {COPY.destinations.galleryEyebrow}
          </p>
          <h2
            id="destinations-gallery-heading"
            className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-tight text-primary"
          >
            {COPY.destinations.galleryTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            {COPY.destinations.galleryDescription}
          </p>
        </FadeIn>

        {destinations.length === 0 ? (
          <CatalogStatus state="empty" />
        ) : (
          <>
            <FadeIn delay={0.08}>
              <div
                className="mb-10 flex flex-wrap justify-center gap-2.5 lg:mb-12"
                role="tablist"
                aria-label="Destination tiers"
              >
                {filters.map((filter) => {
                  const isActive = filter.id === activeFilter

                  return (
                    <motion.button
                      key={filter.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveFilter(filter.id)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      transition={SPRING}
                      className={cn(
                        'relative rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-300',
                        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                        isActive
                          ? 'bg-accent text-white shadow-sm shadow-accent/25'
                          : 'border border-border bg-card text-text-secondary hover:border-accent/30 hover:text-accent',
                      )}
                    >
                      {filter.label}
                    </motion.button>
                  )
                })}
              </div>
            </FadeIn>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
              >
                {places.map((place, index) => (
                  <motion.div
                    key={place.id}
                    initial={{ opacity: 0, y: 28, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.45, delay: index * 0.05, ease: EASE }}
                    className={cn(index === 0 && 'sm:col-span-2 lg:col-span-2')}
                  >
                    <DestinationPlaceCard {...place} featured={index === 0} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </Container>
    </section>
  )
}
