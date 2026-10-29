'use client'

import { useCallback, useEffect, useState } from 'react'
import { ADMIN_COPY, ADMIN_ERROR_MESSAGES } from '@/modules/admin/constants'
import {
  createBlueRewardsPrinciple,
  createBlueRewardsProperty,
  createBlueRewardsRailCard,
  deleteBlueRewardsPrinciple,
  deleteBlueRewardsProperty,
  deleteBlueRewardsRailCard,
  fetchAdminBlueRewardsPage,
  moveBlueRewardsPrinciple,
  moveBlueRewardsProperty,
  moveBlueRewardsRailCard,
  removeBlueRewardsSlotMedia,
  updateAdminBlueRewardsPage,
  updateBlueRewardsPrinciple,
  updateBlueRewardsProperty,
  updateBlueRewardsRailCard,
  uploadBlueRewardsPropertyMedia,
  uploadBlueRewardsRailMedia,
  uploadBlueRewardsSlotMedia,
} from '@/modules/admin/services/adminBlueRewardsPageApi'
import { ApiClientError } from '@/services/api/client'
import { adminBlueRewardsPageFormSchema } from '@/schemas/blueRewardsPage'

function mapError(error) {
  if (!(error instanceof ApiClientError)) return ADMIN_ERROR_MESSAGES.blueRewardsGeneric
  return error.message || ADMIN_ERROR_MESSAGES.blueRewardsGeneric
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
    heroPrimaryCtaLabel: page.heroPrimaryCtaLabel,
    heroSecondaryCtaLabel: page.heroSecondaryCtaLabel,
    heroSecondaryCtaHref: page.heroSecondaryCtaHref,
    officialLinkLabel: page.officialLinkLabel,
    officialLinkHref: page.officialLinkHref,
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

export default function useAdminBlueRewardsPage(token) {
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
      const data = await fetchAdminBlueRewardsPage(token)
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
    const parsed = adminBlueRewardsPageFormSchema.safeParse(form)
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
      const data = await updateAdminBlueRewardsPage(token, body)
      setPage(data)
      setForm(pageToForm(data))
      setSuccess(ADMIN_COPY.blueRewardsSaveSuccess)
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
    uploadSlot: (slotKey, file) => runMutation(() => uploadBlueRewardsSlotMedia(token, slotKey, file)),
    removeSlot: (slotKey) => runMutation(() => removeBlueRewardsSlotMedia(token, slotKey)),
    createPrinciple: (body) => runMutation(() => createBlueRewardsPrinciple(token, body)),
    updatePrinciple: (id, body) => runMutation(() => updateBlueRewardsPrinciple(token, id, body)),
    deletePrinciple: (id) => runMutation(() => deleteBlueRewardsPrinciple(token, id)),
    movePrinciple: (id, direction) =>
      runMutation(() => moveBlueRewardsPrinciple(token, id, direction)),
    createRailCard: (body) => runMutation(() => createBlueRewardsRailCard(token, body)),
    updateRailCard: (id, body) => runMutation(() => updateBlueRewardsRailCard(token, id, body)),
    deleteRailCard: (id) => runMutation(() => deleteBlueRewardsRailCard(token, id)),
    moveRailCard: (id, direction) => runMutation(() => moveBlueRewardsRailCard(token, id, direction)),
    uploadRailMedia: (id, file) => runMutation(() => uploadBlueRewardsRailMedia(token, id, file)),
    createProperty: (body) => runMutation(() => createBlueRewardsProperty(token, body)),
    updateProperty: (id, body) => runMutation(() => updateBlueRewardsProperty(token, id, body)),
    deleteProperty: (id) => runMutation(() => deleteBlueRewardsProperty(token, id)),
    moveProperty: (id, direction) => runMutation(() => moveBlueRewardsProperty(token, id, direction)),
    uploadPropertyMedia: (id, file) =>
      runMutation(() => uploadBlueRewardsPropertyMedia(token, id, file)),
  }
}
