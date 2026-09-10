import Link from 'next/link'

const TOKEN_RE = /(\{\{[^}]+\}\}|\[\[[^\]]+\]\])/g

/**
 * Renders blog copy with {{internal}} tokens and [[url|Label]] external links.
 * External links always use rel="nofollow noopener" and target="_blank".
 */
export default function BlogRichText({ text, linkMap = {}, className }) {
  if (!text) {
    return null
  }

  const parts = String(text).split(TOKEN_RE)

  return (
    <span className={className}>
      {parts.map((part, index) => {
        const internal = part.match(/^\{\{([^}]+)\}\}$/)
        if (internal) {
          const link = linkMap[internal[1]]
          if (!link) {
            return <span key={`t-${index}`}>{internal[1]}</span>
          }
          return (
            <Link
              key={`i-${index}`}
              href={link.href}
              className="font-medium text-accent underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {link.label}
            </Link>
          )
        }

        const external = part.match(/^\[\[([^|\]]+)\|([^\]]+)\]\]$/)
        if (external) {
          return (
            <a
              key={`e-${index}`}
              href={external[1]}
              target="_blank"
              rel="nofollow noopener"
              className="font-medium text-accent underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {external[2]}
            </a>
          )
        }

        return <span key={`p-${index}`}>{part}</span>
      })}
    </span>
  )
}
