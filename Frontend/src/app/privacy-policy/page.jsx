import JsonLd from '@/modules/seoLanding/components/JsonLd'
import PrivacyPage from '@/modules/privacy/components/PrivacyPage'
import { getPrivacyPageJsonLd, getPrivacyPageMetadata } from '@/modules/privacy/page-data'

export const metadata = getPrivacyPageMetadata()

export default function Page() {
  return (
    <>
      <JsonLd data={getPrivacyPageJsonLd()} />
      <PrivacyPage />
    </>
  )
}
