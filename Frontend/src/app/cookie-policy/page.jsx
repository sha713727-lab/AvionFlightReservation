import JsonLd from '@/modules/seoLanding/components/JsonLd'
import CookiePage from '@/modules/cookies/components/CookiePage'
import { getCookiePageJsonLd, getCookiePageMetadata } from '@/modules/cookies/page-data'

export const metadata = getCookiePageMetadata()

export default function Page() {
  return (
    <>
      <JsonLd data={getCookiePageJsonLd()} />
      <CookiePage />
    </>
  )
}
