import Container from '@/components/ui/Container'
import { CATALOG_UI } from '@/constants/catalogUi'

export default function CatalogStatus({ state, message }) {
  const text =
    message ||
    (state === 'loading'
      ? CATALOG_UI.loading
      : state === 'empty'
        ? CATALOG_UI.empty
        : CATALOG_UI.error)

  return (
    <Container>
      <p
        role={state === 'error' ? 'alert' : 'status'}
        className="py-16 text-center text-sm text-text-muted"
      >
        {text}
      </p>
    </Container>
  )
}
