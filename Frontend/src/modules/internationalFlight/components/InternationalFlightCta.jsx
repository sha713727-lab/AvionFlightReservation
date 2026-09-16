'use client'

import { FaMapMarkerAlt, FaPhone } from 'react-icons/fa'
import { MdOutlinePhoneCallback } from 'react-icons/md'
import Button from '@/components/buttons/Button'
import Container from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'
import { MAILING_ADDRESS_LINES } from '@/constants/contact'
import { useCallExpertModal } from '@/modules/call/components/CallExpertProvider'
import { useCallbackRequestModal } from '@/modules/callback/components/CallbackRequestProvider'
import { useContactSettings } from '@/modules/contact/components/ContactSettingsProvider'

export default function InternationalFlightCta() {
  const callModal = useCallExpertModal()
  const callbackModal = useCallbackRequestModal()
  const { phoneNumber, callbacksEnabled } = useContactSettings()
  const showCallbackCta = callbacksEnabled && typeof callbackModal?.open === 'function'

  return (
    <section
      className="bg-accent py-16 lg:py-20"
      aria-labelledby="international-cta-heading"
    >
      <Container>
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2
            id="international-cta-heading"
            className="font-heading text-[clamp(1.85rem,4vw,2.75rem)] font-semibold tracking-tight text-white"
          >
            {COPY.internationalFlight.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/85 lg:text-lg">
            {COPY.internationalFlight.ctaDescription}
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button
              variant="dark"
              size="lg"
              icon={FaPhone}
              onClick={callModal.open}
              className="w-full bg-primary text-secondary hover:bg-primary-hover sm:w-auto"
            >
              {phoneNumber}
            </Button>
            {showCallbackCta ? (
              <Button
                variant="outline"
                size="lg"
                icon={MdOutlinePhoneCallback}
                onClick={callbackModal.open}
                className="w-full border-white/80 text-white hover:border-white hover:bg-white/10 hover:text-white sm:w-auto"
              >
                {COPY.cta.callBackRequest}
              </Button>
            ) : null}
          </div>

          <address className="mt-10 flex items-start justify-center gap-2 not-italic text-sm leading-relaxed text-white/70">
            <FaMapMarkerAlt className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
            <span>{MAILING_ADDRESS_LINES.join(', ')}</span>
          </address>
        </FadeIn>
      </Container>
    </section>
  )
}
