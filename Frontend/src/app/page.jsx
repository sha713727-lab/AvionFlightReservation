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

/** Always SSR from the live API — never serve a cached empty catalog page. */
export const dynamic = 'force-dynamic'
export const revalidate = 0

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
        destinations={catalog.destinations}
        faqs={catalog.faqs}
        catalogError={catalog.error || catalog.partialError}
      />
    </>
  )
}
