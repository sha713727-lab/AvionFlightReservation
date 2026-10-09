'use client'

import { useEffect, useState } from 'react'

/** True while `ref` intersects the viewport. Used to pause offscreen motion. */
export function useInViewport(ref, { rootMargin = '0px' } = {}) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      { rootMargin, threshold: 0.01 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [ref, rootMargin])

  return inView
}

/** True while this tab is visible. Pauses loops in background tabs. */
export function useTabVisible() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const sync = () => {
      setVisible(document.visibilityState === 'visible')
    }
    sync()
    document.addEventListener('visibilitychange', sync)
    return () => document.removeEventListener('visibilitychange', sync)
  }, [])

  return visible
}
