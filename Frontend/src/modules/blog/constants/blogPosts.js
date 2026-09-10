import { BLOG_PATH } from '@/constants/routes'
import { countWordsFromBlocks, estimateReadMinutes, buildToc } from '@/modules/blog/constants/blogHelpers'
import { BLOG_SOURCES_BY_SLUG } from '@/modules/blog/constants/blogSources'
import { POST_CANCEL_FLIGHT_REFUND } from '@/modules/blog/constants/posts/cancelFlightRefund'
import { POST_AIRLINE_CONTACTS } from '@/modules/blog/constants/posts/airlineContacts'
import { POST_DELAY_COMPENSATION } from '@/modules/blog/constants/posts/delayCompensation'
import { POST_CHANGE_FLIGHT } from '@/modules/blog/constants/posts/changeFlight'
import { POST_SAVE_MONEY } from '@/modules/blog/constants/posts/saveMoneyFlights'

const EXCERPT_MAX = 150

function truncateExcerpt(text) {
  const clean = String(text || '').trim()
  if (clean.length <= EXCERPT_MAX) {
    return clean
  }
  return `${clean.slice(0, EXCERPT_MAX - 1).trimEnd()}…`
}

function enrichPost(post) {
  const wordCount = countWordsFromBlocks(post.blocks)
  const toc = buildToc(post.blocks)
  return {
    ...post,
    excerpt: truncateExcerpt(post.excerpt),
    wordCount,
    readTimeMinutes: estimateReadMinutes(wordCount),
    toc,
    showToc: wordCount >= 1000 && toc.length > 0,
    sources: BLOG_SOURCES_BY_SLUG[post.slug] || [],
  }
}
const RAW_POSTS = [
  POST_CANCEL_FLIGHT_REFUND,
  POST_AIRLINE_CONTACTS,
  POST_DELAY_COMPENSATION,
  POST_CHANGE_FLIGHT,
  POST_SAVE_MONEY,
]

/** Newest first by publishedAt. */
export const BLOG_POSTS = RAW_POSTS.map(enrichPost).sort((a, b) =>
  a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : 0,
)

export const BLOG_HUB = {
  path: BLOG_PATH,
  h1: 'AvioSupportDesk Blog — Travel Tips & Airline Guides',
}

export function getBlogPostBySlug(slug) {
  return BLOG_POSTS.find((post) => post.slug === slug)
}

export function getLatestBlogPosts(limit = 3) {
  return BLOG_POSTS.slice(0, limit)
}

export function getRelatedBlogPosts(post) {
  if (!post?.relatedSlugs?.length) {
    return []
  }
  return post.relatedSlugs.map((slug) => getBlogPostBySlug(slug)).filter(Boolean)
}
