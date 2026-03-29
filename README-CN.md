# Vibe Sites

[English](./README.md) | [中文](./README-CN.md)

这是 **Hexi 的 Vibe Websites 仓库**，也是一个用于存放实验性网站 demo 的 `pnpm` monorepo。  
其中 `hub` 作为 demo 列表页，每个 demo 都会作为独立的 Cloudflare Worker 项目部署；根目录则负责统一脚本、registry 生成和 CI/CD。

## 这个仓库是做什么的

- 用一个 monorepo 管理多个网站 demo
- 每个 demo 可以使用不同技术栈
- 每个 demo 独立部署到 Cloudflare Workers
- 提供一个 hub 页面，用来展示和跳转已发布的 demo
- 支持 GitHub Actions 动态部署，不需要把 demo 名字写死在 workflow 里

## 目录结构

- `apps/hub`
  demo 列表页项目。它会读取生成后的 demo metadata，并渲染目录页。
- `apps/demos/*`
  独立 demo 项目。每个 demo 都拥有自己的构建配置、Wrangler 配置和部署命令。
- `packages/demo-registry`
  提供给 hub 使用的生成后 metadata。
- `scripts/generate-demo-registry.mjs`
  扫描 `apps/demos/*/demo.config.json`，然后生成 registry 文件。
- `scripts/new-demo.mjs`
  用于交互式创建新 demo 的脚手架。
- `scripts/detect-deploy-targets.mjs`
  GitHub Actions 中用于检测哪些 demo 需要部署、hub 是否需要部署。
- `.github/workflows/deploy.yml`
  hub 和 demos 的动态 CI/CD workflow。

## 常用命令

- `pnpm install`
  安装 workspace 依赖。
- `pnpm dev`
  生成 registry，并并行启动 hub 和 demos 的本地开发服务。
- `pnpm build`
  独立构建 hub 和所有 demos。
- `pnpm deploy`
  部署当前目标中的已发布 demo，以及 hub。
- `pnpm deploy:demos`
  只部署 demos。
- `pnpm deploy:hub`
  只部署 hub。
- `pnpm run generate:registry`
  重新生成 demo registry 文件。
- `pnpm new:demo`
  启动交互式 demo 脚手架。

## 新建 Demo

运行：

```bash
pnpm new:demo
```

脚本会交互式询问：

- `slug`
- `template`

当前支持的模板：

- `react`
  React + Vite + Cloudflare Workers
- `nextjs`
  Next.js + OpenNext + Cloudflare Workers + Tailwind CSS

也可以直接传参：

```bash
pnpm new:demo my-demo
pnpm new:demo my-demo react
pnpm new:demo my-next-demo nextjs
```

## Demo 接入约定

每个 demo 位于 `apps/demos/<slug>` 下，至少需要包含：

- `demo.config.json`
- 对应框架的构建配置，例如 `vite.config.ts` 或 `next.config.ts`
- `wrangler.jsonc`
- 该框架对应的应用入口文件

其中 `demo.config.json` 是 hub 展示和部署逻辑的核心配置来源。

常见字段包括：

- `slug`
- `title`
- `description`
- `stack`
- `status`
- `localUrl`
- `productionUrl`

规则如下：

- 只有 `status: "published"` 的 demo 才会出现在 hub 页面中
- 只有 `status: "published"` 的 demo 才会进入自动 CI 部署
- `productionUrl` 是 hub 在线上环境中使用的跳转地址
- `localUrl` 是 hub 在本地开发环境中使用的跳转地址

## Hub 与 Registry

hub 使用的生成文件位于：

- [packages/demo-registry/src/generated.ts](/Users/hexi/OpenSource/vibe-sites/packages/demo-registry/src/generated.ts)

这个文件是根据所有 demo 的 `demo.config.json` 自动生成的，不应该手动修改。

通常在这些场景下需要重新生成：

- 新建 demo 之后
- 修改 demo 的 `status` 之后
- 修改 demo 的 `productionUrl` 之后

正常情况下，根目录的 `build` 和 `dev` 都已经会自动执行 registry 生成。

## 部署方式

这个仓库不会把所有 demo 打进同一个 Worker。

当前采用的是：

- 每个 demo 都是独立 Worker 项目
- hub 也是独立 Worker 项目
- hub 通过 registry 中的 metadata 去展示和跳转 demo

这样做的好处是：

- 各 demo 部署彼此隔离
- 不会受到单个 Worker 打包体积的集中限制
- 新增 demo 不需要改整套部署模型

## GitHub Actions 自动部署

仓库内置的 workflow 位于：

- [.github/workflows/deploy.yml](/Users/hexi/OpenSource/vibe-sites/.github/workflows/deploy.yml)

它的工作流程大致是：

1. `detect-changes` 先分析这次提交改了哪些文件
2. 从改动路径中提取受影响的 demo slug，例如 `apps/demos/<slug>/...`
3. 过滤出 `status: "published"` 的 demo
4. `deploy-demos` 使用动态 matrix，只部署这些变更过的 demo
5. 如果 hub 相关文件或 demo metadata 变了，再执行 `deploy-hub`

这套机制支持 demo 动态扩展，因为：

- workflow 里没有写死 demo 名字
- demo 列表是运行时从改动路径里算出来的
- 只要新增 demo 遵循 `apps/demos/<slug>` 约定，就能自动进入这套流程

另外也支持通过 `workflow_dispatch` 手动触发全量部署。

## GitHub Secrets

需要在 GitHub 仓库中配置以下 Secrets：

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

没有这些配置时，Wrangler 无法在 CI 中完成部署。

## 本地部署说明

如果你在本地通过 Wrangler 部署，需要先在当前 shell 中提供 Cloudflare 凭证：

```bash
export CLOUDFLARE_API_TOKEN=...
export CLOUDFLARE_ACCOUNT_ID=...
```

然后执行：

```bash
pnpm run deploy
```

## 当前注意事项

- 如果 `package.json` 有变化，记得一起提交更新后的 `pnpm-lock.yaml`
- 如果你使用了 `git commit --amend` 再 `push -f`，workflow 仍然可以工作，因为 deploy target detection 已经对旧 SHA 不可达的情况做了回退处理
- hub 是否展示 demo，取决于 `status: "published"`，而不只是是否填写了 `productionUrl`
