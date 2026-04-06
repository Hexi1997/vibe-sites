import { CONTAINER } from "./constants";
import { OGCard, TEMPLATES } from "./og-card";

const SHOWCASE_ITEMS = [
  { title: "The Art of Minimalist Design", tag: "design", author: "sara" },
  { title: "My 2024 Stack: Tools I Actually Use", tag: "devtools", author: "wei" },
  { title: "Shipping Fast Without Breaking Things", tag: "startup", author: "alex" },
  { title: "Zero to 1000 Users in 30 Days", tag: "growth", author: "kira" },
];

export function TemplatesSection() {
  return (
    <section className={`${CONTAINER} py-[72px]`}>
      <div className="mb-10">
        <div className="mb-3 text-[12px] font-medium tracking-[0.12em] uppercase text-[var(--color-og-muted)]">
          Templates
        </div>
        <h2
          className="mb-2.5 mt-0 text-[clamp(20px,3vw,28px)] font-bold text-[var(--color-og-light)]"
        >
          Ready-made templates
        </h2>
        <p className="m-0 text-[14px] text-[var(--color-og-gray)]">
          Pick one, fill in the blanks. Your image is ready.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {SHOWCASE_ITEMS.map((item, i) => (
          <div
            key={i}
            className="cursor-pointer overflow-hidden rounded border border-[var(--color-og-dark-surface)] transition-colors duration-150 hover:border-[var(--color-og-outline)]"
          >
            <OGCard
              title={item.title}
              tag={item.tag}
              author={item.author}
              template={i % TEMPLATES.length}
            />
            <div
              className="flex items-center justify-between border-t border-[var(--color-og-dark-surface)] px-3 py-2.5"
            >
              <span className="text-[12px] font-medium text-[var(--color-og-gray)]">
                {TEMPLATES[i % TEMPLATES.length].name}
              </span>
              <span
                className="cursor-pointer text-[11px] text-[var(--color-og-accent)] underline"
              >
                Use template
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
