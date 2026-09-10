export default function JsonLd({ data }) {
  const graphs = (Array.isArray(data) ? data : [data]).filter(Boolean)

  return (
    <>
      {graphs.map((entry, index) => (
        <script
          key={`${entry['@type'] ?? 'jsonld'}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </>
  )
}
