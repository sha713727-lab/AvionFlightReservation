import type { Env } from '../../config/env.js'
import type { AppLogger } from '../../lib/logger.js'
import { ERROR_CODES } from '../../constants/error-codes.js'
import { API_MESSAGES } from '../../constants/messages.js'
import { buildAdminOtpEmail, isMailConfigured, sendMail } from '../../lib/mailer.js'
import {
  serviceUnavailableError,
  tooManyRequestsError,
  unauthorizedError,
} from '../../lib/errors.js'
import { createHmac, timingSafeEqual } from 'node:crypto'
import {
  OTP_MAX_ATTEMPTS,
  OTP_RESEND_COOLDOWN_MS,
  OtpChallengeStore,
  createOtpChallenge,
  generateOtpCode,
  maskEmail,
  verifyOtpCode,
} from './otp-store.js'
import type { AdminLoginBody, AdminOtpResendBody, AdminOtpVerifyBody } from './validator.js'
import type {
  AdminLoginResult,
  AdminOtpChallengeResult,
  AdminSessionPayload,
} from './types.js'

const SESSION_TTL_SECONDS = 60 * 60 * 8

function toBuffer(value: string): Buffer {
  return Buffer.from(value, 'utf8')
}

function safeEqualString(left: string, right: string): boolean {
  const leftBuffer = toBuffer(left)
  const rightBuffer = toBuffer(right)
  if (leftBuffer.length !== rightBuffer.length) {
    return false
  }
  return timingSafeEqual(leftBuffer, rightBuffer)
}

function encodePart(value: string): string {
  return Buffer.from(value, 'utf8').toString('base64url')
}

function decodePart(value: string): string {
  return Buffer.from(value, 'base64url').toString('utf8')
}

function signPayload(payload: AdminSessionPayload, secret: string): string {
  const body = encodePart(JSON.stringify(payload))
  const signature = createHmac('sha256', secret).update(body).digest('base64url')
  return `${body}.${signature}`
}

function requireSessionSecret(env: Env): string {
  if (!env.ADMIN_SESSION_SECRET) {
    throw serviceUnavailableError(
      API_MESSAGES.ADMIN_AUTH_NOT_CONFIGURED,
      ERROR_CODES.AUTH_NOT_CONFIGURED,
    )
  }
  return env.ADMIN_SESSION_SECRET
}

function toChallengeResult(challenge: {
  id: string
  destinationEmail: string
  expiresAt: number
  lastSentAt: number
}): AdminOtpChallengeResult {
  return {
    challengeId: challenge.id,
    expiresAt: new Date(challenge.expiresAt).toISOString(),
    destinationHint: maskEmail(challenge.destinationEmail),
    resendAvailableAt: new Date(challenge.lastSentAt + OTP_RESEND_COOLDOWN_MS).toISOString(),
  }
}

export class AdminAuthService {
  private readonly otpStore = new OtpChallengeStore()

  constructor(
    private readonly env: Env,
    private readonly logger: AppLogger,
  ) {}

  private requireAdminCredentials(): { email: string; password: string; secret: string } {
    const adminEmail = this.env.ADMIN_EMAIL
    const adminPassword = this.env.ADMIN_PASSWORD
    const sessionSecret = requireSessionSecret(this.env)

    if (!adminEmail || !adminPassword) {
      throw serviceUnavailableError(
        API_MESSAGES.ADMIN_AUTH_NOT_CONFIGURED,
        ERROR_CODES.AUTH_NOT_CONFIGURED,
      )
    }

    return {
      email: adminEmail.trim().toLowerCase(),
      password: adminPassword,
      secret: sessionSecret,
    }
  }

  private issueSession(adminEmail: string, secret: string): AdminLoginResult {
    const expiresAtMs = Date.now() + SESSION_TTL_SECONDS * 1000
    const payload: AdminSessionPayload = {
      sub: 'admin',
      email: adminEmail,
      exp: Math.floor(expiresAtMs / 1000),
    }

    return {
      token: signPayload(payload, secret),
      expiresAt: new Date(expiresAtMs).toISOString(),
      admin: {
        email: payload.email,
      },
    }
  }

  private async deliverOtp(destinationEmail: string, code: string): Promise<void> {
    if (!isMailConfigured(this.env) && this.env.NODE_ENV === 'production') {
      throw serviceUnavailableError(
        API_MESSAGES.ADMIN_MAIL_NOT_CONFIGURED,
        ERROR_CODES.AUTH_NOT_CONFIGURED,
      )
    }

    const email = buildAdminOtpEmail(code)
    try {
      await sendMail(this.env, this.logger, {
        to: destinationEmail,
        ...email,
      })
    } catch (error) {
      this.logger.error({ err: error }, 'Failed to send admin OTP email')
      throw serviceUnavailableError(
        API_MESSAGES.ADMIN_MAIL_FAILED,
        ERROR_CODES.AUTH_MAIL_FAILED,
      )
    }
  }

