import type { Env } from '../../config/env.js'
import type { DatabaseClient } from '../../database/prisma.js'
import type { AppLogger } from '../../lib/logger.js'
import { ERROR_CODES } from '../../constants/error-codes.js'
import { API_MESSAGES } from '../../constants/messages.js'
import {
  serviceUnavailableError,
  tooManyRequestsError,
  unauthorizedError,
  validationError,
} from '../../lib/errors.js'
import { createHmac, timingSafeEqual } from 'node:crypto'
import { AdminPinRepository } from './pin-repository.js'
import {
  PIN_MAX_ATTEMPTS,
  PinChallengeStore,
  createPinLoginChallenge,
  hashAdminPin,
  isValidAdminPin,
  verifyAdminPin,
} from './pin-store.js'
import type {
  AdminLoginBody,
  AdminPinChangeBody,
  AdminPinVerifyBody,
} from './validator.js'
import type {
  AdminLoginResult,
  AdminPinChallengeResult,
  AdminPinChangeResult,
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

export class AdminAuthService {
  private readonly challengeStore = new PinChallengeStore()
  private readonly pinRepository: AdminPinRepository

  constructor(
    private readonly env: Env,
    private readonly logger: AppLogger,
    db: DatabaseClient,
  ) {
    this.pinRepository = new AdminPinRepository(db)
  }

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

  private async assertPinConfigured(): Promise<void> {
    const stored = await this.pinRepository.getPinHash()
    if (stored) return

    const bootstrapPin = this.env.ADMIN_PIN
    if (!bootstrapPin || !isValidAdminPin(bootstrapPin)) {
      throw serviceUnavailableError(
        API_MESSAGES.ADMIN_PIN_NOT_CONFIGURED,
        ERROR_CODES.AUTH_NOT_CONFIGURED,
      )
    }
  }

  private async matchPin(pin: string): Promise<boolean> {
    const stored = await this.pinRepository.getPinHash()
    if (stored) {
      return verifyAdminPin(pin, stored)
    }

    const bootstrapPin = this.env.ADMIN_PIN
    if (!bootstrapPin || !isValidAdminPin(bootstrapPin)) {
      throw serviceUnavailableError(
        API_MESSAGES.ADMIN_PIN_NOT_CONFIGURED,
        ERROR_CODES.AUTH_NOT_CONFIGURED,
      )
    }

    return safeEqualString(pin, bootstrapPin)
  }

  async beginLogin(input: AdminLoginBody): Promise<AdminPinChallengeResult> {
    const credentials = this.requireAdminCredentials()
    await this.assertPinConfigured()

    const emailMatches = safeEqualString(
      input.email.trim().toLowerCase(),
      credentials.email,
    )
    const passwordMatches = safeEqualString(input.password, credentials.password)

    if (!emailMatches || !passwordMatches) {
      throw unauthorizedError(API_MESSAGES.ADMIN_AUTH_INVALID, ERROR_CODES.AUTH_INVALID)
    }

    const challenge = createPinLoginChallenge(credentials.email)
    this.challengeStore.set(challenge)

    return {
      challengeId: challenge.id,
      expiresAt: new Date(challenge.expiresAt).toISOString(),
    }
  }

  async verifyPin(input: AdminPinVerifyBody): Promise<AdminLoginResult> {
    const credentials = this.requireAdminCredentials()
    const challenge = this.challengeStore.get(input.challengeId)

    if (!challenge) {
      throw unauthorizedError(API_MESSAGES.ADMIN_PIN_EXPIRED, ERROR_CODES.AUTH_PIN_EXPIRED)
    }

    if (challenge.expiresAt <= Date.now()) {
      this.challengeStore.delete(challenge.id)
      throw unauthorizedError(API_MESSAGES.ADMIN_PIN_EXPIRED, ERROR_CODES.AUTH_PIN_EXPIRED)
    }

    if (challenge.attempts >= PIN_MAX_ATTEMPTS) {
      this.challengeStore.delete(challenge.id)
      throw tooManyRequestsError(API_MESSAGES.ADMIN_PIN_LOCKED, ERROR_CODES.AUTH_PIN_LOCKED)
    }

    const matched = await this.matchPin(input.pin)
    if (!matched) {
      challenge.attempts += 1
      if (challenge.attempts >= PIN_MAX_ATTEMPTS) {
        this.challengeStore.delete(challenge.id)
        throw tooManyRequestsError(API_MESSAGES.ADMIN_PIN_LOCKED, ERROR_CODES.AUTH_PIN_LOCKED)
      }
      this.challengeStore.set(challenge)
      throw unauthorizedError(API_MESSAGES.ADMIN_PIN_INVALID, ERROR_CODES.AUTH_PIN_INVALID)
    }

    // Persist bootstrap env PIN into DB on first successful login so later changes stick.
    const existingHash = await this.pinRepository.getPinHash()
    if (!existingHash) {
      await this.pinRepository.setPinHash(hashAdminPin(input.pin))
      this.logger.info('Admin PIN seeded from ADMIN_PIN into database')
    }

    this.challengeStore.delete(challenge.id)
    return this.issueSession(challenge.adminEmail, credentials.secret)
  }

  async changePin(input: AdminPinChangeBody): Promise<AdminPinChangeResult> {
    this.requireAdminCredentials()

    const currentMatches = await this.matchPin(input.currentPin)
    if (!currentMatches) {
      throw unauthorizedError(API_MESSAGES.ADMIN_PIN_INVALID, ERROR_CODES.AUTH_PIN_INVALID)
    }

    if (input.newPin !== input.confirmPin) {
      throw validationError(API_MESSAGES.VALIDATION_FAILED, [
        { field: 'confirmPin', message: 'New PIN and confirmation do not match', code: 'custom' },
      ])
    }

    await this.pinRepository.setPinHash(hashAdminPin(input.newPin))
    this.logger.info('Admin PIN updated')
    return { updated: true }
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
