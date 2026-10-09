import Script from 'next/script'
import {
  GA4_CONFIG_SCRIPT_ID,
  GA4_GTAG_SRC,
  GA4_MEASUREMENT_ID,
  GA4_SCRIPT_ID,
} from '@/constants/analytics'

/**
 * Tiny dataLayer/gtag stub + GA4 config beforeInteractive so queued events are not lost.
 * The external gtag.js library loads afterInteractive. Ads config lives in GoogleAdsTag.
 */
function ga4ConfigScript() {
  return `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA4_MEASUREMENT_ID}');`
}

export function Ga4Tag() {
  return (
    <>
      <Script
        id={GA4_CONFIG_SCRIPT_ID}
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: ga4ConfigScript() }}
      />
      <Script id={GA4_SCRIPT_ID} src={GA4_GTAG_SRC} strategy="afterInteractive" />
    </>
  )
}
