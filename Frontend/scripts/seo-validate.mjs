import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const frontendRoot = path.resolve(scriptDir, '..')
const routesPath = path.join(frontendRoot, 'src/constants/routes.js')
const seoPath = path.join(frontendRoot, 'src/utils/seo.js')
const robotsTxtPath = path.join(frontendRoot, 'public/robots.txt')
const sitemapPath = path.join(frontendRoot, 'src/app/sitemap.js')
const analyticsPath = path.join(frontendRoot, 'src/constants/analytics.js')
const seoPageMetaPath = path.join(frontendRoot, 'src/constants/seoPageMeta.js')
const contactPath = path.join(frontendRoot, 'src/constants/contact.js')
const appDir = path.join(frontendRoot, 'src/app')

const REQUIRED_SEO_EXPORTS = [
  'SEO_ROBOTS_INDEX',
  'buildPageMetadata',
  'buildPathMetadata',
  'buildTravelAssistanceJsonLd',
  'buildWebPageJsonLd',
  'buildWebSiteJsonLd',
  'buildBreadcrumbJsonLd',
  'buildFaqPageJsonLd',
  'buildServiceJsonLd',
]

const REQUIRED_GTM_EVENTS = [
  'callback_modal_open',
  'callback_request_click',
  'callback_form_start',
  'callback_form_submit',
  'phone_click',
  'email_click',
]

const BANNED_PUBLIC_PATTERNS = [
  { re: /\b9995\b/, label: '9995 customer count' },
  { re: /\b98%\b/, label: '98% success claim' },
  { re: /Happy Customers/i, label: 'Happy Customers claim' },
  { re: /\bAirline Partners\b/i, label: 'Airline Partners claim' },
  { re: /bank-grade/i, label: 'bank-grade claim' },
  { re: /beat every quote/i, label: 'beat every quote claim' },
  { re: /unpublished fares/i, label: 'unpublished fares claim' },
  { re: /Lorem ipsum/i, label: 'lorem ipsum placeholder' },
  { re: /\bTODO\b/, label: 'TODO marker' },
  { re: /\bFIXME\b/, label: 'FIXME marker' },
]

const ADMIN_PREFIX = '/admin'
const SKIP_SCAN_DIRS = new Set(['admin', 'node_modules'])

function fail(message) {
  process.stderr.write(`seo-validate: ${message}\n`)
  process.exit(1)
}

function extractSitePaths(routesSource) {
  const blockMatch = routesSource.match(
    /export const SITE_PATHS = \[([\s\S]*?)\]\s*\n\s*(?:\/\*\*|export const)/,
  )
  if (!blockMatch) {
    fail('Could not parse SITE_PATHS from routes.js')
  }

  const paths = []
  const entryRe = /^\s*([A-Z_]+),\s*$/gm
  const constRe = /export const ([A-Z_]+) = '([^']+)'/g
  const pathByConst = Object.fromEntries(
    [...routesSource.matchAll(constRe)].map(([, name, value]) => [name, value]),
  )

  let match
  while ((match = entryRe.exec(blockMatch[1])) !== null) {
    const constName = match[1]
    const resolved = pathByConst[constName]
    if (!resolved) {
      fail(`SITE_PATHS entry ${constName} has no matching path constant`)
    }
    paths.push(resolved)
  }

  if (paths.length === 0) {
    fail('SITE_PATHS is empty')
  }

  return paths
}

function validateSitePaths(sitePaths) {
  const unique = new Set(sitePaths)
  if (unique.size !== sitePaths.length) {
    const dupes = sitePaths.filter((p, i) => sitePaths.indexOf(p) !== i)
    fail(`Duplicate paths in SITE_PATHS: ${[...new Set(dupes)].join(', ')}`)
  }

  for (const p of sitePaths) {
    if (!p.startsWith('/') || p.includes(' ')) {
      fail(`Invalid path in SITE_PATHS: ${p}`)
    }
    if (p !== p.toLowerCase() && p !== '/') {
      fail(`Non-lowercase path in SITE_PATHS: ${p}`)
    }
    if (p === ADMIN_PREFIX || p.startsWith(`${ADMIN_PREFIX}/`)) {
      fail(`Admin path must not be in SITE_PATHS: ${p}`)
    }
  }

  if (!sitePaths.includes('/')) {
    fail('SITE_PATHS must include home path "/"')
  }
}

function pathToPageFile(urlPath) {
  if (urlPath === '/') {
    return path.join(appDir, 'page.jsx')
  }
  return path.join(appDir, ...urlPath.slice(1).split('/'), 'page.jsx')
}

