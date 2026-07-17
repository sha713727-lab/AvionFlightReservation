'use client'

import Modal from '@/components/ui/Modal'
import { COPY } from '@/constants/copy'
import CallbackPrompt from '@/modules/callback/components/CallbackPrompt'
import CallbackRequestForm from '@/modules/callback/components/CallbackRequestForm'
import { useCallbackScrollTrigger } from '@/modules/callback/hooks/useCallbackScrollTrigger'

function CallbackThankYou() {
  return (
    <p className="text-sm leading-relaxed text-text-secondary">
      {COPY.callbackModal.thankYouDescription}
    </p>
  )
}

export default function CallbackRequestModal() {
  const {
    isPromptOpen,
    isFormOpen,
    isSuccessOpen,
    openForm,
    showSuccess,
    closeAll,
  } = useCallbackScrollTrigger()

  const isOpen = isPromptOpen || isFormOpen || isSuccessOpen

  const title = isSuccessOpen
    ? COPY.callbackModal.thankYouTitle
    : isFormOpen
      ? COPY.callbackModal.formTitle
      : COPY.callbackModal.promptTitle

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeAll}
      title={title}
      closeOnBackdrop={!isFormOpen}
    >
      {isSuccessOpen ? (
        <CallbackThankYou />
      ) : isFormOpen ? (
        <CallbackRequestForm onSuccess={showSuccess} />
      ) : (
        <CallbackPrompt onRequest={openForm} />
      )}
    </Modal>
  )
}
