# Landing Page GSAP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个创意设计工作室官网，包含 9 个版块，使用 GSAP + ScrollTrigger 实现丰富的视差滚动、固定滚动和交互动效。

**Architecture:** 使用 React 函数组件 + hooks，每个 Section 独立封装 GSAP 动画逻辑。使用 @gsap/react 的 useGSAP hook 自动处理 cleanup。ScrollTrigger 用于滚动驱动的动画控制。

**Tech Stack:** React + TypeScript + Vite + GSAP (@gsap/react, ScrollTrigger)

---

## File Structure

```
src/
├── main.tsx                    # 入口文件，渲染 App
├── App.tsx                     # 主组件，组合所有 sections
├── styles.css                  # 全局样式（已存在，需扩展）
├── components/
│   ├── Navigation.tsx          # 固定导航栏 + 滚动效果
│   ├── Hero.tsx                # 全屏 Hero + 固定滚动 + 粒子
│   ├── Marquee.tsx             # 无限滚标语
│   ├── Features.tsx            # 特性卡片网格
│   ├── Portfolio.tsx           # 水平滚动画廊
│   ├── Team.tsx                # 团队成员 + 3D tilt
│   ├── Stats.tsx               # 数字滚动统计
│   ├── Testimonials.tsx        # 评价轮播
│   ├── CTA.tsx                 # 行动召唤
│   └── Footer.tsx              # 页脚
├── hooks/
│   └── useReducedMotion.ts     # 检测 prefers-reduced-motion
└── utils/
    └── gsap.ts                 # GSAP 初始化 + 工具函数
```

---

## Task 1: 安装 GSAP 依赖

**Files:**
- Modify: `package.json`

- [ ] **Step 1: 安装 GSAP 和 @gsap/react**

```bash
npm install gsap @gsap/react
```

- [ ] **Step 2: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: install gsap and @gsap/react dependencies"
```

---

## Task 2: 创建 GSAP 工具模块

**Files:**
- Create: `src/utils/gsap.ts`
- Create: `src/hooks/useReducedMotion.ts`

- [ ] **Step 1: 写入 GSAP 初始化模块**

```typescript
// src/utils/gsap.ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 注册插件（只需执行一次）
gsap.registerPlugin(ScrollTrigger);

// 导出 gsap 实例供全局使用
export { gsap, ScrollTrigger };

// 刷新 ScrollTrigger（DOM变化后调用）
export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh();
};

// 获取所有 ScrollTriggers
export const getAllScrollTriggers = () => {
  return ScrollTrigger.getAll();
};

// Kill 所有 ScrollTriggers（用于 cleanup）
export const killAllScrollTriggers = () => {
  getAllScrollTriggers().forEach((st) => st.kill());
};
```

- [ ] **Step 2: 写入 prefers-reduced-motion hook**

```typescript
// src/hooks/useReducedMotion.ts
import { useState, useEffect } from "react";

export const useReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
};
```

- [ ] **Step 3: Commit**

```bash
git add src/utils/gsap.ts src/hooks/useReducedMotion.ts
git commit -m "feat: add gsap utilities and reduced-motion hook"
```

---

## Task 3: 扩展全局样式

**Files:**
- Modify: `src/styles.css`

- [ ] **Step 1: 写入扩展样式**

```css
/* 保留原有样式，添加以下内容 */

/* ===== CSS Variables ===== */
:root {
  /* Dark theme (Hero) */
  --dark-bg: #0a0a0f;
  --dark-text: #fafaf9;
  --accent-purple: #8b5cf6;
  --accent-cyan: #06b6d4;

  /* Light theme */
  --light-bg: #fafaf9;
  --light-text: #1c1917;
  --light-secondary: #78716c;

  /* Transitions */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out-cubic: cubic-bezier(0.65, 0, 0.35, 1);
}

/* ===== Reset & Base ===== */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: "Avenir Next", -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
  overflow-x: hidden;
}

/* ===== Utility Classes ===== */
.section {
  position: relative;
  width: 100%;
}

.section-dark {
  background: var(--dark-bg);
  color: var(--dark-text);
}

.section-light {
  background: var(--light-bg);
  color: var(--light-text);
}

.container {
  width: min(1200px, calc(100vw - 2rem));
  margin: 0 auto;
  padding: 5rem 1rem;
}

.text-gradient {
  background: linear-gradient(135deg, var(--accent-purple), var(--accent-cyan));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ===== Animation Utilities ===== */
.will-animate {
  will-change: transform, opacity;
}

.gpu-accelerated {
  transform: translateZ(0);
}

/* ===== Scrollbar ===== */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--light-bg);
}