function validatePagesExist(sitePaths) {
  for (const urlPath of sitePaths) {
    const pageFile = pathToPageFile(urlPath)
    if (!fs.existsSync(pageFile)) {
      fail(`Missing page.jsx for SITE_PATHS entry ${urlPath} (expected ${pageFile})`)
    }
  }
}

function validateSeoExports(seoSource) {
  for (const exportName of REQUIRED_SEO_EXPORTS) {
    const exportRe = new RegExp(`export (?:const|function) ${exportName}\\b`)
    if (!exportRe.test(seoSource)) {
      fail(`Missing export in seo.js: ${exportName}`)
    }
  }
  if (!seoSource.includes("'max-image-preview': 'large'")) {
    fail('SEO_ROBOTS_INDEX must include max-image-preview:large')
  }
  if (seoSource.includes('index: false') && !seoSource.includes('admin')) {
    // admin noindex lives in admin/page-data.js — public seo.js must stay indexable
  }
  if (/\bnoindex\b/i.test(seoSource)) {
    fail('seo.js must not contain noindex for public pages')
  }
}

function validateNoPublicNoindex() {
  const srcRoot = path.join(frontendRoot, 'src')
  const files = collectPublicSourceFiles(srcRoot)
  for (const file of files) {
    const source = fs.readFileSync(file, 'utf8')
    if (/index:\s*false/.test(source)) {
      fail(`Public source must not set robots index:false: ${path.relative(frontendRoot, file)}`)
    }
    if (/content=["'][^"']*noindex/i.test(source) || /robots:\s*["'][^"']*noindex/i.test(source)) {
      fail(`Public source must not set noindex robots meta: ${path.relative(frontendRoot, file)}`)
    }
    if (/X-Robots-Tag/i.test(source)) {
      fail(`Public source must not set X-Robots-Tag: ${path.relative(frontendRoot, file)}`)
    }
  }
}

function validateCanonicalHelpers(contactSource) {
  if (!contactSource.includes("CANONICAL_ORIGIN = 'https://aviosupportdesk.com'")) {
    fail('contact.js must define CANONICAL_ORIGIN as https://aviosupportdesk.com')
  }
  if (!contactSource.includes('export function buildCanonicalUrl')) {
    fail('contact.js must export buildCanonicalUrl')
  }
}

function validateRobotsAndSitemap(robotsTxtSource, sitemapSource) {
  const requiredDisallows = [
    '/api/',
    '/admin/',
    '/private/',
    '/_next/',
    '/checkout/',
    '/thank-you/',
  ]
  if (!robotsTxtSource.includes('User-agent: *')) {
    fail('public/robots.txt must include User-agent: *')
  }
  if (!robotsTxtSource.includes('Allow: /')) {
    fail("public/robots.txt must include Allow: /")
  }
  for (const pathRule of requiredDisallows) {
    if (!robotsTxtSource.includes(`Disallow: ${pathRule}`)) {
      fail(`public/robots.txt must disallow ${pathRule}`)
    }
  }
  if (/(^|\n)Disallow: \/\s*(\n|$)/.test(robotsTxtSource)) {
    fail('robots must not block all public pages with Disallow: /')
  }
  if (!robotsTxtSource.includes('Sitemap: https://aviosupportdesk.com/sitemap.xml')) {
    fail('public/robots.txt must use absolute Sitemap URL https://aviosupportdesk.com/sitemap.xml')
  }
  if (!sitemapSource.includes('SITE_PATHS')) {
    fail('sitemap.js must use SITE_PATHS')
  }
  if (!sitemapSource.includes("https://aviosupportdesk.com")) {
    fail('sitemap.js must use absolute https://aviosupportdesk.com URLs')
  }
  if (!sitemapSource.includes('2026-09-10')) {
    fail('sitemap.js must set lastmod to 2026-09-10')
  }
}

function validateAnalytics(analyticsSource) {
  for (const eventName of REQUIRED_GTM_EVENTS) {
    if (!analyticsSource.includes(`'${eventName}'`)) {
      fail(`Missing GTM event string in analytics.js: ${eventName}`)
    }
  }
  if (!analyticsSource.includes('AW-')) {
    fail('analytics.js must include Google Ads ID')
  }
}

function validateContactNap(contactSource) {
  if (!contactSource.includes("'+1 877 702 9887'")) {
    fail('contact.js phone number missing or changed unexpectedly')
  }
  if (!contactSource.includes('reservation@aviosupportdesk.com')) {
    fail('contact.js reservation email missing')
  }
  if (!contactSource.includes('aviosupportdesk.com')) {
    fail('contact.js SITE_URL domain missing')
  }
}

function collectPublicSourceFiles(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_SCAN_DIRS.has(entry.name)) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      collectPublicSourceFiles(full, files)
      continue
    }
    if (/\.(js|jsx)$/.test(entry.name)) {
      files.push(full)
    }
  }
  return files
}

