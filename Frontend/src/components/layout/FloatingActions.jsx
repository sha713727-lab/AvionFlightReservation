'use client'

import { FaPhone } from 'react-icons/fa'
import { COPY } from '@/constants/copy'
import { useContactSettings } from '@/modules/contact/components/ContactSettingsProvider'

export default function FloatingActions() {
  const { phoneNumber, phoneHref } = useContactSettings()

  return (
    <a
      href={phoneHref}
      aria-label={`${COPY.cta.callNow}: ${phoneNumber}`}
      className="floating-action-enter fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/30 transition-transform duration-300 hover:scale-110 hover:-translate-y-1 active:scale-95 lg:flex"
    >
      <span className="absolute inset-0 rounded-full bg-accent animate-ping-soft opacity-30" aria-hidden />
      <FaPhone className="relative z-10 h-5 w-5" aria-hidden />
    </a>
  )
}
