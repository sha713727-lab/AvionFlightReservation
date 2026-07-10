import Link from 'next/link'

const NOT_FOUND_TITLE = 'Page not found'
const NOT_FOUND_MESSAGE = 'The page you requested could not be found.'
const NOT_FOUND_LINK_LABEL = 'Return home'
const HOME_PATH = '/'

export default function NotFound() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-6 py-20 text-center">
      <section className="max-w-md rounded-3xl bg-card p-8 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-muted">404</p>
        <h1 className="mt-4 text-3xl font-semibold text-accent">{NOT_FOUND_TITLE}</h1>
        <p className="mt-4 text-text-secondary">{NOT_FOUND_MESSAGE}</p>
        <Link
          href={HOME_PATH}
          className="mt-8 inline-flex rounded-full bg-accent px-6 py-3 font-semibold text-white transition hover:bg-accent-hover"
        >
          {NOT_FOUND_LINK_LABEL}
        </Link>
      </section>
    </main>
  )
}
