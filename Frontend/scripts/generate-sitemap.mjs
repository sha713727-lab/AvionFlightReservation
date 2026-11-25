/**
 * Single source of truth for production sitemap XML.
 * Writes Frontend/public + deploy/nginx/static (nginx serves prod).
 * lastmod is content-owned only — never the build clock.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  ABOUT_PATH,
  BLOG_PATH,
  BLUE_REWARDS_PATH,
  CANCELLATION_POLICY_PATH,
  CONTACT_PATH,
  COOKIE_POLICY_PATH,
  GUIDES_PATH,
  HILTON_HOTELS_PATH,
  HOME_PATH,
  HOW_IT_WORKS_PATH,
  INDEPENDENT_SERVICE_DISCLOSURE_PATH,
  PRIVACY_POLICY_PATH,
  REFUND_POLICY_PATH,
  SERVICE_FEES_PATH,
  SITE_PATHS,
  SITEMAP_SERVICE_PATHS,
  SITEMAP_STATIC_PATHS,
  TERMS_PATH,
  TOOL_AVION_POINTS_CALCULATOR_PATH,
  WYNDHAM_HOTELS_PATH,
} from '../src/constants/routes.js'
import { LEGAL_COPY } from '../src/constants/legalCopy.js'
import { GEO_BYLINES } from '../src/constants/geo.js'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const frontendRoot = path.resolve(scriptDir, '..')
const repoRoot = path.resolve(frontendRoot, '..')
const CANONICAL_ORIGIN = 'https://aviosupportdesk.com'
const SITEMAP_NS = 'http://www.sitemaps.org/schemas/sitemap/0.9'

const OUT_PATHS = [
  path.join(frontendRoot, 'public', 'sitemap.xml'),
  path.join(repoRoot, 'deploy', 'nginx', 'static', 'sitemap.xml'),
]

const INDEX_OUT_PATHS = [
  path.join(frontendRoot, 'public', 'sitemap_index.xml'),
  path.join(repoRoot, 'deploy', 'nginx', 'static', 'sitemap_index.xml'),
]

const ROBOTS_SRC = path.join(frontendRoot, 'public', 'robots.txt')
const ROBOTS_OUT = path.join(repoRoot, 'deploy', 'nginx', 'static', 'robots.txt')

function fail(message) {
  process.stderr.write(`generate-sitemap: ${message}\n`)
  process.exit(1)
}

function pathToPageFile(urlPath) {
  if (urlPath === '/') {
    return path.join(frontendRoot, 'src', 'app', 'page.jsx')
  }
  return path.join(frontendRoot, 'src', 'app', ...urlPath.split('/').filter(Boolean), 'page.jsx')
}

function assertRoutesExist(paths) {
  for (const urlPath of paths) {
    const pageFile = pathToPageFile(urlPath)
    if (!fs.existsSync(pageFile)) {
      fail(`SITE_PATHS entry missing page: ${urlPath} (${pageFile})`)
    }
  }
}

function loadBlogLastmods() {
  const postsDir = path.join(frontendRoot, 'src', 'modules', 'blog', 'constants', 'posts')
  const lastmodByPath = new Map()
  if (!fs.existsSync(postsDir)) {
    return lastmodByPath
  }

  for (const name of fs.readdirSync(postsDir)) {
    if (!name.endsWith('.js')) continue
    const source = fs.readFileSync(path.join(postsDir, name), 'utf8')
    const slugMatch = source.match(/slug:\s*'([^']+)'/)
    const updatedMatch = source.match(/updatedAt:\s*'(\d{4}-\d{2}-\d{2})'/)
    if (!slugMatch || !updatedMatch) continue
    lastmodByPath.set(`/blog/${slugMatch[1]}`, updatedMatch[1])
  }
  return lastmodByPath
}

/** lastmod comes from dates published on the page itself, not the build clock. */
function loadStaticLastmods() {
  const editorial = GEO_BYLINES.lastUpdatedIso
  const entries = new Map([
    [PRIVACY_POLICY_PATH, LEGAL_COPY.privacy.lastUpdatedIso],
    [TERMS_PATH, LEGAL_COPY.terms.lastUpdatedIso],
    [REFUND_POLICY_PATH, LEGAL_COPY.refund.lastUpdatedIso],
    [CANCELLATION_POLICY_PATH, LEGAL_COPY.cancellation.lastUpdatedIso],
    [COOKIE_POLICY_PATH, LEGAL_COPY.cookies.lastUpdatedIso],
    [HOME_PATH, editorial],
    [BLOG_PATH, editorial],
    [GUIDES_PATH, editorial],
    [TOOL_AVION_POINTS_CALCULATOR_PATH, editorial],
    [WYNDHAM_HOTELS_PATH, editorial],
    [HILTON_HOTELS_PATH, editorial],
    [BLUE_REWARDS_PATH, editorial],
    [ABOUT_PATH, editorial],
    [CONTACT_PATH, editorial],
    [SERVICE_FEES_PATH, editorial],
    [HOW_IT_WORKS_PATH, editorial],
    [INDEPENDENT_SERVICE_DISCLOSURE_PATH, editorial],
  ])

  for (const urlPath of SITEMAP_SERVICE_PATHS) {
    entries.set(urlPath, editorial)
  }
  for (const urlPath of SITEMAP_STATIC_PATHS) {
    entries.set(urlPath, editorial)
  }
  for (const urlPath of SITE_PATHS) {
    if (urlPath.startsWith('/guides/')) {
      entries.set(urlPath, GEO_BYLINES.lastUpdatedIso)
    }
  }

  return entries
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function buildUrlset(paths, lastmodByPath) {
  const entries = paths.map((urlPath) => {
    const loc = urlPath === '/' ? `${CANONICAL_ORIGIN}/` : `${CANONICAL_ORIGIN}${urlPath}`
    const lastmod = lastmodByPath.get(urlPath)
    const lines = ['  <url>', `    <loc>${escapeXml(loc)}</loc>`]
    if (lastmod) {
      lines.push(`    <lastmod>${lastmod}</lastmod>`)
    }
    lines.push('  </url>')
    return lines.join('\n')
  })

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<urlset xmlns="${SITEMAP_NS}">`,
    ...entries,
    '</urlset>',
    '',
  ].join('\n')
}

function buildSitemapIndex() {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<sitemapindex xmlns="${SITEMAP_NS}">`,
    '  <sitemap>',
    `    <loc>${CANONICAL_ORIGIN}/sitemap.xml</loc>`,
    '  </sitemap>',
    '</sitemapindex>',
    '',
  ].join('\n')
}

