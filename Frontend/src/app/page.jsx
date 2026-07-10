import HomePage from '@/modules/home/components/HomePage'
import CatalogStatus from '@/components/ui/CatalogStatus'
import { loadHomeCatalog } from '@/services/api/loadCatalog'

export default async function Page() {
  const catalog = await loadHomeCatalog()

  return (
    <>
      {catalog.error ? <CatalogStatus state="error" message={catalog.error} /> : null}
      <HomePage
        services={catalog.services}
        destinations={catalog.destinations}
        faqs={catalog.faqs}
      />
    </>
  )
}
