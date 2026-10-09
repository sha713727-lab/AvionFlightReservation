/**
 * Replaces {{token}} placeholders with the same labels LinkedCopy / PeopleAlsoAsk use.
 * JSON-LD cannot contain markup, so only the visible label is kept.
 */
const TOKEN_RE = /\{\{([^}]+)\}\}/g

export function resolveLinkTokens(text, linkMap = {}) {
  return String(text || '').replace(TOKEN_RE, (_, key) => {
    const link = linkMap[key]
    if (link?.label) {
      return link.label
    }
    return key.replace(/-/g, ' ')
  })
}

export function resolveFaqLinkTokens(faqs, linkMap = {}) {
  if (!faqs?.length) {
    return faqs
  }

  return faqs.map((faq) => ({
    ...faq,
    answer: resolveLinkTokens(faq.answer, linkMap),
    ...(faq.detail ? { detail: resolveLinkTokens(faq.detail, linkMap) } : {}),
  }))
}
