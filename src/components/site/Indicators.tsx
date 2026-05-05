import { ArrowRight, Crosshair, Shield, Target } from "lucide-react";
import ind1 from "@/assets/indicator-1.jpg";
import ind2 from "@/assets/indicator-2.jpg";
import ind3 from "@/assets/indicator-3.jpg";
import ind4 from "@/assets/indicator-4.jpg";

const INDICATORS = [
  {
    name: "Liquidity Zones Pro",
    tag: "Smart Money",
    desc: "Maps institutional liquidity pools, sweep zones and order blocks in real time across any timeframe.",
    img: ind1,
    metrics: { wr: "71.2%", rr: "1 : 2.4" },
  },
  {
    name: "Smart Money Engine",
    tag: "Multi-Timeframe",
    desc: "ICT-based logic detecting market structure shifts, BOS and CHoCH with high-probability confluence filters.",
    img: ind2,
    metrics: { wr: "66.8%", rr: "1 : 3.1" },
  },
  {
    name: "FVG Precision",
    tag: "Mean Reversion",
    desc: "Highlights fair value gaps and imbalance zones with statistical retracement probability scoring.",
    img: ind3,
    metrics: { wr: "64.1%", rr: "1 : 2.8" },
  },
  {
    name: "Volume Footprint",
    tag: "Order Flow",
    desc: "Volume profile + delta footprint surfaces real participation behind every move on intraday charts.",
    img: ind4,
    metrics: { wr: "69.5%", rr: "1 : 2.2" },
  },
];

export function Indicators() {
  return (
    <section id="indicators" className="border-b border-border/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-gold">
              · Featured Indicators
            </span>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold sm:text-4xl lg:text-5xl">
              A precision toolkit for every market regime.
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Each indicator ships with documented logic, backtested statistics and an
            actively maintained alert system. No black boxes.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {INDICATORS.map((ind) => (
            <article
              key={ind.name}
              className="group relative overflow-hidden rounded-xl border border-border/60 bg-surface transition-colors hover:border-gold/40"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-background">
                <img
                  src={ind.img}
                  alt={`${ind.name} chart preview`}
                  loading="lazy"
                  width={800}
                  height={512}
                  className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
                <div className="absolute left-4 top-4 rounded-md border border-border/60 bg-background/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground backdrop-blur">
                  {ind.tag}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold">{ind.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{ind.desc}</p>

                <ul className="mt-5 grid grid-cols-3 gap-3 text-xs">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <Crosshair className="h-3.5 w-3.5 text-profit" /> Entry
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <Shield className="h-3.5 w-3.5 text-loss" /> Stop-loss
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <Target className="h-3.5 w-3.5 text-gold" /> Targets
                  </li>
                </ul>

                <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-5">
                  <div className="flex gap-6 font-mono text-xs">
                    <div>
                      <div className="text-muted-foreground">Win rate</div>
                      <div className="mt-0.5 text-profit">{ind.metrics.wr}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">R:R</div>
                      <div className="mt-0.5 text-foreground">{ind.metrics.rr}</div>
                    </div>
                  </div>
                  <button className="inline-flex items-center gap-1 text-sm font-medium text-gold transition-colors hover:text-foreground">
                    View details <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
