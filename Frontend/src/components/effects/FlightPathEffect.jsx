'use client'

const FLIGHT_ROUTE = 'M -12 62 C 16 42 37 38 53 48 C 72 60 88 44 112 34'

export default function FlightPathEffect() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden opacity-55 sm:opacity-60 lg:opacity-70" aria-hidden>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="planeBody" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="52%" stopColor="#dbeafe" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id="planeWing" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>
        <path
          id="flight-route-motion"
          d={FLIGHT_ROUTE}
          fill="none"
          stroke="#ef233c"
          strokeWidth="0.18"
          strokeLinecap="round"
          strokeDasharray="0.7 1.3"
          className="flight-route-line"
        />
        <g className="flight-plane-svg">
          <animateMotion dur="22s" repeatCount="indefinite" rotate="auto" path={FLIGHT_ROUTE} />
          <g transform="translate(-4.5 -4.5) rotate(112) scale(0.075)">
            <path d="M45 48 5 73c-7 4-5 15 3 16l43-11 3 12-24 23c-4 4 0 11 6 9l24-13 24 13c6 2 10-5 6-9L66 90l3-12 43 11c8-1 10-12 3-16L75 48z" fill="url(#planeWing)" />
            <path d="M60 0c11 8 17 22 17 42v43c0 20-8 35-17 35S43 105 43 85V42C43 22 49 8 60 0z" fill="url(#planeBody)" />
            <path d="M47 48h26v35H47z" fill="#ffffff" opacity="0.24" />
            <path d="M48 20c3-9 21-9 24 0l3 15H45z" fill="#0f172a" opacity="0.9" />
            <path d="M51 89h18l-4 22H55z" fill="#ef233c" />
            <path d="M35 73c6-3 12-2 15 3l-3 10H31zM85 73c-6-3-12-2-15 3l3 10h16z" fill="#0f172a" opacity="0.75" />
            <path d="M50 58h20" stroke="#2563eb" strokeWidth="5" strokeLinecap="round" />
            <path d="M51 70h18" stroke="#2563eb" strokeWidth="5" strokeLinecap="round" />
            <circle cx="51" cy="39" r="2.6" fill="#0f172a" opacity="0.55" />
            <circle cx="60" cy="39" r="2.6" fill="#0f172a" opacity="0.55" />
            <circle cx="69" cy="39" r="2.6" fill="#0f172a" opacity="0.55" />
            <path d="M48 24c5 4 19 4 24 0" fill="none" stroke="#ffffff" strokeWidth="2.6" opacity="0.75" />
            <path d="M60 4v110" stroke="#ffffff" strokeWidth="1.4" opacity="0.35" />
          </g>
        </g>
      </svg>
    </div>
  )
}
