'use client'

import { useCallback, useEffect, useState } from 'react'
import { ADMIN_COPY, ADMIN_ERROR_MESSAGES } from '@/modules/admin/constants'
import {
  createWyndhamPrinciple,
  createWyndhamProperty,
  createWyndhamRailCard,
  deleteWyndhamPrinciple,
  deleteWyndhamProperty,
  deleteWyndhamRailCard,
  fetchAdminWyndhamPage,
  moveWyndhamPrinciple,
  moveWyndhamProperty,
  moveWyndhamRailCard,
  removeWyndhamSlotMedia,
  updateAdminWyndhamPage,
  updateWyndhamPrinciple,
  updateWyndhamProperty,
  updateWyndhamRailCard,
  uploadWyndhamPropertyMedia,
  uploadWyndhamRailMedia,
  uploadWyndhamSlotMedia,
} from '@/modules/admin/services/adminWyndhamPageApi'
import { ApiClientError } from '@/services/api/client'
import { adminWyndhamPageFormSchema } from '@/schemas/wyndhamPage'

function mapError(error) {
  if (!(error instanceof ApiClientError)) return ADMIN_ERROR_MESSAGES.wyndhamGeneric
  return error.message || ADMIN_ERROR_MESSAGES.wyndhamGeneric
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

export default function useAdminWyndhamPage(token) {
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
      const data = await fetchAdminWyndhamPage(token)
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
    const parsed = adminWyndhamPageFormSchema.safeParse(form)
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
      const data = await updateAdminWyndhamPage(token, body)
      setPage(data)
      setForm(pageToForm(data))
      setSuccess(ADMIN_COPY.wyndhamSaveSuccess)
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
    applyPage: setPage,
    reload: load,
    uploadSlot: (slotKey, file) => runMutation(() => uploadWyndhamSlotMedia(token, slotKey, file)),
    removeSlot: (slotKey) => runMutation(() => removeWyndhamSlotMedia(token, slotKey)),
    createPrinciple: (body) => runMutation(() => createWyndhamPrinciple(token, body)),
    updatePrinciple: (id, body) => runMutation(() => updateWyndhamPrinciple(token, id, body)),
    deletePrinciple: (id) => runMutation(() => deleteWyndhamPrinciple(token, id)),
    movePrinciple: (id, direction) =>
      runMutation(() => moveWyndhamPrinciple(token, id, direction)),
    createRailCard: (body) => runMutation(() => createWyndhamRailCard(token, body)),
    updateRailCard: (id, body) => runMutation(() => updateWyndhamRailCard(token, id, body)),
    deleteRailCard: (id) => runMutation(() => deleteWyndhamRailCard(token, id)),
    moveRailCard: (id, direction) => runMutation(() => moveWyndhamRailCard(token, id, direction)),
    uploadRailMedia: (id, file) => runMutation(() => uploadWyndhamRailMedia(token, id, file)),
    createProperty: (body) => runMutation(() => createWyndhamProperty(token, body)),
    updateProperty: (id, body) => runMutation(() => updateWyndhamProperty(token, id, body)),
    deleteProperty: (id) => runMutation(() => deleteWyndhamProperty(token, id)),
    moveProperty: (id, direction) => runMutation(() => moveWyndhamProperty(token, id, direction)),
    uploadPropertyMedia: (id, file) =>
      runMutation(() => uploadWyndhamPropertyMedia(token, id, file)),
  }
}
