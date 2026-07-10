import TermsPage from '@/modules/terms/components/TermsPage'
import { getTermsPageJsonLd, getTermsPageMetadata } from '@/modules/terms/page-data'

export const metadata = getTermsPageMetadata()

export default function Page() {
  const jsonLd = getTermsPageJsonLd()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TermsPage />
    </>
  )
}
