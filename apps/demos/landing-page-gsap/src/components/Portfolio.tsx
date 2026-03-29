// src/components/Portfolio.tsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: "Neon Dreams", category: "品牌设计", color: "#8b5cf6" },
  { title: "Digital Canvas", category: "网站开发", color: "#06b6d4" },
  { title: "Motion Flow", category: "动效设计", color: "#10b981" },
  { title: "Pixel Perfect", category: "UI/UX", color: "#f59e0b" },
  { title: "Brand Soul", category: "品牌策略", color: "#ef4444" },
  { title: "Tech Vision", category: "网站开发", color: "#3b82f6" },
];

export const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scrollElement = scrollRef.current;
      const progressBar = progressRef.current;

      if (!scrollElement) return;

      // Calculate scroll distance
      const getScrollAmount = () => {
        return -(scrollElement.scrollWidth - window.innerWidth);
      };

      // Horizontal scroll animation
      const tween = gsap.to(scrollElement, {
        x: getScrollAmount,
        ease: "none",
      });

      // Create ScrollTrigger
      const st = ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top top",
        end: () => `+=${scrollElement.scrollWidth - window.innerWidth}`,
        pin: true,
        scrub: 1,
        animation: tween,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progressBar) {
            gsap.set(progressBar, { scaleX: self.progress });
          }
        },
      });

      // Card entrance animation
      const cards = scrollElement.querySelectorAll(".project-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left 80%",
              end: "left 20%",
              scrub: true,
            },
          }
        );
      });

      return () => {
        st.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="section section-light overflow-hidden"
    >
      {/* Title Area */}
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-violet-600 mb-4">
            Portfolio
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900">
            精选作品
          </h2>
        </div>
      </div>

      {/* Horizontal Scroll Area */}
      <div ref={triggerRef} className="relative">
        <div
          ref={scrollRef}
          className="flex gap-8 px-8 will-animate"
          style={{ width: "max-content" }}
        >
          {/* Left spacer */}
          <div className="w-[20vw]" />

          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card w-[70vw] md:w-[50vw] lg:w-[40vw] shrink-0 rounded-3xl overflow-hidden bg-stone-900 group cursor-pointer"
            >
              {/* Project Image Area */}
              <div
                className="h-[60vh] relative overflow-hidden"
                style={{ background: project.color }}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

                {/* Project Info */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-white/70 text-sm uppercase tracking-wider mb-2">
                    {project.category}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-bold text-white">
                    {project.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}

          {/* Right spacer */}
          <div className="w-[20vw]" />
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 h-1 bg-stone-200 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-violet-500 origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
};
