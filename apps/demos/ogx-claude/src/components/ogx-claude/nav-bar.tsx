import { useState } from "react";
import { CONTAINER } from "./constants";

export function NavBar() {
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
