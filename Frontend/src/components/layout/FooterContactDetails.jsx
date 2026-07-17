import {
  CONTACT_LABELS,
  EMAIL,
  EMAIL_HREF,
  MAILING_ADDRESS_LINES,
  PHONE_HREF,
  PHONE_NUMBER,
  RESERVATION_EMAIL,
  RESERVATION_EMAIL_HREF,
  SUPPORT_HOURS,
} from '@/constants/contact'

const linkClassName =
  'break-all text-sm font-medium text-white transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

export default function FooterContactDetails() {
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

        <div>
          <p className="mb-1.5 text-xs font-medium uppercase tracking-[0.16em] text-white/40">
            {CONTACT_LABELS.phoneSupport}
          </p>
          <a href={PHONE_HREF} className={linkClassName}>
            {PHONE_NUMBER}
          </a>
        </div>

        <div>
          <p className="mb-1.5 text-xs font-medium uppercase tracking-[0.16em] text-white/40">
            {CONTACT_LABELS.businessEmail}
          </p>
          <a href={EMAIL_HREF} className={linkClassName}>
            {EMAIL}
          </a>
        </div>

        <div>
          <p className="mb-1.5 text-xs font-medium uppercase tracking-[0.16em] text-white/40">
            {CONTACT_LABELS.reservationEmail}
          </p>
          <a href={RESERVATION_EMAIL_HREF} className={linkClassName}>
            {RESERVATION_EMAIL}
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
