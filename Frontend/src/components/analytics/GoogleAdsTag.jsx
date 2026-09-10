import Script from 'next/script'
import {
  GOOGLE_ADS_GTAG_CONFIG_SCRIPT_ID,
  GOOGLE_ADS_ID,
} from '@/constants/analytics'

/**
 * Google Ads config only — gtag.js is loaded earlier via Ga4Tag in <head>.
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
