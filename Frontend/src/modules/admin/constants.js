import {
  ADMIN_CALLBACKS_PATH,
  ADMIN_CONTACT_PATH,
  ADMIN_DESTINATIONS_PATH,
  ADMIN_FAQS_PATH,
  ADMIN_PATH,
  ADMIN_PLACES_PATH,
  ADMIN_SECURITY_PATH,
  ADMIN_SERVICES_PATH,
} from '@/constants/routes'

export const ADMIN_FIELD_NAMES = {
  email: 'email',
  password: 'password',
}

export const ADMIN_SESSION_STORAGE_KEY = 'avion-admin-session'

export const ADMIN_NAV_ITEMS = [
  {
    id: 'overview',
    label: 'Overview',
    href: ADMIN_PATH,
    icon: 'overview',
  },
  {
    id: 'services',
    label: 'Services',
    href: ADMIN_SERVICES_PATH,
    icon: 'services',
  },
  {
    id: 'destinations',
    label: 'Destinations',
    href: ADMIN_DESTINATIONS_PATH,
    icon: 'destinations',
  },
  {
    id: 'places',
    label: 'Places',
    href: ADMIN_PLACES_PATH,
    icon: 'places',
  },
  {
    id: 'callbacks',
    label: 'Callbacks',
    href: ADMIN_CALLBACKS_PATH,
    icon: 'callbacks',
  },
  {
    id: 'faqs',
    label: 'FAQs',
    href: ADMIN_FAQS_PATH,
    icon: 'faqs',
  },
  {
    id: 'contact',
    label: 'Contact',
    href: ADMIN_CONTACT_PATH,
    icon: 'contact',
  },
  {
    id: 'security',
    label: 'Security',
    href: ADMIN_SECURITY_PATH,
    icon: 'security',
  },
]

export { ADMIN_COPY } from '@/modules/admin/copy'

export const ADMIN_VALIDATION_MESSAGES = {
  emailRequired: 'Enter a valid email address.',
  emailTooLong: 'Email must be 160 characters or fewer.',
  passwordRequired: 'Password must be at least 8 characters.',
  passwordTooLong: 'Password must be 128 characters or fewer.',
  pinRequired: 'Enter the 8-digit admin PIN.',
  pinMismatch: 'New PIN and confirmation do not match.',
  pinUnchanged: 'New PIN must be different from the current PIN.',
}

export const ADMIN_ERROR_MESSAGES = {
  generic: 'Unable to sign in. Please try again.',
  invalid: 'Invalid email or password.',
  notConfigured: 'Admin authentication is not configured.',
  network: 'Unable to reach the API. Please try again shortly.',
  unauthorized: 'Your admin session is no longer valid.',
  pinInvalid: 'Invalid admin PIN. Please try again.',
  pinExpired: 'PIN challenge expired. Sign in again.',
  pinLocked: 'Too many PIN attempts. Sign in again.',
  pinChangeGeneric: 'Unable to update the admin PIN. Please try again.',
  servicesGeneric: 'Unable to complete the services request. Please try again.',
  servicesConflict: 'A service with this slug already exists.',
  destinationsGeneric: 'Unable to complete the destinations request. Please try again.',
  destinationsConflict: 'A destination with this slug already exists.',
  placesGeneric: 'Unable to complete the places request. Please try again.',
  callbacksGeneric: 'Unable to complete the callbacks request. Please try again.',
  faqsGeneric: 'Unable to complete the FAQs request. Please try again.',
  faqsConflict: 'An FAQ with this slug already exists.',
  settingsGeneric: 'Unable to complete the contact settings request. Please try again.',
}
