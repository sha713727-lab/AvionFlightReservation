'use client'

import { createContext, useContext, useMemo, useState } from 'react'
import { FaPhone } from 'react-icons/fa'
import Modal from '@/components/ui/Modal'
import Button from '@/components/buttons/Button'
import { COPY } from '@/constants/copy'
import { useContactSettings } from '@/modules/contact/components/ContactSettingsProvider'
import { dialPhone } from '@/utils/dialPhone'

const CallExpertContext = createContext(null)

export function useCallExpertModal() {
  return useContext(CallExpertContext)
}

export default function CallExpertProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const { phoneNumber, phoneHref } = useContactSettings()
  const value = useMemo(() => ({ open: () => setIsOpen(true) }), [])

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
        <p className="mb-2 text-sm leading-relaxed text-text-secondary">
          {COPY.callModal.description}
        </p>
        <a
          href={phoneHref}
          onClick={handleCallNow}
          className="mb-6 block text-2xl font-semibold text-primary transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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
