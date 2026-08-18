import { mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const assetsDir = path.join(root, 'src', 'assets', 'images')
const publicDir = path.join(root, 'public')

async function toWebp(input, output, options) {
  await sharp(input)
    .rotate()
    .resize({
      width: options.width,
      height: options.height,
      fit: options.fit || 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: options.quality, effort: 6 })
    .toFile(output)

  const info = await sharp(output).metadata()
  console.log(`${path.basename(output)} ${info.width}x${info.height}`)
}

async function toPng(input, output, size) {
  await sharp(input)
    .resize(size, size, { fit: 'cover' })
    .png({ compressionLevel: 9 })
    .toFile(output)
}

const assets = await readdir(assetsDir)

for (const file of assets) {
  if (!/\.(png|jpe?g)$/i.test(file)) continue
  const input = path.join(assetsDir, file)
  const output = path.join(assetsDir, `${file.replace(/\.(png|jpe?g)$/i, '')}.webp`)
  await toWebp(input, output, { width: 1200, quality: 78 })
}

await mkdir(publicDir, { recursive: true })
await toWebp(
  path.join(publicDir, 'avion-hero-background.png'),
  path.join(publicDir, 'avion-hero-background.webp'),
  { width: 1600, quality: 72 },
)
const logoSource = path.join(publicDir, 'avion-logo.png')
await toWebp(logoSource, path.join(publicDir, 'avion-logo.webp'), {
  width: 256,
  height: 256,
  quality: 88,
})
await toPng(logoSource, path.join(publicDir, 'apple-touch-icon.png'), 180)
await toPng(logoSource, path.join(publicDir, 'favicon-32.png'), 32)
await toPng(logoSource, path.join(publicDir, 'favicon-48.png'), 48)
await toPng(logoSource, path.join(publicDir, 'favicon-192.png'), 192)
await toPng(logoSource, path.join(publicDir, 'avion-favicon.png'), 48)

console.log('Image optimization complete')
