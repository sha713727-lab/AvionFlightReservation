'use client'

import { COPY } from '@/constants/copy'
import { FOOTER_LINKS } from '@/constants/navigation'
import { BRAND_FULL_NAME } from '@/constants/brand'
import { HOME_PATH } from '@/constants/routes'
import { FadeIn } from '@/components/animations/FadeIn'
import AvionLogo from '@/components/brand/AvionLogo'
import Container from '@/components/ui/Container'
import FooterContactDetails from '@/components/layout/FooterContactDetails'
import FooterNavColumn from '@/components/layout/FooterNavColumn'

export default function Footer() {
  return (
    <footer className="bg-primary pt-12 pb-6 text-white">
      <Container>
        <div className="mb-8 grid grid-cols-1 items-start gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          <FadeIn direction="up" className="sm:col-span-2 lg:col-span-1">
            <a
              href={HOME_PATH}
              aria-label={`${BRAND_FULL_NAME} home`}
              className="mb-3 inline-flex items-center transition-opacity hover:opacity-90"
            >
              <AvionLogo size="lg" tone="dark" hideName />
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              {COPY.footer.tagline}
            </p>
          </FadeIn>

          {Object.entries(FOOTER_LINKS).map(([key, links], columnIndex) => (
            <FadeIn key={key} direction="up" delay={0.08 + columnIndex * 0.05}>
              <FooterNavColumn title={key} links={links} />
            </FadeIn>
          ))}

          <FadeIn direction="up" delay={0.24}>
            <FooterContactDetails />
          </FadeIn>
        </div>

        <div id="disclaimer" className="scroll-mt-28 border-t border-white/10 pt-5">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-white">
            {COPY.footer.disclaimerTitle}
          </h3>
          <p className="max-w-4xl text-xs leading-relaxed text-white/45">
            {COPY.footer.disclaimer}
          </p>
        </div>

        <div className="mt-6 border-t border-white/10">
          <p className="py-5 text-center text-xs leading-relaxed tracking-wide text-white/55 sm:text-sm">
            {COPY.footer.copyrightPrefix} {new Date().getFullYear()}{' '}
            {COPY.footer.copyrightBrand}. {COPY.footer.rightsReserved}
          </p>
        </div>
      </Container>
    </footer>
  )
}
