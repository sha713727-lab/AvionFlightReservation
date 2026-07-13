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
  const jsonLd = getDestinationsPageJsonLd()
  const catalog = await loadDestinationsCatalog()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DestinationsPage
        destinations={catalog.destinations}
        catalogError={catalog.error}
      />
    </>
  )
}
