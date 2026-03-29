// src/components/Testimonials.tsx
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const testimonials = [
  {
    quote: "与这个团队合作是一次令人惊叹的体验。他们不仅理解我们的愿景，还将其提升到了一个全新的高度。",
    name: "李明",
    company: "科技创新有限公司",
  },
  {
    quote: "专业、高效、富有创意。他们帮我们打造的品牌形象完美地传达了公司的价值观。",
    name: "王芳",
    company: "未来传媒集团",
  },
  {
    quote: "从最初的概念到最终的交付，整个过程都非常顺畅。网站的设计和性能都超出了我们的预期。",
    name: "张伟",
    company: "智能商务咨询",
  },
];

export const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Auto carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Switch animation
  useGSAP(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [activeIndex]);

  return (
    <section ref={sectionRef} className="section section-light py-20">
      <div className="container max-w-4xl">
        {/* Title */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-violet-600 mb-4">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900">
            客户评价
          </h2>
        </div>

        {/* Testimonial Content */}
        <div className="relative">
          {/* Quote Decoration */}
          <div className="absolute -top-8 left-0 text-8xl text-violet-200 font-serif">
            &ldquo;
          </div>

          <div ref={contentRef} className="text-center px-8">
            <p className="text-xl md:text-2xl text-stone-700 leading-relaxed mb-8">
              {testimonials[activeIndex].quote}
            </p>
            <div>
              <p className="font-bold text-stone-900">
                {testimonials[activeIndex].name}
              </p>
              <p className="text-stone-500 text-sm">
                {testimonials[activeIndex].company}
              </p>
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-violet-600 w-8"
                    : "bg-stone-300 hover:bg-stone-400 w-3"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
