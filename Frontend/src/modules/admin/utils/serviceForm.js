export function slugifyTitle(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

export function createEmptyServiceForm() {
  return {
    slug: '',
    title: '',
    tagline: '',
    description: '',
    features: [''],
    iconKey: 'plane',
    imageKey: 'flight-booking',
    imageAlt: '',
    isActive: true,
  }
}

export function serviceToFormValues(service) {
  return {
    slug: service.slug,
    title: service.title,
    tagline: service.tagline,
    description: service.description,
    features: service.features.length > 0 ? [...service.features] : [''],
    iconKey: service.iconKey,
    imageKey: service.imageKey,
    imageAlt: service.imageAlt,
    isActive: service.isActive,
  }
}

export function formatDisplayOrder(sortOrder) {
  return String(sortOrder).padStart(2, '0')
}
