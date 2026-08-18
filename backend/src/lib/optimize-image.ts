import sharp from 'sharp'

const MAX_IMAGE_EDGE = 1600
const WEBP_QUALITY = 78

export async function optimizeImageUpload(buffer: Buffer): Promise<{
  buffer: Buffer
  mime: string
  ext: string
}> {
  const image = sharp(buffer, { failOn: 'none' }).rotate()
  const metadata = await image.metadata()

  if (metadata.width && metadata.width > MAX_IMAGE_EDGE) {
    image.resize({
      width: MAX_IMAGE_EDGE,
      withoutEnlargement: true,
    })
  }

  const output = await image.webp({ quality: WEBP_QUALITY, effort: 4 }).toBuffer()

  return {
    buffer: output,
    mime: 'image/webp',
    ext: 'webp',
  }
}
