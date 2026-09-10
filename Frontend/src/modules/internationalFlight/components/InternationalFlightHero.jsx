'use client'

import OptimizedImage from '@/components/media/OptimizedImage'
import { FaPhone, FaPlane } from 'react-icons/fa'
import Button from '@/components/buttons/Button'
import Container from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'
import {
  INTERNATIONAL_FLIGHT_HERO_ALT,
  INTERNATIONAL_FLIGHT_HERO_IMAGE_SRC,
} from '@/constants/images'
import { INTERNATIONAL_FLIGHT_PATH } from '@/constants/routes'
import { getSeoPageH1 } from '@/constants/seoPageMeta'
import { useCallExpertModal } from '@/modules/call/components/CallExpertProvider'
import { useContactSettings } from '@/modules/contact/components/ContactSettingsProvider'

export default function InternationalFlightHero() {
  const callModal = useCallExpertModal()
  const { phoneNumber } = useContactSettings()

  return (
    <section
      className="relative flex min-h-[min(100svh,52rem)] items-center overflow-hidden bg-primary pt-10 pb-16 sm:pt-12 lg:pt-14 lg:pb-24"
      aria-labelledby="international-flight-heading"
    >
      <OptimizedImage
        src={INTERNATIONAL_FLIGHT_HERO_IMAGE_SRC}
        alt={INTERNATIONAL_FLIGHT_HERO_ALT}
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
              className="font-heading text-[clamp(1.75rem,7vw,4rem)] font-semibold leading-[1.08] tracking-tight text-white"
            >
              {getSeoPageH1(INTERNATIONAL_FLIGHT_PATH)}
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg speakable-summary">
              {COPY.internationalFlight.description}
            </p>
          </FadeIn>

          <FadeIn delay={0.24}>
            <div className="mt-10 flex w-full justify-center px-0">
              <Button
                variant="primary"
                size="lg"
                icon={FaPhone}
                onClick={callModal.open}
                className="w-full max-w-md"
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
