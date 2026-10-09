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
  inquiries: `${API_V1_PREFIX}/inquiries`,
  adminLogin: `${API_V1_PREFIX}/admin/auth/login`,
  adminPinVerify: `${API_V1_PREFIX}/admin/auth/pin/verify`,
  adminPinChange: `${API_V1_PREFIX}/admin/auth/pin`,
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
  adminInquiries: `${API_V1_PREFIX}/admin/inquiries`,
  adminInquiryById: (id) => `${API_V1_PREFIX}/admin/inquiries/${id}`,
  adminInquiryStatus: (id) => `${API_V1_PREFIX}/admin/inquiries/${id}/status`,
  adminFaqs: `${API_V1_PREFIX}/admin/faqs`,
  adminFaqById: (id) => `${API_V1_PREFIX}/admin/faqs/${id}`,
  adminFaqMove: (id) => `${API_V1_PREFIX}/admin/faqs/${id}/move`,
  contactSettings: `${API_V1_PREFIX}/settings/contact`,
  adminContactSettings: `${API_V1_PREFIX}/admin/settings/contact`,
  wyndhamPage: `${API_V1_PREFIX}/wyndham-page`,
  adminWyndhamPage: `${API_V1_PREFIX}/admin/wyndham-page`,
  adminWyndhamSlotMedia: (slotKey) => `${API_V1_PREFIX}/admin/wyndham-page/media/${slotKey}`,
  adminWyndhamPrinciples: `${API_V1_PREFIX}/admin/wyndham-page/principles`,
  adminWyndhamPrincipleById: (id) => `${API_V1_PREFIX}/admin/wyndham-page/principles/${id}`,
  adminWyndhamPrincipleMove: (id) => `${API_V1_PREFIX}/admin/wyndham-page/principles/${id}/move`,
  adminWyndhamRailCards: `${API_V1_PREFIX}/admin/wyndham-page/rail-cards`,
  adminWyndhamRailCardById: (id) => `${API_V1_PREFIX}/admin/wyndham-page/rail-cards/${id}`,
  adminWyndhamRailCardMove: (id) => `${API_V1_PREFIX}/admin/wyndham-page/rail-cards/${id}/move`,
  adminWyndhamRailCardMedia: (id) => `${API_V1_PREFIX}/admin/wyndham-page/rail-cards/${id}/media`,
  adminWyndhamProperties: `${API_V1_PREFIX}/admin/wyndham-page/properties`,
  adminWyndhamPropertyById: (id) => `${API_V1_PREFIX}/admin/wyndham-page/properties/${id}`,
  adminWyndhamPropertyMove: (id) => `${API_V1_PREFIX}/admin/wyndham-page/properties/${id}/move`,
  adminWyndhamPropertyMedia: (id) => `${API_V1_PREFIX}/admin/wyndham-page/properties/${id}/media`,
  adminWyndhamLogos: `${API_V1_PREFIX}/admin/wyndham-page/logos`,
  adminWyndhamLogoById: (id) => `${API_V1_PREFIX}/admin/wyndham-page/logos/${id}`,
  adminWyndhamLogoMove: (id) => `${API_V1_PREFIX}/admin/wyndham-page/logos/${id}/move`,
  adminWyndhamLogoMedia: (id) => `${API_V1_PREFIX}/admin/wyndham-page/logos/${id}/media`,
  hiltonPage: `${API_V1_PREFIX}/hilton-page`,
  adminHiltonPage: `${API_V1_PREFIX}/admin/hilton-page`,
  adminHiltonSlotMedia: (slotKey) => `${API_V1_PREFIX}/admin/hilton-page/media/${slotKey}`,
  adminHiltonPrinciples: `${API_V1_PREFIX}/admin/hilton-page/principles`,
  adminHiltonPrincipleById: (id) => `${API_V1_PREFIX}/admin/hilton-page/principles/${id}`,
  adminHiltonPrincipleMove: (id) => `${API_V1_PREFIX}/admin/hilton-page/principles/${id}/move`,
  adminHiltonRailCards: `${API_V1_PREFIX}/admin/hilton-page/rail-cards`,
  adminHiltonRailCardById: (id) => `${API_V1_PREFIX}/admin/hilton-page/rail-cards/${id}`,
  adminHiltonRailCardMove: (id) => `${API_V1_PREFIX}/admin/hilton-page/rail-cards/${id}/move`,
  adminHiltonRailCardMedia: (id) => `${API_V1_PREFIX}/admin/hilton-page/rail-cards/${id}/media`,
  adminHiltonProperties: `${API_V1_PREFIX}/admin/hilton-page/properties`,
  adminHiltonPropertyById: (id) => `${API_V1_PREFIX}/admin/hilton-page/properties/${id}`,
  adminHiltonPropertyMove: (id) => `${API_V1_PREFIX}/admin/hilton-page/properties/${id}/move`,
  adminHiltonPropertyMedia: (id) => `${API_V1_PREFIX}/admin/hilton-page/properties/${id}/media`,
  adminHiltonLogos: `${API_V1_PREFIX}/admin/hilton-page/logos`,
  adminHiltonLogoById: (id) => `${API_V1_PREFIX}/admin/hilton-page/logos/${id}`,
  adminHiltonLogoMove: (id) => `${API_V1_PREFIX}/admin/hilton-page/logos/${id}/move`,
  adminHiltonLogoMedia: (id) => `${API_V1_PREFIX}/admin/hilton-page/logos/${id}/media`,
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
