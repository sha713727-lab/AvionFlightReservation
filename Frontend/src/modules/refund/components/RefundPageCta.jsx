'use client'

import { FaPhone } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import Container from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'
import {
  PHONE_HREF,
  PHONE_NUMBER,
  RESERVATION_EMAIL,
  RESERVATION_EMAIL_HREF,
} from '@/constants/contact'

export default function RefundPageCta() {
  return (
    <section className="bg-background py-16 lg:py-20" aria-labelledby="refund-page-cta-heading">
      <Container>
        <FadeIn>
          <div className="mx-auto flex max-w-4xl flex-col items-start justify-between gap-8 rounded-[2rem] bg-primary px-6 py-10 text-white sm:px-10 lg:flex-row lg:items-center lg:px-12">
            <div className="max-w-xl">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                {COPY.refund.contactEyebrow}
              </p>
              <h2
                id="refund-page-cta-heading"
                className="font-heading text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-tight text-white"
              >
                {COPY.refund.contactTitle}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-white/70">
                {COPY.refund.contactDescription}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={PHONE_HREF}
                aria-label={`Call ${PHONE_NUMBER}`}
                className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <FaPhone className="h-5 w-5" aria-hidden />
              </a>
              <a
                href={RESERVATION_EMAIL_HREF}
                aria-label={`Email ${RESERVATION_EMAIL}`}
                className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/5 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <HiOutlineMail className="h-6 w-6" aria-hidden />
              </a>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
