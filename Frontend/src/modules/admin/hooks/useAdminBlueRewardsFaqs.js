'use client'

import { useState } from 'react'
import { ADMIN_ERROR_MESSAGES } from '@/modules/admin/constants'
import { HOTEL_FAQ_COPY } from '@/modules/admin/hotelFaqCopy'
import {
  createBlueRewardsFaq,
  deleteBlueRewardsFaq,
  moveBlueRewardsFaq,
  updateBlueRewardsFaq,
} from '@/modules/admin/services/adminBlueRewardsPageApi'
import { ApiClientError } from '@/services/api/client'
import { adminBlueRewardsFaqFormSchema } from '@/schemas/blueRewardsPage'

const EMPTY_DRAFT = { question: '', answer: '', isEnabled: true }

function mapError(error) {
  if (!(error instanceof ApiClientError)) return ADMIN_ERROR_MESSAGES.blueRewardsGeneric
  return error.message || ADMIN_ERROR_MESSAGES.blueRewardsGeneric
}

export default function useAdminBlueRewardsFaqs(token, applyPage) {
  const [draft, setDraft] = useState(EMPTY_DRAFT)
  const [creating, setCreating] = useState(false)
  const [savingId, setSavingId] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  const run = async (fn, successMessage) => {
    setError('')
    setSuccess('')
    const data = await fn()
    applyPage(data)
    setSuccess(successMessage)
    return data
  }

  const createFaq = async () => {
    if (creating) return
    const parsed = adminBlueRewardsFaqFormSchema.safeParse(draft)
    if (!parsed.success) {
      const next = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0]
        if (typeof key === 'string' && !next[key]) next[key] = issue.message
      }
      setFieldErrors(next)
      return
    }
    setCreating(true)
    try {
      await run(() => createBlueRewardsFaq(token, parsed.data), HOTEL_FAQ_COPY.createSuccess)
      setDraft(EMPTY_DRAFT)
      setFieldErrors({})
    } catch (err) {
      setError(mapError(err))
    } finally {
      setCreating(false)
    }
  }

  const saveFaq = async (id, body) => {
    if (savingId) return
    const parsed = adminBlueRewardsFaqFormSchema.safeParse(body)
    if (!parsed.success) {
      const next = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0]
        if (typeof key === 'string' && !next[`${id}.${key}`]) next[`${id}.${key}`] = issue.message
      }
      setFieldErrors(next)
      return
    }
    setSavingId(id)
    try {
      await run(() => updateBlueRewardsFaq(token, id, parsed.data), HOTEL_FAQ_COPY.saveItemSuccess)
      setFieldErrors({})
    } catch (err) {
      setError(mapError(err))
    } finally {
      setSavingId('')
    }
  }

  const removeFaq = async (id) => {
    if (savingId) return
    setSavingId(id)
    try {
      await run(() => deleteBlueRewardsFaq(token, id), HOTEL_FAQ_COPY.deleteSuccess)
    } catch (err) {
      setError(mapError(err))
    } finally {
      setSavingId('')
    }
  }

  const moveFaq = async (id, direction) => {
    if (savingId) return
    setSavingId(id)
    try {
      await run(() => moveBlueRewardsFaq(token, id, direction), '')
    } catch (err) {
      setError(mapError(err))
    } finally {
      setSavingId('')
    }
  }

  return {
    draft,
    setDraft,
    creating,
    savingId,
    error,
    success,
    fieldErrors,
    createFaq,
    saveFaq,
    removeFaq,
    moveFaq,
  }
}
