/**
 * Convert an HTML datetime-local value (no timezone) to a UTC ISO string
 * using the browser's local timezone. Safe for API round-trips on UTC servers.
 */
export function datetimeLocalToIso(value) {
  const trimmed = String(value ?? '').trim()
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(trimmed)
  if (!match) return null

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const hour = Number(match[4])
  const minute = Number(match[5])
  const second = Number(match[6] ?? '0')

  const local = new Date(year, month - 1, day, hour, minute, second, 0)
  if (Number.isNaN(local.getTime())) return null
  return local.toISOString()
}

/** True when the datetime-local value is a valid future local time. */
export function isFutureDatetimeLocal(value) {
  const iso = datetimeLocalToIso(value)
  if (!iso) return false
  return new Date(iso).getTime() > Date.now()
}

/** Minimum datetime-local value for the next minute (local clock). */
export function nextMinuteDatetimeLocal() {
  const date = new Date(Date.now() + 60_000)
  const pad = (n) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}
