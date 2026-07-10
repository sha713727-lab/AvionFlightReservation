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

  return {
    ...parsed.data,
    corsOrigins: parseCorsOrigins(parsed.data.CORS_ORIGINS),
  }
}
