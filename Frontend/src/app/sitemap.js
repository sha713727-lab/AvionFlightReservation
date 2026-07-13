import { SITE_URL } from '@/constants/contact'
import {
  SITE_PATHS,
  SITEMAP_CHANGE_FREQ,
  SITEMAP_PRIORITY,
} from '@/constants/routes'

function pathMeta(path) {
  if (path === '/') {
    return {
      changeFrequency: SITEMAP_CHANGE_FREQ.home,
      priority: SITEMAP_PRIORITY.home,
    }
  }

  if (path === '/services' || path === '/destinations') {
    return {
      changeFrequency: SITEMAP_CHANGE_FREQ.primary,
      priority: SITEMAP_PRIORITY.primary,
    }
  }

  if (path === '/about' || path === '/contact') {
    return {
      changeFrequency: SITEMAP_CHANGE_FREQ.secondary,
      priority: SITEMAP_PRIORITY.secondary,
    }
  }

  return {
    changeFrequency: SITEMAP_CHANGE_FREQ.legal,
    priority: SITEMAP_PRIORITY.legal,
  }
}

export default function sitemap() {
  const lastModified = new Date()

  return SITE_PATHS.map((path) => {
    const meta = pathMeta(path)
    return {
      url: path === '/' ? SITE_URL : `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: meta.changeFrequency,
      priority: meta.priority,
    }
  })
}
