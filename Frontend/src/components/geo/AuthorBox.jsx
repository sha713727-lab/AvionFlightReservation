import Link from 'next/link'
import { GEO_BYLINES, GEO_COPY } from '@/constants/geo'

/**
 * Organizational authorship attribution (no invented individual experts).
 */
export default function AuthorBox({
  updatedLabel = GEO_BYLINES.lastUpdatedLabel,
  updatedIso = GEO_BYLINES.lastUpdatedIso,
}) {
  return (
    <div className="author-box mt-8 rounded-2xl border border-border bg-section-alt px-5 py-4 sm:px-6 sm:py-5">
      <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
        {GEO_COPY.authorWrittenPrefix}{' '}
        <strong className="font-semibold text-primary">{GEO_BYLINES.authorName}</strong>
        {', '}
        {GEO_BYLINES.authorRole}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">
        {GEO_COPY.authorLastUpdatedPrefix}{' '}
        <time dateTime={updatedIso}>{updatedLabel}</time>
        {GEO_BYLINES.factCheckerName ? (
          <>
            {' | '}
            {GEO_COPY.authorFactCheckedPrefix} {GEO_BYLINES.factCheckerName}
          </>
        ) : null}
      </p>
      <p className="mt-2 text-xs text-text-muted">
        <Link
          href={GEO_BYLINES.aboutPath}
          className="font-medium text-accent transition-colors hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          About AvioSupportDesk
        </Link>
      </p>
    </div>
  )
}
