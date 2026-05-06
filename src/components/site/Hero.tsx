import { Link } from "@tanstack/react-router";
import { ArrowRight, Activity, ShieldCheck, BarChart3, Zap } from "lucide-react";
import heroChart from "@/assets/hero-chart.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      {/* Background chart */}
      <div className="absolute inset-0">
        <img
          src={heroChart}
          alt=""
          className="h-full w-full object-cover opacity-40"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        <div className="absolute inset-0 bg-grid opacity-50" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pt-20 pb-24 lg:px-8 lg:pt-28 lg:pb-32">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/60 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-profit opacity-75 pulse-dot" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-profit" />
          </span>
          <span className="font-mono">LIVE</span>
          <span>Markets are open · NYSE / NSE</span>
        </div>

        <h1 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
          Institutional-grade trading
          <br className="hidden sm:block" />{" "}
          indicators for{" "}
          <span className="text-gradient-gold">serious traders.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Built with precision. Designed for consistency. Trusted by disciplined traders
          who demand more than retail signals — engineered on the same logic used inside
          institutional desks.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/checkout"
            className="group inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-b from-gold to-gold/80 px-6 py-3.5 text-sm font-semibold text-gold-foreground shadow-[0_0_30px_-8px_oklch(0.82_0.14_85/0.6)] transition-transform hover:-translate-y-0.5"
          >
            Explore Indicators
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href="#performance"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-surface/60 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-surface-elevated"
          >
            <Activity className="h-4 w-4 text-profit" />
            View Live Performance
          </a>
        </div>

        {/* Stat strip */}
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border/60 bg-border/60 sm:mt-14 sm:grid-cols-4">
          {[
            { icon: BarChart3, label: "Active Traders", value: "10,420", suffix: "+" },
            { icon: ShieldCheck, label: "Avg. Win Rate", value: "68.4", suffix: "%", accent: "profit" },
            { icon: Activity, label: "Backtest Years", value: "12", suffix: "+" },
            { icon: Zap, label: "Markets Covered", value: "3", suffix: "", note: "Equities · FX · Crypto" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col bg-surface/80 px-4 py-5 backdrop-blur sm:px-5">
              <s.icon className="h-4 w-4 text-gold" />
              <div className="mt-3 flex items-baseline gap-0.5">
                <span className={`font-mono text-2xl font-semibold leading-none tracking-tight sm:text-3xl ${s.accent === "profit" ? "text-profit" : "text-foreground"}`}>
                  {s.value}
                </span>
                {s.suffix && (
                  <span className={`font-mono text-lg font-semibold leading-none ${s.accent === "profit" ? "text-profit" : "text-gold"}`}>
                    {s.suffix}
                  </span>
                )}
              </div>
              <div className="mt-2 text-[11px] uppercase tracking-wider text-muted-foreground sm:text-xs">{s.label}</div>
              {s.note && (
                <div className="mt-1 font-mono text-[10px] text-muted-foreground/80">{s.note}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
