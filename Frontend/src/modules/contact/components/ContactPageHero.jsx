'use client'

import { FaPhone } from 'react-icons/fa'
import Button from '@/components/buttons/Button'
import Container from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'
import {
  CONTACT_LABELS,
  EMAIL,
  EMAIL_HREF,
  MAILING_ADDRESS_LINES,
  PHONE_HREF,
  PHONE_NUMBER,
  SUPPORT_HOURS,
} from '@/constants/contact'

export default function ContactPageHero() {
  return (
    <section
      className="relative overflow-hidden bg-background pt-28 pb-16 lg:pt-36 lg:pb-20"
      aria-labelledby="contact-page-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(37,99,235,0.10),_transparent_50%)]"
        aria-hidden
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <FadeIn className="flex flex-col justify-center py-4 lg:py-8">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-text-muted">
              {COPY.contactPage.pageEyebrow}
            </p>
            <h1
              id="contact-page-heading"
              className="font-heading text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.08] tracking-tight text-primary"
            >
              {COPY.contactPage.pageTitle}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
              {COPY.contactPage.pageDescription}
            </p>
            <div className="mt-8">
              <Button href={PHONE_HREF} variant="primary" size="lg" icon={FaPhone}>
                {COPY.contactPage.pagePrimaryCta}
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.12}>
            <aside className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] bg-primary p-8 text-white sm:p-10">
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/30 blur-3xl"
                aria-hidden
              />

              <div className="relative z-10 space-y-6">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                    {CONTACT_LABELS.phoneSupport}
                  </p>
                  <a
                    href={PHONE_HREF}
                    className="mt-3 block font-heading text-[clamp(1.5rem,3.5vw,2.25rem)] font-semibold tracking-tight text-white transition-colors hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {PHONE_NUMBER}
                  </a>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/45">
                    {CONTACT_LABELS.businessEmail}
                  </p>
                  <a
                    href={EMAIL_HREF}
                    className="mt-2 block text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {EMAIL}
                  </a>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/45">
                    {CONTACT_LABELS.mailingAddress}
                  </p>
                  <address className="mt-2 not-italic text-sm leading-relaxed text-white/80">
                    {MAILING_ADDRESS_LINES.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/45">
                    {CONTACT_LABELS.supportHours}
                  </p>
                  <p className="mt-2 whitespace-nowrap text-sm leading-relaxed text-white/80">
                    {SUPPORT_HOURS}
                  </p>
                </div>
              </div>
            </aside>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
