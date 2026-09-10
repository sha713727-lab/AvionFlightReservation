import OptimizedImage from '@/components/media/OptimizedImage'
import { HERO_BACKGROUND_ALT } from '@/constants/images'
import heroBackgroundImage from '../../../public/avion-hero-background.webp'

/**
 * Homepage LCP background — next/image with priority + fetchPriority="high".
 * Static import enables automatic width/height and optimized WebP/AVIF variants.
 */
export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <OptimizedImage
        src={heroBackgroundImage}
        alt={HERO_BACKGROUND_ALT}
        fill
        priority
        quality={70}
        placeholder="blur"
        sizes="(max-width: 768px) 100vw, 1920px"
        className="object-cover object-[62%_center] md:object-[68%_center]"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/45 to-background/80" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-background/55 via-background/20 to-transparent" aria-hidden />
      <div className="absolute inset-0 hero-glow opacity-60" aria-hidden />
    </div>
  )
}
