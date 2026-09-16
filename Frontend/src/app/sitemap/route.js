import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

/** Compatibility redirect to canonical /sitemap.xml */
export function GET() {
  return NextResponse.redirect(new URL('/sitemap.xml', 'https://aviosupportdesk.com'), 301)
}
