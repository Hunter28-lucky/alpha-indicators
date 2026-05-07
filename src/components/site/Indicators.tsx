import { Link } from "@tanstack/react-router";
import { ArrowRight, Crosshair, Shield, Target, Sparkles, Activity, Layers, Eye } from "lucide-react";
import ind1 from "@/assets/indicator-1.jpg";
import ind2 from "@/assets/indicator-2.jpg";
import ind3 from "@/assets/indicator-3.jpg";
import ind4 from "@/assets/indicator-4.jpg";

const INDICATORS = [
  {
    id: "liquidity",
    name: "Liquidity Zones Pro",
    tag: "Smart Money",
    icon: Layers,
    desc: "Maps institutional liquidity pools, sweep zones and order blocks in real time across any timeframe.",
    img: ind1,
    metrics: { wr: "71.2%", rr: "1:2.4" },
    colSpan: "col-span-1 md:col-span-2",
  },
  {
    id: "smart-money",
    name: "Smart Money Engine",
    tag: "Multi-Timeframe",
    icon: Activity,
    desc: "ICT-based logic detecting market structure shifts, BOS and CHoCH.",
    img: ind2,
    metrics: { wr: "66.8%", rr: "1:3.1" },
    colSpan: "col-span-1",
  },
  {
    id: "mean-reversion",
    name: "FVG Precision",
    tag: "Mean Reversion",
    icon: Target,
    desc: "Highlights fair value gaps and imbalance zones with statistical retracement probability.",
    img: ind3,
    metrics: { wr: "64.1%", rr: "1:2.8" },
    colSpan: "col-span-1",
  },
  {
    id: "volume-footprint",
    name: "Volume Footprint",
    tag: "Order Flow",
    icon: Eye,
    desc: "Volume profile + delta footprint surfaces real participation behind every move.",
    img: ind4,
    metrics: { wr: "69.5%", rr: "1:2.2" },
    colSpan: "col-span-1 md:col-span-2",
  },
];

export function Indicators() {
  return (
    <section id="indicators" className="relative border-b border-border/40 py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-3 py-1 mb-6 text-xs font-medium text-gold backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            The Alpha Suite
          </div>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
            A precision toolkit for <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">every market regime.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            No black boxes. Just institutional-grade logic, backtested statistics, and real-time execution clarity engineered for serious traders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INDICATORS.map((ind) => (
            <article
              key={ind.name}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-surface/40 backdrop-blur-md transition-all hover:bg-surface/60 hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/10 flex flex-col ${ind.colSpan}`}
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/5">
                <img
                  src={ind.img}
                  alt={`${ind.name} chart preview`}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 font-mono text-xs font-medium text-white backdrop-blur-md">
                  <ind.icon className="h-3.5 w-3.5 text-gold" />
                  {ind.tag}
                </div>
              </div>

              <div className="flex flex-col flex-grow p-6 sm:p-8">
                <h3 className="font-display text-2xl font-bold text-foreground mb-3">{ind.name}</h3>
                <p className="text-muted-foreground leading-relaxed flex-grow">{ind.desc}</p>

                <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/5 pt-6 mb-6">
                  <div className="flex flex-col gap-1">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <Crosshair className="h-3 w-3 text-profit" /> Entry
                    </span>
                    <span className="text-sm font-semibold text-foreground">Precise</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <Shield className="h-3 w-3 text-loss" /> Risk
                    </span>
                    <span className="text-sm font-semibold text-foreground">Defined</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <Target className="h-3 w-3 text-gold" /> TP
                    </span>
                    <span className="text-sm font-semibold text-foreground">Dynamic</span>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-black/40 p-2 pl-5 border border-white/5">
                  <div className="flex gap-6 font-mono text-sm">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Win Rate</span>
                      <span className="text-profit font-bold">{ind.metrics.wr}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest">R:R Ratio</span>
                      <span className="text-white font-bold">{ind.metrics.rr}</span>
                    </div>
                  </div>
                  <Link
                    to="/checkout/$id"
                    params={{ id: ind.id }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold text-background transition-transform hover:scale-105 active:scale-95"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
