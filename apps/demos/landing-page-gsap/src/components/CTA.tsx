// src/components/CTA.tsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      // Background pulse animation
      gsap.to(glowRef.current, {
        scale: 1.2,
        opacity: 0.3,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: sectionRef }
  );

  // Magnetic button effect
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="section section-dark py-32 relative overflow-hidden"
    >
      {/* Pulsing Background */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.4), transparent 60%)`,
          transform: "scale(0.8)",
        }}
      />

      <div className="container text-center relative z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          准备好开始您的
          <br />
          <span className="text-gradient">下一个项目</span>了吗？
        </h2>
        <p className="text-lg text-white/60 max-w-2xl mx-auto mb-12">
          让我们一起将您的创意转化为令人惊叹的数字体验。无论是品牌重塑、网站设计还是动效开发，我们都准备好与您合作。
        </p>

        {/* Magnetic Button */}
        <button
          ref={buttonRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="px-12 py-5 bg-gradient-to-r from-violet-500 to-cyan-500 text-white text-lg font-medium rounded-full shadow-2xl shadow-violet-500/30 will-animate"
        >
          开始合作
        </button>
      </div>
    </section>
  );
};
