export function CTABannerSection() {
  return (
    <section id="contact" className="py-24 bg-[#121212]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div
          className="rounded-2xl p-12"
          style={{
            background: "linear-gradient(135deg, #1f1f1f 0%, #181818 100%)",
            border: "1px solid #2a2a2a",
          }}
        >
          <div
            className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-black text-black"
            style={{ background: "#1ed760" }}
          >
            E
          </div>
          <h2 className="text-4xl font-black text-white mb-4">开启你的音乐之旅</h2>
          <p className="text-[#b3b3b3] mb-8 leading-relaxed">
            加入 5000 万音乐爱好者，免费体验 Echo 带来的沉浸式音乐世界。随时可取消，没有承诺。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="px-8 py-4 rounded-full font-bold text-sm uppercase tracking-[1.4px] text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: "#1ed760" }}
            >
              免费下载 App
            </a>
            <a
              href="#"
              className="px-8 py-4 rounded-full font-bold text-sm uppercase tracking-[1.4px] text-white border border-[#7c7c7c] hover:border-white transition-colors"
            >
              网页版试听
            </a>
          </div>
          <p className="text-xs text-[#4d4d4d] mt-6 uppercase tracking-[1.4px]">
            iOS · Android · macOS · Windows · Web
          </p>
        </div>
      </div>
    </section>
  );
}
