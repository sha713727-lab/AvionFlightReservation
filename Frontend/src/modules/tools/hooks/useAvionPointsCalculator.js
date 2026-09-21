'use client'

import { useMemo, useState } from 'react'
import {
  CALCULATOR_ERRORS,
  CALCULATOR_FIELD_NAMES,
  CALCULATOR_MESSAGES,
} from '@/modules/tools/constants'
import {
  calculatePointsValue,
  parseOptionalFee,
  parsePointsUsed,
  parseRequiredAmount,
} from '@/modules/tools/utils/calculatePointsValue'

const EMPTY = {
  [CALCULATOR_FIELD_NAMES.cashAlternativeTotal]: '',
  [CALCULATOR_FIELD_NAMES.redemptionCashTotal]: '',
  [CALCULATOR_FIELD_NAMES.cashAssistanceFee]: '',
  [CALCULATOR_FIELD_NAMES.redemptionAssistanceFee]: '',
  [CALCULATOR_FIELD_NAMES.pointsUsed]: '',
}

export function useAvionPointsCalculator() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(null)

  const setField = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }))
    setSubmitted(null)
    setErrors((current) => {
      if (!current[field]) return current
      const next = { ...current }
      delete next[field]
      return next
    })
  }

  const validate = () => {
    const nextErrors = {}

    const cashAlt = parseRequiredAmount(values.cashAlternativeTotal)
    if (cashAlt.error === 'required') {
      nextErrors.cashAlternativeTotal = CALCULATOR_ERRORS.cashAlternativeRequired
    } else if (cashAlt.error === 'negative') {
      nextErrors.cashAlternativeTotal = CALCULATOR_ERRORS.negativeCost
    } else if (cashAlt.error) {
      nextErrors.cashAlternativeTotal = CALCULATOR_ERRORS.nonFinite
    }

    const redemptionCash = parseRequiredAmount(values.redemptionCashTotal)
    if (redemptionCash.error === 'required') {
      nextErrors.redemptionCashTotal = CALCULATOR_ERRORS.redemptionCashRequired
    } else if (redemptionCash.error === 'negative') {
      nextErrors.redemptionCashTotal = CALCULATOR_ERRORS.negativeCost
    } else if (redemptionCash.error) {
      nextErrors.redemptionCashTotal = CALCULATOR_ERRORS.nonFinite
    }

    const points = parsePointsUsed(values.pointsUsed)
    if (points.error === 'required' || points.error === 'nonPositive') {
      nextErrors.pointsUsed = CALCULATOR_ERRORS.pointsRequired
    } else if (points.error) {
      nextErrors.pointsUsed = CALCULATOR_ERRORS.pointsFinite
    }

    const cashFee = parseOptionalFee(values.cashAssistanceFee)
    if (cashFee.error === 'negative') {
      nextErrors.cashAssistanceFee = CALCULATOR_ERRORS.assistanceNonNegative
    } else if (cashFee.error) {
      nextErrors.cashAssistanceFee = CALCULATOR_ERRORS.nonFinite
    }

    const redemptionFee = parseOptionalFee(values.redemptionAssistanceFee)
    if (redemptionFee.error === 'negative') {
      nextErrors.redemptionAssistanceFee = CALCULATOR_ERRORS.assistanceNonNegative
    } else if (redemptionFee.error) {
      nextErrors.redemptionAssistanceFee = CALCULATOR_ERRORS.nonFinite
    }

    return { nextErrors, cashAlt, redemptionCash, points, cashFee, redemptionFee }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const { nextErrors, cashAlt, redemptionCash, points, cashFee, redemptionFee } = validate()
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      setSubmitted(null)
      return
    }

    const result = calculatePointsValue({
      cashAlternativeTotal: cashAlt.value,
      redemptionCashTotal: redemptionCash.value,
      cashAssistanceFee: cashFee.value,
      redemptionAssistanceFee: redemptionFee.value,
      pointsUsed: points.value,
    })
    setErrors({})
    setSubmitted(result)
  }

  const handleReset = () => {
    setValues(EMPTY)
    setErrors({})
    setSubmitted(null)
  }

  const resultNote = useMemo(() => {
    if (!submitted) return ''
    if (submitted.grossCashAvoided < 0) return CALCULATOR_MESSAGES.negativeGross
    if (submitted.netCashAvoided !== null && submitted.netCashAvoided < 0) {
      return CALCULATOR_MESSAGES.negativeNet
    }
    return ''
  }, [submitted])

  return {
    values,
    errors,
    submitted,
    resultNote,
    setField,
    handleSubmit,
    handleReset,
  }
}
