'use client'

import { useCallback, useEffect, useState } from 'react'
import { ADMIN_COPY, ADMIN_ERROR_MESSAGES } from '@/modules/admin/constants'
import {
  createHiltonPrinciple,
  createHiltonProperty,
  createHiltonRailCard,
  deleteHiltonPrinciple,
  deleteHiltonProperty,
  deleteHiltonRailCard,
  fetchAdminHiltonPage,
  moveHiltonPrinciple,
  moveHiltonProperty,
  moveHiltonRailCard,
  removeHiltonSlotMedia,
  updateAdminHiltonPage,
  updateHiltonPrinciple,
  updateHiltonProperty,
  updateHiltonRailCard,
  uploadHiltonPropertyMedia,
  uploadHiltonRailMedia,
  uploadHiltonSlotMedia,
} from '@/modules/admin/services/adminHiltonPageApi'
import { ApiClientError } from '@/services/api/client'
import { adminHiltonPageFormSchema } from '@/schemas/hiltonPage'

function mapError(error) {
  if (!(error instanceof ApiClientError)) return ADMIN_ERROR_MESSAGES.hiltonGeneric
  return error.message || ADMIN_ERROR_MESSAGES.hiltonGeneric
}

function pageToForm(page) {
  return {
    status: page.status === 'draft' ? 'draft' : 'published',
    metaTitle: page.metaTitle,
    metaDescription: page.metaDescription,
    ogTitle: page.ogTitle || '',
    ogDescription: page.ogDescription || '',
    heroHeading: page.heroHeading,
    heroIntroduction: page.heroIntroduction,
    storyLabel: page.storyLabel,
    storyParagraphsText: page.storyParagraphs.join('\n\n'),
    storyCtaLabel: page.storyCtaLabel,
    storyCtaHref: page.storyCtaHref,
    principlesHeading: page.principlesHeading,
    clientsEnabled: page.clientsEnabled,
    clientsHeading: page.clientsHeading,
    clientsIntroduction: page.clientsIntroduction,
    railLabel: page.railLabel,
    contactEmailOverride: page.contactEmailOverride || '',
  }
}

export default function useAdminHiltonPage(token) {
  const [page, setPage] = useState(null)
  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchAdminHiltonPage(token)
      setPage(data)
      setForm(pageToForm(data))
    } catch (err) {
      setError(mapError(err))
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    void load()
  }, [load])

  const updateField = (name, value) => {
    setForm((current) => (current ? { ...current, [name]: value } : current))
    setFieldErrors((current) => {
      if (!current[name]) return current
      const next = { ...current }
      delete next[name]
      return next
    })
  }

  const savePage = async () => {
    if (!form) return
    setSuccess('')
    setError('')
    const parsed = adminHiltonPageFormSchema.safeParse(form)
    if (!parsed.success) {
      const next = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0]
        if (typeof key === 'string' && !next[key]) next[key] = issue.message
      }
      setFieldErrors(next)
      return
    }

    setSaving(true)
    try {
      const body = {
        ...parsed.data,
        ogTitle: parsed.data.ogTitle || null,
        ogDescription: parsed.data.ogDescription || null,
        storyParagraphs: parsed.data.storyParagraphsText
          .split(/\n\s*\n/)
          .map((part) => part.trim())
          .filter(Boolean),
        contactEmailOverride: parsed.data.contactEmailOverride || null,
      }
      delete body.storyParagraphsText
      const data = await updateAdminHiltonPage(token, body)
      setPage(data)
      setForm(pageToForm(data))
      setSuccess(ADMIN_COPY.hiltonSaveSuccess)
    } catch (err) {
      setError(mapError(err))
    } finally {
      setSaving(false)
    }
  }

  const runMutation = async (fn) => {
    setError('')
    setSuccess('')
    try {
      const data = await fn()
      setPage(data)
      return data
    } catch (err) {
      setError(mapError(err))
      throw err
    }
  }

  return {
    page,
    form,
    loading,
    saving,
    error,
    success,
    fieldErrors,
    updateField,
    savePage,
    reload: load,
    uploadSlot: (slotKey, file) => runMutation(() => uploadHiltonSlotMedia(token, slotKey, file)),
    removeSlot: (slotKey) => runMutation(() => removeHiltonSlotMedia(token, slotKey)),
    createPrinciple: (body) => runMutation(() => createHiltonPrinciple(token, body)),
    updatePrinciple: (id, body) => runMutation(() => updateHiltonPrinciple(token, id, body)),
    deletePrinciple: (id) => runMutation(() => deleteHiltonPrinciple(token, id)),
    movePrinciple: (id, direction) =>
      runMutation(() => moveHiltonPrinciple(token, id, direction)),
    createRailCard: (body) => runMutation(() => createHiltonRailCard(token, body)),
    updateRailCard: (id, body) => runMutation(() => updateHiltonRailCard(token, id, body)),
    deleteRailCard: (id) => runMutation(() => deleteHiltonRailCard(token, id)),
    moveRailCard: (id, direction) => runMutation(() => moveHiltonRailCard(token, id, direction)),
    uploadRailMedia: (id, file) => runMutation(() => uploadHiltonRailMedia(token, id, file)),
    createProperty: (body) => runMutation(() => createHiltonProperty(token, body)),
    updateProperty: (id, body) => runMutation(() => updateHiltonProperty(token, id, body)),
    deleteProperty: (id) => runMutation(() => deleteHiltonProperty(token, id)),
    moveProperty: (id, direction) => runMutation(() => moveHiltonProperty(token, id, direction)),
    uploadPropertyMedia: (id, file) =>
      runMutation(() => uploadHiltonPropertyMedia(token, id, file)),
  }
}
