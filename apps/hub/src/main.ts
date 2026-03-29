import { publishedDemos } from "@vibe-sites/demo-registry";
import "./styles.css";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Hub root element was not found.");
}

const isLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);

const cards = publishedDemos
  .map((demo) => {
    const href = isLocal ? demo.localUrl : demo.productionUrl;

    if (!href) {
      return `
        <article class="group grid gap-4 rounded-[28px] border border-slate-900/10 bg-white/75 p-6 text-slate-900 shadow-[0_24px_60px_rgba(20,33,61,0.12)] backdrop-blur-xl opacity-70">
          <span class="inline-flex max-w-max items-center rounded-full bg-slate-900/6 px-3 py-2 text-[0.75rem] uppercase tracking-[0.08em] text-slate-700">${demo.stack.join(" · ")}</span>
          <h2 class="text-2xl font-semibold">${demo.title}</h2>
          <p class="leading-7 text-slate-600">${demo.description}</p>
          <span class="font-semibold text-slate-900">Configure productionUrl to publish this demo</span>
        </article>
      `;
    }

    return `
      <a class="group grid gap-4 rounded-[28px] border border-slate-900/10 bg-white/75 p-6 text-slate-900 shadow-[0_24px_60px_rgba(20,33,61,0.12)] backdrop-blur-xl transition duration-200 hover:-translate-y-1.5 hover:border-slate-900/20 hover:shadow-[0_30px_70px_rgba(20,33,61,0.17)]" href="${href}">
        <span class="inline-flex max-w-max items-center rounded-full bg-slate-900/6 px-3 py-2 text-[0.75rem] uppercase tracking-[0.08em] text-slate-700">${demo.stack.join(" · ")}</span>
        <h2 class="text-2xl font-semibold">${demo.title}</h2>
        <p class="leading-7 text-slate-600">${demo.description}</p>
        <span class="font-semibold text-slate-900">Open demo</span>
      </a>
    `;
  })
  .join("");

app.innerHTML = `
  <main class="mx-auto w-[min(1120px,calc(100vw-2rem))] px-0 py-12 md:w-[min(1120px,calc(100vw-2.5rem))] md:py-20">
    <section class="grid items-stretch gap-6 md:grid-cols-[minmax(0,1.8fr)_minmax(300px,1fr)]">
      <div class="rounded-[28px] border border-slate-900/10 bg-white/75 p-10 shadow-[0_24px_60px_rgba(20,33,61,0.12)] backdrop-blur-xl">
        <span class="inline-flex items-center rounded-full bg-slate-900/6 px-3 py-2 text-[0.75rem] uppercase tracking-[0.08em] text-slate-700">Cloudflare Worker monorepo</span>
        <h1 class="mt-4 text-[clamp(3rem,6vw,5rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-slate-950">Vibe Sites</h1>
        <p class="mt-3 max-w-3xl leading-8 text-slate-600">
          A monorepo for experimental websites where the gallery and every demo
          deploy as separate Cloudflare Workers.
        </p>
      </div>
      <div class="grid gap-4 rounded-[28px] border border-slate-900/10 bg-white/75 p-6 shadow-[0_24px_60px_rgba(20,33,61,0.12)] backdrop-blur-xl">
        <div class="flex flex-col justify-center gap-1 rounded-[22px] bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(255,255,255,0.55))] p-6">
          <strong class="text-5xl font-semibold text-slate-950">${publishedDemos.length}</strong>
          <span class="leading-7 text-slate-600">published demos</span>
        </div>
        <div class="flex flex-col justify-center gap-1 rounded-[22px] bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(255,255,255,0.55))] p-6">
          <strong class="text-5xl font-semibold text-slate-950">${publishedDemos.length + 1}</strong>
          <span class="leading-7 text-slate-600">independent Worker projects</span>
        </div>
      </div>
    </section>
    <section class="mt-12">
      <div class="mb-6 grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div>
          <span class="inline-flex items-center rounded-full bg-slate-900/6 px-3 py-2 text-[0.75rem] uppercase tracking-[0.08em] text-slate-700">Directory</span>
          <h2 class="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.05em] text-slate-950">Choose a demo to explore</h2>
        </div>
        <p class="max-w-xl leading-7 text-slate-600">Published projects are generated from the workspace registry and linked by URL.</p>
      </div>
      <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        ${cards || '<div class="rounded-[28px] border border-slate-900/10 bg-white/75 p-8 leading-7 text-slate-600 shadow-[0_24px_60px_rgba(20,33,61,0.12)] backdrop-blur-xl">No published demos yet. Run `pnpm new:demo` to add one.</div>'}
      </div>
    </section>
  </main>
`;
