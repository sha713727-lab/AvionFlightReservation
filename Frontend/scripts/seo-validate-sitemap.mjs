import fs from 'node:fs'
import path from 'node:path'

const CANONICAL_ORIGIN = 'https://aviosupportdesk.com'
const SITEMAP_URL = `${CANONICAL_ORIGIN}/sitemap.xml`
const SITEMAP_NAMESPACE = 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'
const XML_DECLARATION = '<?xml version="1.0" encoding="UTF-8"?>'
const UTF8_BOM = Buffer.from([0xef, 0xbb, 0xbf])
const CARRIAGE_RETURN = 0x0d
const LASTMOD_RE = /^\d{4}-\d{2}-\d{2}$/
const LOC_RE = /<loc>([^<]+)<\/loc>/g
const LASTMOD_TAG_RE = /<lastmod>([^<]+)<\/lastmod>/g
const SITE_URL_RE = /https:\/\/aviosupportdesk\.com[^\s)>\]]*/g
const REQUIRED_DISALLOWS = ['/api/', '/admin/', '/private/']
// Utility pages must stay crawlable so their noindex instruction can be read.
const MUST_NOT_DISALLOW = ['/thank-you', '/_next/', '/fonts/', '/images/']
const NGINX_STATIC_COPIES = ['sitemap.xml', 'sitemap_index.xml', 'robots.txt']

function toLoc(urlPath) {
  return urlPath === '/' ? `${CANONICAL_ORIGIN}/` : `${CANONICAL_ORIGIN}${urlPath}`
}

function localTodayIso() {
  const now = new Date()
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10)
}

function matchAllValues(source, re) {
  return [...source.matchAll(re)].map(([, value]) => value)
}

function readCrawlFile(filePath, label, fail) {
  if (!fs.existsSync(filePath)) {
    fail(`Missing ${label}`)
  }
  const bytes = fs.readFileSync(filePath)
  if (bytes.subarray(0, UTF8_BOM.length).equals(UTF8_BOM)) {
    fail(`${label} must not start with a UTF-8 BOM`)
  }
  if (bytes.includes(CARRIAGE_RETURN)) {
    fail(`${label} must use LF line endings (CR found)`)
  }
  return bytes.toString('utf8')
}

function validateRobots(source, fail) {
  if (!source.includes('User-agent: *')) {
    fail('public/robots.txt must include User-agent: *')
  }
  if (!source.includes('Allow: /')) {
    fail('public/robots.txt must include Allow: /')
  }
  for (const pathRule of REQUIRED_DISALLOWS) {
    if (!source.includes(`Disallow: ${pathRule}`)) {
      fail(`public/robots.txt must disallow ${pathRule}`)
    }
  }
  for (const pathRule of MUST_NOT_DISALLOW) {
    if (new RegExp(`Disallow:\\s*${pathRule}`, 'i').test(source)) {
      fail(`public/robots.txt must not block ${pathRule}`)
    }
  }
  if (/(^|\n)Disallow: \/\s*(\n|$)/.test(source)) {
    fail('robots must not block all public pages with Disallow: /')
  }
  if (!source.includes(`Sitemap: ${SITEMAP_URL}`)) {
    fail(`public/robots.txt must use absolute Sitemap URL ${SITEMAP_URL}`)
  }
  if (/Sitemap:\s*https:\/\/aviosupportdesk\.com\/sitemap\s*$/m.test(source)) {
    fail('public/robots.txt must not list extensionless /sitemap as Sitemap')
  }
}

function validateSitemapUrls(source, sitePaths, fail) {
  const locs = matchAllValues(source, LOC_RE)
  const duplicates = locs.filter((loc, index) => locs.indexOf(loc) !== index)
  if (duplicates.length > 0) {
    fail(`public/sitemap.xml lists duplicate URLs: ${[...new Set(duplicates)].join(', ')}`)
  }

  const offHost = locs.filter((loc) => !loc.startsWith(`${CANONICAL_ORIGIN}/`))
  if (offHost.length > 0) {
    fail(`public/sitemap.xml URLs must be absolute ${CANONICAL_ORIGIN} URLs: ${offHost.join(', ')}`)
  }

  const expected = sitePaths.map(toLoc)
  const missing = expected.filter((loc) => !locs.includes(loc))
  if (missing.length > 0) {
    fail(`public/sitemap.xml missing SITE_PATHS URLs: ${missing.join(', ')}`)
  }
  const extra = locs.filter((loc) => !expected.includes(loc))
  if (extra.length > 0) {
    fail(`public/sitemap.xml lists URLs outside SITE_PATHS: ${extra.join(', ')}`)
  }
}

