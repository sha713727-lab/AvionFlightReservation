import HomePage from '@/modules/home/components/HomePage'
import {
  getHomeAggregateRatingJsonLd,
  getHomeOrganizationJsonLd,
  getHomeWebPageJsonLd,
  getHomeWebSiteJsonLd,
} from '@/modules/home/page-data'
import { loadHomeCatalog } from '@/services/api/loadCatalog'

/** Always SSR from the live API — never serve a cached empty catalog page. */
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Page() {
  const catalog = await loadHomeCatalog()
  const websiteJsonLd = getHomeWebSiteJsonLd()
  const webPageJsonLd = getHomeWebPageJsonLd()
  const organizationJsonLd = getHomeOrganizationJsonLd()
  const aggregateRatingJsonLd = getHomeAggregateRatingJsonLd()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      {/* PLACEHOLDER AggregateRating JSON-LD — replace values in data/testimonials.js before publish */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingJsonLd) }}
      />
      <HomePage
        services={catalog.services}
        destinations={catalog.destinations}
        faqs={catalog.faqs}
        catalogError={catalog.error || catalog.partialError}
      />
    </>
  )
}
