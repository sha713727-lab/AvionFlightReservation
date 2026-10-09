import { ERROR_CODES } from '../../constants/error-codes.js'
import { API_MESSAGES } from '../../constants/messages.js'
import { notFoundError } from '../../lib/errors.js'
import {
  deleteHiltonMediaFile,
  writeHiltonMediaFile,
} from '../../lib/hilton-media-storage.js'
import type { AdminHiltonPageRepository } from './repository.js'

export async function uploadRailCardMedia(
  repository: AdminHiltonPageRepository,
  id: string,
  mime: string,
  buffer: Buffer,
  filename: string,
): Promise<void> {
  const current = await repository.findRailCard(id)
  if (!current) {
    throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.HILTON_ITEM_NOT_FOUND)
  }
  const written = await writeHiltonMediaFile(`rail-${id}`, mime, buffer, filename)
  await deleteHiltonMediaFile(current.mediaUrl)
  await repository.updateRailCard(id, {
    cardType: current.cardType,
    title: current.title,
    body: current.body,
    linkLabel: current.linkLabel,
    linkHref: current.linkHref,
    factValue: current.factValue,
    mediaAlt: current.mediaAlt,
    mediaUrl: written.mediaUrl,
    isEnabled: current.isEnabled,
  })
}

export async function uploadPropertyMediaOp(
  repository: AdminHiltonPageRepository,
  id: string,
  mime: string,
  buffer: Buffer,
  filename: string,
): Promise<void> {
  const current = await repository.findProperty(id)
  if (!current) {
    throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.HILTON_ITEM_NOT_FOUND)
  }
  const written = await writeHiltonMediaFile(`property-${id}`, mime, buffer, filename)
  await deleteHiltonMediaFile(current.mediaUrl)
  await repository.updateProperty(id, {
    title: current.title,
    blurb: current.blurb,
    mediaAlt: current.mediaAlt,
    mediaUrl: written.mediaUrl,
    isEnabled: current.isEnabled,
  })
}

export async function uploadLogoMediaOp(
  repository: AdminHiltonPageRepository,
  id: string,
  mime: string,
  buffer: Buffer,
  filename: string,
): Promise<void> {
  const current = await repository.findLogo(id)
  if (!current) {
    throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.HILTON_ITEM_NOT_FOUND)
  }
  const written = await writeHiltonMediaFile(`logo-${id}`, mime, buffer, filename)
  await deleteHiltonMediaFile(current.mediaUrl)
  await repository.updateLogo(id, {
    name: current.name,
    href: current.href,
    mediaUrl: written.mediaUrl,
    isEnabled: current.isEnabled,
  })
}
