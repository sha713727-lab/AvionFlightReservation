/**
 * Single source of truth for production sitemap XML.
 * Writes Frontend/public + deploy/nginx/static (nginx serves prod).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE_PATHS } from '../src/constants/routes.js'

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
const lastmodByPath = loadBlogLastmods()
const urlset = buildUrlset(SITE_PATHS, lastmodByPath)
const indexXml = buildSitemapIndex()

for (const out of OUT_PATHS) {
  writeUtf8NoBom(out, urlset)
}
for (const out of INDEX_OUT_PATHS) {
  writeUtf8NoBom(out, indexXml)
}

process.stdout.write(
  `generate-sitemap: OK (${SITE_PATHS.length} urls, ${lastmodByPath.size} lastmod)\n`,
)
