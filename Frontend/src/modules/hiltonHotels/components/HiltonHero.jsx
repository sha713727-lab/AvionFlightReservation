'use client'

import Button from '@/components/buttons/Button'
import { CTA_PLACEMENT } from '@/constants/analytics'
import { BOOK_NOW_CTA_LABEL } from '@/constants/brandPageChrome'
import { useCallExpertModal } from '@/modules/call/components/CallExpertProvider'
import styles from '@/modules/hiltonHotels/hiltonHotels.module.css'

export default function HiltonHero({ heading, introduction }) {
  const callModal = useCallExpertModal()

  return (
    <section id="Hilton-hero" className={`${styles.section} ${styles.hero}`}>
      <div className={styles.wide}>
        <h1 className={styles.heroTitle}>{heading}</h1>
        <p className={styles.heroIntro}>{introduction}</p>
        <div className={styles.heroActions}>
          <Button
            variant="primary"
            size="lg"
            onClick={() => callModal.open(CTA_PLACEMENT.pageHero)}
          >
            {BOOK_NOW_CTA_LABEL}
          </Button>
        </div>
      </div>
    </section>
  )
}
