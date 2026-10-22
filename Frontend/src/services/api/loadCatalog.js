import { fetchDestinations, fetchFaqs, fetchServices } from '@/services/api/catalog'
import { CATALOG_UI } from '@/constants/catalogUi'

async function settleCatalog(loader) {
  try {
    return { data: await loader(), error: null }
  } catch {
    return { data: null, error: CATALOG_UI.error }
  }
}

/** Homepage only needs services + FAQs (destinations are unused on home). */
export async function loadHomeCatalog() {
  const [servicesResult, faqsResult] = await Promise.all([
    settleCatalog(fetchServices),
    settleCatalog(fetchFaqs),
  ])

  const failedCount = [servicesResult, faqsResult].filter((result) => result.error).length

  return {
    services: servicesResult.data ?? [],
    faqs: faqsResult.data ?? [],
    error: failedCount === 2 ? CATALOG_UI.error : null,
    partialError: failedCount === 1 ? CATALOG_UI.error : null,
  }
}

export async function loadServicesCatalog() {
  const result = await settleCatalog(fetchServices)
  return {
    services: result.data ?? [],
    error: result.error,
  }
}

export async function loadDestinationsCatalog() {
  const result = await settleCatalog(fetchDestinations)
  return {
    destinations: result.data ?? [],
    error: result.error,
  }
}
