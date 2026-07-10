import ContactPage from '@/modules/contact/components/ContactPage'
import { getContactPageJsonLd, getContactPageMetadata } from '@/modules/contact/page-data'

export const metadata = getContactPageMetadata()

export default function Page() {
  const jsonLd = getContactPageJsonLd()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactPage />
    </>
  )
}
