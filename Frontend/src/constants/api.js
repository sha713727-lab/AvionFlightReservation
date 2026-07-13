export const API_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_API_URL

/**
 * Resolve API base at call time (not module load) so Docker runtime env works.
 * Server must never hairpin via the public HTTPS domain from inside Compose —
 * that fails on Hostinger and produces empty catalog / "could not load" SSR.
 */
export function getApiBaseUrl() {
  if (typeof window !== 'undefined') {
    return API_PUBLIC_BASE_URL
  }

  const internal = process.env['API_INTERNAL_URL']
  if (internal) {
    return internal
  }

  if (process.env.NODE_ENV === 'production') {
    return 'http://api:4000'
  }

  return API_PUBLIC_BASE_URL
}

/** @deprecated Prefer getApiBaseUrl() — kept for any direct imports */
export const API_BASE_URL = API_PUBLIC_BASE_URL

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

/** ISR / fetch cache window for public catalog pages (seconds). */
export const CATALOG_REVALIDATE_SECONDS = 600

export const API_ERROR_MESSAGES = {
  missingBaseUrl: 'NEXT_PUBLIC_API_URL is not configured.',
  network: 'Unable to reach the Avion API. Please try again shortly.',
  invalidResponse: 'The API returned an unexpected response.',
  requestFailed: 'The request could not be completed.',
}
