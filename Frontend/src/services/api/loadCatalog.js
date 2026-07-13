import {
  fetchDestinations,
  fetchFaqs,
  fetchServices,
} from '@/services/api/catalog'
import { CATALOG_UI } from '@/constants/catalogUi'

async function settleCatalog(loader) {
  try {
    return { data: await loader(), error: null }
  } catch {
    return { data: null, error: CATALOG_UI.error }
  }
}

export async function loadHomeCatalog() {
  const [servicesResult, destinationsResult, faqsResult] = await Promise.all([
    settleCatalog(fetchServices),
    settleCatalog(fetchDestinations),
    settleCatalog(fetchFaqs),
  ])

  const failedCount = [servicesResult, destinationsResult, faqsResult].filter(
    (result) => result.error,
  ).length

  return {
    services: servicesResult.data ?? [],
    destinations: destinationsResult.data ?? [],
    faqs: faqsResult.data ?? [],
    error: failedCount === 3 ? CATALOG_UI.error : null,
    partialError: failedCount > 0 && failedCount < 3 ? CATALOG_UI.error : null,
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
