import { mkdir, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { API_MESSAGES } from '../constants/messages.js'
import { validationError } from './errors.js'
import {
  extensionForMime,
  maxBytesForMediaType,
  normalizeUploadMime,
  resolveMediaType,
  UPLOADS_ROOT,
  type ServiceMediaType,
} from './service-media-storage.js'

export const PLACE_UPLOADS_DIR = path.join(UPLOADS_ROOT, 'places')
export const PLACE_UPLOADS_URL_PREFIX = '/uploads/places'

export type PlaceMediaType = ServiceMediaType

export async function ensurePlaceUploadsDir(): Promise<void> {
  await mkdir(PLACE_UPLOADS_DIR, { recursive: true })
}

export function buildPlaceMediaFilename(placeId: string, ext: string): string {
  return `${placeId}-${Date.now()}.${ext}`
}

export function publicPlaceUrlForFilename(filename: string): string {
  return `${PLACE_UPLOADS_URL_PREFIX}/${filename}`
}

export function absolutePathFromPlacePublicUrl(mediaUrl: string): string | null {
  if (!mediaUrl.startsWith(`${PLACE_UPLOADS_URL_PREFIX}/`)) {
    return null
  }
  const filename = mediaUrl.slice(PLACE_UPLOADS_URL_PREFIX.length + 1)
  if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
    return null
  }
  return path.join(PLACE_UPLOADS_DIR, filename)
}

export async function writePlaceMediaFile(
  placeId: string,
  mime: string,
  buffer: Buffer,
  filename = '',
): Promise<{ mediaUrl: string; mediaType: PlaceMediaType }> {
  const normalizedMime = normalizeUploadMime(mime, filename)
  const mediaType = resolveMediaType(normalizedMime)
  const ext = extensionForMime(normalizedMime)
  if (!mediaType || !ext) {
    throw validationError(API_MESSAGES.VALIDATION_FAILED, [
      {
        field: 'file',
        message: 'File must be jpeg, png, webp, mp4, or webm.',
        code: 'invalid_type',
      },
    ])
  }

  const maxBytes = maxBytesForMediaType(mediaType)
  if (buffer.byteLength > maxBytes) {
    throw validationError(API_MESSAGES.VALIDATION_FAILED, [
      {
        field: 'file',
        message:
          mediaType === 'video'
            ? 'Video must be 50MB or smaller.'
            : 'Image must be 5MB or smaller.',
        code: 'too_big',
      },
    ])
  }

  await ensurePlaceUploadsDir()
  const filename = buildPlaceMediaFilename(placeId, ext)
  await writeFile(path.join(PLACE_UPLOADS_DIR, filename), buffer)

  return {
    mediaUrl: publicPlaceUrlForFilename(filename),
    mediaType,
  }
}

export async function deletePlaceMediaFile(mediaUrl: string | null | undefined): Promise<void> {
  if (!mediaUrl) return
  const absolute = absolutePathFromPlacePublicUrl(mediaUrl)
  if (!absolute) return
  try {
    await unlink(absolute)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw error
    }
  }
}
