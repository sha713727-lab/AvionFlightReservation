export function openMailto(emailHref) {
  if (typeof window === 'undefined' || !emailHref) {
    return
  }

  const href = emailHref.startsWith('mailto:')
    ? emailHref
    : `mailto:${String(emailHref).trim()}`

  const link = document.createElement('a')
  link.href = href
  link.setAttribute('aria-hidden', 'true')
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
