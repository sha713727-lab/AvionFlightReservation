import { GEO_COPY } from '@/constants/geo'

/**
 * Compact comparison table for airline policy / fee themes.
 */
export default function ComparisonTable({ table }) {
  if (!table?.headers?.length || !table?.rows?.length) {
    return null
  }

  return (
    <section aria-labelledby="comparison-heading" className="scroll-mt-28">
      <h2 id="comparison-heading" className="font-heading text-xl font-semibold text-primary sm:text-2xl">
        {table.title}
      </h2>
      {table.caption ? (
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">{table.caption}</p>
      ) : (
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          {GEO_COPY.comparisonCaptionFallback}
        </p>
      )}
      <div className="mt-5 overflow-x-auto rounded-2xl border border-border">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-section-alt">
            <tr>
              {table.headers.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="border-b border-border px-4 py-3 font-semibold text-primary"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.join('|')} className="odd:bg-background even:bg-card">
                {row.map((cell, cellIndex) => (
                  <td
                    key={`${row[0]}-${cellIndex}`}
                    className="border-b border-border px-4 py-3 align-top text-text-secondary last:border-b-0"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
