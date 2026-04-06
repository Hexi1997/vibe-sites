import { useState, useEffect } from "react";

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex flex-col gap-2"
      style={{ animation: "fadeInUp 0.4s cubic-bezier(0.16,1,0.3,1) both" }}
    >
      <a
        href="#pricing"
        className="px-5 py-3 rounded-full font-bold text-xs uppercase tracking-[1.4px] text-black shadow-lg transition-transform hover:scale-[1.04] active:scale-[0.96]"
        style={{ background: "#1ed760", boxShadow: "rgba(30,215,96,0.3) 0px 8px 24px" }}
      >
        免费下载
      </a>
    </div>
  );
}
