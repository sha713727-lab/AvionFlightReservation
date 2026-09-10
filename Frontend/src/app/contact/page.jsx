import JsonLd from '@/modules/seoLanding/components/JsonLd'
import ContactPage from '@/modules/contact/components/ContactPage'
import { getContactPageJsonLd, getContactPageMetadata } from '@/modules/contact/page-data'

export const metadata = getContactPageMetadata()

export default function Page() {
  return (
    <>
      <JsonLd data={getContactPageJsonLd()} />
      <ContactPage />
    </>
  )
}
