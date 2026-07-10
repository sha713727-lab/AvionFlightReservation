'use client'

import Container from '@/components/ui/Container'
import AvionLogo from '@/components/brand/AvionLogo'
import { FadeIn } from '@/components/animations/FadeIn'
import { COPY } from '@/constants/copy'
import { BRAND_FULL_NAME } from '@/constants/brand'

export default function TermsBrandIntro() {
  return (
    <section className="bg-background pb-8 lg:pb-12" aria-labelledby="terms-brand-heading">
      <Container>
        <FadeIn>
          <div className="overflow-hidden rounded-[2rem] bg-primary px-6 py-10 text-white sm:px-10 sm:py-12 lg:px-14">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
              <div className="max-w-xl">
                <AvionLogo size="lg" tone="dark" />
                <h2
                  id="terms-brand-heading"
                  className="mt-6 font-heading text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-tight text-white"
                >
                  {COPY.terms.brandTermsTitle}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
                  {COPY.terms.brandTermsDescription}
                </p>
              </div>

              <div className="shrink-0 rounded-2xl border border-white/15 bg-white/5 px-6 py-5 lg:max-w-xs">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/45">
                  {BRAND_FULL_NAME}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  {COPY.terms.pageDescription}
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
