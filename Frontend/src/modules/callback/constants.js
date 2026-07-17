export const CALLBACK_SCROLL_RATIO = 0.5
export const CALLBACK_PROMPT_DURATION_MS = 8000
export const CALLBACK_SESSION_KEY = 'avion-callback-modal-done'

export const CALLBACK_FIELD_NAMES = {
  name: 'name',
  phone: 'phone',
  preferredAt: 'preferredAt',
}

export const CALLBACK_VALIDATION_MESSAGES = {
  nameRequired: 'Enter your full name.',
  nameTooLong: 'Name must be 80 characters or fewer.',
  phoneRequired: 'Enter a valid phone number.',
  phoneTooLong: 'Phone number is too long.',
  phoneInvalid: 'Enter a valid phone number.',
  datetimeRequired: 'Choose a preferred date and time.',
  datetimeFuture: 'Choose a future date and time.',
}