function writeUtf8NoBom(filePath, contents) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, contents, { encoding: 'utf8' })
}

assertRoutesExist(SITE_PATHS)
const blogLastmods = loadBlogLastmods()
const lastmodByPath = new Map([...loadStaticLastmods(), ...blogLastmods])

if (blogLastmods.size > 0) {
  const newestBlog = [...blogLastmods.values()].sort().at(-1)
  if (newestBlog) {
    lastmodByPath.set(BLOG_PATH, newestBlog)
  }
}

const missingLastmod = SITE_PATHS.filter((p) => !lastmodByPath.has(p))
if (missingLastmod.length > 0) {
  fail(`Missing content-owned lastmod for: ${missingLastmod.join(', ')}`)
}

const urlset = buildUrlset(SITE_PATHS, lastmodByPath)
const indexXml = buildSitemapIndex()

for (const out of OUT_PATHS) {
  writeUtf8NoBom(out, urlset)
}
for (const out of INDEX_OUT_PATHS) {
  writeUtf8NoBom(out, indexXml)
}

if (!fs.existsSync(ROBOTS_SRC)) {
  fail(`Missing robots.txt at ${ROBOTS_SRC}`)
}
fs.copyFileSync(ROBOTS_SRC, ROBOTS_OUT)

process.stdout.write(
  `generate-sitemap: OK (${SITE_PATHS.length} urls, ${lastmodByPath.size} lastmod, robots synced)\n`,
)
