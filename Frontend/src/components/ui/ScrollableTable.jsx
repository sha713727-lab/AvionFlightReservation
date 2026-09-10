import { cn } from '@/utils/cn'

/**
 * Wraps wide tabular content so it scrolls horizontally on small screens
 * without causing page-level overflow.
 */
export default function ScrollableTable({ children, className, caption }) {
  return (
    <div className={cn('table-scroll', className)} role="region" aria-label={caption}>
      {children}
    </div>
  )
}
