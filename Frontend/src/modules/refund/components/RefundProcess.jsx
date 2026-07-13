'use client'

import { HiOutlineExclamationCircle } from 'react-icons/hi'
import Container from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'
import { REFUND_PROCESS_STEPS } from '@/modules/refund/constants'

export default function RefundProcess() {
  return (
    <section
      className="bg-section-alt py-16 lg:py-24"
      aria-labelledby="refund-process-heading"
    >
      <Container>
        <FadeIn className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
            {COPY.refund.processEyebrow}
          </p>
          <h2
            id="refund-process-heading"
            className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-tight text-primary"
          >
            {COPY.refund.processTitle}
          </h2>
        </FadeIn>

        <div className="relative mx-auto max-w-3xl">
          <div
            className="absolute left-6 top-3 bottom-3 hidden w-px bg-border sm:left-8 sm:block"
            aria-hidden
          />

          <ol className="space-y-5">
            {REFUND_PROCESS_STEPS.map((step, index) => (
              <li key={step.id} className="relative flex gap-4 sm:gap-6">
                <FadeIn direction="left" delay={index * 0.06} className="flex flex-1 gap-4 sm:gap-6">
                  <span className="relative z-10 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent font-heading text-sm font-semibold text-white shadow-sm shadow-accent/25 sm:h-16 sm:w-16 sm:text-base">
                    {step.number}
                  </span>
                  <div className="flex-1 rounded-2xl border border-border bg-card px-5 py-5 shadow-card sm:px-6">
                    <p className="text-base font-medium leading-relaxed text-primary">{step.title}</p>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ol>
        </div>

        <FadeIn delay={0.15} className="mx-auto mt-12 max-w-3xl">
          <div className="flex gap-4 rounded-2xl border border-accent/20 bg-accent/5 p-5 sm:p-6">
            <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <HiOutlineExclamationCircle className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                {COPY.refund.noteLabel}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-text sm:text-base">
                {COPY.refund.noteText}
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
