import ServicesPage from '@/modules/services/components/ServicesPage'
import { getServicesPageJsonLd, getServicesPageMetadata } from '@/modules/services/page-data'

export const metadata = getServicesPageMetadata()

export default function Page() {
  const jsonLd = getServicesPageJsonLd()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesPage />
    </>
  )
}
