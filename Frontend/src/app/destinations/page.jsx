import DestinationsPage from '@/modules/destinations/components/DestinationsPage'
import CatalogStatus from '@/components/ui/CatalogStatus'
import {
  getDestinationsPageJsonLd,
  getDestinationsPageMetadata,
} from '@/modules/destinations/page-data'
import { loadDestinationsCatalog } from '@/services/api/loadCatalog'

export const metadata = getDestinationsPageMetadata()

export default async function Page() {
  const jsonLd = getDestinationsPageJsonLd()
  const catalog = await loadDestinationsCatalog()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {catalog.error ? <CatalogStatus state="error" message={catalog.error} /> : null}
      <DestinationsPage destinations={catalog.destinations} />
    </>
  )
}
