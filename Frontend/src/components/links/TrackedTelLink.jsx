'use client'

import { CTA_EVENT_LABELS } from '@/constants/analytics'
import { dialPhone } from '@/utils/dialPhone'
import { trackCtaClick } from '@/utils/analytics'

export default function TrackedTelLink({
  href,
  className,
  children,
  onClick,
  ctaLabel = CTA_EVENT_LABELS.callNow,
  ...props
}) {
  const handleClick = (event) => {
    trackCtaClick(ctaLabel)

    if (onClick) {
      onClick(event)
      if (event.defaultPrevented) return
    }
    event.preventDefault()
    // Prefer the live href so Google Ads call-tracking can dial its forwarding number.
    dialPhone(event.currentTarget.getAttribute('href') || href)
  }

  return (
    <a href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}
