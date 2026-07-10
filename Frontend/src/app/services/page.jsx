import ServicesPage from '@/modules/services/components/ServicesPage'
import CatalogStatus from '@/components/ui/CatalogStatus'
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
      {catalog.error ? <CatalogStatus state="error" message={catalog.error} /> : null}
      <ServicesPage services={catalog.services} />
    </>
  )
}
