export function getSlot(mediaSlots, slotKey) {
  return mediaSlots.find((slot) => slot.slotKey === slotKey) || null
}

export function objectPosition(slot) {
  if (!slot) return '50% 50%'
  return `${Math.round(slot.focalX * 100)}% ${Math.round(slot.focalY * 100)}%`
}
