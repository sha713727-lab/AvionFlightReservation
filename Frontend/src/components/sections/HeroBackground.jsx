import { HERO_BACKGROUND_SRC } from '@/constants/images'

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <img
        src={HERO_BACKGROUND_SRC}
        alt=""
        width={1920}
        height={1080}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-[62%_center] md:object-[68%_center]"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/45 to-background/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/55 via-background/20 to-transparent" />
      <div className="absolute inset-0 hero-glow opacity-60" />
    </div>
  )
}
