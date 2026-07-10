const MULTI_SPACE = /\s+/g

function isControlChar(char: string): boolean {
  const code = char.charCodeAt(0)
  return (code >= 0 && code <= 31) || code === 127
}

export function sanitizeString(value: string): string {
  const withoutControls = Array.from(value)
    .filter((char) => !isControlChar(char))
    .join('')

  return withoutControls.replace(MULTI_SPACE, ' ').trim()
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export function normalizeString(value: string): string {
  return escapeHtml(sanitizeString(value))
}
