/**
 * Single source for owner-supplied business facts.
 * Leave fields null/empty until verified — never invent legal entities, fees,
 * hours, reviews, or social profiles for public pages (audit §14).
 */
export const BUSINESS_FACTS = {
  tradingName: 'AvioSupportDesk',
  /** Contracting legal entity — fill after owner confirmation. */
  legalOperatorName: null,
  legalJurisdiction: null,
  /**
   * mailing | staffed_office
   * Public copy treats the address as correspondence until changed.
   */
  addressType: 'mailing',
  /**
   * Quote-only until the owner supplies a fixed price or honest range.
   * Do not publish invented “from” amounts.
   */
  feeModel: 'custom_quote',
  feeCurrency: 'CAD',
  feeAmount: null,
  feeUnit: null,
  feeTaxNote: null,
  merchantStatementName: null,
  /**
   * Public hours string. Keep non-promising until staffed hours are verified.
   */
  supportHours:
    'Phone assistance by appointment and during staffed hours (timezone confirmed on your quote)',
  supportTimezone: null,
  /** Verified own social profile URLs only — empty until confirmed. */
  sameAs: [],
  /** Publish reviews only with verified customer permission. */
  publishReviews: false,
  /** We are not a loyalty-program operator; no third-party program URLs published here. */
  officialProgram: null,
  /**
   * Illustrative fixed-chart levels for educational guides — recheck program terms before publishing.
   */
  loyaltyChartObservation: {
    reviewedAtIso: '2026-09-21',
    reviewedAtLabel: '21 September 2026',
    eliteFixedLevels: [15000, 35000, 45000, 55000, 65000, 100000],
    illustrativeCapsCad: [350, 750, 900, 1100, 1300, 2000],
    note:
      'Fixed chart pricing applies only when membership, route, and fare conditions match published program rules. Separate earn rates may apply by card tier. Recheck official terms before relying on any level.',
  },
}

/** Restates the published disclosures so search and answer engines never merge us with operators. */
export const ORGANIZATION_DISAMBIGUATING_DESCRIPTION =
  'Independent paid travel assistance service. Not an airline, bank, hotel chain, or third-party loyalty-program operator, and not affiliated with any of them.'

export function getVerifiedSameAs() {
  return Array.isArray(BUSINESS_FACTS.sameAs)
    ? BUSINESS_FACTS.sameAs.filter((url) => typeof url === 'string' && url.startsWith('https://'))
    : []
}

export function getPublicSupportHours() {
  return BUSINESS_FACTS.supportHours
}
