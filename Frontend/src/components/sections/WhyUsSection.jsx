'use client'

import { useCallback, useState } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import Container from '@/components/ui/Container'
import LayeredSectionHeading from '@/components/ui/LayeredSectionHeading'
import WhyUsCard from '@/components/cards/WhyUsCard'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'
import { WHY_US, VALUE_PROPS } from '@/data/services'
import { cn } from '@/utils/cn'

function ValueProp({ label }) {
  return (
    <div className="group cursor-default text-center">
      <p className="text-base font-semibold tracking-tight text-primary transition-colors duration-200 group-hover:text-accent lg:text-lg">
        {label}
      </p>
    </div>
  )
}

function WhyUsMobileCarousel() {
  const [active, setActive] = useState(0)
  const cardCount = WHY_US.length

  const goTo = useCallback((index) => {
    setActive(index)
  }, [])

  const next = useCallback(() => {
    setActive((current) => (current + 1) % cardCount)
  }, [cardCount])

  const prev = useCallback(() => {
    setActive((current) => (current - 1 + cardCount) % cardCount)
  }, [cardCount])

  const safeActive = active % cardCount
  const item = WHY_US[safeActive]

  return (
    <div className="relative mb-14 sm:hidden">
      <button
        type="button"
        onClick={prev}
        className="absolute -left-1 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-primary shadow-sm transition-colors hover:border-accent/30 hover:text-accent"
        aria-label={COPY.whyUs.previousLabel}
      >
        <HiChevronLeft className="h-5 w-5" />
      </button>

      <div className="overflow-hidden px-8">
        <WhyUsCard item={item} index={safeActive} />
      </div>

      <button
        type="button"
        onClick={next}
        className="absolute -right-1 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-primary shadow-sm transition-colors hover:border-accent/30 hover:text-accent"
        aria-label={COPY.whyUs.nextLabel}
      >
        <HiChevronRight className="h-5 w-5" />
      </button>

      <div className="mt-6 flex justify-center gap-2">
        {WHY_US.map((card, index) => (
          <button
            key={card.id}
            type="button"
            onClick={() => goTo(index)}
            className="inline-flex h-11 min-w-11 items-center justify-center rounded-full"
            aria-label={`Show ${card.title}`}
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
  )
}

export default function WhyUsSection() {
  return (
    <section id="why-us" className="bg-section-alt py-24 lg:py-32" aria-labelledby="why-us-heading">
      <Container>
        <LayeredSectionHeading
          titleId="why-us-heading"
          watermark={COPY.whyUs.watermark}
          title={COPY.whyUs.title}
          description={COPY.whyUs.description}
        />

        <WhyUsMobileCarousel />

        <StaggerContainer className="mb-20 hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {WHY_US.map((item, index) => (
            <StaggerItem key={item.id}>
              <WhyUsCard item={item} index={index} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn>
          <div className="grid grid-cols-1 gap-8 border border-border bg-card px-8 py-12 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
            {VALUE_PROPS.map((item) => (
              <ValueProp key={item.label} label={item.label} />
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
