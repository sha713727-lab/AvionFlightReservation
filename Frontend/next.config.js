import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))

const nextConfig = {
  turbopack: {
    root,
  },
  async redirects() {
    return [
      {
        source: '/en',
        destination: '/',
        permanent: false,
      },
      {
        source: '/en/:path*',
        destination: '/:path*',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
