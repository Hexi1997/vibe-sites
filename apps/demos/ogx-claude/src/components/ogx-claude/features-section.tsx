import { CONTAINER } from "./constants";

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

export function FeaturesSection() {
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
