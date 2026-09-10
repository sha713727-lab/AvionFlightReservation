import { GTM_EVENTS } from '@/constants/analytics'
import { pushDataLayerEvent } from '@/utils/analytics'

export function dialPhone(phoneHref) {
  if (typeof window === 'undefined' || !phoneHref) {
    return
  }

  pushDataLayerEvent(GTM_EVENTS.phoneClick, {
    conversion_type: 'micro',
    contact_method: 'phone',
    link_url: phoneHref,
  })

  const link = document.createElement('a')
  link.href = phoneHref
  link.setAttribute('aria-hidden', 'true')
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
