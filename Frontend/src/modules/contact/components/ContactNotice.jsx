'use client'

import { HiOutlineExclamationCircle } from 'react-icons/hi'
import Container from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'

export default function ContactNotice() {
  return (
    <section className="bg-section-alt py-14 lg:py-16" aria-labelledby="contact-notice-heading">
      <Container>
        <FadeIn>
          <div className="mx-auto flex max-w-4xl gap-4 rounded-2xl border border-accent/20 bg-accent/5 p-6 sm:gap-5 sm:p-8">
            <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <HiOutlineExclamationCircle className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <h2
                id="contact-notice-heading"
                className="font-heading text-lg font-semibold tracking-tight text-primary sm:text-xl"
              >
                {COPY.contactPage.noticeLabel}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary sm:text-base">
                {COPY.contactPage.noticeText}
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
