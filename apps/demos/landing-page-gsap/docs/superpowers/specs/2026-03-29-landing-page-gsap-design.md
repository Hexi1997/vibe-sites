# Landing Page GSAP Design Spec

> 创意设计工作室官网，使用 React + GSAP 实现丰富动效

---

## 设计概述

### 主题与配色
- **Hero 区**：深色背景（#0a0a0f）+ 渐变光效 + 霓虹紫（#8b5cf6）/青（#06b6d4）点缀
- **内容区**：浅色背景（#fafaf9）+ 深灰文字（#1c1917）
- **强调色**：紫罗兰渐变（#8b5cf6 → #a78bfa）+ 青色高光（#06b6d4）

### 技术栈
- React + TypeScript + Vite
- GSAP + @gsap/react (useGSAP hook)
- ScrollTrigger 插件
- CSS Modules / Tailwind（使用现有 styles.css 扩展）

---

## Sections 详细设计

### 1. Navigation（导航栏）

**布局**：
- 固定顶部（fixed top-0）
- Flex 布局：Logo左侧，导航链接中间，CTA按钮右侧

**GSAP 动效**：
- 滚动时背景：transparent → rgba(255,255,255,0.8) + backdrop-blur(8px)
- Logo：scale(1) → scale(0.9)
- 触发时机：scroll > 100px

---

### 2. Hero（主视觉区）

**布局**：
- 全屏高度（100vh），固定滚动（pin: true）
- 垂直居中内容
- 多层背景：纯色底 + 渐变光晕 + 粒子效果

**内容**：
- 小标题："创意无界"（英文 Creative Studio）
- 大标题："设计与技术的完美融合"（拆分为多行）
- 副标题：一段简洁介绍文字
- CTA 按钮："探索作品" + "联系我们"

**GSAP 动效**：
- **固定滚动**：pin 500vh，scrub: 1
- 主标题：逐词 stagger 入场 → 逐词消散
- 副标题：fadeIn + y: 30
- 背景：radial-gradient 位置随滚动移动（视差）
- 粒子：随机浮动，鼠标交互
- 按钮：入场 scale + hover 发光效果

---

### 3. Marquee（无限滚动标语）

**布局**：
- 全宽，横向滚动容器
- 多行交错方向滚动

**内容**：
- 行1："BRANDING · UI/UX · MOTION · WEB DEVELOPMENT"
- 行2：反向滚动相同内容

**GSAP 动效**：
- 无限循环横向滚动（xPercent: -50 → -150）
- 滚动速度随用户滚动速度变化（velocity-based）

---

### 4. Features（特性展示）

**布局**：
- 6个特性卡片，3列2行（grid）
- 每个卡片：图标 + 标题 + 描述

**内容**：
- 品牌设计 / UI/UX 设计 / 动效设计 / 网站开发 / 创意策略 / 数字营销

**GSAP 动效**：
- 卡片 stagger 入场：y: 80, opacity: 0 → y: 0, opacity: 1
- 图标：hover 时 rotateY(360deg)
- 滚动触发：start: "top 80%"

---

### 5. Portfolio（作品集）

**布局**：
- 固定滚动（pin: true），水平滚动画廊
- 内部内容随垂直滚动横向移动

**内容**：
- 6个项目卡片（大图 + 标题 + 分类标签）

**GSAP 动效**：
- **水平滚动**：垂直滚动驱动横向位移（containerAnimation）
- 卡片：入场时 scale(0.8) + opacity(0) → scale(1) + opacity(1)
- 图片：内部视差（yPercent 移动）
- 进度指示器：底部进度条

---

### 6. Team（团队介绍）

**布局**：
- 4个成员卡片，2行2列
- 卡片：头像 + 姓名 + 职位

**内容**：
- 4位虚拟团队成员

**GSAP 动效**：
- 卡片 stagger 从底部入场
- 头像：hover 3D tilt（rotateX/Y 跟随鼠标）
- 社交图标：hover 时从底部滑入

---

### 7. Stats（数据统计）

**布局**：
- 4个统计数字，横向排列
- 大数字 + 标签

**内容**：
- "150+" 完成项目 / "50+" 满意客户 / "10+" 年经验 / "30+" 设计大奖

**GSAP 动效**：
- 数字：从 0 滚动到目标值（counter animation）
- 触发：进入视口时开始
- 完成后：轻微 scale pulse

---

### 8. Testimonials（客户评价）

**布局**：
- 轮播组件，显示当前评价
- 头像 + 引用 + 姓名/公司

**内容**：
- 3条虚拟客户评价

**GSAP 动效**：
- 切换：fade + slide 过渡
- 头像：轻微浮动动画
- 引号装饰：入场动画

---

### 9. CTA + Footer

**CTA 布局**：
- 全宽深色背景
- 大标题 + 描述 + 按钮

**Footer 布局**：
- 多列链接 + 社交图标 + 版权

**GSAP 动效**：
- CTA背景：脉冲发光效果（radial-gradient 缩放）
- 按钮：hover 磁吸效果（跟随鼠标偏移）
- Footer 链接：stagger 入场

---

## 响应式设计

### 断点
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### 适配规则
- gsap.matchMedia() 用于响应式动画
- prefers-reduced-motion：减弱或禁用动画
- 移动端禁用：粒子效果、复杂3D变换

---

## 性能优化

1. **will-change**: 应用于动画元素
2. **transform3d**: 强制 GPU 加速
3. **图片懒加载**: 使用 loading="lazy"
4. **ScrollTrigger.batch**: 用于批量元素入场
5. **cleanup**: 组件卸载时 kill 所有动画
