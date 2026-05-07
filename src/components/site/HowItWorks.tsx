import { Plug, ScanSearch, ShieldCheck } from "lucide-react";

const STEPS = [
  {
    n: "01",
    icon: Plug,
    title: "Add indicator to chart",
    desc: "One-click install on TradingView, MT5 or NinjaTrader. Works on any timeframe and instrument.",
  },
  {
    n: "02",
    icon: ScanSearch,
    title: "Identify zones & signals",
    desc: "The engine surfaces high-probability liquidity zones, entry triggers, invalidation and target levels.",
  },
  {
    n: "03",
    icon: ShieldCheck,
    title: "Execute with risk management",
    desc: "Pre-calculated stop-loss and take-profit levels keep risk per trade defined and consistent.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="border-b border-border/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 text-left">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest text-gold">
            · How it works
          </span>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl lg:text-5xl">
            Three steps. Zero guesswork.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="relative overflow-hidden rounded-xl border border-border/60 bg-surface p-7 text-left"
            >
              <div className="font-mono text-xs text-gold">{s.n}</div>
              <s.icon className="mt-6 h-6 w-6 text-gold" strokeWidth={1.5} />
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
