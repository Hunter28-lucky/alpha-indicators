import equity from "@/assets/equity-curve.jpg";

const STATS = [
  { label: "Win Rate", value: "68.4%", sub: "Across 12,408 closed trades", tone: "profit" },
  { label: "Avg. Risk : Reward", value: "1 : 2.6", sub: "Trailing 12 months", tone: "" },
  { label: "Monthly Return", value: "+8.2%", sub: "Median · simulated", tone: "profit" },
  { label: "Max Drawdown", value: "-9.1%", sub: "Conservative profile", tone: "loss" },
];

const MONTHS = [
  { m: "Jan", v: 4.2 }, { m: "Feb", v: 6.1 }, { m: "Mar", v: -1.8 },
  { m: "Apr", v: 7.4 }, { m: "May", v: 9.2 }, { m: "Jun", v: 3.1 },
  { m: "Jul", v: 11.4 }, { m: "Aug", v: -2.6 }, { m: "Sep", v: 8.0 },
  { m: "Oct", v: 5.3 }, { m: "Nov", v: 12.1 }, { m: "Dec", v: 6.8 },
];

export function Performance() {
  const max = Math.max(...MONTHS.map((m) => Math.abs(m.v)));
  return (
    <section id="performance" className="border-b border-border/60 bg-surface/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest text-gold">
            · Live Performance
          </span>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl lg:text-5xl">
            Transparent metrics. Verified statistics.
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Aggregate performance across our public model portfolio. Reported monthly,
            audit-ready and benchmarked against passive indices.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border/60 bg-border/60 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-surface px-6 py-6">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
              <div
                className={`mt-3 font-mono text-2xl font-semibold sm:text-3xl ${
                  s.tone === "profit" ? "text-profit" : s.tone === "loss" ? "text-loss" : "text-foreground"
                }`}
              >
                {s.value}
              </div>
              <div className="mt-2 text-xs text-muted-foreground">{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-5">
          <div className="overflow-hidden rounded-xl border border-border/60 bg-surface p-6 lg:col-span-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Equity Curve · 24 Months</h3>
              <span className="font-mono text-xs text-profit">+184.6%</span>
            </div>
            <div className="mt-4 overflow-hidden rounded-md border border-border/60">
              <img
                src={equity}
                alt="Equity curve growth"
                loading="lazy"
                width={1200}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="rounded-xl border border-border/60 bg-surface p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Monthly Returns · 2024</h3>
              <span className="font-mono text-xs text-muted-foreground">YTD +69.2%</span>
            </div>
            <div className="mt-6 flex h-56 items-end gap-2">
              {MONTHS.map((m) => {
                const h = (Math.abs(m.v) / max) * 100;
                const positive = m.v >= 0;
                return (
                  <div key={m.m} className="flex flex-1 flex-col items-center gap-2">
                    <div className="relative flex h-full w-full items-end justify-center">
                      <div
                        className={`w-full rounded-sm ${positive ? "bg-profit/80" : "bg-loss/80"}`}
                        style={{ height: `${h}%` }}
                        title={`${m.m}: ${m.v}%`}
                      />
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground">{m.m}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          * Simulated and forward-tested results. Past performance does not guarantee future results.
        </p>
      </div>
    </section>
  );
}
