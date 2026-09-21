import BlogRichText from '@/modules/blog/components/BlogRichText'
import { BLOG_LINK_MAP } from '@/modules/blog/constants/blogHelpers'

export default function BlogPostBody({ blocks }) {
  return (
    <div className="space-y-5 text-sm leading-relaxed text-text-secondary sm:text-base">
      {blocks.map((block, index) => {
        if (block.type === 'h2') {
          return (
            <h2
              key={`h2-${block.id || index}`}
              id={block.id}
              className="scroll-mt-28 pt-4 font-heading text-xl font-semibold text-primary sm:text-2xl"
            >
              {block.text}
            </h2>
          )
        }

        if (block.type === 'h3') {
          return (
            <h3
              key={`h3-${block.id || index}`}
              id={block.id}
              className="scroll-mt-28 pt-2 font-heading text-lg font-semibold text-primary"
            >
              {block.text}
            </h3>
          )
        }

        if (block.type === 'ul') {
          return (
            <ul key={`ul-${index}`} className="space-y-2 pl-1">
              {block.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span>
                    <BlogRichText text={item} linkMap={BLOG_LINK_MAP} />
                  </span>
                </li>
              ))}
            </ul>
          )
        }

        if (block.type === 'ol') {
          return (
            <ol key={`ol-${index}`} className="list-decimal space-y-2 pl-5">
              {block.items.map((item) => (
                <li key={item} className="pl-1">
                  <BlogRichText text={item} linkMap={BLOG_LINK_MAP} />
                </li>
              ))}
            </ol>
          )
        }

        return (
          <p key={`p-${index}`}>
            <BlogRichText text={block.text} linkMap={BLOG_LINK_MAP} />
          </p>
        )
      })}
    </div>
  )
}
