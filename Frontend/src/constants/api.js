export const API_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_API_URL

/**
 * Resolve API base at call time (not module load) so Docker runtime env works.
 * Server must never hairpin via the public HTTPS domain from inside Compose —
 * that fails on Hostinger and produces empty catalog / "could not load" SSR.
 */
export function getApiBaseUrl() {
  if (typeof window !== 'undefined') {
    // Local: same-origin via Next.js rewrite → backend (avoids CORS/compression quirks)
    if (process.env.NODE_ENV === 'development') {
      return window.location.origin
    }
    return API_PUBLIC_BASE_URL || window.location.origin
  }

  const internal = process.env['API_INTERNAL_URL']
  if (internal) {
    return internal
  }

  if (process.env.NODE_ENV === 'production') {
    return 'http://api:4000'
  }

  return API_PUBLIC_BASE_URL || 'http://127.0.0.1:4000'
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
  callbacks: `${API_V1_PREFIX}/callbacks`,
  adminLogin: `${API_V1_PREFIX}/admin/auth/login`,
  adminOtpVerify: `${API_V1_PREFIX}/admin/auth/otp/verify`,
  adminOtpResend: `${API_V1_PREFIX}/admin/auth/otp/resend`,
  adminDashboardSummary: `${API_V1_PREFIX}/admin/dashboard/summary`,
  adminServices: `${API_V1_PREFIX}/admin/services`,
  adminServiceOptions: `${API_V1_PREFIX}/admin/services/options`,
  adminServiceById: (id) => `${API_V1_PREFIX}/admin/services/${id}`,
  adminServiceMove: (id) => `${API_V1_PREFIX}/admin/services/${id}/move`,
  adminServiceMedia: (id) => `${API_V1_PREFIX}/admin/services/${id}/media`,
  adminDestinations: `${API_V1_PREFIX}/admin/destinations`,
  adminDestinationById: (id) => `${API_V1_PREFIX}/admin/destinations/${id}`,
  adminDestinationMove: (id) => `${API_V1_PREFIX}/admin/destinations/${id}/move`,
  adminPlaces: `${API_V1_PREFIX}/admin/places`,
  adminPlaceOptions: `${API_V1_PREFIX}/admin/places/options`,
  adminPlaceById: (id) => `${API_V1_PREFIX}/admin/places/${id}`,
  adminPlaceMove: (id) => `${API_V1_PREFIX}/admin/places/${id}/move`,
  adminPlaceMedia: (id) => `${API_V1_PREFIX}/admin/places/${id}/media`,
  adminCallbacks: `${API_V1_PREFIX}/admin/callbacks`,
  adminCallbackById: (id) => `${API_V1_PREFIX}/admin/callbacks/${id}`,
  adminCallbackStatus: (id) => `${API_V1_PREFIX}/admin/callbacks/${id}/status`,
  adminFaqs: `${API_V1_PREFIX}/admin/faqs`,
  adminFaqById: (id) => `${API_V1_PREFIX}/admin/faqs/${id}`,
  adminFaqMove: (id) => `${API_V1_PREFIX}/admin/faqs/${id}/move`,
  contactSettings: `${API_V1_PREFIX}/settings/contact`,
  adminContactSettings: `${API_V1_PREFIX}/admin/settings/contact`,
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
