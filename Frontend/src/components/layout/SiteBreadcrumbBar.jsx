import Container from '@/components/ui/Container'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { getBreadcrumbNavItems } from '@/constants/breadcrumbs'

/** Light breadcrumb strip below the site header (not used on homepage). */
export default function SiteBreadcrumbBar({ path }) {
  const items = getBreadcrumbNavItems(path)
  if (!items) {
    return null
  }

  return (
    <div className="breadcrumb-bar">
      <Container>
        <Breadcrumbs items={items} />
      </Container>
    </div>
  )
}
