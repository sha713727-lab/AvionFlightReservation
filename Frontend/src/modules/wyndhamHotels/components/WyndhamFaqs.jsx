import Accordion from '@/components/ui/Accordion'
import { WYNDHAM_FAQ_HEADING } from '@/modules/wyndhamHotels/constants/copy'
import styles from '@/modules/wyndhamHotels/wyndhamHotels.module.css'

export default function WyndhamFaqs({ faqs }) {
  if (!faqs.length) return null

  return (
    <section id="wyndham-faqs" className={styles.section}>
      <div className={styles.editorial}>
        <h2 className={styles.principlesHeading}>{WYNDHAM_FAQ_HEADING}</h2>
        <Accordion items={faqs} />
      </div>
    </section>
  )
}
