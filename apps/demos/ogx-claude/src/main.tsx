import { StrictMode, useEffect, useState, type CSSProperties } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

// ─── Types ───────────────────────────────────────────────────────────────────

interface OGCardProps {
  title: string;
  tag: string;
  author: string;
  template: number;
}

const CONTAINER = "mx-auto max-w-[900px] px-6";

// ─── OG Card Preview ─────────────────────────────────────────────────────────

const TEMPLATES = [
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

function OGCard({ title, tag, author, template }: OGCardProps) {
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
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-[var(--accent)]" />

      {/* Grid lines decoration */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-[1]">
        {/* Tag */}
        <div className="inline-block text-[clamp(9px,1.5vw,13px)] font-medium tracking-[0.1em] uppercase text-[var(--accent)] mb-[clamp(8px,2%,16px)]">
          # {displayTag}
        </div>

        {/* Title */}
        <div className="max-w-[85%] text-[clamp(14px,3.2vw,28px)] font-bold leading-[1.3] text-[var(--text)]">
          {displayTitle}
        </div>
      </div>

      {/* Bottom row */}
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

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-[100] border-b border-[rgba(15,0,0,0.3)] bg-[var(--color-og-dark)]">
      <div className={`${CONTAINER} flex h-12 items-center justify-between`}>
        <div className="text-[15px] font-bold tracking-[0.02em] text-[var(--color-og-light)]">
          OGX<span className="text-[var(--color-og-accent)]">.</span>
        </div>

        <div className="hidden items-center gap-4 sm:gap-8 md:flex">
          {["Templates", "Docs", "Pricing"].map((item) => (
            <a
              key={item}
              href="#"
              className="relative text-[14px] font-medium text-[var(--color-og-light)] transition-colors duration-100 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-[var(--color-og-light)] after:transition-transform after:duration-150 after:content-[''] hover:after:scale-x-100"
            >
              {item}
            </a>
          ))}
          <a
            href="#demo"
            className="rounded whitespace-nowrap bg-[var(--color-og-light)] px-4 py-1 text-[13px] font-bold text-[var(--color-og-dark)] transition-opacity duration-100 hover:opacity-85"
          >
            Start free
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded border border-[rgba(15,0,0,0.35)] bg-[rgba(48,44,44,0.35)] text-[var(--color-og-light)] transition-colors duration-100 hover:bg-[rgba(48,44,44,0.55)] md:hidden"
        >
          {open ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      <div className={["md:hidden", open ? "block" : "hidden"].join(" ")}>
        <div className="border-t border-[rgba(15,0,0,0.3)] bg-[var(--color-og-dark)]">
          <div className={`${CONTAINER} py-3`}>
            <div className="flex flex-col gap-2">
              {["Templates", "Docs", "Pricing"].map((item) => (
                <a
                  key={item}
                  href="#"
                  onClick={() => setOpen(false)}
                  className="rounded px-3 py-2 text-[14px] font-medium text-[var(--color-og-light)] transition-colors duration-100 hover:bg-[rgba(48,44,44,0.45)]"
                >
                  {item}
                </a>
              ))}
            </div>

            <a
              href="#demo"
              onClick={() => setOpen(false)}
              className="mt-3 block rounded bg-[var(--color-og-light)] px-3 py-2 text-center text-[13px] font-bold text-[var(--color-og-dark)] transition-opacity duration-100 hover:opacity-85"
            >
              Start free
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

const TERMINAL_LINES = [
  { prefix: "$", text: " ogx generate", color: "#fdfcfc" },
  { prefix: "→", text: " reading blog post...", color: "#9a9898" },
  { prefix: "→", text: " applying template: Terminal", color: "#9a9898" },
  { prefix: "✓", text: " og-image.png (1200×630)", color: "#30d158" },
];

function Hero() {
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
      {/* Eyebrow */}
      <div className="mb-6 inline-block rounded border border-[rgba(0,122,255,0.3)] px-2.5 py-[3px] text-[12px] font-medium tracking-[0.12em] uppercase text-[var(--color-og-accent)]">
        v1.0 — Now in beta
      </div>

      {/* Headline */}
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

      {/* Terminal block */}
      <div className="mt-14 overflow-hidden rounded border border-[#464040] bg-[var(--color-og-dark-surface)]">
        {/* Window chrome */}
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

        {/* Terminal content */}
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

// ─── Live Demo ────────────────────────────────────────────────────────────────

function Demo() {
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
          {/* Left: inputs */}
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

            {/* Template selector */}
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

            {/* Download button */}
            <button
              className="mt-6 w-full cursor-pointer rounded bg-[var(--color-og-accent)] py-2.5 text-[13px] font-bold tracking-[0.04em] text-[var(--color-og-light)] transition-opacity duration-100 hover:opacity-85"
            >
              Download PNG →
            </button>
          </div>

          {/* Right: live preview */}
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

// ─── Templates showcase ───────────────────────────────────────────────────────

const SHOWCASE_ITEMS = [
  { title: "The Art of Minimalist Design", tag: "design", author: "sara" },
  { title: "My 2024 Stack: Tools I Actually Use", tag: "devtools", author: "wei" },
  { title: "Shipping Fast Without Breaking Things", tag: "startup", author: "alex" },
  { title: "Zero to 1000 Users in 30 Days", tag: "growth", author: "kira" },
];

function Templates() {
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

// ─── Features ─────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: "◈",
    name: "Visual Editor",
    desc: "See your OG image update as you type. No code required — just fill in the fields.",
    accent: "#007aff",
  },
  {
    icon: "⌁",
    name: "API Support",
    desc: "Automate image generation via HTTP. Pass ?title=...&author=... and get a PNG back.",
    accent: "#30d158",
  },
  {
    icon: "◐",
    name: "Custom Fonts",
    desc: "Upload your brand fonts and apply them to any template. Your brand, your rules.",
    accent: "#ff9f0a",
  },
  {
    icon: "⊞",
    name: "Template Market",
    desc: "Browse community-built templates. New designs added every week.",
    accent: "#9a9898",
  },
];

function Features() {
  return (
    <section className="border-t border-[rgba(15,0,0,0.3)] bg-[#1a1717]">
      <div className={`${CONTAINER} py-[72px]`}>
        <div className="mb-12">
          <div className="mb-3 text-[12px] font-medium tracking-[0.12em] uppercase text-[var(--color-og-muted)]">
            Features
          </div>
          <h2
            className="m-0 text-[clamp(20px,3vw,28px)] font-bold text-[var(--color-og-light)]"
          >
            Everything you need
          </h2>
        </div>

        <div className="grid gap-0 md:grid-cols-2">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className={[
                "py-7",
                i < 2 ? "border-b border-[rgba(15,0,0,0.3)]" : "",
                i % 2 === 0 ? "md:border-r md:border-[rgba(15,0,0,0.3)] md:pr-8" : "md:pl-8",
              ].join(" ")}
            >
              <div
                className="mb-3 text-[20px] leading-none"
                style={{ color: f.accent }}
              >
                {f.icon}
              </div>
              <div
                className="mb-2 text-[15px] font-bold text-[var(--color-og-light)]"
              >
                {f.name}
              </div>
              <div
                className="max-w-[280px] text-[13px] leading-[1.7] text-[var(--color-og-gray)]"
              >
                {f.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Use cases ────────────────────────────────────────────────────────────────

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

function UseCases() {
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

// ─── API snippet ──────────────────────────────────────────────────────────────

function APISection() {
  const code = `# Generate an OG image via URL
GET https://ogx.dev/api/og
  ?title=My+Post+Title
  ?author=hexi
  ?tag=web
  ?template=terminal

# Returns a 1200×630 PNG
# Cache-Control: public, max-age=31536000`;

  return (
    <section className="border-t border-[rgba(15,0,0,0.3)] bg-[#1a1717]">
      <div className={`${CONTAINER} py-[72px]`}>
        <div className="grid items-start gap-12 md:grid-cols-[1fr_1.4fr]">
          <div>
            <div
              className="mb-3 text-[12px] font-medium tracking-[0.12em] uppercase text-[var(--color-og-muted)]"
            >
              API
            </div>
            <h2
              className="mb-4 mt-0 text-[clamp(20px,3vw,28px)] font-bold text-[var(--color-og-light)]"
            >
              Automate with the API
            </h2>
            <p
              className="mb-6 mt-0 text-[14px] leading-[1.8] text-[var(--color-og-gray)]"
            >
              Generate images programmatically from your SSG or CI pipeline.
              Just a URL — no SDK required.
            </p>
            <a
              href="#"
              className="text-[13px] font-medium text-[var(--color-og-accent)] underline"
            >
              Read the full docs →
            </a>
          </div>

          <div
            className="overflow-hidden rounded border border-[#464040] bg-[var(--color-og-dark-surface)]"
          >
            <div
              className="flex items-center gap-2 border-b border-[rgba(15,0,0,0.4)] px-4 py-2"
            >
              <span className="text-[11px] text-[var(--color-og-green)]">●</span>
              <span className="text-[11px] text-[var(--color-og-muted)]">
                example.sh
              </span>
            </div>
            <pre
              className="m-0 overflow-x-auto whitespace-pre p-5 text-[12px] leading-[1.8] text-[var(--color-og-gray)]"
            >
              {code.split("\n").map((line, i) => {
                if (line.startsWith("#")) {
                  return (
                    <span key={i} className="text-[var(--color-og-muted)]">
                      {line}
                      {"\n"}
                    </span>
                  );
                }
                if (line.startsWith("GET")) {
                  return (
                    <span key={i}>
                      <span className="text-[var(--color-og-green)]">GET</span>
                      <span className="text-[var(--color-og-light)]">{line.slice(3)}</span>
                      {"\n"}
                    </span>
                  );
                }
                if (line.startsWith("  ?")) {
                  const [k, v] = line.slice(3).split("=");
                  return (
                    <span key={i}>
                      {"  "}
                      <span className="text-[var(--color-og-orange)]">?</span>
                      <span className="text-[var(--color-og-accent)]">{k}</span>
                      =
                      <span className="text-[var(--color-og-light)]">{v}</span>
                      {"\n"}
                    </span>
                  );
                }
                return <span key={i}>{line}{"\n"}</span>;
              })}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

const PLANS = [
  {
    name: "Free",
    price: "$0",
    per: "forever",
    features: [
      "3 base templates",
      "100 generations / month",
      "OGX watermark",
      "PNG export",
    ],
    cta: "Get started",
    accent: false,
  },
  {
    name: "Pro",
    price: "$9",
    per: "per month",
    features: [
      "All templates + new releases",
      "Unlimited generations",
      "No watermark",
      "API access (10k req/mo)",
      "Custom fonts",
    ],
    cta: "Start Pro trial",
    accent: true,
  },
];

function Pricing() {
  return (
    <section className={`${CONTAINER} py-[72px]`}>
      <div className="mb-12">
        <div className="mb-3 text-[12px] font-medium tracking-[0.12em] uppercase text-[var(--color-og-muted)]">
          Pricing
        </div>
        <h2
          className="m-0 text-[clamp(20px,3vw,28px)] font-bold text-[var(--color-og-light)]"
        >
          Simple, honest pricing
        </h2>
      </div>

      <div
        className="grid max-w-[600px] gap-4 md:grid-cols-2"
      >
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={[
              "rounded border p-7",
              plan.accent
                ? "border-[var(--color-og-accent)] bg-[var(--color-og-dark-surface)]"
                : "border-[#464040] bg-transparent",
            ].join(" ")}
          >
            <div
              className={[
                "mb-4 text-[12px] font-bold tracking-[0.1em] uppercase",
                plan.accent
                  ? "text-[var(--color-og-accent)]"
                  : "text-[var(--color-og-gray)]",
              ].join(" ")}
            >
              {plan.name}
            </div>
            <div
              className="mb-1 text-[32px] font-bold leading-none text-[var(--color-og-light)]"
            >
              {plan.price}
            </div>
            <div
              className="mb-6 text-[12px] text-[var(--color-og-muted)]"
            >
              {plan.per}
            </div>

            <div className="mb-7">
              {plan.features.map((f) => (
                <div
                  key={f}
                  className="flex items-baseline gap-2 text-[13px] leading-[2] text-[var(--color-og-gray)]"
                >
                  <span className="shrink-0 text-[var(--color-og-green)]">+</span>
                  {f}
                </div>
              ))}
            </div>

            <button
              className={[
                "w-full cursor-pointer rounded py-2 text-[13px] font-bold transition-opacity duration-100 hover:opacity-85",
                plan.accent
                  ? "border border-transparent bg-[var(--color-og-accent)] text-[var(--color-og-light)]"
                  : "border border-[#464040] bg-transparent text-[var(--color-og-gray)]",
              ].join(" ")}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────

function CTABanner() {
  return (
    <section className="border-t border-[rgba(15,0,0,0.3)] bg-[#1a1717]">
      <div className={`${CONTAINER} py-20 text-center`}>
        <div
          className="mb-4 text-[12px] font-medium tracking-[0.12em] uppercase text-[var(--color-og-accent)]"
        >
          Get started
        </div>
        <h2
          className="mx-auto mb-4 mt-0 max-w-[500px] text-[clamp(22px,4vw,38px)] font-bold leading-[1.25] text-[var(--color-og-light)]"
        >
          Your first OG image is 10 seconds away.
        </h2>
        <p
          className="mx-auto mb-8 mt-0 max-w-[340px] text-[14px] leading-[1.7] text-[var(--color-og-gray)]"
        >
          Free to start. No credit card. No design software.
        </p>
        <a
          href="#demo"
          className="inline-block rounded bg-[var(--color-og-light)] px-8 py-2.5 text-[14px] font-bold text-[var(--color-og-dark)]"
        >
          Try OGX free →
        </a>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const cols = [
    {
      title: "Product",
      links: ["Editor", "Templates", "API", "Changelog"],
    },
    {
      title: "Resources",
      links: ["Docs", "Examples", "Blog", "Status"],
    },
    {
      title: "Company",
      links: ["About", "Twitter", "GitHub", "Contact"],
    },
  ];

  return (
    <footer
      className="border-t border-[rgba(15,0,0,0.3)] bg-[var(--color-og-dark)]"
    >
      <div
        className={`${CONTAINER} pb-8 pt-12`}
      >
        <div
          className="mb-12 grid gap-8 md:grid-cols-[1.5fr_1fr_1fr_1fr]"
        >
          <div>
            <div
              className="mb-3 text-[18px] font-bold text-[var(--color-og-light)]"
            >
              OGX<span className="text-[var(--color-og-accent)]">.</span>
            </div>
            <p
              className="m-0 max-w-[200px] text-[13px] leading-[1.7] text-[var(--color-og-muted)]"
            >
              The developer-focused OG image generator. Built for speed.
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <div
                className="mb-4 text-[12px] font-bold tracking-[0.08em] text-[var(--color-og-light)]"
              >
                {col.title}
              </div>
              {col.links.map((link) => (
                <div key={link} className="mb-2.5">
                  <a
                    href="#"
                    className="text-[13px] text-[var(--color-og-gray)] transition-colors duration-100 hover:text-[var(--color-og-light)]"
                  >
                    {link}
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div
          className="flex items-center justify-between border-t border-[rgba(15,0,0,0.3)] pt-6"
        >
          <span className="text-[12px] text-[var(--color-og-muted)]">
            © 2024 OGX. All rights reserved.
          </span>
          <span className="text-[12px] text-[var(--color-og-muted)]">
            Built with{" "}
            <span className="text-[var(--color-og-red)]">♥</span>
            {" "}for the open web
          </span>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Demo />
        <Templates />
        <Features />
        <UseCases />
        <APISection />
        <Pricing />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
