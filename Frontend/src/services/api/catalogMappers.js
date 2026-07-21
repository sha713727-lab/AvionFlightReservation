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
    mediaUrl: dto.mediaUrl ?? null,
    mediaType: dto.mediaType ?? null,
  }
}

export function mapDestinationTierDto(dto) {
  return {
    id: dto.slug,
    points: dto.points,
    title: dto.title,
    places: dto.places.map((place) => {
      const mediaUrl = place.mediaUrl ?? null
      const mediaType = place.mediaType ?? null
      const image =
        mediaType === 'image' && mediaUrl
          ? mediaUrl
          : place.imageUrl || mediaUrl || ''

      return {
        name: place.name,
        alt: place.alt,
        image,
        mediaUrl,
        mediaType,
      }
    }),
  }
}

export function mapFaqDto(dto) {
  return {
    id: dto.slug,
    question: dto.question,
    answer: dto.answer,
  }
}
