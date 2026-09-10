import Link from 'next/link'

/**
 * Renders copy with {{token}} placeholders replaced by keyword-rich links.
 * linkMap: { token: { href, label } }
 */
export default function LinkedCopy({ text, linkMap = {}, className }) {
  if (!text) {
    return null
  }

  const parts = String(text).split(/(\{\{[^}]+\}\})/g)

  return (
    <span className={className}>
      {parts.map((part, index) => {
        const match = part.match(/^\{\{([^}]+)\}\}$/)
        if (!match) {
          return <span key={`t-${index}`}>{part}</span>
        }

        const token = match[1]
        const link = linkMap[token]
        if (!link) {
          return <span key={`t-${index}`}>{token}</span>
        }

        return (
          <Link
            key={`l-${index}`}
            href={link.href}
            className="font-medium text-accent underline-offset-2 transition-colors hover:text-accent-hover hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {link.label}
          </Link>
        )
      })}
    </span>
  )
}
