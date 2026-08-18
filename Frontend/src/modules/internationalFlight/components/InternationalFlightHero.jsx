'use client'

import OptimizedImage from '@/components/media/OptimizedImage'
import { FaPhone, FaPlane } from 'react-icons/fa'
import Button from '@/components/buttons/Button'
import Container from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'
import { INTERNATIONAL_FLIGHT_HERO_IMAGE_SRC } from '@/constants/images'
import { useCallExpertModal } from '@/modules/call/components/CallExpertProvider'
import { useContactSettings } from '@/modules/contact/components/ContactSettingsProvider'

export default function InternationalFlightHero() {
  const callModal = useCallExpertModal()
  const { phoneNumber } = useContactSettings()

  return (
    <section
      className="relative flex min-h-[min(100svh,52rem)] items-center overflow-hidden bg-primary pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24"
      aria-labelledby="international-flight-heading"
    >
      <OptimizedImage
        src={INTERNATIONAL_FLIGHT_HERO_IMAGE_SRC}
        alt=""
        fill
        priority
        quality={70}
        sizes="(max-width: 768px) 100vw, 1920px"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-primary/75" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/55 to-primary/90"
        aria-hidden
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary/50 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-secondary">
              <FaPlane className="h-3 w-3 shrink-0" aria-hidden />
              {COPY.internationalFlight.badge}
            </p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1
              id="international-flight-heading"
              className="font-heading text-[clamp(2.5rem,7vw,4.5rem)] font-semibold leading-[1.05] tracking-tight"
            >
              <span className="block text-white">{COPY.internationalFlight.titleLineOne}</span>
              <span className="mt-1 block text-secondary">
                {COPY.internationalFlight.titleLineTwo}
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              {COPY.internationalFlight.description}
            </p>
          </FadeIn>

          <FadeIn delay={0.24}>
            <div className="mt-10 flex justify-center">
              <Button
                variant="primary"
                size="lg"
                icon={FaPhone}
                onClick={callModal.open}
                className="min-w-[16rem]"
              >
                {phoneNumber}
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.32}>
            <p className="mt-6 text-sm text-white/75">{COPY.internationalFlight.availability}</p>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
