import JsonLd from '@/modules/seoLanding/components/JsonLd'
import DestinationsPage from '@/modules/destinations/components/DestinationsPage'
import {
  getDestinationsPageJsonLd,
  getDestinationsPageMetadata,
} from '@/modules/destinations/page-data'
import { loadDestinationsCatalog } from '@/services/api/loadCatalog'

export const metadata = getDestinationsPageMetadata()
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Page() {
  const catalog = await loadDestinationsCatalog()

  return (
    <>
      <JsonLd data={getDestinationsPageJsonLd()} />
      <DestinationsPage
        destinations={catalog.destinations}
        catalogError={catalog.error}
      />
    </>
  )
}
