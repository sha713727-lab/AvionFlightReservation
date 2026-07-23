/**
 * Parse preferred callback datetime from the public form.
 * Accepts ISO-8601 with offset/Z, or bare datetime-local interpreted as America/Toronto.
 */
const TORONTO_TZ = 'America/Toronto'

function readParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)

  const get = (type: string) => Number(parts.find((part) => part.type === type)?.value)
  return {
    year: get('year'),
    month: get('month'),
    day: get('day'),
    hour: get('hour'),
    minute: get('minute'),
    second: get('second'),
  }
}

function fromTorontoLocal(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number,
): Date {
  let utcMillis = Date.UTC(year, month - 1, day, hour, minute, second)

  for (let i = 0; i < 3; i += 1) {
    const parts = readParts(new Date(utcMillis), TORONTO_TZ)
    const asUtc = Date.UTC(
      parts.year,
      parts.month - 1,
      parts.day,
      parts.hour,
      parts.minute,
      parts.second,
    )
    const desired = Date.UTC(year, month - 1, day, hour, minute, second)
    utcMillis += desired - asUtc
  }

  return new Date(utcMillis)
}

export function parsePreferredAt(value: string): Date | null {
  const trimmed = value.trim()
  if (!trimmed) return null

  if (/[zZ]$|[+-]\d{2}:?\d{2}$/.test(trimmed)) {
    const parsed = new Date(trimmed)
    return Number.isNaN(parsed.getTime()) ? null : parsed
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(trimmed)
  if (!match) {
    const parsed = new Date(trimmed)
    return Number.isNaN(parsed.getTime()) ? null : parsed
  }

  return fromTorontoLocal(
    Number(match[1]),
    Number(match[2]),
    Number(match[3]),
    Number(match[4]),
    Number(match[5]),
    Number(match[6] ?? '0'),
  )
}

export function isFuturePreferredAt(value: string): boolean {
  const parsed = parsePreferredAt(value)
  return Boolean(parsed && parsed.getTime() > Date.now())
}
