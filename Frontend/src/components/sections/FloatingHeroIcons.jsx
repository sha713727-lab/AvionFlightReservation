import { FaBriefcase, FaGift, FaHotel, FaPlane, FaUmbrellaBeach } from 'react-icons/fa'
import { MdConnectingAirports, MdLuggage, MdSwapHoriz } from 'react-icons/md'

const HERO_FLOATING_ICONS = [
  { Icon: FaPlane, className: 'left-[5%] top-[10%]', delay: '0s' },
  { Icon: FaGift, className: 'left-[3%] top-[34%]', delay: '0.4s' },
  { Icon: FaUmbrellaBeach, className: 'left-[11%] top-[47%]', delay: '0.8s', small: true },
  { Icon: MdConnectingAirports, className: 'left-[7%] top-[63%]', delay: '1.2s', small: true },
  { Icon: FaBriefcase, className: 'left-[4%] bottom-[10%]', delay: '0.6s' },
  { Icon: FaHotel, className: 'right-[6%] top-[15%]', delay: '0.3s', small: true },
  { Icon: MdSwapHoriz, className: 'right-[4%] top-[29%]', delay: '0.9s' },
  { Icon: MdLuggage, className: 'right-[7%] top-[56%]', delay: '0.5s' },
  { Icon: MdConnectingAirports, className: 'right-[5%] bottom-[16%]', delay: '1.1s', small: true },
]

export default function FloatingHeroIcons() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] hidden overflow-hidden md:block"
      aria-hidden
    >
      {HERO_FLOATING_ICONS.map(({ Icon, className, delay, small }) => (
        <span
          key={`${className}-${delay}`}
          className={`hero-float absolute ${className} flex items-center justify-center text-accent drop-shadow-md ${
            small ? 'text-3xl lg:text-5xl' : 'text-5xl lg:text-7xl'
          }`}
          style={{ animationDelay: delay }}
        >
          <Icon aria-hidden />
        </span>
      ))}
    </div>
  )
}
