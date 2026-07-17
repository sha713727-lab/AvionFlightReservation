'use client'

import { useCallback, useEffect, useState } from 'react'
import { GTM_EVENTS } from '@/constants/analytics'
import {
  CALLBACK_PROMPT_DURATION_MS,
  CALLBACK_SCROLL_RATIO,
  CALLBACK_SUCCESS_DURATION_MS,
} from '@/modules/callback/constants'
import { pushDataLayerEvent } from '@/utils/analytics'

export function useCallbackScrollTrigger() {
  const [isPromptOpen, setIsPromptOpen] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  const closeAll = useCallback(() => {
    setIsPromptOpen(false)
    setIsFormOpen(false)
    setIsSuccessOpen(false)
  }, [])

  const openForm = useCallback(() => {
    pushDataLayerEvent(GTM_EVENTS.callbackRequestClick, {
      callback_cta: 'request_a_callback',
    })
    setIsPromptOpen(false)
    setIsSuccessOpen(false)
    setIsFormOpen(true)
  }, [])

  const showSuccess = useCallback(() => {
    pushDataLayerEvent(GTM_EVENTS.callbackFormSubmit, {
      callback_cta: 'submit_request',
    })
    setIsPromptOpen(false)
    setIsFormOpen(false)
    setIsSuccessOpen(true)
  }, [])

  useEffect(() => {
    if (hasTriggered) return undefined

    const onScroll = () => {
      const doc = document.documentElement
      const maxScroll = doc.scrollHeight - window.innerHeight
      if (maxScroll <= 0) return

      const progress = window.scrollY / maxScroll
      if (progress < CALLBACK_SCROLL_RATIO) return

      setHasTriggered(true)
      setIsPromptOpen(true)
      pushDataLayerEvent(GTM_EVENTS.callbackModalOpen, {
        callback_trigger: 'scroll_half_page',
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [hasTriggered])

  useEffect(() => {
    if (!isPromptOpen) return undefined

    const timer = window.setTimeout(() => {
      setIsPromptOpen(false)
    }, CALLBACK_PROMPT_DURATION_MS)

    return () => window.clearTimeout(timer)
  }, [isPromptOpen])

  useEffect(() => {
    if (!isSuccessOpen) return undefined

    const timer = window.setTimeout(() => {
      setIsSuccessOpen(false)
    }, CALLBACK_SUCCESS_DURATION_MS)

    return () => window.clearTimeout(timer)
  }, [isSuccessOpen])

  return {
    isPromptOpen,
    isFormOpen,
    isSuccessOpen,
    openForm,
    showSuccess,
    closeAll,
  }
}
