import type { CSSProperties } from "react";

export interface OGCardProps {
  title: string;
  tag: string;
  author: string;
  template: number;
}

export const TEMPLATES = [
  {
    id: 0,
    name: "Terminal",
    bg: "#201d1d",
    accent: "#007aff",
    textColor: "#fdfcfc",
    subColor: "#9a9898",
    border: "#464040",
  },
  {
    id: 1,
    name: "Sage",
    bg: "#1a2420",
    accent: "#30d158",
    textColor: "#f0faf5",
    subColor: "#7aad8e",
    border: "#2a3d36",
  },
  {
    id: 2,
    name: "Amber",
    bg: "#201a10",
    accent: "#ff9f0a",
    textColor: "#fdf8ee",
    subColor: "#a08840",
    border: "#3d3020",
  },
  {
    id: 3,
    name: "Frost",
    bg: "#f8f7f7",
    accent: "#201d1d",
    textColor: "#201d1d",
    subColor: "#6e6e73",
    border: "rgba(15,0,0,0.12)",
  },
];

export function OGCard({ title, tag, author, template }: OGCardProps) {
  const t = TEMPLATES[template] ?? TEMPLATES[0];
  const displayTitle = title || "Your Blog Post Title Here";
  const displayTag = tag || "web development";
  const displayAuthor = author || "author";
  const vars = {
    "--bg": t.bg,
    "--accent": t.accent,
    "--text": t.textColor,
    "--sub": t.subColor,
    "--border": t.border,
  } as CSSProperties;

  return (
    <div
      style={vars}
      className="relative flex w-full flex-col justify-between overflow-hidden rounded border border-[var(--border)] bg-[var(--bg)] p-[clamp(20px,5%,48px)] [aspect-ratio:1200/630]"
    >
      <div className="absolute inset-x-0 top-0 h-[3px] bg-[var(--accent)]" />

      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-[1]">
        <div className="inline-block text-[clamp(9px,1.5vw,13px)] font-medium tracking-[0.1em] uppercase text-[var(--accent)] mb-[clamp(8px,2%,16px)]">
          # {displayTag}
        </div>

        <div className="max-w-[85%] text-[clamp(14px,3.2vw,28px)] font-bold leading-[1.3] text-[var(--text)]">
          {displayTitle}
        </div>
      </div>

      <div className="relative z-[1] flex items-end justify-between">
        <div>
          <div className="mb-1 text-[clamp(8px,1.2vw,11px)] text-[var(--sub)]">
            written by
          </div>
          <div className="text-[clamp(9px,1.5vw,13px)] font-medium text-[var(--text)]">
            @{displayAuthor}
          </div>
        </div>

        <div className="text-[clamp(8px,1.3vw,12px)] font-bold tracking-[0.05em] text-[var(--accent)] opacity-80">
          OGX
        </div>
      </div>
    </div>
  );
}
