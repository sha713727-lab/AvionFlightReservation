import Link from 'next/link'
import AuthorBox from '@/components/geo/AuthorBox'
import CitationBlock from '@/components/geo/CitationBlock'
import ComparisonTable from '@/components/geo/ComparisonTable'
import KeyFactsBox from '@/components/geo/KeyFactsBox'
import SourcesSection from '@/components/geo/SourcesSection'
import LinkedCopy from '@/components/links/LinkedCopy'
import PeopleAlsoAskSection from '@/modules/seoLanding/components/PeopleAlsoAskSection'
import RelatedServices from '@/modules/seoLanding/components/RelatedServices'
import { SEO_LANDING_COPY } from '@/modules/seoLanding/constants/seoLandingCopy'
import {
  buildServiceLinkMap,
  getServiceInternalLinks,
} from '@/constants/internalLinks'

function NumberedSection({ id, title, items, linkMap }) {
  if (!items?.length) {
    return null
  }

  return (
    <section aria-labelledby={id} className="scroll-mt-28">
      <h2 id={id} className="font-heading text-xl font-semibold text-primary sm:text-2xl">
        {title}
      </h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-text-secondary sm:text-base">
        {items.map((item) => (
          <li key={item} className="pl-1">
            <LinkedCopy text={item} linkMap={linkMap} />
          </li>
        ))}
      </ol>
    </section>
  )
}

function BulletSection({ id, title, items, intro, linkMap }) {
  if (!items?.length) {
    return null
  }

  return (
    <section aria-labelledby={id} className="scroll-mt-28">
      <h2 id={id} className="font-heading text-xl font-semibold text-primary sm:text-2xl">
        {title}
      </h2>
      {intro ? (
        <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">
          <LinkedCopy text={intro} linkMap={linkMap} />
        </p>
      ) : null}
      <ul className="mt-4 space-y-3 text-sm leading-relaxed text-text-secondary sm:text-base">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            <span>
              <LinkedCopy text={item} linkMap={linkMap} />
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function ServiceUtilityLinks({ links }) {
  if (!links) {
    return null
  }

  const items = [links.home, links.contact, ...(links.relatedGuides || [])].filter(Boolean)

  return (
    <nav aria-label={SEO_LANDING_COPY.serviceUtilityHeading} className="mt-6">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
        {SEO_LANDING_COPY.serviceUtilityHeading}
      </p>
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-sm font-medium text-accent transition-colors hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function ServiceLandingBody({ page }) {
  const internal = getServiceInternalLinks(page.path)
  const linkMap = buildServiceLinkMap(page.path)

  return (
    <div className="space-y-12 lg:space-y-14">
      <section aria-labelledby="service-intro">
        <h2 id="service-intro" className="sr-only">
          {SEO_LANDING_COPY.introHeading}
        </h2>
        <p className="text-base leading-relaxed text-text-secondary sm:text-lg">
          <LinkedCopy text={page.speakableSummary} linkMap={linkMap} />
        </p>
        <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">
          <LinkedCopy text={page.opening} linkMap={linkMap} />
        </p>
        <AuthorBox />
        <ServiceUtilityLinks links={internal} />
      </section>

      <KeyFactsBox title={page.keyFactsTitle} facts={page.keyFacts} />

      <CitationBlock citations={page.citations} />

      <NumberedSection
        id="service-how"
        title={SEO_LANDING_COPY.howItWorksHeading}
        items={page.howItWorks}
        linkMap={linkMap}
      />

      <ComparisonTable table={page.comparison} />

      <BulletSection
        id="service-benefits"
        title={SEO_LANDING_COPY.benefitsHeading}
        items={page.benefits}
        linkMap={linkMap}
      />

      <BulletSection
        id="service-why"
        title={SEO_LANDING_COPY.whyChooseHeading}
        intro={page.whyChooseIntro}
        items={page.whyChoose}
        linkMap={linkMap}
      />

      <PeopleAlsoAskSection faqs={page.faqs} linkMap={linkMap} />

      <SourcesSection sources={page.sources} />

      <RelatedServices items={internal?.relatedServices} />
    </div>
  )
}
