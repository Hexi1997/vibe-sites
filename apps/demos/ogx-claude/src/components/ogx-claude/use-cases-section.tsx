import { CONTAINER } from "./constants";

const USE_CASES = [
  {
    platform: "Blog",
    desc: "Works with Next.js, Astro, Hugo, Ghost. Paste the URL in your frontmatter.",
    example: "og: https://ogx.dev/generate?title=...",
  },
  {
    platform: "Twitter / X",
    desc: "Make link previews stand out in the timeline. First impressions matter.",
    example: "twitter:image > og:image",
  },
  {
    platform: "Product Hunt",
    desc: "Launch day images that match your brand. Consistent. Professional.",
    example: "featured image · thumbnail · gallery",
  },
];

export function UseCasesSection() {
  return (
    <section className={`${CONTAINER} py-[72px]`}>
      <div className="mb-10">
        <div className="mb-3 text-[12px] font-medium tracking-[0.12em] uppercase text-[var(--color-og-muted)]">
          Use cases
        </div>
        <h2
          className="m-0 text-[clamp(20px,3vw,28px)] font-bold text-[var(--color-og-light)]"
        >
          Works wherever you publish
        </h2>
      </div>

      <div className="flex flex-col gap-0">
        {USE_CASES.map((c, i) => (
          <div
            key={i}
            className={[
              "grid gap-8 py-6 md:grid-cols-[160px_1fr]",
              i < USE_CASES.length - 1
                ? "border-b border-[rgba(15,0,0,0.3)]"
                : "",
            ].join(" ")}
          >
            <div
              className="text-[15px] font-bold text-[var(--color-og-light)]"
            >
              {c.platform}
            </div>
            <div>
              <p
                className="mb-2.5 mt-0 text-[14px] leading-[1.7] text-[var(--color-og-gray)]"
              >
                {c.desc}
              </p>
              <code
                className="rounded border border-[rgba(0,122,255,0.2)] bg-[rgba(0,122,255,0.08)] px-2 py-0.5 text-[12px] text-[var(--color-og-accent)]"
              >
                {c.example}
              </code>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
