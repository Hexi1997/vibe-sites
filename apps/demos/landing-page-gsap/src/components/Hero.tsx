// src/components/Hero.tsx
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // Word-by-word title animation
        const words = titleRef.current?.querySelectorAll(".word");
        if (words) {
          gsap.fromTo(
            words,
            { y: 100, opacity: 0, rotateX: -90 },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              duration: 1.2,
              ease: "power4.out",
              stagger: 0.1,
              delay: 0.5,
            }
          );
        }

        // Subtitle entrance
        gsap.fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, delay: 1.5, ease: "power3.out" }
        );

        // Background glow parallax
        gsap.to(glowRef.current, {
          y: "-30%",
          scale: 1.5,
          opacity: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        // Title fade out on scroll
        if (words) {
          gsap.to(words, {
            y: -100,
            opacity: 0,
            rotateX: 90,
            stagger: 0.05,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "center top",
              end: "bottom top",
              scrub: 1,
            },
          });
        }
      }, sectionRef);

      return () => ctx.revert();
    },
    { scope: sectionRef }
  );

  const titleWords = ["设计", "与", "技术", "的", "完美", "融合"];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden section-dark"
      style={{ background: "#0a0a0f" }}
    >
      {/* Background Glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-50"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.3), transparent 50%)`,
        }}
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, #0a0a0f 100%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Tag */}
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-400 mb-6">
          Creative Studio
        </p>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 will-animate"
          style={{ perspective: "1000px" }}
        >
          {titleWords.map((word, i) => (
            <span
              key={i}
              className="word inline-block mx-1"
              style={{ transformStyle: "preserve-3d" }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10"
        >
          我们用创意和技术打造独特的数字体验，帮助品牌在数字世界中脱颖而出
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center">
          <button className="px-8 py-4 bg-gradient-to-r from-violet-500 to-cyan-500 text-white rounded-full font-medium hover:scale-105 transition-transform">
            探索作品
          </button>
          <button className="px-8 py-4 border border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-colors">
            联系我们
          </button>
        </div>
      </div>

      {/* Decorative Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-violet-400/50 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Float Animation CSS */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
};
