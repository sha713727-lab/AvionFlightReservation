import Link from 'next/link'
import styles from '@/modules/hiltonHotels/hiltonHotels.module.css'

export default function HiltonStory({ label, paragraphs, ctaLabel, ctaHref }) {
  return (
    <section id="Hilton-story" className={styles.section}>
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
