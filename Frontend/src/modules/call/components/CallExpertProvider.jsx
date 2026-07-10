'use client'

import { createContext, useContext, useMemo, useState } from 'react'
import { FaPhone } from 'react-icons/fa'
import Modal from '@/components/ui/Modal'
import Button from '@/components/buttons/Button'
import { COPY } from '@/constants/copy'
import { PHONE_HREF, PHONE_NUMBER } from '@/constants/contact'
import { dialPhone } from '@/utils/dialPhone'

const CallExpertContext = createContext(null)

export function useCallExpertModal() {
  return useContext(CallExpertContext)
}

export default function CallExpertProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const value = useMemo(() => ({ open: () => setIsOpen(true) }), [])

  const handleCallNow = (event) => {
    event.preventDefault()
    event.stopPropagation()
    dialPhone(PHONE_HREF)
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
          href={PHONE_HREF}
          onClick={handleCallNow}
          className="mb-6 block text-2xl font-semibold text-primary transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {PHONE_NUMBER}
        </a>
        <Button
          href={PHONE_HREF}
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
