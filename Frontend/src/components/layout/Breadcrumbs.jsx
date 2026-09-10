import Link from 'next/link'

/**
 * Accessible breadcrumb nav with schema.org BreadcrumbList microdata.
 * Last item is the current page and is not linked.
 */
export default function Breadcrumbs({ items }) {
  if (!items?.length) {
    return null
  }

  return (
    <nav aria-label="Breadcrumb" className="breadcrumb">
      <ol itemScope itemType="https://schema.org/BreadcrumbList" className="breadcrumb-list">
        {items.map((item, index) => {
          const position = index + 1
          const isLast = index === items.length - 1

          return (
            <li
              key={`${item.href}-${position}`}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="breadcrumb-item"
            >
              {isLast ? (
                <span itemProp="name" className="breadcrumb-current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link itemProp="item" href={item.href} className="breadcrumb-link">
                  <span itemProp="name">{item.label}</span>
                </Link>
              )}
              <meta itemProp="position" content={String(position)} />
              {!isLast ? (
                <span className="breadcrumb-separator" aria-hidden>
                  /
                </span>
              ) : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
