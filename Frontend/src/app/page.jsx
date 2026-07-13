import HomePage from '@/modules/home/components/HomePage'
import { loadHomeCatalog } from '@/services/api/loadCatalog'

export const revalidate = 600

export default async function Page() {
  const catalog = await loadHomeCatalog()

  return (
    <HomePage
      services={catalog.services}
      destinations={catalog.destinations}
      faqs={catalog.faqs}
      catalogError={catalog.error || catalog.partialError}
    />
  )
}
