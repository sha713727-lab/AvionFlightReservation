import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from 'node:crypto'

export const PIN_CHALLENGE_TTL_MS = 5 * 60 * 1000
export const PIN_MAX_ATTEMPTS = 5
export const ADMIN_PIN_LENGTH = 8
export const ADMIN_PIN_PATTERN = /^\d{8}$/

export type PinLoginChallenge = {
  id: string
  adminEmail: string
  expiresAt: number
  attempts: number
}

export function isValidAdminPin(value: string): boolean {
  return ADMIN_PIN_PATTERN.test(value)
}

export function hashAdminPin(pin: string): string {
  const salt = randomBytes(16).toString('hex')
  const hash = scryptSync(pin, salt, 32).toString('hex')
  return `${salt}:${hash}`
}

export function verifyAdminPin(pin: string, stored: string): boolean {
  const [salt, hash] = stored.split(':')
  if (!salt || !hash) return false

  const expected = Buffer.from(hash, 'hex')
  const actual = scryptSync(pin, salt, 32)
  if (expected.length !== actual.length) return false
  return timingSafeEqual(expected, actual)
}

export function createPinLoginChallenge(adminEmail: string, now = Date.now()): PinLoginChallenge {
  return {
    id: randomUUID(),
    adminEmail,
    expiresAt: now + PIN_CHALLENGE_TTL_MS,
    attempts: 0,
  }
}

/** In-memory password-verified challenges awaiting PIN (TTL + attempt limits). */
export class PinChallengeStore {
  private readonly challenges = new Map<string, PinLoginChallenge>()

  get(id: string): PinLoginChallenge | undefined {
    this.purgeExpired()
    return this.challenges.get(id)
  }

  set(challenge: PinLoginChallenge): void {
    this.purgeExpired()
    this.challenges.set(challenge.id, challenge)
  }

  delete(id: string): void {
    this.challenges.delete(id)
  }

  private purgeExpired(now = Date.now()): void {
    for (const [id, challenge] of this.challenges) {
      if (challenge.expiresAt <= now) {
        this.challenges.delete(id)
      }
    }
  }
}
