import { CONTAINER } from "./constants";

const FOOTER_COLS = [
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

export function FooterSection() {
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

          {FOOTER_COLS.map((col) => (
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
