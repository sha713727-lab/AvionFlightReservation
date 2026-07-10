import { useState, useEffect } from 'react'

export function useScrollDirection(threshold = 10) {
  const [direction, setDirection] = useState('up')
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let lastY = window.scrollY

    const onScroll = () => {
      const currentY = window.scrollY
      setScrollY(currentY)

      if (Math.abs(currentY - lastY) < threshold) return

      setDirection(currentY > lastY ? 'down' : 'up')
      lastY = currentY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return { direction, scrollY, isScrolled: scrollY > 50 }
}
