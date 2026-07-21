'use client'

import { FaPhone } from 'react-icons/fa'
import Button from '@/components/buttons/Button'
import Container from '@/components/ui/Container'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'
import {
  CONTACT_LABELS,
  SUPPORT_HOURS,
} from '@/constants/contact'
import { CONTACT_PREP_ITEMS } from '@/modules/contact/constants'
import { useContactSettings } from '@/modules/contact/components/ContactSettingsProvider'
import { openMailto } from '@/utils/openMailto'

export default function ContactSupportSection() {
  const { reservationEmail, reservationEmailHref, phoneNumber, phoneHref } =
    useContactSettings()

  const handleEmailClick = (event) => {
    event.preventDefault()
    openMailto(reservationEmailHref)
  }

  return (
    <section
      className="bg-background py-20 lg:py-28"
      aria-labelledby="contact-support-heading"
    >
      <Container>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
              {COPY.contactPage.supportEyebrow}
            </p>
            <h2
              id="contact-support-heading"
              className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-tight text-primary"
            >
              {COPY.contactPage.supportTitle}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-text-secondary sm:text-lg">
              {COPY.contactPage.supportDescription}
            </p>

            <div className="mt-8 space-y-4">
              <Button href={phoneHref} variant="primary" size="lg" icon={FaPhone}>
                {phoneNumber}
              </Button>
              <div className="space-y-2 text-sm text-text-secondary">
                <p>
                  <span className="font-medium text-primary">
                    {CONTACT_LABELS.reservationEmail}:{' '}
                  </span>
                  <a
                    href={reservationEmailHref}
                    onClick={handleEmailClick}
                    className="cursor-pointer text-accent underline-offset-2 transition-colors hover:text-accent-hover hover:underline"
                  >
                    {reservationEmail}
                  </a>
                </p>
                <p>
                  <span className="font-medium text-primary">{CONTACT_LABELS.supportHours}: </span>
                  {SUPPORT_HOURS}
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-[1.75rem] border border-border bg-section p-7 shadow-card sm:p-9">
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                {COPY.contactPage.beforeCallEyebrow}
              </p>
              <h3 className="mb-7 font-heading text-2xl font-semibold tracking-tight text-primary">
                {COPY.contactPage.beforeCallTitle}
              </h3>

              <StaggerContainer className="space-y-4" stagger={0.08}>
                {CONTACT_PREP_ITEMS.map((item, index) => {
                  const Icon = item.icon

                  return (
                    <StaggerItem key={item.id}>
                      <div className="flex items-start gap-4 rounded-2xl border border-border/80 bg-card px-4 py-4">
                        <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                          <Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
                            {String(index + 1).padStart(2, '0')}
                          </p>
                          <p className="mt-1 text-base font-medium text-primary">{item.title}</p>
                        </div>
                      </div>
                    </StaggerItem>
                  )
                })}
              </StaggerContainer>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
