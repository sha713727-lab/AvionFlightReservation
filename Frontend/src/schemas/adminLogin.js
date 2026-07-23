import { z } from 'zod'
import { ADMIN_VALIDATION_MESSAGES } from '@/modules/admin/constants'

export const adminLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .email(ADMIN_VALIDATION_MESSAGES.emailRequired)
    .max(160, ADMIN_VALIDATION_MESSAGES.emailTooLong),
  password: z
    .string()
    .min(8, ADMIN_VALIDATION_MESSAGES.passwordRequired)
    .max(128, ADMIN_VALIDATION_MESSAGES.passwordTooLong),
})

export const adminPinChallengeSchema = z.object({
  challengeId: z.string().uuid(),
  expiresAt: z
    .string()
    .min(1)
    .refine((value) => !Number.isNaN(Date.parse(value)), 'Invalid challenge expiry'),
})

export const adminPinVerifySchema = z.object({
  challengeId: z.string().uuid(),
  pin: z
    .string()
    .trim()
    .regex(/^\d{8}$/, ADMIN_VALIDATION_MESSAGES.pinRequired),
})

export const adminPinChangeSchema = z
  .object({
    currentPin: z
      .string()
      .trim()
      .regex(/^\d{8}$/, ADMIN_VALIDATION_MESSAGES.pinRequired),
    newPin: z
      .string()
      .trim()
      .regex(/^\d{8}$/, ADMIN_VALIDATION_MESSAGES.pinRequired),
    confirmPin: z
      .string()
      .trim()
      .regex(/^\d{8}$/, ADMIN_VALIDATION_MESSAGES.pinRequired),
  })
  .refine((value) => value.newPin === value.confirmPin, {
    message: ADMIN_VALIDATION_MESSAGES.pinMismatch,
    path: ['confirmPin'],
  })
  .refine((value) => value.newPin !== value.currentPin, {
    message: ADMIN_VALIDATION_MESSAGES.pinUnchanged,
    path: ['newPin'],
  })

export const adminPinChangeResultSchema = z.object({
  updated: z.literal(true),
})

export const adminLoginResultSchema = z.object({
  token: z.string().min(1),
  expiresAt: z
    .string()
    .min(1)
    .refine((value) => !Number.isNaN(Date.parse(value)), 'Invalid session expiry'),
  admin: z.object({
    email: z.string().email(),
  }),
})
