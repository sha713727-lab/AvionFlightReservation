export default function PartnerLogo({ name, logoSrc, monogram, brandColor }) {
  return (
    <div className="group flex w-32 shrink-0 select-none flex-col items-center gap-3">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-card p-3 transition-all duration-300 group-hover:border-accent/30 group-hover:shadow-card-hover">
        {logoSrc ? (
          <img
            src={logoSrc}
            alt={`${name} logo`}
            width={40}
            height={40}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain"
          />
        ) : (
          <span
            className="text-sm font-semibold tracking-tight"
            style={{ color: brandColor }}
            aria-hidden
          >
            {monogram}
          </span>
        )}
      </div>
      <span className="text-center text-sm font-medium leading-tight text-text-muted transition-colors duration-300 group-hover:text-text">
        {name}
      </span>
    </div>
  )
}
