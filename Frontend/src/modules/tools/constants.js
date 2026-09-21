export const CALCULATOR_FIELD_NAMES = {
  cashAlternativeTotal: 'cashAlternativeTotal',
  redemptionCashTotal: 'redemptionCashTotal',
  cashAssistanceFee: 'cashAssistanceFee',
  redemptionAssistanceFee: 'redemptionAssistanceFee',
  pointsUsed: 'pointsUsed',
}

export const CALCULATOR_LABELS = {
  cashAlternativeTotal: 'Cash alternative total (CAD)',
  redemptionCashTotal: 'Cash with points redemption (CAD)',
  cashAssistanceFee: 'Assistance fee if booking cash (CAD)',
  redemptionAssistanceFee: 'Assistance fee if booking with points (CAD)',
  pointsUsed: 'Points used',
  grossHeading: 'Gross value',
  netHeading: 'Net value (after assistance difference)',
  grossCpp: 'Gross cents per point',
  netCpp: 'Net cents per point',
  grossCashAvoided: 'Gross cash avoided',
  netCashAvoided: 'Net cash avoided',
  assistanceIncrement: 'Assistance fee difference (redemption minus cash)',
  submit: 'Calculate value',
  reset: 'Reset',
}

export const CALCULATOR_HINTS = {
  cashAlternativeTotal:
    'Full cost of the equivalent cash itinerary, excluding your independently entered assistance fee.',
  redemptionCashTotal:
    'Taxes, surcharges, and program fees payable in cash with the redemption, excluding assistance.',
  assistanceFees:
    'Leave blank if unknown; net value appears only when both assistance fields are filled (use 0 if none).',
  pointsUsed: 'Enter the exact points required for the redemption quote.',
}

export const CALCULATOR_ERRORS = {
  pointsRequired: 'Enter a positive number of points.',
  pointsFinite: 'Points must be a valid number.',
  cashAlternativeRequired: 'Enter the cash alternative total (0 or greater).',
  redemptionCashRequired: 'Enter redemption-side cash (0 or greater).',
  negativeCost: 'Amounts cannot be negative.',
  nonFinite: 'Enter valid numbers for all filled fields.',
  assistanceNonNegative: 'Assistance fees cannot be negative when provided.',
}

export const CALCULATOR_MESSAGES = {
  negativeNet:
    'Net cash avoided is negative—the redemption costs more cash than the alternative once assistance is included.',
  negativeGross:
    'Redemption-side cash exceeds the cash alternative; points are not saving cash on this comparison.',
  netPending: 'Enter both assistance fees (use 0 if none) to see net cents per point.',
  notCashOut: 'This is not a cash-out or sell value for points—only a comparison for equivalent trips.',
}

export const CALCULATOR_EXAMPLE = {
  title: 'Illustrative example (not a live offer)',
  body:
    'CAD 800 cash alternative, CAD 150 redemption cash, CAD 50 higher assistance on the points booking, 35,000 points → gross about 1.86 cpp; net about 1.71 cpp after the CAD 50 assistance increment.',
}

export const CALCULATOR_PAGE_COPY = {
  eyebrow: 'Decision tool',
  intro:
    'Compare equivalent cash and points quotes in CAD before you call for optional independent assistance. Enter your own numbers—results are arithmetic, not Avion Rewards offers or cash-out values.',
}
