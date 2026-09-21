'use client'

import { useEffect, useRef, useState } from 'react'
import { FadeIn } from '@/components/animations/FadeIn'
import { cn } from '@/utils/cn'

function TimelineStep({ item }) {
  return (
    <li className="group relative flex flex-col items-center text-center">
      <FadeIn className="flex w-full flex-col items-center">
        <div
          className={cn(
            'relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-full',
            'border-2 border-border bg-card text-sm font-semibold text-accent',
            'transition-colors duration-200',
            'group-hover:border-accent group-hover:bg-accent group-hover:text-white',
          )}
          aria-label={`Step ${item.step}`}
        >
          <span>{item.step}</span>
        </div>

        <div>
          <h3 className="mb-2 text-base font-semibold transition-colors duration-200 group-hover:text-accent-hover">
            {item.title}
          </h3>
          <p className="text-sm leading-relaxed text-text-secondary transition-colors duration-200 group-hover:text-text">
            {item.description}
          </p>
        </div>
      </FadeIn>
    </li>
  )
}

export default function Timeline({ steps }) {
  const ref = useRef(null)
  const [lineVisible, setLineVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setLineVisible(true)
        observer.disconnect()
      },
      { threshold: 0.15, rootMargin: '-80px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="relative">
      <div
        className="absolute top-7 left-[10%] right-[10%] hidden h-0.5 overflow-hidden rounded-full bg-border lg:block"
        aria-hidden
      >
        <div
          className={cn(
            'h-full origin-left rounded-full bg-accent transition-transform duration-500 ease-out',
            'motion-reduce:scale-x-100',
            lineVisible ? 'scale-x-100' : 'scale-x-0',
          )}
        />
      </div>

      <ol className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
        {steps.map((item) => (
          <TimelineStep key={item.step} item={item} />
        ))}
      </ol>
    </div>
  )
}