function validateBannedClaims() {
  const srcRoot = path.join(frontendRoot, 'src')
  const files = collectPublicSourceFiles(srcRoot)
  for (const file of files) {
    const source = fs.readFileSync(file, 'utf8')
    for (const { re, label } of BANNED_PUBLIC_PATTERNS) {
      if (re.test(source)) {
        fail(`Banned production claim "${label}" found in ${path.relative(frontendRoot, file)}`)
      }
    }
  }
}

function validateSeoPageMetaMap(sitePaths) {
  const source = fs.readFileSync(seoPageMetaPath, 'utf8')
  const titles = new Map()
  const descriptions = new Map()

  if (!source.includes('export const SEO_PAGE_META')) {
    fail('seoPageMeta.js must export SEO_PAGE_META')
  }
  if (!source.includes('export function getSeoPageMeta')) {
    fail('seoPageMeta.js must export getSeoPageMeta')
  }

  const blocks = [
    ...source.matchAll(
      /\[([A-Z_]+)\]:\s*\{[\s\S]*?title:\s*'([^']*)'[\s\S]*?description:\s*\n\s*'([^']*)'/g,
    ),
  ]
  if (blocks.length !== sitePaths.length) {
    fail(
      `SEO_PAGE_META has ${blocks.length} entries but SITE_PATHS has ${sitePaths.length}`,
    )
  }

  for (const [, key, title, description] of blocks) {
    if (title.length < 48 || title.length > 64) {
      fail(`SEO title length out of range for ${key}: ${title.length}`)
    }
    if (description.length < 148 || description.length > 162) {
      fail(`SEO description length out of range for ${key}: ${description.length}`)
    }
    if (titles.has(title)) {
      fail(`Duplicate SEO title shared by ${titles.get(title)} and ${key}`)
    }
    if (descriptions.has(description)) {
      fail(
        `Duplicate SEO description shared by ${descriptions.get(description)} and ${key}`,
      )
    }
    titles.set(title, key)
    descriptions.set(description, key)
  }

  const h1Blocks = [...source.matchAll(/h1:\s*'([^']*)'/g)]
  if (h1Blocks.length !== sitePaths.length) {
    fail(`SEO_PAGE_META must define h1 for every path (found ${h1Blocks.length})`)
  }
  const h1s = new Set()
  for (const [, h1] of h1Blocks) {
    if (!h1 || h1.length < 20) {
      fail(`SEO h1 too short or missing: ${h1}`)
    }
    if (h1s.has(h1)) {
      fail(`Duplicate SEO h1: ${h1}`)
    }
    h1s.add(h1)
  }
  if (!source.includes('export function getSeoPageH1')) {
    fail('seoPageMeta.js must export getSeoPageH1')
  }

  const homeTitle = blocks.find(([, key]) => key === 'HOME_PATH')?.[2] || ''
  if (!homeTitle.includes('Avio Support Desk')) {
    fail('Homepage SEO title must include "Avio Support Desk"')
  }
}

function validateMetadataCoverage(sitePaths) {
  const missing = []
  for (const urlPath of sitePaths) {
    if (urlPath === '/') continue
    const pageFile = pathToPageFile(urlPath)
    const source = fs.readFileSync(pageFile, 'utf8')
    if (!/export const metadata\b/.test(source)) {
      missing.push(urlPath)
    }
  }
  if (missing.length > 0) {
    fail(`Missing metadata export on routes: ${missing.join(', ')}`)
  }
}

const routesSource = fs.readFileSync(routesPath, 'utf8')
const seoSource = fs.readFileSync(seoPath, 'utf8')
const robotsTxtSource = fs.readFileSync(robotsTxtPath, 'utf8')
const sitemapSource = fs.readFileSync(sitemapPath, 'utf8')
const analyticsSource = fs.readFileSync(analyticsPath, 'utf8')
const contactSource = fs.readFileSync(contactPath, 'utf8')

const sitePaths = extractSitePaths(routesSource)
validateSitePaths(sitePaths)
validatePagesExist(sitePaths)
validateSeoExports(seoSource)
validateCanonicalHelpers(contactSource)
validateNoPublicNoindex()
validateRobotsAndSitemap(robotsTxtSource, sitemapSource)
validateAnalytics(analyticsSource)
validateContactNap(contactSource)
validateBannedClaims()
validateSeoPageMetaMap(sitePaths)
validateMetadataCoverage(sitePaths)

process.stdout.write(
  `seo-validate: OK (${sitePaths.length} indexable paths, unique SEO meta, metadata coverage, ${REQUIRED_SEO_EXPORTS.length} seo exports, banned-claim scan clean)\n`,
)
process.exit(0)
