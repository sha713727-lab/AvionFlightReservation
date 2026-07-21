import { createHash, randomInt, randomUUID, timingSafeEqual } from 'node:crypto'

export const OTP_TTL_MS = 5 * 60 * 1000
export const OTP_RESEND_COOLDOWN_MS = 60 * 1000
export const OTP_MAX_ATTEMPTS = 5
export const OTP_CODE_LENGTH = 6

export type OtpChallengeRecord = {
  id: string
  codeHash: string
  adminEmail: string
  destinationEmail: string
  expiresAt: number
  attempts: number
  lastSentAt: number
  consumed: boolean
}

function hashOtp(code: string, secret: string): string {
  return createHash('sha256').update(`${code}:${secret}`).digest('hex')
}

export function generateOtpCode(): string {
  const max = 10 ** OTP_CODE_LENGTH
  const min = 10 ** (OTP_CODE_LENGTH - 1)
  return String(randomInt(min, max))
}

export function createOtpChallenge(input: {
  adminEmail: string
  destinationEmail: string
  code: string
  secret: string
  now?: number
}): OtpChallengeRecord {
  const now = input.now ?? Date.now()
  return {
    id: randomUUID(),
    codeHash: hashOtp(input.code, input.secret),
    adminEmail: input.adminEmail,
    destinationEmail: input.destinationEmail,
    expiresAt: now + OTP_TTL_MS,
    attempts: 0,
    lastSentAt: now,
    consumed: false,
  }
}

export function verifyOtpCode(
  challenge: OtpChallengeRecord,
  code: string,
  secret: string,
): boolean {
  const expected = Buffer.from(challenge.codeHash, 'utf8')
  const actual = Buffer.from(hashOtp(code, secret), 'utf8')
  if (expected.length !== actual.length) return false
  return timingSafeEqual(expected, actual)
}

export function maskEmail(email: string): string {
  const [local, domain] = email.split('@')
  if (!local || !domain) return '***'
  const visible = local.slice(0, 1)
  return `${visible}***@${domain}`
}

/**
 * In-memory OTP challenge store with TTL cleanup.
 * Single-process safe; pair with route rate limits.
 */
export class OtpChallengeStore {
  private readonly challenges = new Map<string, OtpChallengeRecord>()

  get(id: string): OtpChallengeRecord | undefined {
    this.purgeExpired()
    return this.challenges.get(id)
  }

  set(challenge: OtpChallengeRecord): void {
    this.purgeExpired()
    this.challenges.set(challenge.id, challenge)
  }

  delete(id: string): void {
    this.challenges.delete(id)
  }

  replaceCode(id: string, code: string, secret: string, now = Date.now()): OtpChallengeRecord | undefined {
    const current = this.get(id)
    if (!current || current.consumed) return undefined
    const next: OtpChallengeRecord = {
      ...current,
      codeHash: hashOtp(code, secret),
      expiresAt: now + OTP_TTL_MS,
      attempts: 0,
      lastSentAt: now,
    }
    this.challenges.set(id, next)
    return next
  }

  private purgeExpired(now = Date.now()): void {
    for (const [id, challenge] of this.challenges) {
      if (challenge.consumed || challenge.expiresAt <= now) {
        this.challenges.delete(id)
      }
    }
  }
}
