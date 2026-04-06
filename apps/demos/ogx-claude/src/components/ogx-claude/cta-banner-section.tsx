import { CONTAINER } from "./constants";

export function CtaBannerSection() {
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
