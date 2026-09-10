import JsonLd from '@/modules/seoLanding/components/JsonLd'
import ServicesPage from '@/modules/services/components/ServicesPage'
import { getServicesPageJsonLd, getServicesPageMetadata } from '@/modules/services/page-data'
import { loadServicesCatalog } from '@/services/api/loadCatalog'

export const metadata = getServicesPageMetadata()
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Page() {
  const catalog = await loadServicesCatalog()

  return (
    <>
      <JsonLd data={getServicesPageJsonLd()} />
      <ServicesPage services={catalog.services} catalogError={catalog.error} />
    </>
  )
}
