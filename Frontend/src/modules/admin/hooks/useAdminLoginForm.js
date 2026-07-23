'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ApiClientError } from '@/services/api/client'
import { ADMIN_PATH } from '@/constants/routes'
import {
  ADMIN_ERROR_MESSAGES,
  ADMIN_FIELD_NAMES,
} from '@/modules/admin/constants'
import { loginAdmin, verifyAdminPin } from '@/modules/admin/services/adminAuth'
import { writeAdminSession } from '@/modules/admin/utils/session'
import { adminLoginSchema, adminPinVerifySchema } from '@/schemas/adminLogin'

const EMPTY_VALUES = {
  [ADMIN_FIELD_NAMES.email]: '',
  [ADMIN_FIELD_NAMES.password]: '',
}

function mapAuthError(error) {
  if (!(error instanceof ApiClientError)) {
    return ADMIN_ERROR_MESSAGES.generic
  }
  if (error.status === 401 || error.errorCode === 'AUTH_401') {
    return ADMIN_ERROR_MESSAGES.invalid
  }
  if (error.errorCode === 'AUTH_PIN_401') {
    return ADMIN_ERROR_MESSAGES.pinInvalid
  }
  if (error.errorCode === 'AUTH_PIN_401_EXPIRED') {
    return ADMIN_ERROR_MESSAGES.pinExpired
  }
  if (error.status === 429 || error.errorCode === 'AUTH_PIN_429') {
    return ADMIN_ERROR_MESSAGES.pinLocked
  }
  if (error.status === 503 || error.errorCode === 'AUTH_503') {
    return ADMIN_ERROR_MESSAGES.notConfigured
  }
  if (error.errorCode === 'NETWORK_ERROR') {
    return ADMIN_ERROR_MESSAGES.network
  }
  return error.message || ADMIN_ERROR_MESSAGES.generic
}

export function useAdminLoginForm() {
  const router = useRouter()
  const [values, setValues] = useState(EMPTY_VALUES)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState('')
  const [isVerifyingPin, setIsVerifyingPin] = useState(false)
  const [challenge, setChallenge] = useState(null)

  const setField = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }))
    setFormError('')
    setErrors((current) => {
      if (!current[field]) return current
      const next = { ...current }
      delete next[field]
      return next
    })
  }

  const setPinValue = useCallback((value) => {
    const next = value.replace(/\D/g, '').slice(0, 8)
    setPin(next)
    setPinError((current) => (current ? '' : current))
  }, [])

  const closePinModal = useCallback(() => {
    if (isVerifyingPin) return
    setChallenge(null)
    setPin('')
    setPinError('')
  }, [isVerifyingPin])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isSubmitting || challenge) return

    const result = adminLoginSchema.safeParse(values)
    if (!result.success) {
      const nextErrors = {}
      for (const issue of result.error.issues) {
        const key = issue.path[0]
        if (typeof key === 'string' && !nextErrors[key]) {
          nextErrors[key] = issue.message
        }
      }
      setErrors(nextErrors)
      setFormError('')
      return
    }

    setIsSubmitting(true)
    setErrors({})
    setFormError('')

    try {
      const nextChallenge = await loginAdmin(result.data)
      setChallenge(nextChallenge)
      setPin('')
      setPinError('')
    } catch (error) {
      setFormError(mapAuthError(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVerifyPin = async (event) => {
    event.preventDefault()
    if (!challenge || isVerifyingPin) return

    const parsed = adminPinVerifySchema.safeParse({
      challengeId: challenge.challengeId,
      pin,
    })
    if (!parsed.success) {
      setPinError(parsed.error.issues[0]?.message || ADMIN_ERROR_MESSAGES.pinInvalid)
      return
    }

    setIsVerifyingPin(true)
    setPinError('')

    try {
      const session = await verifyAdminPin(parsed.data)
      writeAdminSession(session)
      router.replace(ADMIN_PATH)
    } catch (error) {
      const message = mapAuthError(error)
      setPinError(message)
      if (
        error instanceof ApiClientError &&
        (error.errorCode === 'AUTH_PIN_401_EXPIRED' || error.errorCode === 'AUTH_PIN_429')
      ) {
        setChallenge(null)
        setPin('')
      }
      setIsVerifyingPin(false)
    }
  }

  return {
    values,
    errors,
    formError,
    isSubmitting,
    isSuccess: false,
    setField,
    handleSubmit,
    pinChallenge: {
      isOpen: Boolean(challenge),
      pin,
      setPin: setPinValue,
      error: pinError,
      isVerifying: isVerifyingPin,
      onVerify: handleVerifyPin,
      onClose: closePinModal,
    },
  }
}