function validateSitemapLastmods(source, fail) {
  const today = localTodayIso()
  for (const value of matchAllValues(source, LASTMOD_TAG_RE)) {
    if (!LASTMOD_RE.test(value) || Number.isNaN(Date.parse(value))) {
      fail(`public/sitemap.xml has an invalid lastmod (expected YYYY-MM-DD): ${value}`)
    }
    if (value > today) {
      fail(`public/sitemap.xml has a lastmod in the future: ${value}`)
    }
  }
}

function validateSitemap(source, sitePaths, fail) {
  if (!source.startsWith(XML_DECLARATION)) {
    fail('public/sitemap.xml must start with the XML declaration')
  }
  if (!source.includes('<urlset') || !source.includes(SITEMAP_NAMESPACE)) {
    fail('public/sitemap.xml must be a urlset in the sitemap 0.9 namespace')
  }
  if (/<changefreq>|<priority>/.test(source)) {
    fail('public/sitemap.xml must not include changefreq or priority')
  }
  validateSitemapUrls(source, sitePaths, fail)
  validateSitemapLastmods(source, fail)
}

function validateSitemapIndex(source, fail) {
  if (!source.startsWith(XML_DECLARATION)) {
    fail('public/sitemap_index.xml must start with the XML declaration')
  }
  if (!source.includes('<sitemapindex') || !source.includes(SITEMAP_NAMESPACE)) {
    fail('public/sitemap_index.xml must be a sitemapindex in the sitemap 0.9 namespace')
  }
  const locs = matchAllValues(source, LOC_RE)
  if (locs.length !== 1 || locs[0] !== SITEMAP_URL) {
    fail(`public/sitemap_index.xml must reference only ${SITEMAP_URL}`)
  }
}

function validateNginxStaticCopies(publicDir, staticDir, fail) {
  for (const name of NGINX_STATIC_COPIES) {
    const staticPath = path.join(staticDir, name)
    if (!fs.existsSync(staticPath)) {
      fail(`Missing deploy/nginx/static/${name}; run npm run sitemap:generate`)
    }
    const publicBytes = fs.readFileSync(path.join(publicDir, name))
    if (!publicBytes.equals(fs.readFileSync(staticPath))) {
      fail(`deploy/nginx/static/${name} differs from public/${name}; run npm run sitemap:generate`)
    }
  }
}

function validateLlmsTxt(source, sitePaths, fail) {
  if (!source.startsWith('# ')) {
    fail('public/llms.txt must start with a "# " title line')
  }
  const allowed = new Set(sitePaths.map(toLoc))
  const urls = source.match(SITE_URL_RE) || []
  if (urls.length === 0) {
    fail('public/llms.txt must link the site pages it describes')
  }
  const unknown = urls.filter((url) => !allowed.has(url))
  if (unknown.length > 0) {
    fail(`public/llms.txt links URLs outside SITE_PATHS: ${[...new Set(unknown)].join(', ')}`)
  }
}

/** Files Google and answer engines fetch directly: robots, sitemaps, nginx copies, llms.txt. */
export function validateCrawlFiles({ frontendRoot, sitePaths, fail }) {
  const publicDir = path.join(frontendRoot, 'public')
  const staticDir = path.resolve(frontendRoot, '..', 'deploy', 'nginx', 'static')
  const read = (name) => readCrawlFile(path.join(publicDir, name), `public/${name}`, fail)

  validateRobots(read('robots.txt'), fail)
  validateSitemap(read('sitemap.xml'), sitePaths, fail)
  validateSitemapIndex(read('sitemap_index.xml'), fail)
  validateNginxStaticCopies(publicDir, staticDir, fail)
  validateLlmsTxt(read('llms.txt'), sitePaths, fail)
}
