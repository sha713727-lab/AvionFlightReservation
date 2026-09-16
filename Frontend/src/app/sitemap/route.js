import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export const dynamic = 'force-static'
export const revalidate = 86400

const SITEMAP_PATH = join(process.cwd(), 'public', 'sitemap.xml')

/** Extensionless sitemap URL for crawlers that fail on *.xml paths. */
export function GET() {
  const body = readFileSync(SITEMAP_PATH, 'utf8')

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  })
}
