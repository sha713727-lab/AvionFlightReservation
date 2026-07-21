import { z } from 'zod'

export const adminLoginBodySchema = z.object({
  email: z.string().trim().email().max(160),
  password: z.string().min(8).max(128),
})

export const adminOtpVerifyBodySchema = z.object({
  challengeId: z.string().trim().uuid(),
  code: z
    .string()
    .trim()
    .regex(/^\d{6}$/, 'Enter the 6-digit verification code'),
})

export const adminOtpResendBodySchema = z.object({
  challengeId: z.string().trim().uuid(),
})

export type AdminLoginBody = z.infer<typeof adminLoginBodySchema>
export type AdminOtpVerifyBody = z.infer<typeof adminOtpVerifyBodySchema>
export type AdminOtpResendBody = z.infer<typeof adminOtpResendBodySchema>
