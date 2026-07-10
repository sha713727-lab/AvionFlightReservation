import EmbeddedPostgres from 'embedded-postgres'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.resolve(ROOT, '../.local-pg')
const PORT = 5433
const USER = 'avion'
const PASSWORD = 'avion'
const DATABASE = 'avion_flight'

async function main(): Promise<void> {
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
    // Database already exists on subsequent starts
  }

  process.stdout.write(
    `Local Postgres ready on postgresql://${USER}:${PASSWORD}@localhost:${PORT}/${DATABASE}\n`,
  )
  process.stdout.write('Keep this process running while using the API.\n')

  const shutdown = async (): Promise<void> => {
    await pg.stop()
    process.exit(0)
  }

  process.on('SIGINT', () => {
    void shutdown()
  })
  process.on('SIGTERM', () => {
    void shutdown()
  })
}

void main()
