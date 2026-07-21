import { createHash } from 'node:crypto'
import type { Redis } from 'ioredis'
import type { AppLogger } from './logger.js'

export type CatalogCacheStore = 'memory' | 'redis'

export type CatalogCacheStats = {
  store: CatalogCacheStore
  hits: number
  misses: number
}

type MemoryEntry = {
  value: string
  expiresAt: number
}

const KEY_PREFIX = 'avion-catalog:'

export class CatalogCache {
  private readonly memory = new Map<string, MemoryEntry>()
  private hits = 0
  private misses = 0

  constructor(
    private readonly ttlSeconds: number,
    private readonly logger: AppLogger,
    private readonly redis?: Redis,
    private readonly enabled = true,
  ) {}

  get store(): CatalogCacheStore {
    return this.redis ? 'redis' : 'memory'
  }

  getStats(): CatalogCacheStats {
    return {
      store: this.store,
      hits: this.hits,
      misses: this.misses,
    }
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.enabled || this.ttlSeconds <= 0) {
      this.misses += 1
      return null
    }

    const namespaced = `${KEY_PREFIX}${key}`

    try {
      if (this.redis) {
        const raw = await this.redis.get(namespaced)
        if (!raw) {
          this.misses += 1
          return null
        }
        this.hits += 1
        return JSON.parse(raw) as T
      }

      const entry = this.memory.get(namespaced)
      if (!entry || entry.expiresAt <= Date.now()) {
        if (entry) this.memory.delete(namespaced)
        this.misses += 1
        return null
      }

      this.hits += 1
      return JSON.parse(entry.value) as T
    } catch (error) {
      this.logger.warn({ err: error, key }, 'Catalog cache get failed')
      this.misses += 1
      return null
    }
  }

  async set<T>(key: string, value: T): Promise<void> {
    if (!this.enabled || this.ttlSeconds <= 0) {
      return
    }

    const namespaced = `${KEY_PREFIX}${key}`
    const serialized = JSON.stringify(value)

    try {
      if (this.redis) {
        await this.redis.set(namespaced, serialized, 'EX', this.ttlSeconds)
        return
      }

      this.memory.set(namespaced, {
        value: serialized,
        expiresAt: Date.now() + this.ttlSeconds * 1000,
      })
    } catch (error) {
      this.logger.warn({ err: error, key }, 'Catalog cache set failed')
    }
  }

  async invalidatePrefix(prefix: string): Promise<void> {
    const namespacedPrefix = `${KEY_PREFIX}${prefix}`

    try {
      if (this.redis) {
        let cursor = '0'
        do {
          const [nextCursor, keys] = await this.redis.scan(
            cursor,
            'MATCH',
            `${namespacedPrefix}*`,
            'COUNT',
            100,
          )
          cursor = nextCursor
          if (keys.length > 0) {
            await this.redis.del(...keys)
          }
        } while (cursor !== '0')
        return
      }

      for (const key of this.memory.keys()) {
        if (key.startsWith(namespacedPrefix)) {
          this.memory.delete(key)
        }
      }
    } catch (error) {
      this.logger.warn({ err: error, prefix }, 'Catalog cache invalidate failed')
    }
  }
}

export function createEtag(body: string): string {
  return `"${createHash('sha1').update(body).digest('hex')}"`
}

export function payloadToString(payload: unknown): string | null {
  if (typeof payload === 'string') {
    return payload
  }

  if (Buffer.isBuffer(payload)) {
    return payload.toString('utf8')
  }

  return null
}
