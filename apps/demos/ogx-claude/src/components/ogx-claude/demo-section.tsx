import { useState, type CSSProperties } from "react";
import { CONTAINER } from "./constants";
import { OGCard, TEMPLATES } from "./og-card";

export function DemoSection() {
  const [title, setTitle] = useState("How I built an OG image generator in a weekend");
  const [tag, setTag] = useState("indie hacking");
  const [author, setAuthor] = useState("hexi");
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const inputClass =
    "w-full rounded border border-[#464040] bg-[var(--color-og-dark-surface)] px-3 py-2 text-[13px] text-[var(--color-og-light)] placeholder:text-[var(--color-og-muted)] outline-none transition-colors duration-100 focus:border-[var(--color-og-accent)]";

  return (
    <section id="demo" className="border-y border-[rgba(15,0,0,0.3)] bg-[#1a1717]">
      <div className={`${CONTAINER} py-[72px]`}>
        <div className="mb-10">
          <div className="mb-3 text-[12px] font-medium tracking-[0.12em] uppercase text-[var(--color-og-muted)]">
            Live Demo
          </div>
          <h2
            className="m-0 text-[clamp(20px,3vw,28px)] font-bold text-[var(--color-og-light)]"
          >
            Try it yourself
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr_1.6fr]">
          <div>
            <div className="mb-5">
              <label
                className="mb-1.5 block text-[12px] font-medium tracking-[0.06em] text-[var(--color-og-gray)]"
              >
                TITLE
              </label>
              <textarea
                className={`${inputClass} resize-none`}
                rows={3}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Your blog post title"
              />
            </div>

            <div className="mb-5">
              <label
                className="mb-1.5 block text-[12px] font-medium tracking-[0.06em] text-[var(--color-og-gray)]"
              >
                TAG
              </label>
              <input
                className={inputClass}
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="web development"
              />
            </div>

            <div className="mb-7">
              <label
                className="mb-1.5 block text-[12px] font-medium tracking-[0.06em] text-[var(--color-og-gray)]"
              >
                AUTHOR
              </label>
              <input
                className={inputClass}
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="your handle"
              />
            </div>

            <div>
              <div
                className="mb-2.5 text-[12px] font-medium tracking-[0.06em] text-[var(--color-og-gray)]"
              >
                TEMPLATE
              </div>
              <div className="grid grid-cols-2 gap-2">
                {TEMPLATES.map((t, i) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTemplate(i)}
                    style={{ "--accent": t.accent } as CSSProperties}
                    className={[
                      "flex cursor-pointer items-center gap-2 rounded border px-3 py-2 text-left transition-colors duration-100",
                      selectedTemplate === i
                        ? "border-[var(--accent)] bg-[var(--color-og-dark-surface)]"
                        : "border-[#464040] bg-transparent",
                    ].join(" ")}
                  >
                    <div
                      className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[var(--accent)]"
                    />
                    <span
                      className={[
                        "text-[12px]",
                        selectedTemplate === i
                          ? "font-bold text-[var(--color-og-light)]"
                          : "font-normal text-[var(--color-og-gray)]",
                      ].join(" ")}
                    >
                      {t.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="mt-6 w-full cursor-pointer rounded bg-[var(--color-og-accent)] py-2.5 text-[13px] font-bold tracking-[0.04em] text-[var(--color-og-light)] transition-opacity duration-100 hover:opacity-85"
            >
              Download PNG →
            </button>
          </div>

          <div>
            <div
              className="mb-2.5 text-[11px] font-medium tracking-[0.08em] text-[var(--color-og-muted)]"
            >
              PREVIEW — 1200×630
            </div>
            <OGCard
              title={title}
              tag={tag}
              author={author}
              template={selectedTemplate}
            />
            <div
              className="mt-3 text-right text-[11px] text-[var(--color-og-muted)]"
            >
              Updating in real-time
              <span
                className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-og-green)] align-middle"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
