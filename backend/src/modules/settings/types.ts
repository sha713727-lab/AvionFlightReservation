export interface ContactSettingsDto {
  reservationEmail: string
  supportPhones: string[]
  updatedAt: string
}

export interface ContactSettingsWriteInput {
  reservationEmail: string
  supportPhones: string[]
}
