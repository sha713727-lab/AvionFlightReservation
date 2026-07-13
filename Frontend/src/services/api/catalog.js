import { API_DEFAULT_PAGE_SIZE, API_ENDPOINTS } from '@/constants/api'
import {
  destinationListSchema,
  faqListSchema,
  serviceListSchema,
} from '@/schemas/catalog'
import { apiGet } from '@/services/api/client'
import {
  mapDestinationTierDto,
  mapFaqDto,
  mapServiceDto,
} from '@/services/api/catalogMappers'

const NO_STORE = { cache: 'no-store' }

export async function fetchServices() {
  const data = await apiGet(API_ENDPOINTS.services, serviceListSchema, {
    query: { page: 1, pageSize: API_DEFAULT_PAGE_SIZE },
    ...NO_STORE,
  })

  return data.items.map(mapServiceDto)
}

export async function fetchDestinations() {
  const data = await apiGet(API_ENDPOINTS.destinations, destinationListSchema, {
    query: { page: 1, pageSize: API_DEFAULT_PAGE_SIZE },
    ...NO_STORE,
  })

  return data.items.map(mapDestinationTierDto)
}

export async function fetchFaqs() {
  const data = await apiGet(API_ENDPOINTS.faqs, faqListSchema, {
    query: { page: 1, pageSize: API_DEFAULT_PAGE_SIZE },
    ...NO_STORE,
  })

  return data.items.map(mapFaqDto)
}
