/**
 * Pure Avion-style points value math (CAD amounts).
 * Assistance fees may be null when unknown; net metrics require both fee inputs.
 */
export function calculatePointsValue({
  cashAlternativeTotal,
  redemptionCashTotal,
  cashAssistanceFee,
  redemptionAssistanceFee,
  pointsUsed,
}) {
  const assistanceFeeIncrement =
    cashAssistanceFee === null || redemptionAssistanceFee === null
      ? null
      : redemptionAssistanceFee - cashAssistanceFee

  const grossCashAvoided = cashAlternativeTotal - redemptionCashTotal
  const netCashAvoided =
    assistanceFeeIncrement === null ? null : grossCashAvoided - assistanceFeeIncrement

  const grossCentsPerPoint = (100 * grossCashAvoided) / pointsUsed
  const netCentsPerPoint =
    netCashAvoided === null ? null : (100 * netCashAvoided) / pointsUsed

  return {
    assistanceFeeIncrement,
    grossCashAvoided,
    netCashAvoided,
    grossCentsPerPoint,
    netCentsPerPoint,
  }
}

export function parseOptionalFee(raw) {
  const trimmed = String(raw).trim()
  if (trimmed === '') {
    return null
  }
  const value = Number(trimmed)
  if (!Number.isFinite(value)) {
    return { error: 'nonFinite' }
  }
  if (value < 0) {
    return { error: 'negative' }
  }
  return { value }
}

export function parseRequiredAmount(raw) {
  const trimmed = String(raw).trim()
  if (trimmed === '') {
    return { error: 'required' }
  }
  const value = Number(trimmed)
  if (!Number.isFinite(value)) {
    return { error: 'nonFinite' }
  }
  if (value < 0) {
    return { error: 'negative' }
  }
  return { value }
}

export function parsePointsUsed(raw) {
  const trimmed = String(raw).trim()
  if (trimmed === '') {
    return { error: 'required' }
  }
  const value = Number(trimmed)
  if (!Number.isFinite(value)) {
    return { error: 'nonFinite' }
  }
  if (value <= 0) {
    return { error: 'nonPositive' }
  }
  return { value }
}
