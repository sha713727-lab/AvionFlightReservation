import { ERROR_CODES } from '../../constants/error-codes.js'
import { API_MESSAGES } from '../../constants/messages.js'
import { notFoundError } from '../../lib/errors.js'
import {
  deleteWyndhamMediaFile,
  writeWyndhamMediaFile,
} from '../../lib/wyndham-media-storage.js'
import type { AdminWyndhamPageRepository } from './repository.js'

export async function uploadRailCardMedia(
  repository: AdminWyndhamPageRepository,
  id: string,
  mime: string,
  buffer: Buffer,
  filename: string,
): Promise<void> {
  const current = await repository.findRailCard(id)
  if (!current) {
    throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.WYNDHAM_ITEM_NOT_FOUND)
  }
  const written = await writeWyndhamMediaFile(`rail-${id}`, mime, buffer, filename)
  await deleteWyndhamMediaFile(current.mediaUrl)
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
  repository: AdminWyndhamPageRepository,
  id: string,
  mime: string,
  buffer: Buffer,
  filename: string,
): Promise<void> {
  const current = await repository.findProperty(id)
  if (!current) {
    throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.WYNDHAM_ITEM_NOT_FOUND)
  }
  const written = await writeWyndhamMediaFile(`property-${id}`, mime, buffer, filename)
  await deleteWyndhamMediaFile(current.mediaUrl)
  await repository.updateProperty(id, {
    title: current.title,
    blurb: current.blurb,
    mediaAlt: current.mediaAlt,
    mediaUrl: written.mediaUrl,
    isEnabled: current.isEnabled,
  })
}

export async function uploadLogoMediaOp(
  repository: AdminWyndhamPageRepository,
  id: string,
  mime: string,
  buffer: Buffer,
  filename: string,
): Promise<void> {
  const current = await repository.findLogo(id)
  if (!current) {
    throw notFoundError(API_MESSAGES.NOT_FOUND, ERROR_CODES.WYNDHAM_ITEM_NOT_FOUND)
  }
  const written = await writeWyndhamMediaFile(`logo-${id}`, mime, buffer, filename)
  await deleteWyndhamMediaFile(current.mediaUrl)
  await repository.updateLogo(id, {
    name: current.name,
    href: current.href,
    mediaUrl: written.mediaUrl,
    isEnabled: current.isEnabled,
  })
}
