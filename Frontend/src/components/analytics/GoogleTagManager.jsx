import Script from 'next/script'
import { GTM_IDS } from '@/constants/analytics'

function gtmBootstrap(gtmId) {
  return `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`
}

export function GoogleTagManager() {
  return GTM_IDS.map((gtmId) => (
    <Script
      key={gtmId}
      id={`google-tag-manager-${gtmId}`}
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: gtmBootstrap(gtmId),
      }}
    />
  ))
}

export function GoogleTagManagerNoscript() {
  return GTM_IDS.map((gtmId) => (
    <noscript key={gtmId}>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title={`Google Tag Manager ${gtmId}`}
      />
    </noscript>
  ))
}
