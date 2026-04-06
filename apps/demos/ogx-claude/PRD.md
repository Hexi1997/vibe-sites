# AI OG Image Generator 官网 PRD

## 1. 项目概述

### 1.1 项目名称

OGX（AI OG Image Generator）

### 1.2 背景

随着博客、社交媒体和内容平台的发展，OG Image（Open Graph 图片）成为影响点击率的重要因素。但目前生成 OG 图流程繁琐，需要设计能力或手动制作。

### 1.3 目标

打造一个「所见即所得」的 OG Image 生成工具：

* 用户填写内容即可生成精美 OG 图
* 提供模板 + 可视化编辑
* 支持开发者自动化生成（API）

---

## 2. 产品定位

### 2.1 核心价值

一句话：让任何人 10 秒生成专业级 OG Image

### 2.2 目标用户

* 博客作者（Next.js / Notion / MDX）
* 独立开发者
* 内容创作者

### 2.3 差异化优势

* 可视化编辑（对比 satori 纯代码）
* 模板丰富（类似 Canva but dev-focused）
* 支持 API 自动生成

---

## 3. 信息架构

### 页面结构

* 首页（Landing）
* 编辑器（Editor）
* 模板市场（Templates）
* 定价（Pricing）
* 文档（Docs）

---

## 4. 核心页面设计

### 4.1 首页（Landing Page）

#### 1. Hero 区

* 标题：Generate Beautiful OG Images in Seconds
* 副标题：No design skills needed. Just type.
* CTA：Start Creating
* 背景：动态生成 OG 图动画

#### 2. Demo 区（核心转化）

* 输入框：Title / Tag / Author
* 实时预览 OG 图
* CTA：Download / Edit

👉 这是最关键模块（直接转化）

#### 3. 模板展示

* 多个模板卡片
* Hover 动效

#### 4. Feature 区

* Visual Editor
* API Support
* Custom Fonts

#### 5. 使用场景

* Blog
* Twitter / X
* Product Hunt


#### 6. 不同 Tier

##### 免费版

* 基础模板
* 带 watermark

##### Pro

* 无水印
* 高级模板
* API 调用额度

#### 7. CTA 区

* Try Now

---

## 5. 功能需求

### 5.1 核心功能

* 实时 OG 生成
* 模板系统
* 图片导出（PNG / JPG）

### 5.2 进阶功能

* API 生成
* 动态 OG（URL 参数）
* 批量生成

### 5.3 编辑体验

* 实时预览
* 平滑动画

---

## 6. 技术方案

### 技术栈

* React + Vite
* TailwindCSS
* Satori（生成图片）
* Framer Motion（动画）

### 渲染方式

* 服务端生成 OG（Edge Function）
* 客户端实时预览

### 部署

* Cloudflare Workers

---

## 7. SEO & 增长

### SEO

* 自动生成 OG（自用）
* 模板页面 SEO

### 增长策略

* 免费模板
* 分享带 watermark
* Product Hunt 发布

---

## 8. 关键指标（KPI）

* 生成次数
* 下载次数
* 转化率（进入编辑器 → 下载）
* 模板使用率

---

## 9. 一句话总结

👉 一个面向开发者和内容创作者的「可视化 OG Image 生成平台」
