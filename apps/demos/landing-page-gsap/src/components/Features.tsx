// src/components/Features.tsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: "✦",
    title: "品牌设计",
    description: "打造独特的品牌视觉识别系统，让您的品牌在市场中脱颖而出",
  },
  {
    icon: "◈",
    title: "UI/UX 设计",
    description: "以用户为中心的界面设计，创造流畅直观的数字体验",
  },
  {
    icon: "⟡",
    title: "动效设计",
    description: "精心设计的微交互和动画，让界面更具生命力",
  },
  {
    icon: "◇",
    title: "网站开发",
    description: "响应式网站开发，确保在各种设备上都有出色表现",
  },
  {
    icon: "✧",
    title: "创意策略",
    description: "数据驱动的创意策略，助力品牌实现商业目标",
  },
  {
    icon: "✶",
    title: "数字营销",
    description: "整合营销方案，提升品牌曝光和用户转化率",
  },
];

export const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      // Batch card entrance animation
      ScrollTrigger.batch(cardsRef.current.filter(Boolean), {
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.1,
              overwrite: true,
            }
          );
        },
        start: "top 85%",
        once: true,
      });

      // Icon hover effect
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const icon = card.querySelector(".feature-icon");

        card.addEventListener("mouseenter", () => {
          gsap.to(icon, {
            rotateY: 360,
            duration: 0.6,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.set(icon, { rotateY: 0 });
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="features"
      className="section section-light"
    >
      <div className="container">
        {/* Title */}
        <div className="text-center mb-20">
          <p className="text-sm uppercase tracking-[0.2em] text-violet-600 mb-4">
            Services
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900">
            我们的服务
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow cursor-pointer will-animate opacity-0"
              style={{ perspective: "1000px" }}
            >
              <div
                className="feature-icon text-4xl mb-6 text-violet-500"
                style={{ transformStyle: "preserve-3d" }}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-stone-900">
                {feature.title}
              </h3>
              <p className="text-stone-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
