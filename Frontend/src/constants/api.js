export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const API_V1_PREFIX = '/api/v1'

export const API_ENDPOINTS = {
  health: `${API_V1_PREFIX}/health`,
  services: `${API_V1_PREFIX}/services`,
  serviceBySlug: (slug) => `${API_V1_PREFIX}/services/${slug}`,
  destinations: `${API_V1_PREFIX}/destinations`,
  destinationBySlug: (slug) => `${API_V1_PREFIX}/destinations/${slug}`,
  faqs: `${API_V1_PREFIX}/faqs`,
  faqBySlug: (slug) => `${API_V1_PREFIX}/faqs/${slug}`,
}

export const API_DEFAULT_PAGE_SIZE = 100

export const API_ERROR_MESSAGES = {
  missingBaseUrl: 'NEXT_PUBLIC_API_URL is not configured.',
  network: 'Unable to reach the Avion API. Please try again shortly.',
  invalidResponse: 'The API returned an unexpected response.',
  requestFailed: 'The request could not be completed.',
}