  async beginLogin(input: AdminLoginBody): Promise<AdminOtpChallengeResult> {
    const credentials = this.requireAdminCredentials()
    const emailMatches = safeEqualString(
      input.email.trim().toLowerCase(),
      credentials.email,
    )
    const passwordMatches = safeEqualString(input.password, credentials.password)

    if (!emailMatches || !passwordMatches) {
      throw unauthorizedError(API_MESSAGES.ADMIN_AUTH_INVALID, ERROR_CODES.AUTH_INVALID)
    }

    const destinationEmail = this.env.ADMIN_OTP_EMAIL.trim().toLowerCase()
    const code = generateOtpCode()
    const challenge = createOtpChallenge({
      adminEmail: credentials.email,
      destinationEmail,
      code,
      secret: credentials.secret,
    })

    await this.deliverOtp(destinationEmail, code)
    this.otpStore.set(challenge)
    return toChallengeResult(challenge)
  }

  async verifyOtp(input: AdminOtpVerifyBody): Promise<AdminLoginResult> {
    const credentials = this.requireAdminCredentials()
    const challenge = this.otpStore.get(input.challengeId)

    if (!challenge || challenge.consumed) {
      throw unauthorizedError(API_MESSAGES.ADMIN_OTP_EXPIRED, ERROR_CODES.AUTH_OTP_EXPIRED)
    }

    if (challenge.expiresAt <= Date.now()) {
      this.otpStore.delete(challenge.id)
      throw unauthorizedError(API_MESSAGES.ADMIN_OTP_EXPIRED, ERROR_CODES.AUTH_OTP_EXPIRED)
    }

    if (challenge.attempts >= OTP_MAX_ATTEMPTS) {
      this.otpStore.delete(challenge.id)
      throw tooManyRequestsError(API_MESSAGES.ADMIN_OTP_LOCKED, ERROR_CODES.AUTH_OTP_LOCKED)
    }

    const matched = verifyOtpCode(challenge, input.code, credentials.secret)
    if (!matched) {
      challenge.attempts += 1
      if (challenge.attempts >= OTP_MAX_ATTEMPTS) {
        this.otpStore.delete(challenge.id)
        throw tooManyRequestsError(API_MESSAGES.ADMIN_OTP_LOCKED, ERROR_CODES.AUTH_OTP_LOCKED)
      }
      this.otpStore.set(challenge)
      throw unauthorizedError(API_MESSAGES.ADMIN_OTP_INVALID, ERROR_CODES.AUTH_OTP_INVALID)
    }

    this.otpStore.delete(challenge.id)
    return this.issueSession(challenge.adminEmail, credentials.secret)
  }

  async resendOtp(input: AdminOtpResendBody): Promise<AdminOtpChallengeResult> {
    const credentials = this.requireAdminCredentials()
    const challenge = this.otpStore.get(input.challengeId)

    if (!challenge || challenge.consumed) {
      throw unauthorizedError(API_MESSAGES.ADMIN_OTP_EXPIRED, ERROR_CODES.AUTH_OTP_EXPIRED)
    }

    if (challenge.expiresAt <= Date.now()) {
      this.otpStore.delete(challenge.id)
      throw unauthorizedError(API_MESSAGES.ADMIN_OTP_EXPIRED, ERROR_CODES.AUTH_OTP_EXPIRED)
    }

    const now = Date.now()
    const cooldownEndsAt = challenge.lastSentAt + OTP_RESEND_COOLDOWN_MS
    if (now < cooldownEndsAt) {
      throw tooManyRequestsError(API_MESSAGES.ADMIN_OTP_COOLDOWN, ERROR_CODES.AUTH_OTP_LOCKED)
    }

    const code = generateOtpCode()
    await this.deliverOtp(challenge.destinationEmail, code)
    const updated = this.otpStore.replaceCode(
      challenge.id,
      code,
      credentials.secret,
      now,
    )

    if (!updated) {
      throw unauthorizedError(API_MESSAGES.ADMIN_OTP_EXPIRED, ERROR_CODES.AUTH_OTP_EXPIRED)
    }

    return toChallengeResult(updated)
  }

  verifySession(token: string): AdminSessionPayload {
    const sessionSecret = requireSessionSecret(this.env)
    const segments = token.split('.')

    if (segments.length !== 2 || !segments[0] || !segments[1]) {
      throw unauthorizedError(API_MESSAGES.ADMIN_AUTH_REQUIRED, ERROR_CODES.AUTH_INVALID)
    }

    const [body, signature] = segments
    const expected = createHmac('sha256', sessionSecret).update(body).digest('base64url')

    if (!safeEqualString(signature, expected)) {
      throw unauthorizedError(API_MESSAGES.ADMIN_AUTH_REQUIRED, ERROR_CODES.AUTH_INVALID)
    }

    let parsed: unknown
    try {
      parsed = JSON.parse(decodePart(body))
    } catch {
      throw unauthorizedError(API_MESSAGES.ADMIN_AUTH_REQUIRED, ERROR_CODES.AUTH_INVALID)
    }

    if (
      !parsed ||
      typeof parsed !== 'object' ||
      !('sub' in parsed) ||
      !('email' in parsed) ||
      !('exp' in parsed) ||
      parsed.sub !== 'admin' ||
      typeof parsed.email !== 'string' ||
      typeof parsed.exp !== 'number'
    ) {
      throw unauthorizedError(API_MESSAGES.ADMIN_AUTH_REQUIRED, ERROR_CODES.AUTH_INVALID)
    }

    if (parsed.exp * 1000 <= Date.now()) {
      throw unauthorizedError(API_MESSAGES.ADMIN_AUTH_EXPIRED, ERROR_CODES.AUTH_EXPIRED)
    }

    return {
      sub: 'admin',
      email: parsed.email,
      exp: parsed.exp,
    }
  }
}
