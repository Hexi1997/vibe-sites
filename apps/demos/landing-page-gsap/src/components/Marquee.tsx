// src/components/Marquee.tsx
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const marqueeText = "BRANDING · UI/UX · MOTION · WEB DEVELOPMENT · ";

export const Marquee = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;

    if (!row1 || !row2) return;

    // Row 1: scroll left
    gsap.to(row1, {
      xPercent: -50,
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    // Row 2: scroll right
    gsap.fromTo(
      row2,
      { xPercent: -50 },
      {
        xPercent: 0,
        duration: 20,
        ease: "none",
        repeat: -1,
      }
    );

    return () => {
      gsap.killTweensOf([row1, row2]);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-12 bg-stone-900 overflow-hidden"
    >
      {/* Row 1 */}
      <div className="flex whitespace-nowrap mb-4">
        <div ref={row1Ref} className="flex">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="text-4xl md:text-6xl font-bold text-white/20 px-4"
            >
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex whitespace-nowrap">
        <div ref={row2Ref} className="flex">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="text-4xl md:text-6xl font-bold text-white/20 px-4"
            >
              {marqueeText}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
