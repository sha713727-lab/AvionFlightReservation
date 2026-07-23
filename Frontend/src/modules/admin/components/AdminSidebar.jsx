'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  HiOutlineCollection,
  HiOutlineGlobe,
  HiOutlineHome,
  HiOutlineLocationMarker,
  HiOutlineLockClosed,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineQuestionMarkCircle,
} from 'react-icons/hi'
import AvionLogo from '@/components/brand/AvionLogo'
import {
  ADMIN_CALLBACKS_PATH,
  ADMIN_CONTACT_PATH,
  ADMIN_DESTINATIONS_PATH,
  ADMIN_FAQS_PATH,
  ADMIN_PATH,
  ADMIN_PLACES_PATH,
  ADMIN_SECURITY_PATH,
  ADMIN_SERVICES_PATH,
} from '@/constants/routes'
import { cn } from '@/utils/cn'

const NAV_ITEMS = [
  {
    href: ADMIN_PATH,
    label: 'Overview',
    icon: HiOutlineHome,
    matchExact: true,
  },
  {
    href: ADMIN_SERVICES_PATH,
    label: 'Services',
    icon: HiOutlineCollection,
  },
  {
    href: ADMIN_DESTINATIONS_PATH,
    label: 'Destinations',
    icon: HiOutlineGlobe,
  },
  {
    href: ADMIN_PLACES_PATH,
    label: 'Places',
    icon: HiOutlineLocationMarker,
  },
  {
    href: ADMIN_CALLBACKS_PATH,
    label: 'Callbacks',
    icon: HiOutlinePhone,
  },
  {
    href: ADMIN_FAQS_PATH,
    label: 'FAQs',
    icon: HiOutlineQuestionMarkCircle,
  },
  {
    href: ADMIN_CONTACT_PATH,
    label: 'Contact',
    icon: HiOutlineMail,
  },
  {
    href: ADMIN_SECURITY_PATH,
    label: 'Security',
    icon: HiOutlineLockClosed,
  },
]

function isPathActive(pathname, href, matchExact) {
  if (matchExact) return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`)
}

function NavItem({ href, label, icon: Icon, active, onNavigate }) {
  return (
    <li>
      <Link
        href={href}
        onClick={onNavigate}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
          active
            ? 'bg-accent/10 text-accent'
            : 'text-text-secondary hover:bg-section-alt hover:text-primary',
        )}
      >
        <Icon className="h-5 w-5 shrink-0" aria-hidden />
        <span>{label}</span>
      </Link>
    </li>
  )
}

export default function AdminSidebar({ onNavigate }) {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-full flex-col bg-section">
      <div className="border-b border-border px-5 py-5">
        <Link
          href={ADMIN_PATH}
          onClick={onNavigate}
          className="inline-flex rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label="Admin overview"
        >
          <AvionLogo size="md" tone="light" hideName />
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4" aria-label="Admin navigation">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={isPathActive(pathname, item.href, item.matchExact)}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      </nav>
    </div>
  )
}
