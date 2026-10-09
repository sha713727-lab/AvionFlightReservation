/**
 * One-shot Wyndham + Hilton admin CMS accuracy check.
 * Boots embedded Postgres on 5434, migrates, seeds, starts Fastify inject tests.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'
import EmbeddedPostgres from 'embedded-postgres'
import { PrismaClient } from '@prisma/client'

const ROOT = path.dirname(fileURLToPath(import.meta.url))
const BACKEND = path.resolve(ROOT, '..')
const DATA_DIR = path.resolve(BACKEND, '.local-pg-admin-test')
const PORT = 5434
const USER = 'avion'
const PASSWORD = 'avion'
const DATABASE = 'avion_flight'
const DATABASE_URL = `postgresql://${USER}:${PASSWORD}@127.0.0.1:${PORT}/${DATABASE}?schema=public`

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@aviosupportdesk.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'AdminTestPass123!'
const ADMIN_PIN = process.env.ADMIN_PIN || '12345678'
const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'admin-test-session-secret-32chars!!'

function log(msg) {
  process.stdout.write(`${msg}\n`)
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg)
}

async function run(cmd, args, env = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      cwd: BACKEND,
      env: { ...process.env, ...env },
      shell: true,
      stdio: ['ignore', 'pipe', 'pipe'],
    })
    let out = ''
    let err = ''
    child.stdout.on('data', (d) => {
      out += d.toString()
    })
    child.stderr.on('data', (d) => {
      err += d.toString()
    })
    child.on('close', (code) => {
      if (code === 0) resolve({ out, err })
      else reject(new Error(`${cmd} ${args.join(' ')} failed (${code}): ${err || out}`))
    })
  })
}

async function jsonFetch(base, method, urlPath, { token, body, formData } = {}) {
  const headers = {}
  if (token) headers.Authorization = `Bearer ${token}`
  let payload
  if (formData) {
    payload = formData
  } else if (body !== undefined) {
    headers['Content-Type'] = 'application/json'
    payload = JSON.stringify(body)
  }
  const res = await fetch(`${base}${urlPath}`, { method, headers, body: payload })
  const text = await res.text()
  let data
  try {
    data = JSON.parse(text)
  } catch {
    data = { raw: text }
  }
  return { status: res.status, data }
}

function tinyPngBuffer() {
  // 1x1 PNG
  return Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
    'base64',
  )
}

async function exerciseBrand(base, token, brand) {
  const admin = `/api/v1/admin/${brand}-page`
  const pub = `/api/v1/${brand}-page`
  log(`\n== ${brand.toUpperCase()} admin accuracy ==`)

  const got = await jsonFetch(base, 'GET', admin, { token })
  assert(got.status === 200 && got.data?.success, `${brand} GET admin failed: ${got.status}`)
  const page = got.data.data
  assert(Array.isArray(page.mediaSlots) && page.mediaSlots.length >= 5, `${brand} missing media slots`)
  assert(Array.isArray(page.principles), `${brand} missing principles`)
  assert(Array.isArray(page.properties), `${brand} missing properties`)
  assert(Array.isArray(page.railCards), `${brand} missing rail cards`)
  log(`GET admin OK (slots=${page.mediaSlots.length}, principles=${page.principles.length})`)

  const heroHeading = `Admin accuracy ${brand} ${Date.now()}`
  const putBody = {
    status: 'published',
    metaTitle: page.metaTitle,
    metaDescription: page.metaDescription,
    ogTitle: page.ogTitle,
    ogDescription: page.ogDescription,
    heroHeading,
    heroIntroduction: page.heroIntroduction,
    storyLabel: page.storyLabel,
    storyParagraphs: page.storyParagraphs,
    storyCtaLabel: page.storyCtaLabel,
    storyCtaHref: page.storyCtaHref,
    principlesHeading: page.principlesHeading,
    clientsEnabled: page.clientsEnabled,
    clientsHeading: page.clientsHeading,
    clientsIntroduction: page.clientsIntroduction,
    railLabel: page.railLabel,
    contactEmailOverride: page.contactEmailOverride,
  }
  const put = await jsonFetch(base, 'PUT', admin, { token, body: putBody })
  assert(put.status === 200 && put.data?.success, `${brand} PUT failed: ${JSON.stringify(put.data)}`)
  assert(put.data.data.heroHeading === heroHeading, `${brand} PUT hero not persisted`)
  log('PUT scalars OK')

  const form = new FormData()
  form.append('file', new Blob([tinyPngBuffer()], { type: 'image/png' }), 'lead.png')
  const up = await jsonFetch(base, 'POST', `${admin}/media/lead`, { token, formData: form })
  assert(up.status === 200 && up.data?.success, `${brand} media upload failed: ${JSON.stringify(up.data)}`)
  log('Media upload OK')

  const delMedia = await jsonFetch(base, 'DELETE', `${admin}/media/lead`, { token })
  assert(delMedia.status === 200 && delMedia.data?.success, `${brand} media delete failed`)
  log('Media delete OK')

  const principle = await jsonFetch(base, 'POST', `${admin}/principles`, {
    token,
    body: {
      numberLabel: '99',
      title: 'Accuracy principle',
      description: 'Temporary principle for admin accuracy test.',
      isEnabled: true,
    },
  })
  assert(principle.status === 200 || principle.status === 201, `${brand} principle create failed`)
  const principleId = principle.data.data.principles.find((p) => p.title === 'Accuracy principle')?.id
  assert(principleId, `${brand} principle id missing`)
  const updP = await jsonFetch(base, 'PUT', `${admin}/principles/${principleId}`, {
    token,
    body: {
      numberLabel: '99',
      title: 'Accuracy principle updated',
      description: 'Updated description for accuracy test.',
      isEnabled: true,
    },
  })
  assert(updP.status === 200, `${brand} principle update failed`)
  await jsonFetch(base, 'POST', `${admin}/principles/${principleId}/move`, {
    token,
    body: { direction: 'up' },
  })
  const delP = await jsonFetch(base, 'DELETE', `${admin}/principles/${principleId}`, { token })
  assert(delP.status === 200, `${brand} principle delete failed`)
  log('Principles CRUD OK')

  const property = await jsonFetch(base, 'POST', `${admin}/properties`, {
    token,
    body: {
      title: 'Accuracy property',
      blurb: 'Temporary property highlight for accuracy test.',
      isEnabled: true,
      mediaAlt: '',
    },
  })
  assert(property.status === 200 || property.status === 201, `${brand} property create failed`)
  const propertyId = property.data.data.properties.find((p) => p.title === 'Accuracy property')?.id
  assert(propertyId, `${brand} property id missing`)
  const updProp = await jsonFetch(base, 'PUT', `${admin}/properties/${propertyId}`, {
    token,
    body: {
      title: 'Accuracy property updated',
      blurb: 'Updated blurb.',
      isEnabled: true,
      mediaAlt: 'alt',
    },
  })
  assert(updProp.status === 200, `${brand} property update failed`)
  await jsonFetch(base, 'POST', `${admin}/properties/${propertyId}/move`, {
    token,
    body: { direction: 'up' },
  })
  const delProp = await jsonFetch(base, 'DELETE', `${admin}/properties/${propertyId}`, { token })
  assert(delProp.status === 200, `${brand} property delete failed`)
  log('Properties CRUD OK')

  const rail = await jsonFetch(base, 'POST', `${admin}/rail-cards`, {
    token,
    body: {
      cardType: 'standard',
      title: 'Accuracy rail',
      body: 'Temporary rail card.',
      isEnabled: true,
      mediaAlt: '',
    },
  })
  assert(rail.status === 200 || rail.status === 201, `${brand} rail create failed`)
  const railId = rail.data.data.railCards.find((c) => c.title === 'Accuracy rail')?.id
  assert(railId, `${brand} rail id missing`)
  const updRail = await jsonFetch(base, 'PUT', `${admin}/rail-cards/${railId}`, {
    token,
    body: {
      cardType: 'standard',
      title: 'Accuracy rail updated',
      body: 'Updated rail body.',
      isEnabled: true,
      mediaAlt: '',
    },
  })
  assert(updRail.status === 200, `${brand} rail update failed`)
  await jsonFetch(base, 'POST', `${admin}/rail-cards/${railId}/move`, {
    token,
    body: { direction: 'up' },
  })
  const delRail = await jsonFetch(base, 'DELETE', `${admin}/rail-cards/${railId}`, { token })
  assert(delRail.status === 200, `${brand} rail delete failed`)
  log('Rail cards CRUD OK')

  const publish = await jsonFetch(base, 'PUT', admin, {
    token,
    body: { ...putBody, status: 'published', heroHeading: page.heroHeading },
  })
  assert(publish.status === 200, `${brand} republish failed`)
  const pubOk = await jsonFetch(base, 'GET', pub)
  assert(pubOk.status === 200 && pubOk.data?.success, `${brand} public GET published failed`)
  log('Publish → public 200 OK')

  const draft = await jsonFetch(base, 'PUT', admin, {
    token,
    body: { ...putBody, status: 'draft', heroHeading: page.heroHeading },
  })
  assert(draft.status === 200, `${brand} draft failed`)
  const pubDraft = await jsonFetch(base, 'GET', pub)
  assert(pubDraft.status === 404, `${brand} public GET draft should 404, got ${pubDraft.status}`)
  log('Draft → public 404 OK')

  await jsonFetch(base, 'PUT', admin, {
    token,
    body: { ...putBody, status: 'published', heroHeading: page.heroHeading },
  })
  log(`${brand.toUpperCase()} PASSED`)
}

async function main() {
  log('Starting embedded Postgres for admin accuracy tests…')
  if (fs.existsSync(DATA_DIR)) {
    fs.rmSync(DATA_DIR, { recursive: true, force: true })
  }
  const pg = new EmbeddedPostgres({
    databaseDir: DATA_DIR,
    user: USER,
    password: PASSWORD,
    port: PORT,
    persistent: true,
  })
  await pg.initialise()
  await pg.start()
  try {
    await pg.createDatabase(DATABASE)
  } catch {
    // exists
  }

  process.env.DATABASE_URL = DATABASE_URL
  process.env.ADMIN_EMAIL = ADMIN_EMAIL
  process.env.ADMIN_PASSWORD = ADMIN_PASSWORD
  process.env.ADMIN_PIN = ADMIN_PIN
  process.env.ADMIN_SESSION_SECRET = ADMIN_SESSION_SECRET
  process.env.NODE_ENV = 'development'
  process.env.PORT = '4010'
  process.env.CORS_ORIGINS = 'http://localhost:3000'
  process.env.ALLOW_DESTRUCTIVE_SEED = 'true'

  log('prisma migrate deploy…')
  await run('npx', ['prisma', 'migrate', 'deploy'], { DATABASE_URL })
  log('seed wyndham + hilton…')
  await run('npm', ['run', 'db:seed-wyndham'], { DATABASE_URL })
  await run('npm', ['run', 'db:seed-hilton'], { DATABASE_URL })

  // Ensure admin PIN row exists via seed if needed — auth uses env PIN for first login
  const prisma = new PrismaClient({ datasources: { db: { url: DATABASE_URL } } })
  await prisma.$disconnect()

  log('Starting API on :4010…')
  const api = spawn('npx', ['tsx', 'src/server.ts'], {
    cwd: BACKEND,
    env: {
      ...process.env,
      DATABASE_URL,
      ADMIN_EMAIL,
      ADMIN_PASSWORD,
      ADMIN_PIN,
      ADMIN_SESSION_SECRET,
      PORT: '4010',
      NODE_ENV: 'development',
      CORS_ORIGINS: 'http://localhost:3000',
    },
    shell: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  let apiLog = ''
  api.stdout.on('data', (d) => {
    apiLog += d.toString()
  })
  api.stderr.on('data', (d) => {
    apiLog += d.toString()
  })

  const base = 'http://127.0.0.1:4010'
  let ready = false
  for (let i = 0; i < 40; i += 1) {
    try {
      const res = await fetch(`${base}/api/v1/health`)
      if (res.ok) {
        ready = true
        break
      }
    } catch {
      // wait
    }
    await new Promise((r) => setTimeout(r, 500))
  }
  if (!ready) {
    api.kill()
    throw new Error(`API failed to start. Log:\n${apiLog}`)
  }
  log('API ready')

  try {
    const login = await jsonFetch(base, 'POST', '/api/v1/admin/auth/login', {
      body: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
    })
    assert(login.status === 200 && login.data?.success, `login failed: ${JSON.stringify(login.data)}`)
    const challengeId = login.data.data.challengeId
    assert(challengeId, 'missing challengeId')
    const pin = await jsonFetch(base, 'POST', '/api/v1/admin/auth/pin/verify', {
      body: { challengeId, pin: ADMIN_PIN },
    })
    assert(pin.status === 200 && pin.data?.data?.token, `PIN verify failed: ${JSON.stringify(pin.data)}`)
    const token = pin.data.data.token
    log('Auth OK')

    await exerciseBrand(base, token, 'wyndham')
    await exerciseBrand(base, token, 'hilton')
    log('\nALL ADMIN ACCURACY CHECKS PASSED')
  } finally {
    api.kill()
    try {
      await pg.stop()
    } catch {
      // Windows may still hold locks briefly after stop.
    }
    try {
      fs.rmSync(DATA_DIR, { recursive: true, force: true })
    } catch {
      // Non-fatal: temp dir can be removed manually if locked.
    }
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
