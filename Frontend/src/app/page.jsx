import HomePage from '@/modules/home/components/HomePage'
import { HOME_PATH } from '@/constants/routes'
import {
  getHomeFaqPageJsonLd,
  getHomeOrganizationJsonLd,
  getHomeWebPageJsonLd,
  getHomeWebSiteJsonLd,
} from '@/modules/home/page-data'
import { loadHomeCatalog } from '@/services/api/loadCatalog'
import { buildPathMetadata } from '@/utils/seo'

export const metadata = buildPathMetadata(HOME_PATH)

/** ISR: serve cached HTML; regenerate catalog-backed home every 60s. */
export const revalidate = 60

export default async function Page() {
  const catalog = await loadHomeCatalog()
  const websiteJsonLd = getHomeWebSiteJsonLd()
  const webPageJsonLd = getHomeWebPageJsonLd()
  const organizationJsonLd = getHomeOrganizationJsonLd()
  const faqPageJsonLd = getHomeFaqPageJsonLd(catalog.faqs)

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
      {faqPageJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
        />
      ) : null}
      <HomePage
        services={catalog.services}
        faqs={catalog.faqs}
        catalogError={catalog.error || catalog.partialError}
      />
    </>
  )
}
