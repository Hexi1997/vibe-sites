// src/components/Footer.tsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  {
    title: "服务",
    links: ["品牌设计", "UI/UX", "网站开发", "动效设计"],
  },
  {
    title: "公司",
    links: ["关于我们", "团队", "职业机会", "联系我们"],
  },
  {
    title: "资源",
    links: ["博客", "案例研究", "设计系统", "API"],
  },
];

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useGSAP(
    () => {
      // Links stagger entrance
      ScrollTrigger.batch(linksRef.current.filter(Boolean), {
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.03,
              ease: "power2.out",
              overwrite: true,
            }
          );
        },
        start: "top 90%",
        once: true,
      });
    },
    { scope: footerRef }
  );

  let linkIndex = 0;

  return (
    <footer ref={footerRef} className="section-dark py-20 border-t border-white/10">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="text-2xl font-bold mb-4">
              <span className="text-gradient">STUDIO</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              用创意和技术打造独特的数字体验，帮助品牌在数字世界中脱颖而出。
            </p>
          </div>

          {/* Link Columns */}
          {footerLinks.map((column, colIndex) => (
            <div key={colIndex}>
              <h4 className="text-white font-bold mb-4">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      ref={(el) => {
                        linksRef.current[linkIndex++] = el;
                      }}
                      href="#"
                      className="text-white/50 hover:text-white transition-colors text-sm opacity-0"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
          <p className="text-white/30 text-sm mb-4 md:mb-0">
            © 2024 Studio. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Twitter", "Instagram", "LinkedIn", "Dribbble"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-white/50 hover:text-white transition-colors text-sm"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
