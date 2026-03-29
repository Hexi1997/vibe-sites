// src/components/Stats.tsx
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 150, suffix: "+", label: "完成项目" },
  { value: 50, suffix: "+", label: "满意客户" },
  { value: 10, suffix: "+", label: "年经验" },
  { value: 30, suffix: "+", label: "设计大奖" },
];

export const Stats = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const hasAnimated = useRef(false);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => {
          if (hasAnimated.current) return;
          hasAnimated.current = true;

          // Number growth animation
          stats.forEach((stat, index) => {
            const obj = { value: 0 };
            gsap.to(obj, {
              value: stat.value,
              duration: 2,
              ease: "power2.out",
              onUpdate: () => {
                setCounts((prev) => {
                  const newCounts = [...prev];
                  newCounts[index] = Math.round(obj.value);
                  return newCounts;
                });
              },
            });
          });

          // Scale pulse after completion
          const statElements = sectionRef.current?.querySelectorAll(".stat-item");
          if (statElements) {
            gsap.fromTo(
              statElements,
              { scale: 1 },
              {
                scale: 1.05,
                duration: 0.3,
                stagger: 0.1,
                delay: 1.8,
                yoyo: true,
                repeat: 1,
              }
            );
          }
        },
        once: true,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="section section-dark py-20"
    >
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item text-center">
              <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-gradient mb-2">
                {counts[index]}
                {stat.suffix}
              </div>
              <p className="text-white/60 text-sm uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
