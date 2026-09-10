'use client'

import Container from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'
import {
  CONTACT_LABELS,
  MAILING_ADDRESS_LINES,
  SUPPORT_HOURS,
} from '@/constants/contact'
import { CONTACT_MAP } from '@/modules/contact/constants'
import ContactForm from '@/modules/contact/components/ContactForm'
import { useContactSettings } from '@/modules/contact/components/ContactSettingsProvider'
import TrackedTelLink from '@/components/links/TrackedTelLink'
import { openMailto } from '@/utils/openMailto'

export default function ContactFormSection() {
  const { reservationEmail, reservationEmailHref, phoneNumber, phoneHref } =
    useContactSettings()

  const handleEmailClick = (event) => {
    event.preventDefault()
    openMailto(reservationEmailHref)
  }

  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    CONTACT_MAP.query,
  )}`

  return (
    <section className="bg-section-alt py-20 lg:py-28" aria-labelledby="contact-form-heading">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
              {COPY.contactPage.formEyebrow}
            </p>
            <h2
              id="contact-form-heading"
              className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-tight text-primary"
            >
              {COPY.contactPage.formTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
              {COPY.contactPage.formDescription}
            </p>

            <div className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-6 shadow-card">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-text-muted">
                  {CONTACT_LABELS.phoneSupport}
                </p>
                <TrackedTelLink
                  href={phoneHref}
                  className="mt-2 flex min-h-12 items-center text-lg font-semibold text-accent"
                >
                  {phoneNumber}
                </TrackedTelLink>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-text-muted">
                  {CONTACT_LABELS.reservationEmail}
                </p>
                <a
                  href={reservationEmailHref}
                  onClick={handleEmailClick}
                  className="mt-2 flex min-h-12 items-center break-all text-base text-accent underline-offset-2 hover:underline"
                >
                  {reservationEmail}
                </a>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-text-muted">
                  {COPY.contactPage.hoursTitle}
                </p>
                <p className="mt-2 text-base text-text-secondary">{SUPPORT_HOURS}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-text-muted">
                  {CONTACT_LABELS.mailingAddress}
                </p>
                <address className="mt-2 not-italic text-base leading-relaxed text-text-secondary">
                  {MAILING_ADDRESS_LINES.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            </div>

            <div className="mt-8">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
                {COPY.contactPage.mapEyebrow}
              </p>
              <h3 className="font-heading text-xl font-semibold text-primary">
                {COPY.contactPage.mapTitle}
              </h3>
              <p className="mt-2 text-sm text-text-secondary">{COPY.contactPage.mapDescription}</p>
              <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
                {CONTACT_MAP.embedSrc ? (
                  <iframe
                    title={COPY.contactPage.mapPlaceholderLabel}
                    src={CONTACT_MAP.embedSrc}
                    className="h-64 w-full max-w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <a
                    href={mapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-64 flex-col items-center justify-center gap-3 bg-gradient-to-br from-section-alt to-accent/10 px-6 text-center transition-colors hover:bg-accent/5"
                  >
                    <span className="text-sm font-medium uppercase tracking-[0.16em] text-text-muted">
                      {COPY.contactPage.mapPlaceholderLabel}
                    </span>
                    <span className="max-w-sm text-base font-medium text-primary">
                      {CONTACT_MAP.query}
                    </span>
                    <span className="text-sm font-medium text-accent">Open in Google Maps</span>
                  </a>
                )}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="rounded-[1.75rem] border border-border bg-card p-6 shadow-card sm:p-8">
              <ContactForm />
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
