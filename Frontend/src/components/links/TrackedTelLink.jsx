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
    dialPhone(href)
  }

  return (
    <a href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}
