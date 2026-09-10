'use client'

import { FaPhone } from 'react-icons/fa'
import TrackedTelLink from '@/components/links/TrackedTelLink'
import { COPY } from '@/constants/copy'
import { useContactSettings } from '@/modules/contact/components/ContactSettingsProvider'

export default function FloatingActions() {
  const { phoneNumber, phoneHref } = useContactSettings()

  return (
    <TrackedTelLink
      href={phoneHref}
      aria-label={`${COPY.cta.callNow}: ${phoneNumber}`}
      className="floating-action-enter fixed right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/30 transition-transform duration-300 hover:scale-110 hover:-translate-y-1 active:scale-95 bottom-[max(1.25rem,env(safe-area-inset-bottom))] sm:right-6 lg:bottom-6"
    >
      <span className="absolute inset-0 rounded-full bg-accent animate-ping-soft opacity-30" aria-hidden />
      <FaPhone className="relative z-10 h-5 w-5" aria-hidden />
    </TrackedTelLink>
  )
}
