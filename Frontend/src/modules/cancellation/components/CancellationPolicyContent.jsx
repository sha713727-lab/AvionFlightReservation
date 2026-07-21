'use client'

import { FaPhone } from 'react-icons/fa'
import { HiOutlineExclamationCircle, HiOutlineMail } from 'react-icons/hi'
import Button from '@/components/buttons/Button'
import Container from '@/components/ui/Container'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'
import { useContactSettings } from '@/modules/contact/components/ContactSettingsProvider'
import {
  CANCELLATION_BEFORE_ITEMS,
  CANCELLATION_SECTIONS,
} from '@/modules/cancellation/constants'

function PolicySection({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-border/80 py-10 lg:scroll-mt-32 lg:py-12">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      <h2 className="font-heading text-[clamp(1.5rem,2.8vw,2rem)] font-semibold tracking-tight text-primary">
        {title}
      </h2>
      <div className="mt-5 space-y-4 text-base leading-relaxed text-text-secondary">{children}</div>
    </section>
  )
}

export default function CancellationPolicyContent() {
  const { reservationEmail, reservationEmailHref, phoneNumber, phoneHref } =
    useContactSettings()

  return (
    <section className="bg-background py-16 lg:py-20" aria-label="Cancellation policy content">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
          <FadeIn className="lg:sticky lg:top-28 lg:self-start">
            <nav aria-label={COPY.cancellation.tocLabel}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                {COPY.cancellation.tocLabel}
              </p>
              <ul className="space-y-2">
                {CANCELLATION_SECTIONS.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="block rounded-lg px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-accent/5 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      {section.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </FadeIn>

          <FadeIn delay={0.08} className="max-w-3xl">
            <PolicySection
              id="cancellation-rules"
              eyebrow={COPY.cancellation.rulesEyebrow}
              title={COPY.cancellation.rulesTitle}
            >
              <p>{COPY.cancellation.rulesDescription}</p>
            </PolicySection>

            <PolicySection
              id="before-cancelling"
              eyebrow={COPY.cancellation.beforeEyebrow}
              title={COPY.cancellation.beforeTitle}
            >
              <StaggerContainer className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {CANCELLATION_BEFORE_ITEMS.map((item) => {
                  const Icon = item.icon

                  return (
                    <StaggerItem key={item.id}>
                      <div className="flex h-full items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-card">
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                          <Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <p className="pt-2 text-sm font-medium text-primary">{item.title}</p>
                      </div>
                    </StaggerItem>
                  )
                })}
              </StaggerContainer>
            </PolicySection>

            <PolicySection
              id="after-cancellation"
              eyebrow={COPY.cancellation.afterEyebrow}
              title={COPY.cancellation.afterTitle}
            >
              <p>{COPY.cancellation.afterDescription}</p>
            </PolicySection>

            <PolicySection
              id="important-limitations"
              eyebrow={COPY.cancellation.limitationsEyebrow}
              title={COPY.cancellation.limitationsTitle}
            >
              <div className="flex gap-4 rounded-2xl border border-accent/20 bg-accent/5 p-5 sm:p-6">
                <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <HiOutlineExclamationCircle className="h-5 w-5" aria-hidden />
                </span>
                <p className="text-sm leading-relaxed text-text sm:text-base">
                  {COPY.cancellation.limitationsDescription}
                </p>
              </div>
            </PolicySection>

            <PolicySection
              id="cancellation-help"
              eyebrow={COPY.cancellation.contactEyebrow}
              title={COPY.cancellation.contactTitle}
            >
              <p>{COPY.cancellation.contactDescription}</p>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:flex-wrap">
                <Button href={phoneHref} variant="primary" size="md" icon={FaPhone}>
                  {phoneNumber}
                </Button>
                <Button
                  href={reservationEmailHref}
                  variant="secondary"
                  size="md"
                  icon={HiOutlineMail}
                >
                  {reservationEmail}
                </Button>
              </div>
            </PolicySection>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
