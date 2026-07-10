'use client'

import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { SPRING_SNAPPY } from '@/components/animations/motionPresets'
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
  accent: 'bg-accent text-white hover:bg-accent-hover shadow-sm shadow-accent/20 hover:shadow-lg hover:shadow-accent/30',
  navy: 'bg-primary text-white hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/20',
}

const sizes = {
  sm: 'px-5 py-2 text-sm rounded-full',
  md: 'px-6 py-2.5 text-sm rounded-full',
  lg: 'px-7 py-3.5 text-base rounded-full',
}

const motionProps = {
  whileHover: { scale: 1.04, y: -2 },
  whileTap: { scale: 0.97 },
  transition: SPRING_SNAPPY,
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
  ...props
}) {
  const classes = cn(
    'group/btn inline-flex items-center justify-center gap-2.5 font-medium transition-all duration-300 cursor-pointer',
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
          className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover/btn:-translate-x-0.5 group-hover/btn:scale-110"
          aria-hidden
        />
      )}
      {children}
      {Icon && iconPosition === 'right' && (
        <Icon
          className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:scale-110"
          aria-hidden
        />
      )}
    </>
  )

  if (href) {
    const isTelLink = href.startsWith('tel:')
    const isMailLink = href.startsWith('mailto:')

    const handleClick = (event) => {
      if (onClick) {
        onClick(event)
        return
      }

      if (isTelLink) {
        event.preventDefault()
        dialPhone(href)
      }
    }

    if (isTelLink || isMailLink) {
      return (
        <a href={href} className={classes} onClick={handleClick} {...props}>
          {content}
        </a>
      )
    }

    return (
      <motion.a href={href} className={classes} {...motionProps} onClick={onClick} {...props}>
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button type="button" className={classes} {...motionProps} onClick={onClick} {...props}>
      {content}
    </motion.button>
  )
}
