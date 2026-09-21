'use client'

import Link from 'next/link'
import { FaPhone } from 'react-icons/fa'
import Modal from '@/components/ui/Modal'
import Button from '@/components/buttons/Button'
import { COPY } from '@/constants/copy'
import {
  DISCLOSURE_LINKS,
  INDEPENDENT_SERVICE_DISCLOSURE,
} from '@/constants/disclosures'
import { useContactSettings } from '@/modules/contact/components/ContactSettingsProvider'
import { dialPhone } from '@/utils/dialPhone'
import { trackAssistanceCtaClick } from '@/utils/analytics'
import { CTA_PLACEMENT } from '@/constants/analytics'
import { createContext, useContext, useMemo, useState } from 'react'

const CallExpertContext = createContext(null)

export function useCallExpertModal() {
  return useContext(CallExpertContext)
}

export default function CallExpertProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const { phoneNumber, phoneHref } = useContactSettings()
  const value = useMemo(
    () => ({
      open: (placement = CTA_PLACEMENT.callModal) => {
        trackAssistanceCtaClick(placement)
        setIsOpen(true)
      },
    }),
    [],
  )

  const handleCallNow = (event) => {
    event.preventDefault()
    event.stopPropagation()
    dialPhone(phoneHref)
  }

  return (
    <CallExpertContext.Provider value={value}>
      {children}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={COPY.callModal.title}
      >
        <p className="mb-3 text-sm leading-relaxed text-text-secondary">
          {COPY.callModal.description}
        </p>
        <p
          className="mb-4 rounded-xl border border-border bg-section-alt p-3 text-sm leading-relaxed text-text"
          role="note"
        >
          {INDEPENDENT_SERVICE_DISCLOSURE}
        </p>
        <ul className="mb-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {DISCLOSURE_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-medium text-accent underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
          {COPY.callModal.businessLabel}
        </p>
        <a
          href={phoneHref}
          onClick={handleCallNow}
          className="mb-6 flex min-h-12 items-center break-all text-xl font-semibold text-primary transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:text-2xl"
        >
          {phoneNumber}
        </a>
        <Button
          href={phoneHref}
          variant="primary"
          size="lg"
          icon={FaPhone}
          className="w-full"
          onClick={handleCallNow}
        >
          {COPY.cta.callNow}
        </Button>
      </Modal>
    </CallExpertContext.Provider>
  )
}
