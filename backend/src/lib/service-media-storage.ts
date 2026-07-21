import { mkdir, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { API_MESSAGES } from '../constants/messages.js'
import { validationError } from './errors.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const UPLOADS_ROOT = path.resolve(__dirname, '../../uploads')
export const SERVICE_UPLOADS_DIR = path.join(UPLOADS_ROOT, 'services')
export const SERVICE_UPLOADS_URL_PREFIX = '/uploads/services'

export type ServiceMediaType = 'image' | 'video'

const IMAGE_MIME = new Map([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
])

const VIDEO_MIME = new Map([
  ['video/mp4', 'mp4'],
  ['video/webm', 'webm'],
])

const IMAGE_MAX_BYTES = 5 * 1024 * 1024
const VIDEO_MAX_BYTES = 50 * 1024 * 1024

export function resolveMediaType(mime: string): ServiceMediaType | null {
  if (IMAGE_MIME.has(mime)) return 'image'
  if (VIDEO_MIME.has(mime)) return 'video'
  return null
}

export function extensionForMime(mime: string): string | null {
  return IMAGE_MIME.get(mime) ?? VIDEO_MIME.get(mime) ?? null
}

export function maxBytesForMediaType(mediaType: ServiceMediaType): number {
  return mediaType === 'video' ? VIDEO_MAX_BYTES : IMAGE_MAX_BYTES
}

export async function ensureServiceUploadsDir(): Promise<void> {
  await mkdir(SERVICE_UPLOADS_DIR, { recursive: true })
}

export function buildServiceMediaFilename(serviceId: string, ext: string): string {
  return `${serviceId}-${Date.now()}.${ext}`
}

export function publicUrlForFilename(filename: string): string {
  return `${SERVICE_UPLOADS_URL_PREFIX}/${filename}`
}

export function absolutePathFromPublicUrl(mediaUrl: string): string | null {
  if (!mediaUrl.startsWith(`${SERVICE_UPLOADS_URL_PREFIX}/`)) {
    return null
  }
  const filename = mediaUrl.slice(SERVICE_UPLOADS_URL_PREFIX.length + 1)
  if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
    return null
  }
  return path.join(SERVICE_UPLOADS_DIR, filename)
}

export async function writeServiceMediaFile(
  serviceId: string,
  mime: string,
  buffer: Buffer,
): Promise<{ mediaUrl: string; mediaType: ServiceMediaType }> {
  const mediaType = resolveMediaType(mime)
  const ext = extensionForMime(mime)
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

  await ensureServiceUploadsDir()
  const filename = buildServiceMediaFilename(serviceId, ext)
  await writeFile(path.join(SERVICE_UPLOADS_DIR, filename), buffer)

  return {
    mediaUrl: publicUrlForFilename(filename),
    mediaType,
  }
}

export async function deleteServiceMediaFile(mediaUrl: string | null | undefined): Promise<void> {
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
