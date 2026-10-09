import Link from 'next/link'
import styles from '@/modules/wyndhamHotels/wyndhamHotels.module.css'

export default function WyndhamStory({ label, paragraphs, ctaLabel, ctaHref }) {
  return (
    <section id="wyndham-story" className={styles.section}>
      <div className={`${styles.editorial} ${styles.storyGrid}`}>
        <h2 className={styles.storyLabel}>{label}</h2>
        <div className={styles.storyCopy}>
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
          <Link href={ctaHref} className={styles.storyLink}>
            {ctaLabel}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
