export const NORTH_AMERICAN_PHONE_PREFIX = '+1'

export const NORTH_AMERICAN_PHONE_PLACEHOLDER = '+1 555 000 0000'

/** Exact display format: +1 XXX XXX XXXX */
export const NORTH_AMERICAN_PHONE_PATTERN = /^\+1 \d{3} \d{3} \d{4}$/

/**
 * National 10-digit number only — never includes the +1 country code.
 */
export function extractNorthAmericanNationalDigits(value) {
  let raw = String(value ?? '').trim()

  if (raw.startsWith('+1')) {
    raw = raw.slice(2)
  } else if (/^\+?1\d/.test(raw)) {
    raw = raw.replace(/^\+?1/, '')
  }

  return raw.replace(/\D/g, '').slice(0, 10)
}

function formatFromNationalDigits(nationalDigits) {
  const national = String(nationalDigits ?? '').replace(/\D/g, '').slice(0, 10)

  if (national.length === 0) {
    return `${NORTH_AMERICAN_PHONE_PREFIX} `
  }

  let formatted = `${NORTH_AMERICAN_PHONE_PREFIX} ${national.slice(0, 3)}`

  if (national.length > 3) {
    formatted += ` ${national.slice(3, 6)}`
  }

  if (national.length > 6) {
    formatted += ` ${national.slice(6, 10)}`
  }

  return formatted
}

/**
 * Always keeps +1 and formats as +1 XXX XXX XXXX while typing.
 */
export function formatNorthAmericanPhone(value) {
  return formatFromNationalDigits(extractNorthAmericanNationalDigits(value))
}

export function removeLastNorthAmericanDigit(value) {
  const national = extractNorthAmericanNationalDigits(value)
  return formatFromNationalDigits(national.slice(0, -1))
}

export function isCompleteNorthAmericanPhone(value) {
  return NORTH_AMERICAN_PHONE_PATTERN.test(String(value ?? '').trim())
}
