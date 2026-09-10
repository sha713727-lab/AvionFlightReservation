/**
 * Key Facts callout for answer-engine extraction.
 */
export default function KeyFactsBox({ title, facts }) {
  if (!facts?.length) {
    return null
  }

  return (
    <div className="key-facts rounded-2xl border border-border bg-card px-5 py-6 shadow-sm sm:px-6">
      <h3 className="font-heading text-lg font-semibold text-primary sm:text-xl">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm leading-relaxed text-text-secondary sm:text-base">
        {facts.map((fact) => (
          <li key={fact} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            <span>{fact}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
