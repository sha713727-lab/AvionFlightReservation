export function dialPhone(phoneHref) {
  if (typeof window === 'undefined' || !phoneHref) {
    return
  }

  const link = document.createElement('a')
  link.href = phoneHref
  link.setAttribute('aria-hidden', 'true')
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
