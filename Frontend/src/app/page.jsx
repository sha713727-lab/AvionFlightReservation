import HomePage from '@/modules/home/components/HomePage'
import { loadHomeCatalog } from '@/services/api/loadCatalog'

/** Always SSR from the live API — never serve a cached empty catalog page. */
export const dynamic = 'force-dynamic'
export const revalidate = 0

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
