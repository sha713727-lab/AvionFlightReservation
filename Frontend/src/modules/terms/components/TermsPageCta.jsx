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

export default function TermsPageCta() {
  return (
    <section className="bg-background py-16 lg:py-20" aria-labelledby="terms-page-cta-heading">
      <Container>
        <FadeIn>
          <div className="mx-auto flex max-w-4xl flex-col items-start justify-between gap-8 border border-border bg-section px-6 py-10 sm:px-10 lg:flex-row lg:items-center lg:px-12">
            <div className="max-w-xl">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                {COPY.terms.contactEyebrow}
              </p>
              <h2
                id="terms-page-cta-heading"
                className="font-heading text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-tight text-primary"
              >
                {COPY.terms.contactTitle}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-text-secondary">
                {COPY.terms.contactDescription}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={PHONE_HREF}
                aria-label={`Call ${PHONE_NUMBER}`}
                className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-sm shadow-accent/25 transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <FaPhone className="h-5 w-5" aria-hidden />
              </a>

              <a
                href={RESERVATION_EMAIL_HREF}
                aria-label={`Email ${RESERVATION_EMAIL}`}
                className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-accent bg-card text-accent transition-colors hover:bg-accent/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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
