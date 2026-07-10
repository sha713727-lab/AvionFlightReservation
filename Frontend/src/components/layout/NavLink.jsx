import { cn } from '@/utils/cn'

export default function NavLink({
  href,
  children,
  onClick,
  onDark = false,
  className,
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        'nav-link text-sm font-medium',
        onDark
          ? 'nav-link-on-dark text-white hover:text-white'
          : 'text-text-secondary hover:text-primary',
        className,
      )}
    >
      {children}
    </a>
  )
}
