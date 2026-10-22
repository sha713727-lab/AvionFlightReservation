import Script from 'next/script'
import {
  GOOGLE_ADS_GTAG_CONFIG_SCRIPT_ID,
  GOOGLE_ADS_ID,
} from '@/constants/analytics'

/**
 * Google Ads config deferred until after load so it does not contend with LCP.
 * gtag.js is loaded via Ga4Tag afterInteractive.
 */
function googleAdsConfig() {
  return `window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function gtag(){window.dataLayer.push(arguments);}
window.gtag('config', '${GOOGLE_ADS_ID}');`
}

export function GoogleAdsTag() {
  return (
    <Script
      id={GOOGLE_ADS_GTAG_CONFIG_SCRIPT_ID}
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: googleAdsConfig(),
      }}
    />
  )
}
