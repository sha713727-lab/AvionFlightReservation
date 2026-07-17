'use client'

import { cn } from '@/utils/cn'
import { dialPhone } from '@/utils/dialPhone'

const variants = {
  primary:
    'bg-accent text-white hover:bg-accent-hover shadow-sm shadow-accent/20 hover:shadow-lg hover:shadow-accent/30',
  secondary:
    'bg-transparent text-accent border border-accent/30 hover:border-accent hover:bg-accent/5 hover:shadow-md hover:shadow-accent/10',
  outline:
    'bg-transparent text-primary border border-border hover:border-accent hover:text-accent hover:shadow-sm',
  ghost: 'text-text-secondary hover:text-accent hover:bg-accent/5',
  dark: 'bg-primary text-white hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/20',
  accent:
    'bg-accent text-white hover:bg-accent-hover shadow-sm shadow-accent/20 hover:shadow-lg hover:shadow-accent/30',
  navy: 'bg-primary text-white hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/20',
}

const sizes = {
  sm: 'px-5 py-2 text-sm rounded-full',
  md: 'px-6 py-2.5 text-sm rounded-full',
  lg: 'px-7 py-3.5 text-base rounded-full',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  href,
  icon: Icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  ...props
}) {
  const classes = cn(
    'group/btn inline-flex items-center justify-center gap-2.5 font-medium transition-all duration-300 cursor-pointer',
    'hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98]',
    'motion-reduce:transform-none',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variants[variant],
    sizes[size],
    className,
  )

  const content = (
    <>
      {Icon && iconPosition === 'left' && (
        <Icon
          className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover/btn:-translate-x-0.5 group-hover/btn:scale-110"
          aria-hidden
        />
      )}
      {children}
      {Icon && iconPosition === 'right' && (
        <Icon
          className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:scale-110"
          aria-hidden
        />
      )}
    </>
  )

  if (href) {
    const handleClick = (event) => {
      if (onClick) {
        onClick(event)
        return
      }

      if (href.startsWith('tel:')) {
        event.preventDefault()
        dialPhone(href)
      }
    }

    return (
      <a href={href} className={classes} onClick={handleClick} {...props}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...props}>
      {content}
    </button>
  )
}
