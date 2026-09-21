'use client'

import { useState } from 'react'
import { HiChevronDown } from 'react-icons/hi'
import {
  LEGAL_LINKS,
  LEGAL_NAV_LABEL,
  NAV_LINKS,
  SECONDARY_NAV_LINKS,
} from '@/constants/navigation'
import { COPY } from '@/constants/copy'
import { CTA_PLACEMENT } from '@/constants/analytics'
import Button from '@/components/buttons/Button'
import Container from '@/components/ui/Container'
import { useCallExpertModal } from '@/modules/call/components/CallExpertProvider'
import { cn } from '@/utils/cn'

export default function MobileNav({ isOpen, onClose }) {
  const [legalOpen, setLegalOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const callModal = useCallExpertModal()

  if (!isOpen) {
    return null
  }

  return (
    <div
      id="mobile-navigation"
      className="fixed inset-x-0 top-[76px] z-40 max-h-[min(70dvh,32rem)] overflow-y-auto overflow-x-hidden border-b border-border bg-section/95 backdrop-blur-xl lg:hidden"
    >
      <Container className="flex flex-col gap-1 py-4 pb-6">
        <nav aria-label="Mobile navigation" className="flex flex-col">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="flex min-h-12 items-center border-b border-border/60 py-3 text-base text-primary transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}

          <div className="border-b border-border/60">
            <button
              type="button"
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen((current) => !current)}
              className="flex min-h-12 w-full items-center justify-between py-3 text-left text-base text-primary transition-colors hover:text-accent"
            >
              More
              <HiChevronDown
                className={cn('h-5 w-5 shrink-0', moreOpen && 'rotate-180')}
                aria-hidden
              />
            </button>
            {moreOpen ? (
              <div className="pb-2 pl-3">
                {SECONDARY_NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="flex min-h-12 items-center py-2 text-base text-text-secondary transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <div className="border-b border-border/60">
            <button
              type="button"
              aria-expanded={legalOpen}
              onClick={() => setLegalOpen((current) => !current)}
              className="flex min-h-12 w-full items-center justify-between py-3 text-left text-base text-primary transition-colors hover:text-accent"
            >
              {LEGAL_NAV_LABEL}
              <HiChevronDown
                className={cn('h-5 w-5 shrink-0', legalOpen && 'rotate-180')}
                aria-hidden
              />
            </button>
            {legalOpen ? (
              <div className="pb-2 pl-3">
                {LEGAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={onClose}
                    className="flex min-h-12 items-center py-2 text-base text-text-secondary transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </nav>

        <div className="mt-4">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => {
              onClose()
              callModal.open(CTA_PLACEMENT.navbar)
            }}
          >
            {COPY.cta.bookConsultation}
          </Button>
        </div>
      </Container>
    </div>
  )
}
