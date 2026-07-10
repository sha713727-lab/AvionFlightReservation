import {
  fetchDestinations,
  fetchFaqs,
  fetchServices,
} from '@/services/api/catalog'
import { CATALOG_UI } from '@/constants/catalogUi'

export async function loadHomeCatalog() {
  try {
    const [services, destinations, faqs] = await Promise.all([
      fetchServices(),
      fetchDestinations(),
      fetchFaqs(),
    ])

    return {
      services,
      destinations,
      faqs,
      error: null,
    }
  } catch {
    return {
      services: [],
      destinations: [],
      faqs: [],
      error: CATALOG_UI.error,
    }
  }
}

export async function loadServicesCatalog() {
  try {
    return { services: await fetchServices(), error: null }
  } catch {
    return { services: [], error: CATALOG_UI.error }
  }
}

export async function loadDestinationsCatalog() {
  try {
    return { destinations: await fetchDestinations(), error: null }
  } catch {
    return { destinations: [], error: CATALOG_UI.error }
  }
}
