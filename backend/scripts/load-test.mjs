#!/usr/bin/env node
/**
 * Lightweight concurrent load probe for catalog endpoints.
 * Usage: node scripts/load-test.mjs [baseUrl] [concurrency] [requests]
 * Example: node scripts/load-test.mjs http://localhost:4000 20 200
 */

const baseUrl = process.argv[2] ?? 'http://localhost:4000'
const concurrency = Number(process.argv[3] ?? 20)
const totalRequests = Number(process.argv[4] ?? 200)
const apiPrefix = '/api/v1'

const endpoints = [
  `${apiPrefix}/health`,
  `${apiPrefix}/services`,
  `${apiPrefix}/destinations`,
  `${apiPrefix}/faqs`,
]

if (!Number.isFinite(concurrency) || concurrency < 1) {
  console.error('concurrency must be a positive number')
  process.exit(1)
}

if (!Number.isFinite(totalRequests) || totalRequests < 1) {
  console.error('requests must be a positive number')
  process.exit(1)
}

async function hit(url) {
  const started = performance.now()
  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/json', 'Accept-Encoding': 'identity' },
    })
    const elapsedMs = performance.now() - started
    return { ok: response.ok, status: response.status, elapsedMs }
  } catch (error) {
    const elapsedMs = performance.now() - started
    return {
      ok: false,
      status: 0,
      elapsedMs,
      error: error instanceof Error ? error.message : 'request failed',
    }
  }
}

async function run() {
  const results = []
  let nextIndex = 0

  async function worker() {
    while (nextIndex < totalRequests) {
      const index = nextIndex
      nextIndex += 1
      const path = endpoints[index % endpoints.length]
      const result = await hit(`${baseUrl}${path}`)
      results.push(result)
    }
  }

  const started = performance.now()
  await Promise.all(
    Array.from({ length: Math.min(concurrency, totalRequests) }, () => worker()),
  )
  const totalMs = performance.now() - started

  const okCount = results.filter((result) => result.ok).length
  const failCount = results.length - okCount
  const latencies = results.map((result) => result.elapsedMs).sort((a, b) => a - b)
  const p50 = latencies[Math.floor(latencies.length * 0.5)] ?? 0
  const p95 = latencies[Math.floor(latencies.length * 0.95)] ?? 0
  const avg =
    latencies.reduce((sum, value) => sum + value, 0) / Math.max(latencies.length, 1)

  console.log(
    JSON.stringify(
      {
        baseUrl,
        concurrency,
        totalRequests: results.length,
        okCount,
        failCount,
        rps: Number(((results.length / totalMs) * 1000).toFixed(2)),
        latencyMs: {
          avg: Number(avg.toFixed(2)),
          p50: Number(p50.toFixed(2)),
          p95: Number(p95.toFixed(2)),
        },
        totalMs: Number(totalMs.toFixed(2)),
      },
      null,
      2,
    ),
  )

  if (failCount > 0) {
    process.exitCode = 1
  }
}

void run()
