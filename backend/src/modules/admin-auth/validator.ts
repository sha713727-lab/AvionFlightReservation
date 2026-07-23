import { z } from 'zod'
import { ADMIN_PIN_PATTERN } from './pin-store.js'

export const adminLoginBodySchema = z.object({
  email: z.string().trim().email().max(160),
  password: z.string().min(8).max(128),
})

export const adminPinVerifyBodySchema = z.object({
  challengeId: z.string().trim().uuid(),
  pin: z.string().trim().regex(ADMIN_PIN_PATTERN, 'Enter the 8-digit admin PIN'),
})

export const adminPinChangeBodySchema = z.object({
  currentPin: z.string().trim().regex(ADMIN_PIN_PATTERN, 'Enter your current 8-digit PIN'),
  newPin: z.string().trim().regex(ADMIN_PIN_PATTERN, 'New PIN must be exactly 8 digits'),
  confirmPin: z.string().trim().regex(ADMIN_PIN_PATTERN, 'Confirm PIN must be exactly 8 digits'),
}).refine((value) => value.newPin === value.confirmPin, {
  message: 'New PIN and confirmation do not match',
  path: ['confirmPin'],
}).refine((value) => value.newPin !== value.currentPin, {
  message: 'New PIN must be different from the current PIN',
  path: ['newPin'],
})

export type AdminLoginBody = z.infer<typeof adminLoginBodySchema>
export type AdminPinVerifyBody = z.infer<typeof adminPinVerifyBodySchema>
export type AdminPinChangeBody = z.infer<typeof adminPinChangeBodySchema>
