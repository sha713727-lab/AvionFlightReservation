'use client'

import {
  CONTACT_LABELS,
  MAILING_ADDRESS_LINES,
  SUPPORT_HOURS,
} from '@/constants/contact'
import { useContactSettings } from '@/modules/contact/components/ContactSettingsProvider'
import { openMailto } from '@/utils/openMailto'
import { cn } from '@/utils/cn'

const linkClassName = cn(
  'break-all text-sm font-medium text-white transition-opacity hover:opacity-80',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
)

export default function FooterContactDetails() {
  const { reservationEmail, reservationEmailHref, supportPhones } = useContactSettings()

  const handleEmailClick = (event) => {
    event.preventDefault()
    openMailto(reservationEmailHref)
  }

  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-5 sm:p-6">
      <div className="space-y-5">
        <div>
          <p className="mb-1.5 text-xs font-medium uppercase tracking-[0.16em] text-white/40">
            {CONTACT_LABELS.mailingAddress}
          </p>
          <address className="not-italic text-sm font-medium leading-relaxed text-white">
            {MAILING_ADDRESS_LINES.join(' ')}
          </address>
        </div>

        <div className="space-y-1.5">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/40">
            {CONTACT_LABELS.phoneSupport}
          </p>
          {supportPhones.map((phone) => (
            <a key={phone.href} href={phone.href} className={cn(linkClassName, 'block')}>
              {phone.display}
            </a>
          ))}
        </div>

        <div>
          <p className="mb-1.5 text-xs font-medium uppercase tracking-[0.16em] text-white/40">
            {CONTACT_LABELS.reservationEmail}
          </p>
          <a
            href={reservationEmailHref}
            onClick={handleEmailClick}
            className={cn(linkClassName, 'cursor-pointer underline-offset-2 hover:underline')}
          >
            {reservationEmail}
          </a>
        </div>

        <div>
          <p className="mb-1.5 text-xs font-medium uppercase tracking-[0.16em] text-white/40">
            {CONTACT_LABELS.supportHours}
          </p>
          <p className="text-sm font-medium leading-relaxed text-white">{SUPPORT_HOURS}</p>
        </div>
      </div>
    </div>
  )
}
