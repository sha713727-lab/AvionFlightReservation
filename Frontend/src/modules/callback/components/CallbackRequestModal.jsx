'use client'

import Modal from '@/components/ui/Modal'
import { COPY } from '@/constants/copy'
import CallbackPrompt from '@/modules/callback/components/CallbackPrompt'
import CallbackRequestForm from '@/modules/callback/components/CallbackRequestForm'
import { useCallbackScrollTrigger } from '@/modules/callback/hooks/useCallbackScrollTrigger'

export default function CallbackRequestModal() {
  const { isPromptOpen, isFormOpen, openForm, closeAll } = useCallbackScrollTrigger()

  const isOpen = isPromptOpen || isFormOpen
  const title = isFormOpen
    ? COPY.callbackModal.formTitle
    : COPY.callbackModal.promptTitle

  return (
    <Modal isOpen={isOpen} onClose={closeAll} title={title}>
      {isFormOpen ? (
        <CallbackRequestForm onSuccess={closeAll} />
      ) : (
        <CallbackPrompt onRequest={openForm} />
      )}
    </Modal>
  )
}
