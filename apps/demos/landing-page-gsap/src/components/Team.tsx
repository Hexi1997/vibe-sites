// src/components/Team.tsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const team = [
  { name: "Alex Chen", role: "创意总监", color: "#8b5cf6" },
  { name: "Sarah Liu", role: "设计主管", color: "#06b6d4" },
  { name: "Mike Wang", role: "技术总监", color: "#10b981" },
  { name: "Emma Zhang", role: "项目经理", color: "#f59e0b" },
];

export const Team = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      // Card entrance animation
      ScrollTrigger.batch(cardsRef.current.filter(Boolean), {
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.15,
              overwrite: true,
            }
          );
        },
        start: "top 85%",
        once: true,
      });

      // 3D tilt effect
      cardsRef.current.forEach((card) => {
        if (!card) return;

        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / 10;
          const rotateY = (centerX - x) / 10;

          gsap.to(card, {
            rotateX,
            rotateY,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        };

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="team"
      className="section section-light"
    >
      <div className="container">
        {/* Title */}
        <div className="text-center mb-20">
          <p className="text-sm uppercase tracking-[0.2em] text-violet-600 mb-4">
            Our Team
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900">
            认识我们
          </h2>
        </div>

        {/* Team Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          style={{ perspective: "1000px" }}
        >
          {team.map((member, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="relative group cursor-pointer opacity-0"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Avatar */}
              <div
                className="aspect-square rounded-2xl mb-4 overflow-hidden"
                style={{ background: member.color }}
              >
                <div className="w-full h-full flex items-center justify-center text-white/30 text-6xl font-bold">
                  {member.name[0]}
                </div>
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-stone-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-stone-600">{member.role}</p>
              </div>

              {/* Social Links (hover show) */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex flex-col gap-2">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-violet-600 text-sm">
                    in
                  </div>
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-violet-600 text-sm">
                    @
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
