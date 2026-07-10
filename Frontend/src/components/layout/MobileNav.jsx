'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiChevronDown } from 'react-icons/hi'
import { COPY } from '@/constants/copy'
import { LEGAL_LINKS, LEGAL_NAV_LABEL, NAV_LINKS } from '@/constants/navigation'
import { EASE } from '@/components/animations/motionPresets'
import Button from '@/components/buttons/Button'
import Container from '@/components/ui/Container'
import { useCallExpertModal } from '@/modules/call/components/CallExpertProvider'
import { cn } from '@/utils/cn'

export default function MobileNav({ isOpen, onClose }) {
  const callModal = useCallExpertModal()
  const [legalOpen, setLegalOpen] = useState(false)

  if (!isOpen) {
    return null
  }

  const openCallModal = () => {
    onClose()
    callModal.open()
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="fixed inset-x-0 top-[68px] z-30 overflow-hidden glass lg:hidden"
    >
      <Container className="flex flex-col gap-1 py-6">
        {NAV_LINKS.map((link, index) => (
          <motion.a
            key={link.href}
            href={link.href}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.06, duration: 0.3, ease: EASE }}
            onClick={onClose}
            className="border-b border-border/60 py-3 text-base text-primary transition-colors hover:text-accent"
          >
            {link.label}
          </motion.a>
        ))}

        <div className="border-b border-border/60">
          <button
            type="button"
            aria-expanded={legalOpen}
            onClick={() => setLegalOpen((current) => !current)}
            className="flex w-full items-center justify-between py-3 text-left text-base text-primary transition-colors hover:text-accent"
          >
            {LEGAL_NAV_LABEL}
            <HiChevronDown
              className={cn('h-5 w-5 transition-transform duration-200', legalOpen && 'rotate-180')}
              aria-hidden
            />
          </button>

          {legalOpen && (
            <div className="pb-3 pl-3">
              {LEGAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={onClose}
                  className="block py-2 text-sm text-text-secondary transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.3 }}
        >
          <Button variant="primary" className="mt-4 w-full" onClick={openCallModal}>
            {COPY.cta.bookConsultation}
          </Button>
        </motion.div>
      </Container>
    </motion.div>
  )
}
