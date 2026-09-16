export interface ContactSettingsDto {
  reservationEmail: string
  supportPhones: string[]
  callbacksEnabled: boolean
  updatedAt: string
}

export interface ContactSettingsWriteInput {
  reservationEmail: string
  supportPhones: string[]
  /** When omitted, the existing SiteSettings value is preserved. */
  callbacksEnabled?: boolean
}
