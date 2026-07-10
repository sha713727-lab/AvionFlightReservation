'use client'

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'
import { SERVICE_CATEGORIES } from '@/modules/services/constants'
import { cn } from '@/utils/cn'

export default function ServicesCategoryGrid() {
  return (
    <section
      className="border-y border-border/70 bg-section py-16 lg:py-20"
      aria-labelledby="services-categories-heading"
    >
      <Container>
        <FadeIn className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
            {COPY.services.categoriesEyebrow}
          </p>
          <h2
            id="services-categories-heading"
            className="font-heading text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-tight text-primary"
          >
            {COPY.services.categoriesTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            {COPY.services.categoriesDescription}
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {SERVICE_CATEGORIES.map((category) => {
            const Icon = category.icon

            return (
              <StaggerItem key={category.id}>
                <motion.a
                  href={`#${category.id}`}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                  className={cn(
                    'group flex h-full flex-col rounded-2xl border border-border bg-card p-7',
                    'shadow-card transition-colors duration-300',
                    'hover:border-accent/30 hover:shadow-card-hover',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                  )}
                >
                  <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mb-2 text-xl font-semibold tracking-tight text-primary">
                    {category.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {category.description}
                  </p>
                </motion.a>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </Container>
    </section>
  )
}
