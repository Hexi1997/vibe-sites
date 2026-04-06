const TESTIMONIALS = [
  { name: "林小月", role: "独立音乐人", text: "Echo 的均衡器设置太专业了，每次出行都靠它磨耳朵，真的比其他 APP 强太多。", avatar: "L" },
  { name: "陈梓豪", role: "电子音乐爱好者", text: "AI 推荐歌单简直读心术，听完一张专辑它就已经准备好下一张了，神了。", avatar: "C" },
  { name: "Mia Zhang", role: "设计师", text: "界面太好看了！暗色主题配上封面色彩，每次打开都有种仪式感。", avatar: "M" },
  { name: "王宇飞", role: "健身达人", text: "跑步模式 + BPM 匹配功能绝了，现在跑步必备，配速都提升了不少。", avatar: "W" },
  { name: "Sophia Lee", role: "产品经理", text: "跨端同步太丝滑了，早上手机听到哪，打开电脑直接接着来，体验无缝。", avatar: "S" },
  { name: "张大伟", role: "播客主播", text: "不只是音乐，Echo 的播客功能也很强，订阅管理、倍速播放都有，一个 APP 够用了。", avatar: "Z" },
] as const;

export function TestimonialsSection() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-24 bg-[#181818] overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 mb-12 text-center">
        <p className="text-xs font-bold uppercase tracking-[2px] text-[#1ed760] mb-4">用户评价</p>
        <h2 className="text-4xl font-bold text-white">他们都爱上了 Echo</h2>
      </div>

      <div className="relative">
        <div className="flex gap-4 marquee-track" style={{ width: "max-content" }}>
          {doubled.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="shrink-0 w-72 p-5 rounded-xl"
              style={{ background: "#1f1f1f", border: "1px solid #2a2a2a" }}
            >
              <p className="text-sm text-[#b3b3b3] leading-relaxed mb-4">&quot;{t.text}&quot;</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-black shrink-0"
                  style={{ background: "#1ed760" }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{t.name}</p>
                  <p className="text-xs text-[#b3b3b3]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className="absolute left-0 top-0 bottom-0 w-20 pointer-events-none"
          style={{ background: "linear-gradient(to right, #181818, transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none"
          style={{ background: "linear-gradient(to left, #181818, transparent)" }}
        />
      </div>
    </section>
  );
}
