import { PHONE_NUMBER } from '@/constants/contact'

/**
 * Renders the locked public number in separate nodes so Google Ads / GTM
 * "Calls from website" dynamic number insertion cannot rewrite the visible text.
 * Always dial via PHONE_HREF — never a forwarding number from the DOM.
 */
export default function CanonicalPhoneText({ className }) {
  const parts = PHONE_NUMBER.split(' ')
  return (
    <span className={className}>
      {parts.map((part, index) => (
        <span key={`${part}-${index}`}>
          {index > 0 ? '\u00A0' : null}
          <span>{part}</span>
        </span>
      ))}
    </span>
  )
}
