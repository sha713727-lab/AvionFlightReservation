import { withBreadcrumbJsonLd } from '@/constants/breadcrumbs'
import { TOOL_AVION_POINTS_CALCULATOR_PATH } from '@/constants/routes'
import { getSeoPageMeta } from '@/constants/seoPageMeta'
import { buildPathMetadata, buildWebPageJsonLd } from '@/utils/seo'

export function getCalculatorPageMetadata() {
  return buildPathMetadata(TOOL_AVION_POINTS_CALCULATOR_PATH)
}

export function getCalculatorPageJsonLd() {
  const { title, description } = getSeoPageMeta(TOOL_AVION_POINTS_CALCULATOR_PATH)

  return withBreadcrumbJsonLd(
    TOOL_AVION_POINTS_CALCULATOR_PATH,
    buildWebPageJsonLd({
      name: title,
      description,
      path: TOOL_AVION_POINTS_CALCULATOR_PATH,
    }),
  )
}
