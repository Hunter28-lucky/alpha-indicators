import { Link } from "@tanstack/react-router";
import { ArrowRight, Activity, ShieldCheck, BarChart3, Zap, ChevronRight, Play } from "lucide-react";
import heroChart from "@/assets/hero-chart.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center border-b border-border/40">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gold/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-profit/10 blur-[100px]" />
        <img
          src={heroChart}
          alt=""
          className="h-full w-full object-cover opacity-20 mix-blend-screen"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        <div className="absolute inset-0 bg-grid opacity-30 mask-image:linear-gradient(to_bottom,white,transparent)" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-24 lg:px-8 flex flex-col items-center text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-medium text-gold backdrop-blur-md mb-8 hover:bg-gold/10 transition-colors cursor-default">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-75 pulse-dot" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
          </span>
          <span>Veridian Pro v2.4 is Live</span>
          <div className="h-3 w-px bg-gold/30 mx-1" />
          <span className="flex items-center text-gold/80 hover:text-gold transition-colors">
            Read Release Notes <ChevronRight className="h-3 w-3 ml-1" />
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="max-w-5xl font-display text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
          Institutional edge,{" "}
          <span className="relative whitespace-nowrap">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold">distilled.</span>
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg text-muted-foreground/90 sm:text-xl font-light leading-relaxed">
          Stop trading retail setups. Equip yourself with the same algorithmic liquidity zones, order flow footprints, and structural logic used by proprietary trading firms.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            to="/checkout"
            className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-8 py-4 text-sm font-bold text-background transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_-10px_oklch(0.82_0.14_85/0.8)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 flex items-center gap-2">
              Unlock Full Access
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
          <a
            href="#performance"
            className="group inline-flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-medium text-foreground backdrop-blur-lg transition-all hover:bg-white/10 hover:border-white/20"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground/10 group-hover:bg-foreground/20 transition-colors">
              <Play className="h-3 w-3 text-foreground ml-0.5" />
            </div>
            See How It Works
          </a>
        </div>

        {/* Premium Stat strip */}
        <div className="mt-20 w-full grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
          {[
            { icon: BarChart3, label: "Active Pro Traders", value: "10,420+", desc: "Across 40+ countries" },
            { icon: ShieldCheck, label: "Verified Win Rate", value: "68.4%", desc: "Based on 50k+ signals", accent: "profit" },
            { icon: Activity, label: "Years of Backtesting", value: "12+", desc: "Tick-level precision" },
            { icon: Zap, label: "Supported Markets", value: "3+", desc: "Equities, FX, Crypto" },
          ].map((s, i) => (
            <div 
              key={s.label} 
              className="group relative flex flex-col items-center sm:items-start rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm transition-all hover:bg-white/[0.04] hover:border-white/10 overflow-hidden"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gold/10 blur-2xl transition-opacity opacity-0 group-hover:opacity-100" />
              <s.icon className={`h-5 w-5 mb-4 ${s.accent === "profit" ? "text-profit" : "text-gold"}`} />
              <div className="flex items-baseline gap-1">
                <span className="font-display text-3xl font-bold tracking-tight text-foreground">
                  {s.value}
                </span>
              </div>
              <div className="mt-1 text-sm font-medium text-foreground/80">{s.label}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
