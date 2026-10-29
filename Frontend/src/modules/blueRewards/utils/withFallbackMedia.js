import { BLUE_REWARDS_MEDIA } from '@/modules/blueRewards/constants/fallbackPage'

const SLOT_DEFAULTS = {
  lead: BLUE_REWARDS_MEDIA.lead,
  pairALeft: BLUE_REWARDS_MEDIA.pairALeft,
  pairARight: BLUE_REWARDS_MEDIA.pairARight,
  pairBLeft: BLUE_REWARDS_MEDIA.pairBLeft,
  pairBRight: BLUE_REWARDS_MEDIA.pairBRight,
}

/** Fill empty CMS media slots / rail photos with the local image pack. */
export function withFallbackBlueRewardsMedia(page) {
  const mediaSlots = page.mediaSlots.map((slot) => {
    const defaults = SLOT_DEFAULTS[slot.slotKey]
    if (!defaults || slot.mediaUrl) return slot
    return {
      ...slot,
      mediaUrl: defaults.mediaUrl,
      alt: slot.alt || defaults.alt,
      focalX: slot.focalX ?? defaults.focalX,
      focalY: slot.focalY ?? defaults.focalY,
    }
  })

  const hasPhotoRail = page.railCards.some(
    (card) => card.cardType === 'photo' && card.mediaUrl && card.isEnabled,
  )

  let railCards = page.railCards
  if (!hasPhotoRail) {
    railCards = [
      {
        id: 'pack-rail-photo',
        cardType: 'photo',
        title: '',
        body: '',
        linkLabel: null,
        linkHref: null,
        factValue: null,
        mediaUrl: BLUE_REWARDS_MEDIA.railPhoto.mediaUrl,
        mediaAlt: BLUE_REWARDS_MEDIA.railPhoto.alt,
        sortOrder: 0,
        isEnabled: true,
      },
      ...page.railCards,
    ]
  }

  return { ...page, mediaSlots, railCards }
}
