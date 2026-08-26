import { GOOGLE_ADS_LEAD_CONVERSION_SEND_TO } from '@/constants/analytics'

export function pushDataLayerEvent(event, payload = {}) {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event,
    ...payload,
  })
}

export function trackGoogleAdsLeadConversion() {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || []
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments)
    }

  window.gtag('event', 'conversion', {
    send_to: GOOGLE_ADS_LEAD_CONVERSION_SEND_TO,
  })
}
