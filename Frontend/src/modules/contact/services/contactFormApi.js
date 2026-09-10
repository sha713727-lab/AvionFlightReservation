import { RESERVATION_EMAIL } from '@/constants/contact'
import { CONTACT_FORM_SUBJECTS } from '@/modules/contact/constants'
import { openMailto } from '@/utils/openMailto'

function subjectLabel(value) {
  return CONTACT_FORM_SUBJECTS.find((item) => item.value === value)?.label || value
}

/**
 * Opens a prefilled mailto to the reservation inbox after client-side validation.
 * No public contact-form API exists yet; email remains the delivery channel.
 */
export function submitContactForm(values) {
  const label = subjectLabel(values.subject)
  const body = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone}`,
    `Subject: ${label}`,
    '',
    values.message,
  ].join('\n')

  const href = `mailto:${RESERVATION_EMAIL}?subject=${encodeURIComponent(
    `Contact form: ${label}`,
  )}&body=${encodeURIComponent(body)}`

  openMailto(href)
  return { ok: true }
}
