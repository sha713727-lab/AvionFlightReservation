import Script from 'next/script'
import {
  GOOGLE_ADS_GTAG_CONFIG_SCRIPT_ID,
  GOOGLE_ADS_GTAG_SCRIPT_ID,
  GOOGLE_ADS_GTAG_SRC,
  GOOGLE_ADS_ID,
} from '@/constants/analytics'

function googleAdsConfig() {
  return `window.dataLayer = window.dataLayer || [];
window.gtag = function gtag(){window.dataLayer.push(arguments);}
window.gtag('js', new Date());
window.gtag('config', '${GOOGLE_ADS_ID}');`
}

export function GoogleAdsTag() {
  return (
    <>
      <Script
        id={GOOGLE_ADS_GTAG_SCRIPT_ID}
        src={GOOGLE_ADS_GTAG_SRC}
        strategy="afterInteractive"
      />
      <Script
        id={GOOGLE_ADS_GTAG_CONFIG_SCRIPT_ID}
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: googleAdsConfig(),
        }}
      />
    </>
  )
}
