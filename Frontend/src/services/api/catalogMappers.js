export function mapServiceDto(dto) {
  return {
    id: dto.slug,
    title: dto.title,
    tagline: dto.tagline,
    description: dto.description,
    features: dto.features,
    iconKey: dto.iconKey,
    imageKey: dto.imageKey,
    imageAlt: dto.imageAlt,
  }
}

export function mapDestinationTierDto(dto) {
  return {
    id: dto.slug,
    points: dto.points,
    title: dto.title,
    places: dto.places.map((place) => ({
      name: place.name,
      alt: place.alt,
      image: place.imageUrl,
    })),
  }
}

export function mapFaqDto(dto) {
  return {
    id: dto.slug,
    question: dto.question,
    answer: dto.answer,
  }
}
