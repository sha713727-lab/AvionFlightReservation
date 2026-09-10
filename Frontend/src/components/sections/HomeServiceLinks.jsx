import Link from 'next/link'
import Container from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { MAIN_SERVICE_LINKS } from '@/constants/internalLinks'
import { SEO_LANDING_COPY } from '@/modules/seoLanding/constants/seoLandingCopy'

export default function HomeServiceLinks() {
  return (
    <section
      id="service-pages"
      className="border-t border-border bg-section-alt py-14 lg:py-20"
      aria-labelledby="home-service-links-heading"
    >
      <Container>
        <FadeIn className="mx-auto mb-10 max-w-3xl text-center">
          <h2
            id="home-service-links-heading"
            className="font-heading text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-tight text-primary"
          >
            {SEO_LANDING_COPY.homeServiceLinksTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            {SEO_LANDING_COPY.homeServiceLinksDescription}
          </p>
        </FadeIn>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MAIN_SERVICE_LINKS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-accent/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span className="font-heading text-base font-semibold text-primary">{item.title}</span>
                <span className="mt-2 text-sm font-medium text-accent">{item.anchor}</span>
                <span className="mt-2 text-sm leading-relaxed text-text-secondary">{item.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
