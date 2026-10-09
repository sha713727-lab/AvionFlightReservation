import { mkdir, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { API_MESSAGES } from '../constants/messages.js'
import { validationError } from './errors.js'
import { optimizeImageUpload } from './optimize-image.js'
import {
  normalizeUploadMime,
  resolveMediaType,
  UPLOADS_ROOT,
} from './service-media-storage.js'

export const HILTON_UPLOADS_DIR = path.join(UPLOADS_ROOT, 'hilton')
export const HILTON_UPLOADS_URL_PREFIX = '/uploads/hilton'

const IMAGE_MAX_BYTES = 5 * 1024 * 1024

async function ensureHiltonUploadsDir(): Promise<void> {
  await mkdir(HILTON_UPLOADS_DIR, { recursive: true })
}

function publicUrlForFilename(filename: string): string {
  return `${HILTON_UPLOADS_URL_PREFIX}/${filename}`
}

function absolutePathFromPublicUrl(mediaUrl: string): string | null {
  if (!mediaUrl.startsWith(`${HILTON_UPLOADS_URL_PREFIX}/`)) {
    return null
  }
  const filename = mediaUrl.slice(HILTON_UPLOADS_URL_PREFIX.length + 1)
  if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
    return null
  }
  return path.join(HILTON_UPLOADS_DIR, filename)
}

export async function writeHiltonMediaFile(
  slotOrId: string,
  mime: string,
  buffer: Buffer,
  originalFilename = '',
): Promise<{ mediaUrl: string }> {
  const normalizedMime = normalizeUploadMime(mime, originalFilename)
  if (resolveMediaType(normalizedMime) !== 'image') {
    throw validationError(API_MESSAGES.VALIDATION_FAILED, [
      {
        field: 'file',
        message: 'File must be jpeg, png, or webp.',
        code: 'invalid_type',
      },
    ])
  }

  if (buffer.byteLength > IMAGE_MAX_BYTES) {
    throw validationError(API_MESSAGES.VALIDATION_FAILED, [
      {
        field: 'file',
        message: 'Image must be 5MB or smaller.',
        code: 'too_big',
      },
    ])
  }

  await ensureHiltonUploadsDir()
  const optimized = await optimizeImageUpload(buffer)
  const filename = `${slotOrId}-${Date.now()}.${optimized.ext}`
  await writeFile(path.join(HILTON_UPLOADS_DIR, filename), optimized.buffer)

  return { mediaUrl: publicUrlForFilename(filename) }
}

export async function deleteHiltonMediaFile(mediaUrl: string | null | undefined): Promise<void> {
  if (!mediaUrl) return
  const absolute = absolutePathFromPublicUrl(mediaUrl)
  if (!absolute) return
  try {
    await unlink(absolute)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw error
    }
  }
}
