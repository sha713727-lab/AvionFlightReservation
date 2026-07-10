import { cn } from '@/utils/cn'

const WAVE_PATH =
  'M0,120 L0,36 C240,108 480,12 720,72 C960,12 1200,108 1440,36 L1440,120 Z'

export default function WaveDivider({ flip = false, className }) {
  return (
    <div className={cn('block w-full leading-[0] text-primary', className)} aria-hidden>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={cn(
          'block h-20 w-full md:h-24 lg:h-28',
          flip && 'rotate-180',
        )}
      >
        <path d={WAVE_PATH} fill="currentColor" />
      </svg>
    </div>
  )
}
