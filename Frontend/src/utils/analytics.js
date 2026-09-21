import {
  CTA_EVENT_CATEGORY,
  CTA_EVENT_LABELS,
  GOOGLE_ADS_LEAD_CONVERSION_SEND_TO,
  GTM_EVENTS,
  INQUIRY_STATUS_CRM_EVENTS,
} from '@/constants/analytics'

function ensureGtag() {
  if (typeof window === 'undefined') return null

  window.dataLayer = window.dataLayer || []
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments)
    }

  return window.gtag
}

export function pushDataLayerEvent(event, payload = {}) {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event,
    ...payload,
  })
}

/**
 * GA4 CTA engagement event (also mirrored to dataLayer for GTM).
 * Equivalent to: gtag('event','cta_click',{event_category:'engagement',event_label:'…'})
 */
export function trackCtaClick(eventLabel = CTA_EVENT_LABELS.generic) {
  if (typeof window === 'undefined') return
  if (window.location.pathname.startsWith('/admin')) return

  const gtag = ensureGtag()
  if (!gtag) return

  gtag('event', GTM_EVENTS.ctaClick, {
    event_category: CTA_EVENT_CATEGORY,
    event_label: eventLabel,
  })

  pushDataLayerEvent(GTM_EVENTS.ctaClick, {
    event_category: CTA_EVENT_CATEGORY,
    event_label: eventLabel,
  })
}

export function resolveCtaEventLabel({ ctaLabel, href, children }) {
  if (ctaLabel) {
    return ctaLabel
  }

  if (typeof href === 'string') {
    if (href.startsWith('tel:')) {
      return CTA_EVENT_LABELS.callNow
    }
    if (href.startsWith('mailto:')) {
      return CTA_EVENT_LABELS.email
    }
  }

  if (typeof children === 'string') {
    const lower = children.toLowerCase()
    if (lower.includes('callback')) {
      return CTA_EVENT_LABELS.callback
    }
    if (lower.includes('call now') || lower.includes('call to book') || lower.startsWith('call')) {
      return CTA_EVENT_LABELS.callNow
    }
    if (lower.includes('explore') || lower.includes('services')) {
      return CTA_EVENT_LABELS.explore
    }
  }

  return CTA_EVENT_LABELS.generic
}

export function trackGoogleAdsLeadConversion() {
  const gtag = ensureGtag()
  if (!gtag) return

  gtag('event', 'conversion', {
    send_to: GOOGLE_ADS_LEAD_CONVERSION_SEND_TO,
  })
}

/** Interest in independent assistance — no PII. */
export function trackAssistanceCtaClick(placement) {
  if (typeof window === 'undefined') return
  if (window.location.pathname.startsWith('/admin')) return

  pushDataLayerEvent(GTM_EVENTS.assistanceCtaClick, {
    event_category: CTA_EVENT_CATEGORY,
    page_type: 'assistance',
    cta_placement: placement,
  })
}

/** Fee page or disclosed fee details viewed — no PII. */
export function trackServiceFeeView(placement = 'service_fees_page') {
  if (typeof window === 'undefined') return
  if (window.location.pathname.startsWith('/admin')) return

  pushDataLayerEvent(GTM_EVENTS.serviceFeeView, {
    event_category: CTA_EVENT_CATEGORY,
    page_type: 'fees',
    cta_placement: placement,
  })
}

/** Valid inquiry accepted by the server — reference code only, never message/PII. */
export function trackInquirySubmitSuccess(referenceCode) {
  if (typeof window === 'undefined') return
  if (window.location.pathname.startsWith('/admin')) return

  pushDataLayerEvent(GTM_EVENTS.inquirySubmitSuccess, {
    event_category: CTA_EVENT_CATEGORY,
    page_type: 'contact',
    has_reference: Boolean(referenceCode),
  })

  trackGoogleAdsLeadConversion()
}

/**
 * CRM-stage outcome after staff review — status label only, never names/emails/phones.
 * Intended to fire from the admin inquiries UI when a qualifying status is set.
 */
export function trackCrmOutcome(status) {
  if (typeof window === 'undefined') return

  const eventName = INQUIRY_STATUS_CRM_EVENTS[status]
  if (!eventName) return

  pushDataLayerEvent(eventName, {
    event_category: 'crm_outcome',
    page_type: 'admin_inquiry',
    inquiry_status: status,
  })
}
