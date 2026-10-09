import Accordion from '@/components/ui/Accordion'
import { HILTON_FAQ_HEADING } from '@/modules/hiltonHotels/constants/copy'
import styles from '@/modules/hiltonHotels/hiltonHotels.module.css'

export default function HiltonFaqs({ faqs }) {
  if (!faqs.length) return null

  return (
    <section id="hilton-faqs" className={styles.section}>
      <div className={styles.editorial}>
        <h2 className={styles.principlesHeading}>{HILTON_FAQ_HEADING}</h2>
        <Accordion items={faqs} />
      </div>
    </section>
  )
}
