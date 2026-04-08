import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "功能", href: "#features" },
  { label: "试听", href: "#player" },
  { label: "价格", href: "#pricing" },
  { label: "联系", href: "#contact" },
] as const;

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0"}`}
        style={{
          background: "rgba(18,18,18,0.95)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      />
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 bottom-0 h-px bg-[#2a2a2a] transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0"}`}
      />

      <div className="relative max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#1ed760" }}>
            <span className="text-black text-sm font-black">E</span>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">Echo</span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-4 py-2 rounded-full text-sm font-bold text-[#b3b3b3] hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="#pricing" className="text-sm font-bold text-[#b3b3b3] hover:text-white transition-colors px-4 py-2">
            登录
          </a>
          <a
            href="#pricing"
            className="px-5 py-2 rounded-full text-sm font-bold uppercase tracking-[1.4px] transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "#1ed760", color: "#000" }}
          >
            免费下载
          </a>
        </div>

        <button
          type="button"
          className="md:hidden text-white text-xl"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen ? (
        <div className="relative md:hidden border-t border-[#2a2a2a] bg-[#181818] px-6 py-4 space-y-2">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-[#b3b3b3] hover:text-white font-bold text-sm border-b border-[#2a2a2a]"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#pricing"
            className="block mt-3 text-center py-3 rounded-full font-bold text-sm uppercase tracking-[1.4px]"
            style={{ background: "#1ed760", color: "#000" }}
          >
            免费下载
          </a>
        </div>
      ) : null}
    </nav>
  );
}
