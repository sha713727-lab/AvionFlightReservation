import {
  ORGANIZATION_ID,
  buildFaqPageJsonLd,
  buildPathMetadata,
  buildWebPageId,
  buildWebPageJsonLd,
} from '@/utils/seo'
import { buildBreadcrumbJsonLd } from '@/constants/breadcrumbs'
import { buildCanonicalUrl } from '@/constants/contact'
import { getSeoPageMeta } from '@/constants/seoPageMeta'
import { BLOG_AUTHOR } from '@/modules/blog/constants/blogCopy'
import {
  BLOG_HUB,
  BLOG_POSTS,
  getBlogPostBySlug,
} from '@/modules/blog/constants/blogPosts'

function buildArticleJsonLd(post, seo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${buildCanonicalUrl(post.path)}#article`,
    headline: post.title,
    description: seo.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@id': ORGANIZATION_ID,
      name: BLOG_AUTHOR.name,
      url: buildCanonicalUrl(BLOG_AUTHOR.path),
    },
    publisher: { '@id': ORGANIZATION_ID },
    mainEntityOfPage: { '@id': buildWebPageId(post.path) },
    wordCount: post.wordCount,
    url: buildCanonicalUrl(post.path),
  }
}

export function getBlogHubMetadata() {
  return buildPathMetadata(BLOG_HUB.path)
}

export function getBlogHubJsonLd() {
  const seo = getSeoPageMeta(BLOG_HUB.path)
  return [
    buildWebPageJsonLd({
      name: BLOG_HUB.h1,
      description: seo.description,
      path: BLOG_HUB.path,
    }),
    buildBreadcrumbJsonLd(BLOG_HUB.path),
  ]
}

export function getBlogPostMetadata(slug) {
  const post = getBlogPostBySlug(slug)
  if (!post) {
    return {}
  }
  return buildPathMetadata(post.path)
}

export function getBlogPostJsonLd(slug) {
  const post = getBlogPostBySlug(slug)
  if (!post) {
    return []
  }

  const seo = getSeoPageMeta(post.path)
  const schemas = [
    buildArticleJsonLd(post, seo),
    buildWebPageJsonLd({
      name: post.h1,
      description: seo.description,
      path: post.path,
    }),
    buildBreadcrumbJsonLd(post.path),
  ]

  if (post.faqs?.length) {
    schemas.push(buildFaqPageJsonLd(post.faqs))
  }

  return schemas
}

export { BLOG_POSTS, getBlogPostBySlug }
