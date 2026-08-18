import OptimizedImage from '@/components/media/OptimizedImage'
import { HERO_BACKGROUND_SRC } from '@/constants/images'

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <OptimizedImage
        src={HERO_BACKGROUND_SRC}
        alt=""
        fill
        priority
        quality={70}
        sizes="(max-width: 768px) 100vw, 1920px"
        className="object-cover object-[62%_center] md:object-[68%_center]"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/45 to-background/80" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-background/55 via-background/20 to-transparent" aria-hidden />
      <div className="absolute inset-0 hero-glow opacity-60" aria-hidden />
    </div>
  )
}
