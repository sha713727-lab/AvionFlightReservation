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
  /** Official Avion Rewards self-service (competitor for self-book, not peer agency). */
  officialProgram: {
    name: 'Avion Rewards',
    travelUrl: 'https://www.avionrewards.com/travel/',
    termsUrl: 'https://www.avionrewards.com/terms-and-conditions/index.html',
    /** Labeled official support — never present as AvioSupportDesk. */
    travelPhoneDisplay: '1-877-636-2870',
    travelPhoneHref: 'tel:+18776362870',
  },
  /**
   * Chart observation rechecked from the official travel page.
   * Half-rate promotions on that page are time-limited — do not treat as permanent.
   */
  avionChartObservation: {
    reviewedAtIso: '2026-09-21',
    reviewedAtLabel: '21 September 2026',
    eliteFixedLevels: [15000, 35000, 45000, 55000, 65000, 100000],
    illustrativeCapsCad: [350, 750, 900, 1100, 1300, 2000],
    note:
      'Fixed chart pricing is described for Avion Elite members on qualifying itineraries. Premium and Select products use separate points-to-CAD rates on the official travel page. Recheck before publishing any level as current.',
  },
}

export function getVerifiedSameAs() {
  return Array.isArray(BUSINESS_FACTS.sameAs)
    ? BUSINESS_FACTS.sameAs.filter((url) => typeof url === 'string' && url.startsWith('https://'))
    : []
}

export function getPublicSupportHours() {
  return BUSINESS_FACTS.supportHours
}
