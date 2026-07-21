import { API_ENDPOINTS } from '@/constants/api'
import { apiGet, apiPut } from '@/services/api/client'
import {
  contactSettingsSchema,
  getFallbackContactEmail,
  getFallbackSupportPhones,
  toMailtoHref,
  toTelHref,
} from '@/schemas/contactSettings'

export async function fetchContactSettings(token) {
  return apiGet(API_ENDPOINTS.adminContactSettings, contactSettingsSchema, {
    token,
    cache: 'no-store',
  })
}

export async function updateContactSettings(token, body) {
  return apiPut(API_ENDPOINTS.adminContactSettings, body, contactSettingsSchema, {
    token,
  })
}

export async function fetchPublicContactSettings() {
  return apiGet(API_ENDPOINTS.contactSettings, contactSettingsSchema, {
    cache: 'no-store',
  })
}

export {
  getFallbackContactEmail,
  getFallbackSupportPhones,
  toMailtoHref,
  toTelHref,
}
