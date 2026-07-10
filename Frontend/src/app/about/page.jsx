import AboutPage from '@/modules/about/components/AboutPage'
import { getAboutPageJsonLd, getAboutPageMetadata } from '@/modules/about/page-data'

export const metadata = getAboutPageMetadata()

export default function Page() {
  const jsonLd = getAboutPageJsonLd()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutPage />
    </>
  )
}
