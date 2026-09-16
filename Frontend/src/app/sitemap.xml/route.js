import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export const dynamic = 'force-static'
export const revalidate = 86400

const SITEMAP_PATH = join(process.cwd(), 'public', 'sitemap.xml')

/**
 * Serves the static sitemap with explicit XML headers.
 * Production uses nginx static; this is the Next fallback for local/dev.
 */
export function GET() {
  const body = readFileSync(SITEMAP_PATH, 'utf8')

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
