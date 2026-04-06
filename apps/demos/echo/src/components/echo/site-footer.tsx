const FOOTER_COLUMNS = [
  {
    title: "产品",
    links: ["下载 App", "网页版", "开发者 API", "嵌入播放器"],
  },
  {
    title: "公司",
    links: ["关于我们", "博客", "媒体资源", "招聘"],
  },
  {
    title: "支持",
    links: ["帮助中心", "联系我们", "服务条款", "隐私政策"],
  },
] as const;

const SOCIAL_LABELS = ["微博", "微信", "抖音", "B站"] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-[#2a2a2a] bg-[#121212] py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#1ed760" }}>
                <span className="text-black text-sm font-black">E</span>
              </div>
              <span className="text-white font-bold text-lg">Echo</span>
            </div>
            <p className="text-sm text-[#b3b3b3] leading-relaxed">
              随时随地听你喜欢的音乐，创建个性化歌单，分享你的音乐世界。
            </p>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold uppercase tracking-[1.4px] text-white mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-[#b3b3b3] hover:text-white transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[#2a2a2a] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#4d4d4d]">© 2026 Echo Music. All rights reserved.</p>
          <div className="flex gap-4">
            {SOCIAL_LABELS.map((s) => (
              <a
                key={s}
                href="#"
                className="text-xs text-[#4d4d4d] hover:text-[#b3b3b3] transition-colors uppercase tracking-[1px]"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
