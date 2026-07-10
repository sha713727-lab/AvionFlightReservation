/** Starting happy-customer count for a new site visit. */
export const HAPPY_CUSTOMERS_BASE = 9995

/** Customers added each time the dwell timer fires. */
export const HAPPY_CUSTOMERS_INCREMENT = 2

/** Increase once every 5 minutes while the visitor stays on the site. */
export const HAPPY_CUSTOMERS_INTERVAL_MS = 5 * 60 * 1000

export const HAPPY_CUSTOMERS_SESSION_KEY = 'avion_happy_customers_session_started_at'

function getSessionStorage() {
  if (typeof window === 'undefined') {
    return null
  }

  return window.sessionStorage
}

export function getSessionStartedAt(storage = getSessionStorage()) {
  if (!storage) {
    return Date.now()
  }

  const existing = storage.getItem(HAPPY_CUSTOMERS_SESSION_KEY)
  if (existing) {
    const parsed = Number(existing)
    if (Number.isFinite(parsed) && parsed > 0) {
      return parsed
    }
  }

  const startedAt = Date.now()
  storage.setItem(HAPPY_CUSTOMERS_SESSION_KEY, String(startedAt))
  return startedAt
}

export function getHappyCustomersCount(now = Date.now(), storage = getSessionStorage()) {
  if (!storage) {
    return HAPPY_CUSTOMERS_BASE
  }

  const startedAt = getSessionStartedAt(storage)
  const elapsedMs = Math.max(0, now - startedAt)
  const steps = Math.floor(elapsedMs / HAPPY_CUSTOMERS_INTERVAL_MS)
  return HAPPY_CUSTOMERS_BASE + steps * HAPPY_CUSTOMERS_INCREMENT
}

export function getMsUntilNextHappyCustomersStep(
  now = Date.now(),
  storage = getSessionStorage(),
) {
  if (!storage) {
    return HAPPY_CUSTOMERS_INTERVAL_MS
  }

  const startedAt = getSessionStartedAt(storage)
  const elapsedMs = Math.max(0, now - startedAt)
  const remainder = elapsedMs % HAPPY_CUSTOMERS_INTERVAL_MS
  return remainder === 0 ? HAPPY_CUSTOMERS_INTERVAL_MS : HAPPY_CUSTOMERS_INTERVAL_MS - remainder
}
