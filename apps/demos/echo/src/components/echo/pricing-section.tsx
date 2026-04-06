const PLANS: Array<{
  name: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  badge?: string;
}> = [
  {
    name: "免费版",
    price: "¥0",
    period: "/月",
    features: ["有限曲库（50万首）", "广告穿插播放", "128kbps 音质", "基础歌单功能"],
    cta: "免费开始",
    highlighted: false,
  },
  {
    name: "高级版",
    price: "¥18",
    period: "/月",
    features: ["全量曲库（8000万首）", "无广告", "320kbps 音质", "无限离线下载", "高级均衡器"],
    cta: "立即订阅",
    highlighted: true,
    badge: "最受欢迎",
  },
  {
    name: "家庭版",
    price: "¥28",
    period: "/月",
    features: ["6个账号共享", "全量曲库", "无广告 + 无损音质", "儿童安全模式", "家庭歌单共享"],
    cta: "家庭订阅",
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-[#121212]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[2px] text-[#1ed760] mb-4">价格方案</p>
          <h2 className="text-4xl font-bold text-white mb-4">选择最适合你的方式</h2>
          <p className="text-[#b3b3b3] max-w-md mx-auto">
            无论你是随性听歌还是发烧友，都有一款方案适合你。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className="relative rounded-xl p-6 flex flex-col transition-transform duration-300 hover:-translate-y-1"
              style={{
                background: plan.highlighted ? "#1f1f1f" : "#181818",
                border: plan.highlighted ? "1px solid #1ed76040" : "1px solid #2a2a2a",
                boxShadow: plan.highlighted ? "rgba(30,215,96,0.08) 0px 0px 40px" : "none",
              }}
            >
              {plan.badge ? (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-[1.4px]"
                  style={{ background: "#1ed760", color: "#000" }}
                >
                  {plan.badge}
                </div>
              ) : null}

              <div className="mb-6">
                <h3 className="text-sm font-bold uppercase tracking-[1.4px] text-[#b3b3b3] mb-3">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-[#b3b3b3] text-sm">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3 text-sm">
                    <span style={{ color: "#1ed760" }} className="shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-[#b3b3b3]">{feat}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className="block text-center py-3 rounded-full text-sm font-bold uppercase tracking-[1.4px] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={
                  plan.highlighted
                    ? { background: "#1ed760", color: "#000" }
                    : { background: "transparent", color: "#ffffff", border: "1px solid #7c7c7c" }
                }
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
