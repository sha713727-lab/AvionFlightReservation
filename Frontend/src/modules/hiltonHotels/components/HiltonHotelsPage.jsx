import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SiteBreadcrumbBar from '@/components/layout/SiteBreadcrumbBar'
import PageRelatedLinks from '@/components/links/PageRelatedLinks'
import CallExpertProvider from '@/modules/call/components/CallExpertProvider'
import AboutPageCta from '@/modules/about/components/AboutPageCta'
import { HILTON_HOTELS_PATH, HOTEL_BOOKING_PATH, CONTACT_PATH } from '@/constants/routes'
import { getSlot } from '@/modules/hiltonHotels/utils/mediaSlots'
import HiltonHero from '@/modules/hiltonHotels/components/HiltonHero'
import HiltonLeadPhoto from '@/modules/hiltonHotels/components/HiltonLeadPhoto'
import HiltonStory from '@/modules/hiltonHotels/components/HiltonStory'
import HiltonPhotoPair from '@/modules/hiltonHotels/components/HiltonPhotoPair'
import HiltonPrinciples from '@/modules/hiltonHotels/components/HiltonPrinciples'
import HiltonProperties from '@/modules/hiltonHotels/components/HiltonProperties'
import HiltonClients from '@/modules/hiltonHotels/components/HiltonClients'
import HiltonCompanyRail from '@/modules/hiltonHotels/components/HiltonCompanyRail'
import HiltonFaqs from '@/modules/hiltonHotels/components/HiltonFaqs'
import styles from '@/modules/hiltonHotels/hiltonHotels.module.css'
import { HILTON_DISCLOSURE } from '@/modules/hiltonHotels/constants/copy'

export default function HiltonHotelsPage({ page, contactEmail }) {
  const lead = getSlot(page.mediaSlots, 'lead')
  const pairALeft = getSlot(page.mediaSlots, 'pairALeft')
  const pairARight = getSlot(page.mediaSlots, 'pairARight')
  const pairBLeft = getSlot(page.mediaSlots, 'pairBLeft')
  const pairBRight = getSlot(page.mediaSlots, 'pairBRight')
  const email = page.contactEmailOverride || contactEmail || null

  return (
    <CallExpertProvider>
      <Navbar />
      <SiteBreadcrumbBar path={HILTON_HOTELS_PATH} />
      <main id="main-content" className={styles.page}>
        <HiltonHero heading={page.heroHeading} introduction={page.heroIntroduction} />
        <HiltonLeadPhoto slot={lead} />
        <HiltonStory
          label={page.storyLabel}
          paragraphs={page.storyParagraphs}
          ctaLabel={page.storyCtaLabel}
          ctaHref={page.storyCtaHref || CONTACT_PATH}
        />
        <HiltonPhotoPair id="Hilton-photos-a" left={pairALeft} right={pairARight} variant="a" />
        <HiltonPrinciples heading={page.principlesHeading} principles={page.principles} />
        <HiltonPhotoPair id="Hilton-photos-b" left={pairBLeft} right={pairBRight} variant="b" />
        <HiltonProperties properties={page.properties} />
        <HiltonClients
          enabled={page.clientsEnabled}
          heading={page.clientsHeading}
          introduction={page.clientsIntroduction}
          logos={page.clientLogos}
        />
        <HiltonCompanyRail
          label={page.railLabel}
          contactEmail={email}
          cards={page.railCards}
        />
        <HiltonFaqs faqs={page.faqs} />
        <div className={styles.section}>
          <div className={styles.wide}>
            <p className={styles.disclosure}>{HILTON_DISCLOSURE}</p>
            <p className={styles.disclosure}>
              Looking for general hotel booking help? Visit our{' '}
              <a href={HOTEL_BOOKING_PATH} className={styles.storyLink}>
                hotel booking
              </a>{' '}
              page.
            </p>
          </div>
        </div>
        <AboutPageCta />
        <PageRelatedLinks path={HILTON_HOTELS_PATH} heading="Related pages" />
      </main>
      <Footer />
    </CallExpertProvider>
  )
}
