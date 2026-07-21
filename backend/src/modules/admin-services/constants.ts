export const SERVICE_ICON_KEYS = [
  'plane',
  'hotel',
  'gift',
  'exchange',
  'ban',
  'chair',
  'suitcase',
  'route',
  'beach',
] as const

export const SERVICE_IMAGE_KEYS = [
  'flight-booking',
  'hotel-booking',
  'reward-travel',
  'flight-change',
  'cancellation',
  'seat-selection',
  'baggage',
  'trip-planning',
  'vacation-package',
] as const

export type ServiceIconKey = (typeof SERVICE_ICON_KEYS)[number]
export type ServiceImageKey = (typeof SERVICE_IMAGE_KEYS)[number]
