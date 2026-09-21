export const GTM_IDS = ['GTM-W84BHMQX']

export const GTM_ID = GTM_IDS[0]

/** GA4 Measurement ID */
export const GA4_MEASUREMENT_ID = 'G-0T9WL0B85L'
export const GA4_GTAG_SRC = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`
export const GA4_SCRIPT_ID = 'ga4-gtag'
export const GA4_CONFIG_SCRIPT_ID = 'ga4-gtag-config'

/** Google Search Console HTML tag verification */
export const GOOGLE_SITE_VERIFICATION = '4tD5n65AQ_vrFiazC7ACAp_v2hrJ_OoUIFbdgpetr3o'

/** Set real code to emit Bing verification meta; leave REPLACE_WITH_CODE to omit. */
export const BING_SITE_VERIFICATION = 'REPLACE_WITH_CODE'

export const GOOGLE_ADS_ID = 'AW-18408337789'
export const GOOGLE_ADS_LEAD_CONVERSION_LABEL = '0w0lCMi8rOgcEP3i48lE'
export const GOOGLE_ADS_LEAD_CONVERSION_SEND_TO = `${GOOGLE_ADS_ID}/${GOOGLE_ADS_LEAD_CONVERSION_LABEL}`
export const GOOGLE_ADS_GTAG_SRC = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`
export const GOOGLE_ADS_GTAG_SCRIPT_ID = 'google-ads-gtag'
export const GOOGLE_ADS_GTAG_CONFIG_SCRIPT_ID = 'google-ads-gtag-config'

export const GTM_EVENTS = {
  callbackModalOpen: 'callback_modal_open',
  callbackRequestClick: 'callback_request_click',
  callbackFormStart: 'callback_form_start',
  callbackFormSubmit: 'callback_form_submit',
  phoneClick: 'phone_click',
  callLinkClick: 'call_link_click',
  emailClick: 'email_click',
  ctaClick: 'cta_click',
  assistanceCtaClick: 'assistance_cta_click',
  serviceFeeView: 'service_fee_view',
  inquirySubmitSuccess: 'inquiry_submit_success',
  /** CRM-stage outcomes — fired from admin when staff set inquiry status. */
  qualifiedAssistanceLead: 'qualified_assistance_lead',
  feeQuoteAccepted: 'fee_quote_accepted',
  assistanceCompleted: 'assistance_completed',
  officialSupportMisdial: 'official_support_misdial',
}

/**
 * Maps admin inquiry statuses to CRM outcome events (audit §13).
 * Only outcome statuses fire analytics — never PII.
 */
export const INQUIRY_STATUS_CRM_EVENTS = {
  qualified: GTM_EVENTS.qualifiedAssistanceLead,
  quote_accepted: GTM_EVENTS.feeQuoteAccepted,
  completed: GTM_EVENTS.assistanceCompleted,
  misdial: GTM_EVENTS.officialSupportMisdial,
}

export const CTA_EVENT_CATEGORY = 'engagement'

/** Non-sensitive CTA placement labels only — never customer data. */
export const CTA_PLACEMENT = {
  hero: 'hero',
  callModal: 'call_modal',
  navbar: 'navbar',
  floating: 'floating',
  contactForm: 'contact_form',
  serviceFeesPage: 'service_fees_page',
  pageHero: 'page_hero',
  pageCta: 'page_cta',
  serviceCard: 'service_card',
  serviceStep: 'service_step',
  guide: 'guide_article',
  blogPost: 'blog_post',
  rewardsSection: 'rewards_section',
}

export const CTA_EVENT_LABELS = {
  callNow: 'call_now_button',
  callback: 'callback_button',
  email: 'email_button',
  explore: 'explore_services_button',
  generic: 'cta_button',
}
