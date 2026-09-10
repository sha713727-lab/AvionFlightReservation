import Script from 'next/script'
import {
  GA4_CONFIG_SCRIPT_ID,
  GA4_GTAG_SRC,
  GA4_MEASUREMENT_ID,
  GA4_SCRIPT_ID,
  GOOGLE_ADS_ID,
} from '@/constants/analytics'

/**
 * GA4 + shared gtag bootstrap in <head> (beforeInteractive).
 * Measurement ID: constants/analytics.js → GA4_MEASUREMENT_ID
 */
function ga4ConfigScript() {
  return `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA4_MEASUREMENT_ID}');
gtag('config', '${GOOGLE_ADS_ID}');`
}

export function Ga4Tag() {
  return (
    <>
      <Script id={GA4_SCRIPT_ID} src={GA4_GTAG_SRC} strategy="beforeInteractive" />
      <Script
        id={GA4_CONFIG_SCRIPT_ID}
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: ga4ConfigScript() }}
      />
    </>
  )
}
