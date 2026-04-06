import { CONTAINER } from "./constants";

const API_EXAMPLE = `# Generate an OG image via URL
GET https://ogx.dev/api/og
  ?title=My+Post+Title
  ?author=hexi
  ?tag=web
  ?template=terminal

# Returns a 1200×630 PNG
# Cache-Control: public, max-age=31536000`;

export function ApiSection() {
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
              {API_EXAMPLE.split("\n").map((line, i) => {
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
