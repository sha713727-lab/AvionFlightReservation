import JsonLd from '@/modules/seoLanding/components/JsonLd'
import TermsPage from '@/modules/terms/components/TermsPage'
import { getTermsPageJsonLd, getTermsPageMetadata } from '@/modules/terms/page-data'

export const metadata = getTermsPageMetadata()

export default function Page() {
  return (
    <>
      <JsonLd data={getTermsPageJsonLd()} />
      <TermsPage />
    </>
  )
}
