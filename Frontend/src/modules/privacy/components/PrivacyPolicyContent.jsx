'use client'

import { FaPhone } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import Button from '@/components/buttons/Button'
import Container from '@/components/ui/Container'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'
import { EMAIL, EMAIL_HREF, PHONE_HREF, PHONE_NUMBER, RESERVATION_EMAIL, RESERVATION_EMAIL_HREF } from '@/constants/contact'
import { PRIVACY_SECTIONS, PRIVACY_USAGE_ITEMS } from '@/modules/privacy/constants'

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

export default function PrivacyPolicyContent() {
  return (
    <section className="bg-background py-16 lg:py-20" aria-label="Privacy policy content">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
          <FadeIn className="lg:sticky lg:top-28 lg:self-start">
            <nav aria-label={COPY.privacy.tocLabel}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                {COPY.privacy.tocLabel}
              </p>
              <ul className="space-y-2">
                {PRIVACY_SECTIONS.map((section) => (
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
              id="information-we-may-collect"
              eyebrow={COPY.privacy.collectEyebrow}
              title={COPY.privacy.collectTitle}
            >
              <p>{COPY.privacy.collectDescription}</p>
            </PolicySection>

            <PolicySection
              id="how-information-is-used"
              eyebrow={COPY.privacy.usageEyebrow}
              title={COPY.privacy.usageTitle}
            >
              <StaggerContainer className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {PRIVACY_USAGE_ITEMS.map((item) => {
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
              id="information-sharing"
              eyebrow={COPY.privacy.sharingEyebrow}
              title={COPY.privacy.sharingTitle}
            >
              <p>{COPY.privacy.sharingDescription}</p>
            </PolicySection>

            <PolicySection
              id="data-protection"
              eyebrow={COPY.privacy.protectionEyebrow}
              title={COPY.privacy.protectionTitle}
            >
              <p>{COPY.privacy.protectionDescription}</p>
            </PolicySection>

            <PolicySection
              id="your-choice"
              eyebrow={COPY.privacy.choiceEyebrow}
              title={COPY.privacy.choiceTitle}
            >
              <p>{COPY.privacy.choiceDescription}</p>
            </PolicySection>

            <PolicySection
              id="privacy-contact"
              eyebrow={COPY.privacy.contactEyebrow}
              title={COPY.privacy.contactTitle}
            >
              <p>{COPY.privacy.contactDescription}</p>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:flex-wrap">
                <Button href={PHONE_HREF} variant="primary" size="md" icon={FaPhone}>
                  {PHONE_NUMBER}
                </Button>
                <Button href={EMAIL_HREF} variant="secondary" size="md" icon={HiOutlineMail}>
                  {EMAIL}
                </Button>
                <Button
                  href={RESERVATION_EMAIL_HREF}
                  variant="secondary"
                  size="md"
                  icon={HiOutlineMail}
                >
                  {RESERVATION_EMAIL}
                </Button>
              </div>
            </PolicySection>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
