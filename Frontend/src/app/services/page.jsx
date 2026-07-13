import ServicesPage from '@/modules/services/components/ServicesPage'
import { getServicesPageJsonLd, getServicesPageMetadata } from '@/modules/services/page-data'
import { loadServicesCatalog } from '@/services/api/loadCatalog'

export const metadata = getServicesPageMetadata()

export default async function Page() {
  const jsonLd = getServicesPageJsonLd()
  const catalog = await loadServicesCatalog()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesPage services={catalog.services} catalogError={catalog.error} />
    </>
  )
}
