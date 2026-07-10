import { cn } from '@/utils/cn'
import { AVION_LOGO_SRC, BRAND_NAME, BRAND_TAGLINE } from '@/constants/brand'
import { SITE_NAME } from '@/constants/contact'

const LOGO_SIZES = {
  sm: {
    className: 'h-8 w-8',
    width: 32,
    height: 32,
    name: 'text-sm',
    tagline: 'text-[10px] leading-none',
  },
  md: {
    className: 'h-10 w-10',
    width: 40,
    height: 40,
    name: 'text-base',
    tagline: 'text-[11px] leading-tight',
  },
  lg: {
    className: 'h-12 w-12',
    width: 48,
    height: 48,
    name: 'text-lg',
    tagline: 'text-xs leading-tight',
  },
}

/** `light` = on light surfaces; `dark` = on dark surfaces */
const WORDMARK_TONES = {
  light: {
    name: 'text-primary',
    nameHidden: 'text-slate-300',
    tagline: 'text-accent',
  },
  dark: {
    name: 'text-white',
    nameHidden: 'text-white/25',
    tagline: 'text-blue-400',
  },
}

export default function AvionLogo({
  size = 'md',
  showWordmark = true,
  compact = false,
  tone = 'light',
  hideName = false,
  className,
  ...props
}) {
  const logoSize = LOGO_SIZES[size] ?? LOGO_SIZES.md
  const wordmarkTone = WORDMARK_TONES[tone] ?? WORDMARK_TONES.light
  const nameTone = hideName ? wordmarkTone.nameHidden : wordmarkTone.name

  return (
    <div className={cn('inline-flex min-w-0 items-center gap-2.5 sm:gap-3', className)} {...props}>
      <img
        src={AVION_LOGO_SRC}
        alt={`${SITE_NAME} logo`}
        width={logoSize.width}
        height={logoSize.height}
        decoding="async"
        className={cn('shrink-0 object-contain', logoSize.className)}
      />
      {showWordmark && (
        <div className="min-w-0 font-heading leading-none">
          <span
            className={cn(
              'block truncate font-semibold tracking-tight',
              nameTone,
              logoSize.name,
            )}
            aria-hidden={hideName ? true : undefined}
          >
            {BRAND_NAME}
          </span>
          <span
            className={cn(
              'mt-1 block truncate font-medium tracking-wide',
              wordmarkTone.tagline,
              logoSize.tagline,
              compact && 'hidden sm:block',
            )}
          >
            {BRAND_TAGLINE}
          </span>
        </div>
      )}
    </div>
  )
}
