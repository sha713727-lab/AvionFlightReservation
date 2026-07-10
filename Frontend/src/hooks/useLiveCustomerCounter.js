import { useEffect, useRef, useState } from 'react'
import {
  getHappyCustomersCount,
  getMsUntilNextHappyCustomersStep,
  HAPPY_CUSTOMERS_BASE,
  HAPPY_CUSTOMERS_INTERVAL_MS,
} from '@/constants/liveStats'

export function useLiveCustomerCounter(duration = 2000) {
  const [count, setCount] = useState(HAPPY_CUSTOMERS_BASE)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef(null)
  const animatedRef = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!hasStarted || animatedRef.current) return undefined

    animatedRef.current = true
    const target = getHappyCustomersCount()
    let startTime = null
    let frame

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setCount(Math.floor(eased * target))

      if (progress < 1) {
        frame = requestAnimationFrame(animate)
        return
      }

      setCount(getHappyCustomersCount())
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [duration, hasStarted])

  useEffect(() => {
    if (!hasStarted) return undefined

    let timeoutId
    let intervalId

    const syncCount = () => {
      setCount(getHappyCustomersCount())
    }

    timeoutId = setTimeout(() => {
      syncCount()
      intervalId = setInterval(syncCount, HAPPY_CUSTOMERS_INTERVAL_MS)
    }, getMsUntilNextHappyCustomersStep())

    return () => {
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [hasStarted])

  return { count, ref }
}
