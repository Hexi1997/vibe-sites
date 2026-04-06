import { useState } from "react";

const FEATURES = [
  {
    icon: "▶",
    title: "无损音质",
    desc: "支持 FLAC、WAV、DSD 等高解析度格式，还原音乐本真音色",
    highlight: "320kbps · FLAC · DSD",
  },
  {
    icon: "♪",
    title: "智能歌单",
    desc: "AI 根据你的听歌习惯和心情自动生成个性化歌单",
    highlight: "AI 驱动 · 实时更新",
  },
  {
    icon: "↓",
    title: "离线下载",
    desc: "提前下载喜欢的歌曲，断网也能沉浸在音乐世界",
    highlight: "离线可用 · 无限下载",
  },
  {
    icon: "⇄",
    title: "跨端同步",
    desc: "播放历史、歌单、收藏在所有设备间实时同步",
    highlight: "iOS · Android · Web",
  },
  {
    icon: "◎",
    title: "均衡器",
    desc: "10段专业均衡器 + 预设音效，让每首歌都有最佳声场",
    highlight: "10段EQ · 专业预设",
  },
  {
    icon: "✦",
    title: "社交分享",
    desc: "一键分享你的音乐时刻，发现志同道合的音乐爱好者",
    highlight: "实时互动 · 音乐社区",
  },
] as const;

export function FeaturesSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="features" className="py-24 bg-[#121212]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[2px] text-[#1ed760] mb-4">核心功能</p>
          <h2 className="text-4xl font-bold text-white mb-4">为音乐而生的每一处设计</h2>
          <p className="text-[#b3b3b3] max-w-lg mx-auto leading-relaxed">
            从音质到界面，从个人到社交，Echo 重新定义了音乐播放的每个维度。
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="relative p-6 rounded-lg cursor-default transition-all duration-300"
              style={{
                background: hovered === i ? "#1f1f1f" : "#181818",
                border: `1px solid ${hovered === i ? "#1ed76030" : "transparent"}`,
                transform: hovered === i ? "translateY(-2px)" : "translateY(0)",
                boxShadow: hovered === i ? "rgba(0,0,0,0.3) 0px 8px 24px" : "none",
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg mb-4 transition-colors duration-300"
                style={{
                  background: hovered === i ? "rgba(30,215,96,0.15)" : "#252525",
                  color: hovered === i ? "#1ed760" : "#b3b3b3",
                }}
              >
                {f.icon}
              </div>
              <h3 className="text-[1rem] font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-[#b3b3b3] leading-relaxed mb-4">{f.desc}</p>
              <span
                className="text-xs font-bold uppercase tracking-[1px] px-2 py-1 rounded"
                style={{
                  background: "rgba(30,215,96,0.08)",
                  color: "#1ed760",
                  border: "1px solid rgba(30,215,96,0.15)",
                }}
              >
                {f.highlight}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
