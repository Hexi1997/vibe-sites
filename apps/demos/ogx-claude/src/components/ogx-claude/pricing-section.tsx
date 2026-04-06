import { CONTAINER } from "./constants";

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

export function PricingSection() {
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
              type="button"
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
