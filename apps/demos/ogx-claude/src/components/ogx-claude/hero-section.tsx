import { useEffect, useState } from "react";
import { CONTAINER } from "./constants";

const TERMINAL_LINES = [
  { prefix: "$", text: " ogx generate", color: "#fdfcfc" },
  { prefix: "→", text: " reading blog post...", color: "#9a9898" },
  { prefix: "→", text: " applying template: Terminal", color: "#9a9898" },
  { prefix: "✓", text: " og-image.png (1200×630)", color: "#30d158" },
];

export function HeroSection() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    TERMINAL_LINES.forEach((_, i) => {
      timers.push(
        setTimeout(
          () => setVisibleLines((v) => Math.max(v, i + 1)),
          600 + i * 700
        )
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className={`${CONTAINER} pb-16 pt-20`}>
      <div className="mb-6 inline-block rounded border border-[rgba(0,122,255,0.3)] px-2.5 py-[3px] text-[12px] font-medium tracking-[0.12em] uppercase text-[var(--color-og-accent)]">
        v1.0 — Now in beta
      </div>

      <h1
        className="mb-5 mt-0 max-w-[640px] text-[clamp(28px,5vw,52px)] font-bold leading-[1.18] text-[var(--color-og-light)]"
      >
        Generate OG Images
        <br />
        <span className="text-[var(--color-og-accent)]">in seconds.</span>
      </h1>

      <p
        className="mb-10 mt-0 max-w-[480px] text-[16px] leading-[1.7] text-[var(--color-og-gray)]"
      >
        No design skills needed. Type your content, pick a template,
        download a 1200×630 PNG. Works with any blog, any framework.
      </p>

      <div className="flex flex-wrap gap-3">
        <a
          href="#demo"
          className="rounded bg-[var(--color-og-light)] px-6 py-2 text-[14px] font-bold text-[var(--color-og-dark)]"
        >
          Start creating →
        </a>
        <a
          href="#"
          className="rounded border border-[#464040] bg-transparent px-6 py-2 text-[14px] font-medium text-[var(--color-og-gray)]"
        >
          View API docs
        </a>
      </div>

      <div className="mt-14 overflow-hidden rounded border border-[#464040] bg-[var(--color-og-dark-surface)]">
        <div className="flex items-center gap-2 border-b border-[rgba(15,0,0,0.4)] px-4 py-2.5">
          {["#ff3b30", "#ff9f0a", "#30d158"].map((c) => (
            <div
              key={c}
              className="h-2.5 w-2.5 rounded-full opacity-70"
              style={{ background: c }}
            />
          ))}
          <span className="ml-2 text-[12px] text-[var(--color-og-muted)]">
            ogx — zsh
          </span>
        </div>

        <div className="min-h-[100px] px-5 py-4">
          {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
            <div
              key={i}
              className="animate-[typing-fade_0.25s_ease-out_forwards] text-[13px] leading-[1.8]"
              style={{ color: line.color }}
            >
              <span className="mr-2 text-[var(--color-og-outline)]">
                {line.prefix}
              </span>
              {line.text}
            </div>
          ))}
          {visibleLines < TERMINAL_LINES.length && (
            <div className="text-[13px] leading-[1.8] text-[var(--color-og-light)]">
              <span className="mr-2 text-[var(--color-og-outline)]">$</span>
              <span className="animate-[blink_1.1s_step-end_infinite]">▋</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
