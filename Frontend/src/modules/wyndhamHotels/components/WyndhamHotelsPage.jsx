import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SiteBreadcrumbBar from '@/components/layout/SiteBreadcrumbBar'
import PageRelatedLinks from '@/components/links/PageRelatedLinks'
import CallExpertProvider from '@/modules/call/components/CallExpertProvider'
import AboutPageCta from '@/modules/about/components/AboutPageCta'
import { WYNDHAM_HOTELS_PATH, HOTEL_BOOKING_PATH, CONTACT_PATH } from '@/constants/routes'
import { getSlot } from '@/modules/wyndhamHotels/utils/mediaSlots'
import WyndhamHero from '@/modules/wyndhamHotels/components/WyndhamHero'
import WyndhamLeadPhoto from '@/modules/wyndhamHotels/components/WyndhamLeadPhoto'
import WyndhamStory from '@/modules/wyndhamHotels/components/WyndhamStory'
import WyndhamPhotoPair from '@/modules/wyndhamHotels/components/WyndhamPhotoPair'
import WyndhamPrinciples from '@/modules/wyndhamHotels/components/WyndhamPrinciples'
import WyndhamProperties from '@/modules/wyndhamHotels/components/WyndhamProperties'
import WyndhamClients from '@/modules/wyndhamHotels/components/WyndhamClients'
import WyndhamCompanyRail from '@/modules/wyndhamHotels/components/WyndhamCompanyRail'
import WyndhamFaqs from '@/modules/wyndhamHotels/components/WyndhamFaqs'
import styles from '@/modules/wyndhamHotels/wyndhamHotels.module.css'
import { WYNDHAM_DISCLOSURE } from '@/modules/wyndhamHotels/constants/copy'

export default function WyndhamHotelsPage({ page, contactEmail }) {
  const lead = getSlot(page.mediaSlots, 'lead')
  const pairALeft = getSlot(page.mediaSlots, 'pairALeft')
  const pairARight = getSlot(page.mediaSlots, 'pairARight')
  const pairBLeft = getSlot(page.mediaSlots, 'pairBLeft')
  const pairBRight = getSlot(page.mediaSlots, 'pairBRight')
  const email = page.contactEmailOverride || contactEmail || null

  return (
    <CallExpertProvider>
      <Navbar />
      <SiteBreadcrumbBar path={WYNDHAM_HOTELS_PATH} />
      <main id="main-content" className={styles.page}>
        <WyndhamHero heading={page.heroHeading} introduction={page.heroIntroduction} />
        <WyndhamLeadPhoto slot={lead} />
        <WyndhamStory
          label={page.storyLabel}
          paragraphs={page.storyParagraphs}
          ctaLabel={page.storyCtaLabel}
          ctaHref={page.storyCtaHref || CONTACT_PATH}
        />
        <WyndhamPhotoPair id="wyndham-photos-a" left={pairALeft} right={pairARight} variant="a" />
        <WyndhamPrinciples heading={page.principlesHeading} principles={page.principles} />
        <WyndhamPhotoPair id="wyndham-photos-b" left={pairBLeft} right={pairBRight} variant="b" />
        <WyndhamProperties properties={page.properties} />
        <WyndhamClients
          enabled={page.clientsEnabled}
          heading={page.clientsHeading}
          introduction={page.clientsIntroduction}
          logos={page.clientLogos}
        />
        <WyndhamCompanyRail
          label={page.railLabel}
          contactEmail={email}
          cards={page.railCards}
        />
        <WyndhamFaqs faqs={page.faqs} />
        <div className={styles.section}>
          <div className={styles.wide}>
            <p className={styles.disclosure}>{WYNDHAM_DISCLOSURE}</p>
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
        <PageRelatedLinks path={WYNDHAM_HOTELS_PATH} heading="Related pages" />
      </main>
      <Footer />
    </CallExpertProvider>
  )
}
