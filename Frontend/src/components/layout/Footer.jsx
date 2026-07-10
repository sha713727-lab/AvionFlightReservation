'use client'

import { COPY } from '@/constants/copy'
import { FOOTER_LINKS } from '@/constants/navigation'
import { BRAND_FULL_NAME } from '@/constants/brand'
import { HOME_PATH } from '@/constants/routes'
import { FadeIn } from '@/components/animations/FadeIn'
import AvionLogo from '@/components/brand/AvionLogo'
import Container from '@/components/ui/Container'
import FooterContactDetails from '@/components/layout/FooterContactDetails'

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
              <h4 className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-white/40">
                {key}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="footer-link text-sm text-white/60">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </FadeIn>
          ))}

          <FadeIn direction="up" delay={0.24}>
            <FooterContactDetails />
          </FadeIn>
        </div>

        <FadeIn delay={0.15}>
          <div id="disclaimer" className="scroll-mt-28 border-t border-white/10 pt-5">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-white">
              {COPY.footer.disclaimerTitle}
            </h3>
            <p className="max-w-4xl text-xs leading-relaxed text-white/45">
              {COPY.footer.disclaimer}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-5 border-t border-white/10 pt-5 text-center text-sm text-white/50">
            <p>
              &copy; {new Date().getFullYear()} {BRAND_FULL_NAME}. {COPY.footer.rightsReserved}
            </p>
          </div>
        </FadeIn>
      </Container>
    </footer>
  )
}
