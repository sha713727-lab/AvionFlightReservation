import http from 'node:http'
import https from 'node:https'
import { URL } from 'node:url'

/**
 * Server-only HTTP GET that bypasses Next.js fetch wrapping.
 * Docker-internal catalog calls (http://api:4000) often fail via global fetch
 * in Next 16 standalone, while node:http works on the Compose network.
 */
export function serverHttpGetJson(urlString, timeoutMs = 8000) {
  const url = new URL(urlString)
  const transport = url.protocol === 'https:' ? https : http

  return new Promise((resolve, reject) => {
    const request = transport.request(
      {
        protocol: url.protocol,
        hostname: url.hostname,
        port: url.port || (url.protocol === 'https:' ? 443 : 80),
        path: `${url.pathname}${url.search}`,
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Host: url.host,
        },
        timeout: timeoutMs,
      },
      (response) => {
        const chunks = []

        response.on('data', (chunk) => {
          chunks.push(chunk)
        })

        response.on('end', () => {
          const body = Buffer.concat(chunks).toString('utf8')
          resolve({
            ok: (response.statusCode ?? 500) >= 200 && (response.statusCode ?? 500) < 300,
            status: response.statusCode ?? 500,
            body,
          })
        })
      },
    )

    request.on('timeout', () => {
      request.destroy()
      reject(new Error('API request timed out'))
    })

    request.on('error', (error) => {
      reject(error)
    })

    request.end()
  })
}
