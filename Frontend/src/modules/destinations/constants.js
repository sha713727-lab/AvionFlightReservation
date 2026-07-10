export const ALL_DESTINATIONS_FILTER = 'all'

export function getFlattenedDestinations(tiers = []) {
  return tiers.flatMap((tier) =>
    tier.places.map((place) => ({
      ...place,
      id: `${tier.id}-${place.name.toLowerCase().replace(/\s+/g, '-')}`,
      tierId: tier.id,
      tierTitle: tier.title,
      points: tier.points,
    })),
  )
}

export function getDestinationCityNames(tiers = []) {
  return getFlattenedDestinations(tiers).map((place) => place.name)
}
