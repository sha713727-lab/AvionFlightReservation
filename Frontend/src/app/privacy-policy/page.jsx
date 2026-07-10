import PrivacyPage from '@/modules/privacy/components/PrivacyPage'
import { getPrivacyPageJsonLd, getPrivacyPageMetadata } from '@/modules/privacy/page-data'

export const metadata = getPrivacyPageMetadata()

export default function Page() {
  const jsonLd = getPrivacyPageJsonLd()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PrivacyPage />
    </>
  )
}
