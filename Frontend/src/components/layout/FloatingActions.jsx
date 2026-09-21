'use client'

import Link from 'next/link'
import { FaPhone } from 'react-icons/fa'
import TrackedTelLink from '@/components/links/TrackedTelLink'
import { COPY } from '@/constants/copy'
import { INDEPENDENT_SERVICE_DISCLOSURE_SHORT } from '@/constants/disclosures'
import { SERVICE_FEES_PATH } from '@/constants/routes'
import { useContactSettings } from '@/modules/contact/components/ContactSettingsProvider'

export default function FloatingActions() {
  const { phoneNumber, phoneHref } = useContactSettings()

  return (
    <div className="fixed right-4 z-40 flex max-w-[min(18rem,calc(100vw-2rem))] flex-col items-end gap-2 bottom-[max(1.25rem,env(safe-area-inset-bottom))] sm:right-6 lg:bottom-6">
      <p className="rounded-xl border border-border bg-card/95 px-3 py-2 text-left text-[11px] leading-snug text-text-secondary shadow-card backdrop-blur-sm">
        {INDEPENDENT_SERVICE_DISCLOSURE_SHORT}{' '}
        <Link
          href={SERVICE_FEES_PATH}
          className="font-medium text-accent underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {COPY.cta.seeFees}
        </Link>
      </p>
      <TrackedTelLink
        href={phoneHref}
        aria-label={`${COPY.cta.callNow}: ${phoneNumber}`}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/30 transition-transform duration-300 hover:scale-110 hover:-translate-y-1 active:scale-95"
      >
        <span className="absolute inset-0 rounded-full bg-accent animate-ping-soft opacity-30" aria-hidden />
        <FaPhone className="relative z-10 h-5 w-5" aria-hidden />
      </TrackedTelLink>
    </div>
  )
}
