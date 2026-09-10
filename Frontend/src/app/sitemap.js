import {
  HOME_PATH,
  SITE_PATHS,
  SITEMAP_BLOG_PATHS,
  SITEMAP_CHANGE_FREQ,
  SITEMAP_GUIDE_PATHS,
  SITEMAP_LEGAL_PATHS,
  SITEMAP_PRIORITY,
  SITEMAP_SERVICE_PATHS,
  SITEMAP_STATIC_PATHS,
} from '@/constants/routes'

/** Absolute production origin required for sitemap <loc> values. */
const SITEMAP_ORIGIN = 'https://aviosupportdesk.com'

/** Fixed lastmod for this sitemap revision (YYYY-MM-DD). */
const SITEMAP_LASTMOD = '2026-09-10'

const SERVICE_PATHS = new Set(SITEMAP_SERVICE_PATHS)
const GUIDE_PATHS = new Set(SITEMAP_GUIDE_PATHS)
const BLOG_PATHS = new Set(SITEMAP_BLOG_PATHS)
const STATIC_PATHS = new Set(SITEMAP_STATIC_PATHS)
const LEGAL_PATHS = new Set(SITEMAP_LEGAL_PATHS)

function pathMeta(path) {
  if (path === HOME_PATH) {
    return {
      changeFrequency: SITEMAP_CHANGE_FREQ.home,
      priority: SITEMAP_PRIORITY.home,
    }
  }

  if (SERVICE_PATHS.has(path)) {
    return {
      changeFrequency: SITEMAP_CHANGE_FREQ.service,
      priority: SITEMAP_PRIORITY.service,
    }
  }

  if (GUIDE_PATHS.has(path) || BLOG_PATHS.has(path)) {
    return {
      changeFrequency: SITEMAP_CHANGE_FREQ.blog,
      priority: SITEMAP_PRIORITY.blog,
    }
  }

  if (STATIC_PATHS.has(path)) {
    return {
      changeFrequency: SITEMAP_CHANGE_FREQ.static,
      priority: SITEMAP_PRIORITY.static,
    }
  }

  if (LEGAL_PATHS.has(path)) {
    return {
      changeFrequency: SITEMAP_CHANGE_FREQ.legal,
      priority: SITEMAP_PRIORITY.legal,
    }
  }

  return {
    changeFrequency: SITEMAP_CHANGE_FREQ.static,
    priority: SITEMAP_PRIORITY.static,
  }
}

/**
 * Native Next.js App Router sitemap — served at /sitemap.xml.
 * Includes every public SITE_PATHS entry; excludes admin, API, and private routes.
 */
export default function sitemap() {
  return SITE_PATHS.map((path) => {
    const meta = pathMeta(path)
    return {
      url: path === HOME_PATH ? SITEMAP_ORIGIN : `${SITEMAP_ORIGIN}${path}`,
      lastModified: SITEMAP_LASTMOD,
      changeFrequency: meta.changeFrequency,
      priority: meta.priority,
    }
  })
}
