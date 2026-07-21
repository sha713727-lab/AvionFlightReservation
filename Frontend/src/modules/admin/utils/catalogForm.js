export function createEmptyDestinationForm() {
  return {
    slug: '',
    title: '',
    points: 0,
    isActive: true,
  }
}

export function destinationToFormValues(destination) {
  return {
    slug: destination.slug,
    title: destination.title,
    points: destination.points,
    isActive: destination.isActive,
  }
}

export function createEmptyPlaceForm(tierId = '') {
  return {
    name: '',
    alt: '',
    imageUrl: '',
    isActive: true,
    tierId,
  }
}

export function placeToFormValues(place) {
  return {
    name: place.name,
    alt: place.alt,
    imageUrl: place.imageUrl,
    isActive: place.isActive,
    tierId: place.tierId,
  }
}
