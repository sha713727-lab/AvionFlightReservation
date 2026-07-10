import { useState, useEffect, useRef } from 'react'

export function useCounter(end, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(!startOnView)
  const ref = useRef(null)

  useEffect(() => {
    if (!startOnView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [startOnView])

  useEffect(() => {
    if (!hasStarted) return

    let startTime = null
    let frame

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))

      if (progress < 1) frame = requestAnimationFrame(animate)
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [end, duration, hasStarted])

  return { count, ref }
}