::-webkit-scrollbar-thumb {
  background: var(--accent-purple);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #7c3aed;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles.css
git commit -m "feat: extend global styles with theme variables and utilities"
```

---

## Task 4: Navigation 组件

**Files:**
- Create: `src/components/Navigation.tsx`

- [ ] **Step 1: 写入 Navigation 组件**

```typescript
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
      // 背景渐变动画
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

      // Logo 缩放
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Navigation.tsx
git commit -m "feat: add Navigation component with scroll effects"
```

---

## Task 5: Hero Section

**Files:**
- Create: `src/components/Hero.tsx`

- [ ] **Step 1: 写入 Hero 组件**

```typescript
// src/components/Hero.tsx
import { useRef } from "react";
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
        // 主标题逐词动画
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

        // 副标题入场
        gsap.fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, delay: 1.5, ease: "power3.out" }
        );

        // 背景光晕视差
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

        // 标题消散效果
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
      {/* 背景光晕 */}
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-50"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.3), transparent 50%)`,
        }}
      />

      {/* 渐变叠加 */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, #0a0a0f 100%)`,
        }}
      />

      {/* 内容 */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* 小标签 */}
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-400 mb-6">
          Creative Studio
        </p>

        {/* 主标题 */}
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

        {/* 副标题 */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10"
        >
          我们用创意和技术打造独特的数字体验，帮助品牌在数字世界中脱颖而出
        </p>

        {/* CTA 按钮 */}
        <div className="flex gap-4 justify-center">
          <button className="px-8 py-4 bg-gradient-to-r from-violet-500 to-cyan-500 text-white rounded-full font-medium hover:scale-105 transition-transform">
            探索作品
          </button>
          <button className="px-8 py-4 border border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-colors">
            联系我们
          </button>
        </div>
      </div>

      {/* 装饰粒子 */}
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

      {/* 浮动动画 CSS */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: add Hero section with word-by-word animation and parallax"
```

---

## Task 6: Marquee Section

**Files:**
- Create: `src/components/Marquee.tsx`

- [ ] **Step 1: 写入 Marquee 组件**

```typescript
// src/components/Marquee.tsx
import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const marqueeText = "BRANDING · UI/UX · MOTION · WEB DEVELOPMENT · ";

export const Marquee = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 无限滚动动画
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;

    if (!row1 || !row2) return;

    // 第一行：向左滚动
    gsap.to(row1, {
      xPercent: -50,
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    // 第二行：向右滚动
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
      {/* 第1行 */}
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

      {/* 第2行 */}
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Marquee.tsx
git commit -m "feat: add Marquee section with infinite scroll"
```

---

## Task 7: Features Section

**Files:**
- Create: `src/components/Features.tsx`

- [ ] **Step 1: 写入 Features 组件**

```typescript
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
      // 使用 batch 批量处理卡片入场
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

      // 图标 hover 效果
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
        {/* 标题 */}
        <div className="text-center mb-20">
          <p className="text-sm uppercase tracking-[0.2em] text-violet-600 mb-4">
            Services
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900">
            我们的服务
          </h2>
        </div>

        {/* 特性网格 */}
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Features.tsx
git commit -m "feat: add Features section with batch animations"
```

---

## Task 8: Portfolio Section（水平滚动）

**Files:**
- Create: `src/components/Portfolio.tsx`

- [ ] **Step 1: 写入 Portfolio 组件**

```typescript
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

      // 计算滚动距离
      const getScrollAmount = () => {
        return -(scrollElement.scrollWidth - window.innerWidth);
      };

      // 水平滚动动画
      const tween = gsap.to(scrollElement, {
        x: getScrollAmount,
        ease: "none",
      });

      // 创建 ScrollTrigger
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

      // 卡片入场动画
      const cards = scrollElement.querySelectorAll(".project-card");
      cards.forEach((card, i) => {
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
      {/* 标题区域 */}
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

      {/* 水平滚动区域 */}
      <div ref={triggerRef} className="relative">
        <div
          ref={scrollRef}
          className="flex gap-8 px-8 will-animate"
          style={{ width: "max-content" }}
        >
          {/* 左侧装饰空间 */}
          <div className="w-[20vw]" />

          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card w-[70vw] md:w-[50vw] lg:w-[40vw] flex-shrink-0 rounded-3xl overflow-hidden bg-stone-900 group cursor-pointer"
            >
              {/* 项目图片区域 */}
              <div
                className="h-[60vh] relative overflow-hidden"
                style={{ background: project.color }}
              >
                {/* 渐变遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* 项目信息 */}
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

          {/* 右侧装饰空间 */}
          <div className="w-[20vw]" />
        </div>

        {/* 进度条 */}
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Portfolio.tsx
git commit -m "feat: add Portfolio section with horizontal scroll"
```

---

## Task 9: Team Section

**Files:**
- Create: `src/components/Team.tsx`

- [ ] **Step 1: 写入 Team 组件**

```typescript
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
      // 卡片入场动画
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

      // 3D tilt 效果
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
        {/* 标题 */}
        <div className="text-center mb-20">
          <p className="text-sm uppercase tracking-[0.2em] text-violet-600 mb-4">
            Our Team
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900">
            认识我们
          </h2>
        </div>

        {/* 团队网格 */}
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
              {/* 头像区域 */}
              <div
                className="aspect-square rounded-2xl mb-4 overflow-hidden"
                style={{ background: member.color }}
              >
                <div className="w-full h-full flex items-center justify-center text-white/30 text-6xl font-bold">
                  {member.name[0]}
                </div>
              </div>

              {/* 信息 */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-stone-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-stone-600">{member.role}</p>
              </div>

              {/* 社交链接（hover 显示） */}
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Team.tsx
git commit -m "feat: add Team section with 3D tilt effect"
```

---

## Task 10: Stats Section

**Files:**
- Create: `src/components/Stats.tsx`

- [ ] **Step 1: 写入 Stats 组件**

```typescript
// src/components/Stats.tsx
import { useRef, useState, useEffect } from "react";
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

          // 数字增长动画
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

          // 完成后脉冲效果
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Stats.tsx
git commit -m "feat: add Stats section with counting animation"
```

---

## Task 11: Testimonials Section

**Files:**
- Create: `src/components/Testimonials.tsx`

- [ ] **Step 1: 写入 Testimonials 组件**

```typescript
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

  // 自动轮播
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 切换动画
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
        {/* 标题 */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-violet-600 mb-4">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900">
            客户评价
          </h2>
        </div>

        {/* 评价内容 */}
        <div className="relative">
          {/* 引号装饰 */}
          <div className="absolute -top-8 left-0 text-8xl text-violet-200 font-serif">
            "
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

          {/* 指示器 */}
          <div className="flex justify-center gap-2 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-violet-600 w-8"
                    : "bg-stone-300 hover:bg-stone-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Testimonials.tsx
git commit -m "feat: add Testimonials section with auto carousel"
```

---

## Task 12: CTA Section

**Files:**
- Create: `src/components/CTA.tsx`

- [ ] **Step 1: 写入 CTA 组件**

```typescript
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
      // 背景脉冲动画
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

  // 磁吸按钮效果
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
      {/* 脉动背景 */}
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

        {/* 磁吸按钮 */}
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/CTA.tsx
git commit -m "feat: add CTA section with magnetic button and glow animation"
```

---

## Task 13: Footer Section

**Files:**
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: 写入 Footer 组件**

```typescript
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
      // 链接 stagger 入场
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
          {/* Logo 和描述 */}
          <div className="md:col-span-1">
            <div className="text-2xl font-bold mb-4">
              <span className="text-gradient">STUDIO</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              用创意和技术打造独特的数字体验，帮助品牌在数字世界中脱颖而出。
            </p>
          </div>

          {/* 链接列 */}
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

        {/* 底部栏 */}
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: add Footer section with stagger animations"
```

---

## Task 14: 重构 App.tsx

**Files:**
- Create: `src/App.tsx`
- Modify: `src/main.tsx`（更新导入）

- [ ] **Step 1: 写入 App.tsx**

```typescript
// src/App.tsx
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Features } from "./components/Features";
import { Portfolio } from "./components/Portfolio";
import { Team } from "./components/Team";
import { Stats } from "./components/Stats";
import { Testimonials } from "./components/Testimonials";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";

// 注册 GSAP 插件
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // DOM 加载完成后刷新 ScrollTrigger
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      // 清理所有 ScrollTrigger
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative">
      <Navigation />
      <main>
        <Hero />
        <Marquee />
        <Features />
        <Portfolio />
        <Team />
        <Stats />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
```

- [ ] **Step 2: 更新 main.tsx**

```typescript
// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx src/main.tsx
git commit -m "feat: integrate all sections into App component"
```

---

## Task 15: 验证和测试

**Files:**
- Modify: `package.json`（如有必要）

- [ ] **Step 1: 运行开发服务器验证**

```bash
npm run dev
```

**Expect:** 服务器启动成功，无编译错误

- [ ] **Step 2: 访问页面验证**

Open: http://localhost:8790

**Checklist:**
- [ ] Navigation 随滚动背景变化
- [ ] Hero 文字逐词动画
- [ ] Marquee 无限滚动
- [ ] Features 卡片批量入场
- [ ] Portfolio 水平滚动
- [ ] Team 卡片 3D tilt
- [ ] Stats 数字增长动画
- [ ] Testimonials 自动轮播
- [ ] CTA 按钮磁吸效果
- [ ] Footer 链接 stagger

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: complete landing page with full gsap animations"
```

---

## 完成总结

**实现的功能：**
1. 9个完整版块，符合设计规范
2. GSAP + ScrollTrigger 驱动所有动画
3. 响应式设计（Mobile/Tablet/Desktop）
4. 性能优化（will-change, GPU 加速）
5. 使用 @gsap/react 自动 cleanup

**关键动画技术：**
- ScrollTrigger.batch - 批量元素入场
- containerAnimation - 水平滚动联动
- scrub - 滚动与动画进度绑定
- stagger - 依次入场效果
- elastic.out - 弹性回弹效果
