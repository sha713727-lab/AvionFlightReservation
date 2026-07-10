import {
  CONTACT_LABELS,
  EMAIL,
  EMAIL_HREF,
  MAILING_ADDRESS_LINES,
  PHONE_HREF,
  PHONE_NUMBER,
  SUPPORT_HOURS,
} from '@/constants/contact'

export default function FooterContactDetails() {
  return (
    <div>
      <h4 className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-white/40">
        {CONTACT_LABELS.columnTitle}
      </h4>

      <div className="space-y-3">
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-white/40">
            {CONTACT_LABELS.mailingAddress}
          </p>
          <address className="not-italic text-sm leading-relaxed text-white/60">
            {MAILING_ADDRESS_LINES.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </div>

        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-white/40">
            {CONTACT_LABELS.phoneSupport}
          </p>
          <a href={PHONE_HREF} className="footer-link text-sm text-white/60">
            {PHONE_NUMBER}
          </a>
        </div>

        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-white/40">
            {CONTACT_LABELS.businessEmail}
          </p>
          <a href={EMAIL_HREF} className="footer-link break-all text-sm text-white/60">
            {EMAIL}
          </a>
        </div>

        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-white/40">
            {CONTACT_LABELS.supportHours}
          </p>
          <p className="text-sm leading-relaxed text-white/60">{SUPPORT_HOURS}</p>
        </div>
      </div>
    </div>
  )
}
