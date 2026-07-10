import { cn } from '@/utils/cn'

export default function Container({ children, className, as: Tag = 'div', id }) {
  return (
    <Tag id={id} className={cn('mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8', className)}>
      {children}
    </Tag>
  )
}
