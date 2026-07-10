import { DESTINATION_TIERS } from '@/data/destinations'

export const ALL_DESTINATIONS_FILTER = 'all'

export function getFlattenedDestinations() {
  return DESTINATION_TIERS.flatMap((tier) =>
    tier.places.map((place) => ({
      ...place,
      id: `${tier.id}-${place.name.toLowerCase().replace(/\s+/g, '-')}`,
      tierId: tier.id,
      tierTitle: tier.title,
      points: tier.points,
    })),
  )
}

export function getDestinationCityNames() {
  return getFlattenedDestinations().map((place) => place.name)
}
