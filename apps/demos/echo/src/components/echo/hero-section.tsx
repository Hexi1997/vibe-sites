import { useEffect, useRef } from "react";

const HERO_STATS = [
  { num: "8000万+", label: "首曲库" },
  { num: "5000万+", label: "活跃用户" },
  { num: "180+", label: "个国家地区" },
] as const;

function HeroShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      timeRef.current += 0.008;
      const t = timeRef.current;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.clearRect(0, 0, w, h);

      const waves = [
        { amp: 28, freq: 0.012, speed: 1.0, opacity: 0.6, color: "#1ed760", blur: 0, width: 2 },
        { amp: 18, freq: 0.018, speed: 1.4, opacity: 0.35, color: "#1ed760", blur: 8, width: 1.5 },
        { amp: 40, freq: 0.008, speed: 0.6, opacity: 0.15, color: "#1ed760", blur: 20, width: 3 },
        { amp: 12, freq: 0.025, speed: 2.0, opacity: 0.2, color: "#1db954", blur: 4, width: 1 },
      ];

      waves.forEach(({ amp, freq, speed, opacity, color, blur, width }) => {
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.shadowColor = "#1ed760";
        ctx.shadowBlur = blur;
        ctx.lineCap = "round";

        ctx.beginPath();
        const centerY = h / 2;

        for (let x = 0; x <= w; x += 2) {
          const wave1 = Math.sin(x * freq + t * speed) * amp;
          const wave2 = Math.sin(x * freq * 2.3 + t * speed * 0.7) * (amp * 0.3);
          const wave3 = Math.sin(x * freq * 0.5 + t * speed * 1.3) * (amp * 0.5);
          const y = centerY + wave1 + wave2 + wave3;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.globalAlpha = opacity * 0.4;
        for (let x = 0; x <= w; x += 2) {
          const wave1 = Math.sin(x * freq + t * speed) * amp;
          const wave2 = Math.sin(x * freq * 2.3 + t * speed * 0.7) * (amp * 0.3);
          const wave3 = Math.sin(x * freq * 0.5 + t * speed * 1.3) * (amp * 0.5);
          const y = centerY - (wave1 + wave2 + wave3) * 0.6 + amp * 0.8;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        ctx.restore();
      });

      ctx.save();
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(0.2, "rgba(30,215,96,0.08)");
      grad.addColorStop(0.5, "rgba(30,215,96,0.2)");
      grad.addColorStop(0.8, "rgba(30,215,96,0.08)");
      grad.addColorStop(1, "transparent");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();
      ctx.restore();

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export function HeroSection() {
  return (
    <section className="hero-gradient relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      <HeroShader />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p
          className="animate-fade-in-up inline-block text-xs font-bold uppercase tracking-[2px] mb-6 px-4 py-2 rounded-full"
          style={{ background: "rgba(30,215,96,0.12)", color: "#1ed760", border: "1px solid rgba(30,215,96,0.2)" }}
        >
          你的专属音乐宇宙
        </p>

        <h1 className="animate-fade-in-up delay-100 text-6xl md:text-[80px] 2xl:text-8xl font-black leading-[1.2] tracking-tight text-white mb-6 md:mb-12">
          听见
          <br />
          <span style={{ color: "#1ed760" }}>真实</span>
          的音乐
        </h1>

        <p className="animate-fade-in-up delay-200 text-lg text-[#b3b3b3] leading-relaxed mb-10 max-w-xl mx-auto">
          Echo 是一款专为音乐爱好者打造的播放器。无损音质、智能推荐、沉浸体验——让每一首歌都成为一段旅程。
        </p>

        <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#pricing"
            className="px-8 py-4 rounded-full font-bold text-sm uppercase tracking-[1.4px] text-black transition-transform hover:scale-[1.03] active:scale-[0.97]"
            style={{ background: "#1ed760" }}
          >
            免费下载
          </a>
          <a
            href="#player"
            className="px-8 py-4 rounded-full font-bold text-sm uppercase tracking-[1.4px] text-white border border-[#7c7c7c] hover:border-white transition-colors"
          >
            立即试听 ♪
          </a>
        </div>

        <div className="animate-fade-in-up delay-400 flex justify-center gap-10 mt-16 pt-10 border-t border-[#2a2a2a]">
          {HERO_STATS.map(({ num, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-black text-white">{num}</p>
              <p className="text-xs text-[#b3b3b3] mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in delay-600 flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-[#1ed760] to-transparent" />
        <p className="text-[10px] uppercase tracking-[2px] text-[#b3b3b3]">向下探索</p>
      </div>
    </section>
  );
}
