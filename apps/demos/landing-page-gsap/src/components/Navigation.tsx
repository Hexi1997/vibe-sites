// src/components/Navigation.tsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "作品", href: "#portfolio" },
  { label: "服务", href: "#features" },
  { label: "团队", href: "#team" },
  { label: "关于", href: "#stats" },
];

export const Navigation = () => {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Background transition on scroll
      gsap.to(navRef.current, {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        scrollTrigger: {
          trigger: document.body,
          start: "100px top",
          end: "200px top",
          scrub: true,
        },
      });

      // Logo scale
      gsap.to(logoRef.current, {
        scale: 0.9,
        scrollTrigger: {
          trigger: document.body,
          start: "100px top",
          end: "200px top",
          scrub: true,
        },
      });
    },
    { scope: navRef }
  );

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-colors"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div ref={logoRef} className="text-xl font-bold text-white will-animate">
          <span className="text-gradient">STUDIO</span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <button
          className="px-5 py-2 text-sm bg-gradient-to-r from-violet-500 to-cyan-500 text-white rounded-full hover:opacity-90 transition-opacity"
        >
          开始项目
        </button>
      </div>
    </nav>
  );
};
