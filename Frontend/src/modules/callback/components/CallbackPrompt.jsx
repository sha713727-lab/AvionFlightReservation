'use client'

import Button from '@/components/buttons/Button'
import { COPY } from '@/constants/copy'

export default function CallbackPrompt({ onRequest }) {
  return (
    <div className="space-y-6">
      <p className="text-sm leading-relaxed text-text-secondary">
        {COPY.callbackModal.promptDescription}
      </p>
      <Button variant="primary" size="lg" className="w-full" onClick={onRequest}>
        {COPY.callbackModal.requestCta}
      </Button>
    </div>
  )
}
