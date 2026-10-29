import Accordion from '@/components/ui/Accordion'
import { BLUE_REWARDS_FAQ_HEADING } from '@/modules/blueRewards/constants/copy'
import styles from '@/modules/blueRewards/blueRewards.module.css'

export default function BlueRewardsFaqs({ faqs }) {
  if (!faqs.length) return null

  return (
    <section id="blue-rewards-faqs" className={styles.section}>
      <div className={styles.editorial}>
        <h2 className={styles.principlesHeading}>{BLUE_REWARDS_FAQ_HEADING}</h2>
        <Accordion items={faqs} />
      </div>
    </section>
  )
}
