import { createReadStream } from 'node:fs'
import { access, constants } from 'node:fs/promises'
import path from 'node:path'
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { UPLOADS_ROOT } from './service-media-storage.js'

const CONTENT_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
}

function resolveSafeUploadPath(relativePath: string): string | null {
  const normalized = path
    .normalize(relativePath)
    .replace(/^([/\\])+/, '')
    .replace(/^(\.\.([/\\]|$))+/, '')

  if (!normalized || normalized.includes('..')) {
    return null
  }

  const absolute = path.resolve(UPLOADS_ROOT, normalized)
  const rootWithSep = UPLOADS_ROOT.endsWith(path.sep)
    ? UPLOADS_ROOT
    : `${UPLOADS_ROOT}${path.sep}`

  if (absolute !== UPLOADS_ROOT && !absolute.startsWith(rootWithSep)) {
    return null
  }

  return absolute
}

async function sendUploadFile(
  request: FastifyRequest<{ Params: { '*': string } }>,
  reply: FastifyReply,
): Promise<void> {
  const relative = request.params['*']
  const absolute = resolveSafeUploadPath(relative)

  if (!absolute) {
    await reply.code(400).send({
      success: false,
      message: 'Invalid upload path',
      data: null,
      errors: null,
    })
    return
  }

  try {
    await access(absolute, constants.R_OK)
  } catch {
    request.log.warn({ absolute, uploadsRoot: UPLOADS_ROOT }, 'Upload file not found')
    await reply.code(404).send({
      success: false,
      message: 'Upload not found',
      data: null,
      errors: null,
    })
    return
  }

  const ext = path.extname(absolute).toLowerCase()
  const contentType = CONTENT_TYPES[ext] || 'application/octet-stream'
  const stream = createReadStream(absolute)

  await reply
    .header('x-no-compression', 'true')
    .header('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400')
    .type(contentType)
    .send(stream)
}

export async function registerUploadRoutes(app: FastifyInstance): Promise<void> {
  app.log.info({ uploadsRoot: UPLOADS_ROOT }, 'Serving uploads from disk')

  app.get<{ Params: { '*': string } }>(
    '/uploads/*',
    {
      config: {
        rateLimit: false,
      },
    },
    sendUploadFile,
  )

  app.head<{ Params: { '*': string } }>(
    '/uploads/*',
    {
      config: {
        rateLimit: false,
      },
    },
    sendUploadFile,
  )
}
