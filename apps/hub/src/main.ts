import { publishedDemos } from "@vibe-sites/demo-registry";
import "./styles.css";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Hub root element was not found.");
}

const isLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);

const listItems = publishedDemos
  .map((demo) => {
    const href = isLocal ? demo.localUrl : demo.productionUrl;
    const rowClass =
      "flex min-h-12 items-center px-1 py-3 text-[0.9375rem] transition-colors";

    if (!href) {
      return `<li class="${rowClass} text-zinc-500">${demo.title} <span class="ml-2 text-xs text-zinc-600">(no URL)</span></li>`;
    }

    return `<li><a class="${rowClass} block text-zinc-200 hover:text-white" href="${href}">${demo.title}</a></li>`;
  })
  .join("");

app.innerHTML = `
  <main class="mx-auto max-w-md px-6 py-14 md:py-20">
    <h1 class="mb-10 text-sm font-medium uppercase tracking-[0.12em] text-zinc-500">Vibe Sites</h1>
    ${
      listItems.length > 0
        ? `<ul class="divide-y divide-zinc-800/80 border-y border-zinc-800/80">${listItems}</ul>`
        : `<p class="border-y border-zinc-800/80 py-6 text-sm text-zinc-500">No published demos yet.</p>`
    }
  </main>
`;
