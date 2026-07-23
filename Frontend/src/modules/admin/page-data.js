import { BRAND_FULL_NAME } from '@/constants/brand'
import {
  ADMIN_CALLBACKS_PATH,
  ADMIN_CONTACT_PATH,
  ADMIN_DESTINATIONS_PATH,
  ADMIN_FAQS_PATH,
  ADMIN_LOGIN_PATH,
  ADMIN_PATH,
  ADMIN_PLACES_PATH,
  ADMIN_SECURITY_PATH,
  ADMIN_SERVICES_PATH,
} from '@/constants/routes'
import { ADMIN_COPY } from '@/modules/admin/constants'
import { SITE_URL } from '@/constants/contact'

const NOINDEX_ROBOTS = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
    noimageindex: true,
  },
}

function buildAdminMetadata({ title, description, path }) {
  return {
    title: `${title} | ${BRAND_FULL_NAME}`,
    description,
    alternates: {
      canonical: `${SITE_URL}${path}`,
    },
    robots: NOINDEX_ROBOTS,
  }
}

export function getAdminLoginMetadata() {
  return buildAdminMetadata({
    title: ADMIN_COPY.loginMetaTitle,
    description: ADMIN_COPY.loginMetaDescription,
    path: ADMIN_LOGIN_PATH,
  })
}

export function getAdminDashboardMetadata() {
  return buildAdminMetadata({
    title: ADMIN_COPY.dashboardGreeting,
    description: ADMIN_COPY.dashboardDescription,
    path: ADMIN_PATH,
  })
}

export function getAdminServicesMetadata() {
  return buildAdminMetadata({
    title: ADMIN_COPY.servicesTitle,
    description: ADMIN_COPY.servicesDescription,
    path: ADMIN_SERVICES_PATH,
  })
}

export function getAdminDestinationsMetadata() {
  return buildAdminMetadata({
    title: ADMIN_COPY.destinationsTitle,
    description: ADMIN_COPY.destinationsDescription,
    path: ADMIN_DESTINATIONS_PATH,
  })
}

export function getAdminPlacesMetadata() {
  return buildAdminMetadata({
    title: ADMIN_COPY.placesTitle,
    description: ADMIN_COPY.placesDescription,
    path: ADMIN_PLACES_PATH,
  })
}

export function getAdminCallbacksMetadata() {
  return buildAdminMetadata({
    title: ADMIN_COPY.callbacksTitle,
    description: ADMIN_COPY.callbacksDescription,
    path: ADMIN_CALLBACKS_PATH,
  })
}

export function getAdminFaqsMetadata() {
  return buildAdminMetadata({
    title: ADMIN_COPY.faqsTitle,
    description: ADMIN_COPY.faqsDescription,
    path: ADMIN_FAQS_PATH,
  })
}

export function getAdminContactMetadata() {
  return buildAdminMetadata({
    title: ADMIN_COPY.settingsTitle,
    description: ADMIN_COPY.settingsDescription,
    path: ADMIN_CONTACT_PATH,
  })
}

export function getAdminSecurityMetadata() {
  return buildAdminMetadata({
    title: ADMIN_COPY.securityTitle,
    description: ADMIN_COPY.securityDescription,
    path: ADMIN_SECURITY_PATH,
  })
}
