import CookiePage from '@/modules/cookies/components/CookiePage'
import { getCookiePageJsonLd, getCookiePageMetadata } from '@/modules/cookies/page-data'

export const metadata = getCookiePageMetadata()

export default function Page() {
  const jsonLd = getCookiePageJsonLd()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CookiePage />
    </>
  )
}
