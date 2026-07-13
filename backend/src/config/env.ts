import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  HOST: z.string().min(1).default('0.0.0.0'),
  LOG_LEVEL: z
    .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'])
    .default('info'),
  DATABASE_URL: z.string().min(1),
  CORS_ORIGINS: z.string().min(1),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(100),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(900_000),
  HEAVY_RATE_LIMIT_MAX: z.coerce.number().int().positive().default(10),
  HEAVY_RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(60_000),
  DEFAULT_PAGE_SIZE: z.coerce.number().int().positive().default(20),
  MAX_PAGE_SIZE: z.coerce.number().int().positive().default(100),
  ENABLE_COMPRESSION: z
    .enum(['true', 'false'])
    .default('true')
    .transform((value) => value === 'true'),
  ENABLE_SWAGGER: z
    .enum(['true', 'false'])
    .default('true')
    .transform((value) => value === 'true'),
  TRUST_PROXY: z
    .enum(['true', 'false'])
    .default('false')
    .transform((value) => value === 'true'),
  CATALOG_CACHE_MAX_AGE_SECONDS: z.coerce.number().int().nonnegative().default(60),
  ENABLE_CATALOG_CACHE: z
    .enum(['true', 'false'])
    .default('true')
    .transform((value) => value === 'true'),
  REDIS_URL: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value && value.length > 0 ? value : undefined)),
})

export type Env = z.infer<typeof envSchema>

function parseCorsOrigins(raw: string): string[] {
  const origins = raw
    .split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0)

  if (origins.length === 0) {
    throw new Error('CORS_ORIGINS must include at least one origin')
  }

  if (origins.includes('*')) {
    throw new Error('CORS_ORIGINS must not use wildcard *')
  }

  return origins
}

export function loadEnv(raw: NodeJS.ProcessEnv = process.env): Env & { corsOrigins: string[] } {
  const parsed = envSchema.safeParse(raw)

  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join('; ')
    throw new Error(`Invalid environment configuration: ${details}`)
  }

  const data = parsed.data

  if (data.NODE_ENV === 'production' && !data.REDIS_URL) {
    throw new Error(
      'REDIS_URL is required when NODE_ENV=production (shared rate limits + catalog cache)',
    )
  }

  return {
    ...data,
    corsOrigins: parseCorsOrigins(data.CORS_ORIGINS),
  }
}
