'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  CALLBACK_PROMPT_DURATION_MS,
  CALLBACK_SCROLL_RATIO,
  CALLBACK_SUCCESS_DURATION_MS,
} from '@/modules/callback/constants'

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
    setIsPromptOpen(false)
    setIsSuccessOpen(false)
    setIsFormOpen(true)
  }, [])

  const showSuccess = useCallback(() => {
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
