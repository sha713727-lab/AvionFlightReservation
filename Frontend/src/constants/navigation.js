import {
  ABOUT_PATH,
  CANCELLATION_POLICY_PATH,
  CONTACT_PATH,
  COOKIE_POLICY_PATH,
  DESTINATIONS_PATH,
  HOME_PATH,
  PRIVACY_POLICY_PATH,
  REFUND_POLICY_PATH,
  SERVICES_PATH,
  TERMS_PATH,
} from '@/constants/routes'

export const FOOTER_DISCLAIMER_HASH = '#disclaimer'
export const LEGAL_NAV_LABEL = 'Legal'

export const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: PRIVACY_POLICY_PATH },
  { label: 'Terms & Conditions', href: TERMS_PATH },
  { label: 'Refund Policy', href: REFUND_POLICY_PATH },
  { label: 'Cancellation Policy', href: CANCELLATION_POLICY_PATH },
  { label: 'Cookie Policy', href: COOKIE_POLICY_PATH },
  { label: 'Disclaimer', href: FOOTER_DISCLAIMER_HASH },
]

export const NAV_LINKS = [
  { label: 'Services', href: SERVICES_PATH },
  { label: 'Destinations', href: DESTINATIONS_PATH },
  { label: 'About Us', href: ABOUT_PATH },
  { label: 'Contact Us', href: CONTACT_PATH },
]

export const FOOTER_LINKS = {
  company: [
    { label: 'About Us', href: ABOUT_PATH },
    { label: 'Contact Us', href: CONTACT_PATH },
    { label: 'Destinations', href: DESTINATIONS_PATH },
    { label: 'How It Works', href: `${HOME_PATH}#how-it-works` },
    { label: 'Testimonials', href: `${HOME_PATH}#testimonials` },
  ],
  services: [
    { label: 'Flight Booking', href: `${SERVICES_PATH}#flights` },
    { label: 'Hotel Booking', href: `${SERVICES_PATH}#hotels` },
    { label: 'Points Redemption Help', href: `${SERVICES_PATH}#rewards` },
    { label: 'Trip Planning', href: `${SERVICES_PATH}#planning` },
  ],
  legal: LEGAL_LINKS,
}
