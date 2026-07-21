'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ApiClientError } from '@/services/api/client'
import { ADMIN_PATH } from '@/constants/routes'
import {
  ADMIN_ERROR_MESSAGES,
  ADMIN_FIELD_NAMES,
} from '@/modules/admin/constants'
import {
  loginAdmin,
  resendAdminOtp,
  verifyAdminOtp,
} from '@/modules/admin/services/adminAuth'
import { writeAdminSession } from '@/modules/admin/utils/session'
import { adminLoginSchema, adminOtpVerifySchema } from '@/schemas/adminLogin'

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
  if (error.errorCode === 'AUTH_OTP_401') {
    return ADMIN_ERROR_MESSAGES.otpInvalid
  }
  if (error.errorCode === 'AUTH_OTP_401_EXPIRED') {
    return ADMIN_ERROR_MESSAGES.otpExpired
  }
  if (error.status === 429 || error.errorCode === 'AUTH_OTP_429') {
    return error.message?.includes('wait')
      ? ADMIN_ERROR_MESSAGES.otpCooldown
      : ADMIN_ERROR_MESSAGES.otpLocked
  }
  if (error.status === 503 || error.errorCode === 'AUTH_503' || error.errorCode === 'AUTH_MAIL_503') {
    return error.errorCode === 'AUTH_MAIL_503'
      ? ADMIN_ERROR_MESSAGES.otpMailFailed
      : ADMIN_ERROR_MESSAGES.notConfigured
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
  const [otpCode, setOtpCode] = useState('')
  const [otpError, setOtpError] = useState('')
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)
  const [isResendingOtp, setIsResendingOtp] = useState(false)
  const [challenge, setChallenge] = useState(null)
  const [resendSeconds, setResendSeconds] = useState(0)

  useEffect(() => {
    if (!challenge) {
      setResendSeconds(0)
      return undefined
    }

    const tick = () => {
      const remainingMs = Date.parse(challenge.resendAvailableAt) - Date.now()
      const next = Math.max(0, Math.ceil(remainingMs / 1000))
      setResendSeconds((current) => (current === next ? current : next))
    }

    tick()
    const timer = window.setInterval(tick, 1000)
    return () => window.clearInterval(timer)
  }, [challenge])

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

  const setOtpCodeValue = useCallback((value) => {
    const next = value.replace(/\D/g, '').slice(0, 6)
    setOtpCode(next)
    setOtpError((current) => (current ? '' : current))
  }, [])

  const closeOtpModal = useCallback(() => {
    if (isVerifyingOtp || isResendingOtp) return
    setChallenge(null)
    setOtpCode('')
    setOtpError('')
  }, [isVerifyingOtp, isResendingOtp])

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
      setOtpCode('')
      setOtpError('')
    } catch (error) {
      setFormError(mapAuthError(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVerifyOtp = async (event) => {
    event.preventDefault()
    if (!challenge || isVerifyingOtp) return

    const parsed = adminOtpVerifySchema.safeParse({
      challengeId: challenge.challengeId,
      code: otpCode,
    })
    if (!parsed.success) {
      setOtpError(parsed.error.issues[0]?.message || ADMIN_ERROR_MESSAGES.otpInvalid)
      return
    }

    setIsVerifyingOtp(true)
    setOtpError('')

    try {
      const session = await verifyAdminOtp(parsed.data)
      writeAdminSession(session)
      router.replace(ADMIN_PATH)
    } catch (error) {
      const message = mapAuthError(error)
      setOtpError(message)
      if (
        error instanceof ApiClientError &&
        (error.errorCode === 'AUTH_OTP_401_EXPIRED' || error.errorCode === 'AUTH_OTP_429')
      ) {
        setChallenge(null)
        setOtpCode('')
      }
      setIsVerifyingOtp(false)
    }
  }

  const handleResendOtp = async () => {
    if (!challenge || isResendingOtp || resendSeconds > 0) return
    setIsResendingOtp(true)
    setOtpError('')
    try {
      const nextChallenge = await resendAdminOtp({ challengeId: challenge.challengeId })
      setChallenge(nextChallenge)
    } catch (error) {
      setOtpError(mapAuthError(error))
      if (
        error instanceof ApiClientError &&
        error.errorCode === 'AUTH_OTP_401_EXPIRED'
      ) {
        setChallenge(null)
        setOtpCode('')
      }
    } finally {
      setIsResendingOtp(false)
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
    otp: {
      isOpen: Boolean(challenge),
      code: otpCode,
      setCode: setOtpCodeValue,
      error: otpError,
      destinationHint: challenge?.destinationHint || '',
      isVerifying: isVerifyingOtp,
      isResending: isResendingOtp,
      resendSeconds,
      onVerify: handleVerifyOtp,
      onResend: handleResendOtp,
      onClose: closeOtpModal,
    },
  }
}
