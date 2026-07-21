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

export const adminOtpChallengeSchema = z.object({
  challengeId: z.string().uuid(),
  expiresAt: z
    .string()
    .min(1)
    .refine((value) => !Number.isNaN(Date.parse(value)), 'Invalid challenge expiry'),
  destinationHint: z.string().min(3),
  resendAvailableAt: z
    .string()
    .min(1)
    .refine((value) => !Number.isNaN(Date.parse(value)), 'Invalid resend time'),
})

export const adminOtpVerifySchema = z.object({
  challengeId: z.string().uuid(),
  code: z
    .string()
    .trim()
    .regex(/^\d{6}$/, ADMIN_VALIDATION_MESSAGES.otpRequired),
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
