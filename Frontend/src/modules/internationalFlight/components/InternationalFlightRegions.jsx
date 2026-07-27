'use client'

import Image from 'next/image'
import { HiArrowRight } from 'react-icons/hi'
import Container from '@/components/ui/Container'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'
import { INTERNATIONAL_FLIGHT_REGIONS } from '@/modules/internationalFlight/constants'
import { useCallExpertModal } from '@/modules/call/components/CallExpertProvider'

export default function InternationalFlightRegions() {
  const callModal = useCallExpertModal()

  return (
    <section
      className="bg-primary py-16 lg:py-24"
      aria-labelledby="international-regions-heading"
    >
      <Container>
        <FadeIn className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-white/45">
            {COPY.internationalFlight.regionsEyebrow}
          </p>
          <h2
            id="international-regions-heading"
            className="font-heading text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-tight text-white"
          >
            {COPY.internationalFlight.regionsTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            {COPY.internationalFlight.regionsDescription}
          </p>
        </FadeIn>

        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:gap-5">
          {INTERNATIONAL_FLIGHT_REGIONS.map((region) => (
            <StaggerItem key={region.id}>
              <button
                type="button"
                onClick={callModal.open}
                className="group relative flex min-h-[14rem] w-full overflow-hidden rounded-2xl text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:min-h-[16rem]"
                aria-label={`${COPY.cta.callToBook}: ${region.name}`}
              >
                <Image
                  src={region.imageSrc}
                  alt={region.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/45 to-primary/10"
                  aria-hidden
                />
                <div className="relative z-10 mt-auto flex w-full items-end justify-between gap-4 p-5 sm:p-6">
                  <div>
                    <h3 className="font-heading text-xl font-semibold tracking-tight text-white sm:text-2xl">
                      <span className="text-secondary">{region.code}</span>{' '}
                      {region.name}
                    </h3>
                    <p className="mt-1 text-sm text-white/70">{region.description}</p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-secondary transition-transform duration-300 group-hover:translate-x-0.5">
                    {COPY.cta.callToBook}
                    <HiArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </button>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}
