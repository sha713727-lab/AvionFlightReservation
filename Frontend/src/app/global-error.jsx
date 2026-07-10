'use client'

import { DEFAULT_LOCALE } from '@/constants/locales'

const GLOBAL_ERROR_TITLE = 'Something went wrong'
const GLOBAL_ERROR_MESSAGE = 'Please refresh the page or try again in a moment.'
const GLOBAL_ERROR_ACTION_LABEL = 'Try again'

export default function GlobalError({ reset }) {
  return (
    <html lang={DEFAULT_LOCALE}>
      <body>
        <main className="flex min-h-svh items-center justify-center bg-background px-6 py-20 text-center">
          <section className="max-w-md rounded-3xl bg-card p-8 shadow-card">
            <h1 className="text-3xl font-semibold text-accent">{GLOBAL_ERROR_TITLE}</h1>
            <p className="mt-4 text-text-secondary">{GLOBAL_ERROR_MESSAGE}</p>
            <button
              type="button"
              onClick={reset}
              className="mt-8 rounded-full bg-accent px-6 py-3 font-semibold text-white transition hover:bg-accent-hover"
            >
              {GLOBAL_ERROR_ACTION_LABEL}
            </button>
          </section>
        </main>
      </body>
    </html>
  )
}
