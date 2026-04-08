import { publishedDemos, type DemoMeta } from "@vibe-sites/demo-registry";

const isLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);

const ExtraDemos: DemoMeta[] = [
  {
    slug: "sisphean",
    title: "Sisphean",
    description: "One shortcut between download and done. Sisyphean watches your folders and puts the latest file on your clipboard — without opening a file explorer.",
    stack: ["React", "Tauri"],
    status: "published",
    sourcePath: "",
    localUrl: "https://sisyphean-web.2437951611.workers.dev",
    productionUrl: "https://sisyphean-web.2437951611.workers.dev",
  },
];

const imgArray = ['/websites/ECHO.png','/websites/OGX.png',  '/websites/SISYPHEAN.png'];

function SiteCard({ demo, index }: { demo: DemoMeta; index: number }) {
  const href = isLocal ? demo.localUrl : demo.productionUrl;
  const cover = imgArray[index];
  const num = String(index + 1).padStart(2, "0");

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      style={{ textDecoration: "none" }}
    >
      <div className="mb-3 flex items-baseline gap-2.5">
        <span
          className="shrink-0 font-mono text-[0.6875rem] tracking-widest"
          style={{ color: "oklch(55% 0.02 250)" }}
        >
          {num}
        </span>
        <span
          className="text-[0.9375rem] font-medium leading-snug text-zinc-200 transition-colors duration-200 group-hover:text-white"
        >
          {demo.title}
        </span>
      </div>
      <div
        className="relative overflow-hidden rounded-lg"
        style={{ aspectRatio: "252 / 180", background: "#13131a" }}
      >
        {cover ? (
          <img
            src={cover}
            alt={demo.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] origin-top"
            draggable={false}
          />
        ) : (
          <div className="h-full w-full" />
        )}
        <div
          className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
          style={{ background: "linear-gradient(to top, rgba(10,10,11,0.5) 0%, transparent 50%)" }}
        />
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: "rgba(10,10,11,0.55)", backdropFilter: "blur(2px)" }}
        >
          <span
            className="rounded-full border px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white"
            style={{ borderColor: "rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.08)" }}
          >
            Visit
          </span>
        </div>
      </div>
    </a>
  );
}

export default function App() {
  const allDemos = [...publishedDemos, ...ExtraDemos];

  return (
    <main className="mx-auto max-w-3xl px-6 py-14 md:py-20">
      <header className="mb-12 flex items-end justify-between">
        <h1 className="text-sm font-medium uppercase tracking-[0.14em] text-zinc-500">
          Vibe Sites
        </h1>
        <span className="font-mono text-xs text-zinc-600">
          {allDemos.length} sites
        </span>
      </header>
      <ul
        className="flex flex-col gap-6"
      >
        {allDemos.map((demo, index) => (
          <li key={demo.slug}>
            <SiteCard demo={demo} index={index} />
          </li>
        ))}
      </ul>
    </main>
  );
}
