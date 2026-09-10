import {
  buildFaqPageJsonLd,
  buildPathMetadata,
  buildWebPageJsonLd,
} from '@/utils/seo'
import { BRAND_FULL_NAME } from '@/constants/brand'
import { buildBreadcrumbJsonLd } from '@/constants/breadcrumbs'
import { SITE_URL, buildCanonicalUrl } from '@/constants/contact'
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
    headline: post.title,
    description: seo.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Organization',
      name: BLOG_AUTHOR.name,
      url: buildCanonicalUrl(BLOG_AUTHOR.path),
    },
    publisher: {
      '@type': 'Organization',
      name: BRAND_FULL_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': buildCanonicalUrl(post.path),
    },
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
      speakable: true,
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
      speakable: true,
    }),
    buildBreadcrumbJsonLd(post.path),
  ]

  if (post.faqs?.length) {
    schemas.push(buildFaqPageJsonLd(post.faqs))
  }

  return schemas
}

export { BLOG_POSTS, getBlogPostBySlug }
