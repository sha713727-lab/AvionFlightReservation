'use client'

import { FaPhone } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import Button from '@/components/buttons/Button'
import Container from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'
import { EMAIL, EMAIL_HREF, PHONE_HREF, PHONE_NUMBER } from '@/constants/contact'

export default function CookiePolicyContent() {
  return (
    <main id="main-content" className="overflow-x-clip">
      <section className="bg-background pt-32 pb-12 lg:pt-40 lg:pb-16" aria-labelledby="cookie-page-heading">
        <Container>
          <FadeIn className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-text-muted">
              {COPY.cookies.pageEyebrow}
            </p>
            <h1
              id="cookie-page-heading"
              className="font-heading text-[clamp(2.25rem,5vw,3.75rem)] font-semibold tracking-tight text-primary"
            >
              {COPY.cookies.pageTitle}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
              {COPY.cookies.pageDescription}
            </p>
            <p className="mt-6 text-sm text-text-muted">
              <time dateTime={COPY.cookies.lastUpdatedIso}>
                {COPY.cookies.lastUpdatedLabel}: {COPY.cookies.lastUpdatedDate}
              </time>
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-section-alt py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl space-y-10">
            <FadeIn>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                {COPY.cookies.whatEyebrow}
              </p>
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-primary">
                {COPY.cookies.whatTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-text-secondary">
                {COPY.cookies.whatDescription}
              </p>
            </FadeIn>

            <FadeIn delay={0.08}>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                {COPY.cookies.howEyebrow}
              </p>
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-primary">
                {COPY.cookies.howTitle}
              </h2>
              <ul className="mt-5 space-y-3">
                {COPY.cookies.howItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base text-text-secondary">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={0.12}>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                {COPY.cookies.controlEyebrow}
              </p>
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-primary">
                {COPY.cookies.controlTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-text-secondary">
                {COPY.cookies.controlDescription}
              </p>
            </FadeIn>

            <FadeIn delay={0.16}>
              <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                  {COPY.cookies.contactEyebrow}
                </p>
                <h2 className="font-heading text-2xl font-semibold tracking-tight text-primary">
                  {COPY.cookies.contactTitle}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-text-secondary">
                  {COPY.cookies.contactDescription}
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button href={PHONE_HREF} variant="primary" size="md" icon={FaPhone}>
                    {PHONE_NUMBER}
                  </Button>
                  <Button href={EMAIL_HREF} variant="secondary" size="md" icon={HiOutlineMail}>
                    {EMAIL}
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>
    </main>
  )
}
