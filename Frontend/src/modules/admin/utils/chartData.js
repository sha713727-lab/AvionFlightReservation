export const ADMIN_CHART_COLORS = {
  accent: '#2563eb',
  primary: '#0f172a',
  secondary: '#3b82f6',
  success: '#22c55e',
  muted: '#94a3b8',
  track: '#f1f5f9',
  grid: '#e5e7eb',
  text: '#6b7280',
}

export function buildCatalogMixData(counts, labels) {
  return [
    { name: labels.services, value: counts.servicesActive, fill: ADMIN_CHART_COLORS.accent },
    {
      name: labels.destinations,
      value: counts.destinationTiersActive,
      fill: ADMIN_CHART_COLORS.primary,
    },
    { name: labels.places, value: counts.destinationPlacesActive, fill: ADMIN_CHART_COLORS.secondary },
    { name: labels.faqs, value: counts.faqsActive, fill: ADMIN_CHART_COLORS.success },
  ].filter((item) => item.value > 0)
}

export function buildCatalogBarData(counts, labels) {
  return [
    { name: labels.servicesShort, value: counts.servicesActive, fill: ADMIN_CHART_COLORS.accent },
    {
      name: labels.destinationsShort,
      value: counts.destinationTiersActive,
      fill: ADMIN_CHART_COLORS.primary,
    },
    { name: labels.placesShort, value: counts.destinationPlacesActive, fill: ADMIN_CHART_COLORS.secondary },
    { name: labels.faqsShort, value: counts.faqsActive, fill: ADMIN_CHART_COLORS.success },
  ]
}
